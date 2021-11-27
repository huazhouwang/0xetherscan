const LongExtMapping: Record<string, string> = {
  py: "python",
  sol: "solidity",
};

const getFileExt = (name: string): string => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex < 0) {
    return "";
  }

  const shortExt = lastDotIndex >= 0 ? name.slice(lastDotIndex + 1) : "";
  return LongExtMapping[shortExt] || shortExt;
};

export { getFileExt };
