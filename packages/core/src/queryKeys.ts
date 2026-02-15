export type QueryKey = readonly unknown[];

type QueryKeyBuilder = (...args: any[]) => QueryKey;

type QueryKeyFactoryMap = Record<string, QueryKeyBuilder>;

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
