type HasIsActive = {
  isActive: boolean;
};

export const sortByIsActive = <T extends HasIsActive>(array: T[]): T[] => {
  return array.length > 0
    ? array.sort((a, b) => Number(b.isActive) - Number(a.isActive))
    : [];
};
