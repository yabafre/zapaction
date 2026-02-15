export type QueryKey = readonly unknown[];

type QueryKeyBuilder = (...args: any[]) => QueryKey;
type QueryKeyFactoryMap = Record<string, QueryKeyBuilder>;
type FeatureKeyBuilder = (...args: any[]) => readonly unknown[];
type FeatureKeyFactoryMap = Record<string, FeatureKeyBuilder>;
type FeatureTagBuilder = (...args: any[]) => readonly unknown[];
type FeatureTagFactoryMap = Record<string, FeatureTagBuilder>;

function isSerializable(value: unknown): boolean {
  if (
    value === undefined ||
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return true;
  }

  if (typeof value === "function" || typeof value === "symbol" || typeof value === "bigint") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.every((item) => isSerializable(item));
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).every((item) => isSerializable(item));
  }

  return false;
}

function validateQueryKey(key: QueryKey, keyName: string): void {
  if (!Array.isArray(key)) {
    throw new Error(`Query key "${keyName}" must return an array.`);
  }

  if (!isSerializable(key)) {
    throw new Error(`Query key "${keyName}" must be JSON-serializable.`);
  }
}

function validateFeatureName(feature: string): string {
  const normalized = feature.trim();

  if (normalized.length === 0) {
    throw new Error("Feature name must be a non-empty string.");
  }

  return normalized;
}

function serializeTagSegment(segment: unknown): string {
  if (
    segment === null ||
    typeof segment === "string" ||
    typeof segment === "number" ||
    typeof segment === "boolean"
  ) {
    return String(segment);
  }

  return JSON.stringify(segment);
}

export function createQueryKeys<TFactory extends QueryKeyFactoryMap>(
  factory: TFactory,
): TFactory {
  const wrappedFactory = Object.fromEntries(
    Object.entries(factory).map(([name, builder]) => [
      name,
      (...args: unknown[]) => {
        const key = builder(...args);
        validateQueryKey(key, name);
        return key;
      },
    ]),
  );

  return wrappedFactory as TFactory;
}

export function createFeatureKeys<TFactory extends FeatureKeyFactoryMap>(
  feature: string,
  factory: TFactory,
): {
  [K in keyof TFactory]: (...args: Parameters<TFactory[K]>) => QueryKey;
} {
  const normalizedFeature = validateFeatureName(feature);

  const wrappedFactory = Object.fromEntries(
    Object.entries(factory).map(([name, builder]) => [
      name,
      (...args: unknown[]) => {
        const segment = builder(...args);
        if (!Array.isArray(segment)) {
          throw new Error(`Feature key "${normalizedFeature}.${name}" must return an array.`);
        }

        const key = [normalizedFeature, ...segment] as const;
        validateQueryKey(key, `${normalizedFeature}.${name}`);
        return key;
      },
    ]),
  );

  return wrappedFactory as unknown as {
    [K in keyof TFactory]: (...args: Parameters<TFactory[K]>) => QueryKey;
  };
}

export function createFeatureTags<TFactory extends FeatureTagFactoryMap>(
  feature: string,
  factory: TFactory,
): {
  all: () => string;
} & {
  [K in keyof TFactory]: (...args: Parameters<TFactory[K]>) => string;
} {
  const normalizedFeature = validateFeatureName(feature);

  const wrappedFactory = Object.fromEntries(
    Object.entries(factory).map(([name, builder]) => [
      name,
      (...args: unknown[]) => {
        const segment = builder(...args);
        if (!Array.isArray(segment)) {
          throw new Error(`Feature tag "${normalizedFeature}.${name}" must return an array.`);
        }

        if (!isSerializable(segment)) {
          throw new Error(`Feature tag "${normalizedFeature}.${name}" must be JSON-serializable.`);
        }

        if (segment.length === 0) {
          return normalizedFeature;
        }

        return `${normalizedFeature}:${segment.map((item) => serializeTagSegment(item)).join(":")}`;
      },
    ]),
  );

  return {
    all: () => normalizedFeature,
    ...(wrappedFactory as unknown as {
      [K in keyof TFactory]: (...args: Parameters<TFactory[K]>) => string;
    }),
  };
}
