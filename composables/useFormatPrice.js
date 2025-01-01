export const useFormatPrice = () => {
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return {
    formatPrice,
  };
};
