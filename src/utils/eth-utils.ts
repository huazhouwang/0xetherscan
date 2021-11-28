const VALID_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

const isValidAddress = (address: string): boolean => {
  return VALID_ADDRESS_PATTERN.test(address);
};

export { isValidAddress };
