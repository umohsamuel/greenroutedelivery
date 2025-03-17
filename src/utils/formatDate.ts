export const formatDate = (isoString: string): string => {
  return new Date(isoString).toISOString().split("T")[0];
};

export const formatTime = (isoString: string): string => {
  return new Date(isoString).toISOString().split("T")[1].split(".")[0];
};
