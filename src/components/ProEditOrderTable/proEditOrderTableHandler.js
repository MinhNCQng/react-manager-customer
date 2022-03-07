const proEditOrderTableHandler = (products) => {
  const getProductById = (productId) =>
    products.find((product) => product.productId === productId);
  const getFinalPrice = ({
    orderUnitPrice = 0,
    orderQuantum = 0,
    orderDiscount = 0,
    accessory = [],
  }) => {
    const accessoryPrice = accessory.reduce(
      (total, accessory) => total + (accessory.orderFinalPrice || 0),
      0
    );
    const ordersToTalPriceWithoutDiscount =
      orderUnitPrice * orderQuantum + accessoryPrice;
    const discountReduce =
      (ordersToTalPriceWithoutDiscount * orderDiscount) / 100;
    const finalPrice = Math.max(
      ordersToTalPriceWithoutDiscount - discountReduce,
      0
    );
    return +finalPrice.toFixed(2);
  };
  return {
    getProductById,
    getFinalPrice,
  };
};
export default proEditOrderTableHandler;
