#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const packagesDir = path.join(cwd, "packages");
const outputDir = path.join(cwd, ".release-tmp", "manifests");
const dryRun = process.argv.includes("--dry-run");

const SECTIONS = ["dependencies", "peerDependencies", "optionalDependencies", "devDependencies"];

async function readJson(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  return JSON.parse(source);
}

async function listPackageManifests() {
  const entries = await fs.readdir(packagesDir, { withFileTypes: true });
  const manifests = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const manifestPath = path.join(packagesDir, entry.name, "package.json");
    try {
      await fs.access(manifestPath);
      manifests.push(manifestPath);
    } catch {
      // Skip directories without package manifests.
    }
  }

  return manifests;
}

function rewriteWorkspaceRanges(manifest, versionMap) {
  const nextManifest = JSON.parse(JSON.stringify(manifest));
  const changes = [];

  for (const section of SECTIONS) {
    const deps = nextManifest[section];
    if (!deps || typeof deps !== "object") {
      continue;
    }

    for (const [name, range] of Object.entries(deps)) {
      if (typeof range !== "string" || !range.startsWith("workspace:")) {
        continue;
      }

      const mappedVersion = versionMap.get(name);
      if (!mappedVersion) {
        continue;
      }

      deps[name] = mappedVersion;
      changes.push(`${section}.${name}: ${range} -> ${mappedVersion}`);
    }
  }

  return { manifest: nextManifest, changes };
}

async function main() {
  const manifestPaths = await listPackageManifests();
  const manifests = await Promise.all(manifestPaths.map((manifestPath) => readJson(manifestPath)));

  const publishable = manifests.filter((manifest) => manifest.private !== true && typeof manifest.name === "string");
  const versionMap = new Map(publishable.map((manifest) => [manifest.name, manifest.version]));

  const results = [];

  for (let index = 0; index < manifests.length; index += 1) {
    const sourcePath = manifestPaths[index];
    const sourceManifest = manifests[index];
    const { manifest: rewritten, changes } = rewriteWorkspaceRanges(sourceManifest, versionMap);

    results.push({
      sourcePath,
      packageName: sourceManifest.name,
      rewritten,
      changes,
    });
  }

  if (dryRun) {
    for (const result of results) {
      if (result.changes.length === 0) {
        continue;
      }

      console.log(`\n${result.packageName}`);
      for (const change of result.changes) {
        console.log(`  - ${change}`);
      }
    }

    console.log("\nDry run complete. Source manifests were not modified.");
    return;
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  for (const result of results) {
    const packageDir = path.join(outputDir, result.packageName.replace("@", "").replace("/", "__"));
    await fs.mkdir(packageDir, { recursive: true });
    const targetPath = path.join(packageDir, "package.json");
    await fs.writeFile(targetPath, `${JSON.stringify(result.rewritten, null, 2)}\n`, "utf8");

    if (result.changes.length > 0) {
      console.log(`Rewrote ${result.packageName} -> ${targetPath}`);
      for (const change of result.changes) {
        console.log(`  - ${change}`);
      }
    }
  }

  console.log(`\nPrepared rewritten manifests in ${outputDir}`);
  console.log("Source manifests were not modified.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
