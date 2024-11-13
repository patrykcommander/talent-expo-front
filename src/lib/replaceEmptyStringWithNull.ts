export default function replaceEmptyStringWithNull<
  T extends Record<string, any>
>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceEmptyStringWithNull(item)) as unknown as T;
  } else if (
    obj !== null &&
    typeof obj === "object" &&
    !(obj instanceof Date)
  ) {
    const newObj: Record<string, any> = { ...obj };
    Object.keys(newObj).forEach((key) => {
      if (newObj[key] === "") {
        newObj[key] = null;
      } else {
        newObj[key] = replaceEmptyStringWithNull(newObj[key]);
      }
    });
    return newObj as T;
  }
  return obj;
}
