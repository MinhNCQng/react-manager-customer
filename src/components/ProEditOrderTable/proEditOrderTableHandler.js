const proEditOrderTableHandler = ({
  products,
  form,
  editableKeys,

  dataSource,
  onDataChange,
}) => {
  const isEditing = (recordKey) => editableKeys.includes(recordKey);
  const setFinalPrice = (rowId, finalPrice, newData) => {
    const rowData = newData.find((record) => record.id === rowId);
    rowData.orderFinalPrice = finalPrice;
  };
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
  const updateFinalPrice = (rowId, newData) => {
    const newFinalPrice = getFinalPrice(
      form.getFieldsValue([rowId])[rowId] || {}
    );
    setFinalPrice(rowId, newFinalPrice, newData);
  };

  const shouldUpdateFinalPrice = (rowId, record) => {
    const oldFinalPrice = dataSource.find(
      (row) => row.id === rowId
    ).orderFinalPrice;
    const isEditedFinalPrice = oldFinalPrice !== record.orderFinalPrice;
    return isEditedFinalPrice;
  };
  const updateFormDataDependence = (rowKey, newData) => {
    const updateData = form.getFieldValue([rowKey]);
    const rowUpdateDataIndex = newData.findIndex((row) => row.id === rowKey);
    const rowUpdateData = newData[rowUpdateDataIndex];
    newData.splice(rowUpdateDataIndex, 1, {
      ...rowUpdateData,
      ...updateData,
    });
  };
  return {
    isEditing,
    setFinalPrice,
    getProductById,
    getFinalPrice,
    updateFinalPrice,
    shouldUpdateFinalPrice,
    updateFormDataDependence,
  };
};
export default proEditOrderTableHandler;
