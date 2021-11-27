const getFileExt = (name: string): string => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex < 0) {
    return "";
  }

  return lastDotIndex >= 0 ? name.slice(lastDotIndex + 1) : "";
};

export { getFileExt };
