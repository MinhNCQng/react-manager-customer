const proEditOrderTableHandler = ({
  products,
  form,
  editableKeys,
  setEditableRowKeys,
  dataSource,
  setDataSource,
}) => {
  const isEditing = (recordKey) => editableKeys.includes(recordKey);
  const setFinalPrice = (rowId, finalPrice) => {
    setDataSource((prev) => {
      const newData = [...prev];
      const rowData = newData.find((record) => record.id === rowId);
      rowData.orderFinalPrice = finalPrice;
      return newData;
    });
  };
  const getProductById = (productId) =>
    products.find((product) => product.productId === productId);
  const updateRowData = (rowKey, updateData) => {
    form.setFieldsValue({
      [rowKey]: updateData,
    });
  };
  const getFinalPrice = ({
    orderUnitPrice = 0,
    orderQuantum = 0,
    orderDiscount = 0,
  }) => {
    const ordersToTalPriceWithoutDiscount = orderUnitPrice * orderQuantum;
    const discountReduce =
      (ordersToTalPriceWithoutDiscount * orderDiscount) / 100;
    const finalPrice = Math.max(
      ordersToTalPriceWithoutDiscount - discountReduce,
      0
    );
    return +finalPrice.toFixed(2);
  };
  const updateFinalPrice = (rowId) => {
    const newFinalPrice = getFinalPrice(
      form.getFieldsValue([rowId])[rowId] || {}
    );
    setFinalPrice(rowId, newFinalPrice);
  };
  const updateFormItem = () => {
    setDataSource((prev) => {
      prev.forEach((row) => {
        setTimeout(
          () =>
            form.setFieldsValue({ [row.id]: { finalPrice: row.finalPrice } }),
          0
        );
      });
      return prev;
    });
  };
  const shouldUpdateFinalPrice = (rowId, record) => {
    const oldFinalPrice = dataSource.find((row) => row.id === rowId).finalPrice;
    const isEditedFinalPrice = oldFinalPrice !== record.finalPrice;
    return isEditedFinalPrice;
  };
  const updateFormDataDependence = (rowKey) => {
    const updateData = form.getFieldValue([rowKey]);
    setDataSource((prev) => {
      const newData = [...prev];
      const rowUpdateDataIndex = newData.findIndex((row) => row.id === rowKey);
      const rowUpdateData = newData[rowUpdateDataIndex];
      newData.splice(rowUpdateDataIndex, 1, {
        ...rowUpdateData,
        ...updateData,
      });

      return newData;
    });
  };
  return {
    isEditing,
    setFinalPrice,
    getProductById,
    updateRowData,
    getFinalPrice,
    updateFinalPrice,
    updateFormItem,
    shouldUpdateFinalPrice,
    updateFormDataDependence,
  }
};
export default proEditOrderTableHandler;
