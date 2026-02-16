import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import type { MDXComponents } from "nextra/mdx-components";
import { Callout } from "nextra/components";

import { ApiSignature } from "./components/api-signature";
import { CopyButton } from "./components/copy-button";
import { FeatureCard, FeatureGrid } from "./components/feature-card";
import { LiveHelloCard } from "./components/live-hello-card";
import { LiveTestResults } from "./components/live-test-results";
import { PipelineDiagram } from "./components/pipeline-diagram";

export function useMDXComponents(components: MDXComponents) {
  return getThemeComponents({
    ...components,
    Callout,
    PipelineDiagram,
    FeatureCard,
    FeatureGrid,
    ApiSignature,
    CopyButton,
    LiveHelloCard,
    LiveTestResults,
  });
}
