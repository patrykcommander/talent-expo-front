export default function replaceNullWithUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(replaceNullWithUndefined) as any;
  } else if (obj instanceof Date) {
    return obj;
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value === null ? undefined : replaceNullWithUndefined(value),
      ])
    ) as T;
  }
  return obj;
}
