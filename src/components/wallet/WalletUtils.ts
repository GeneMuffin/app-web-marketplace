
export const shortenAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatPrice = (price: number): string => {
  return `${price} ETH`;
};
