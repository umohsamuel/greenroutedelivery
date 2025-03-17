export const formatDate = (isoString: string): string => {
  return new Date(isoString).toISOString().split("T")[0];
};
