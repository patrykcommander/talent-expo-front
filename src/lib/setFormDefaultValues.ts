export default function setFormDefaultValues<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(setFormDefaultValues) as any;
  } else if (obj instanceof Date) {
    // if value is of type Date, do nothing
    return obj;
  } else if (obj && typeof obj === "object") {
    // map all object properties from null to an empty string, when the value is missing in the database=
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value === null ? "" : setFormDefaultValues(value),
      ])
    ) as T;
  }
  return obj;
}
