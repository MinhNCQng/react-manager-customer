import { useEffect } from "react";
import EditTable from "../EditTable/EditTable";
import orderCartButton from "./OrderCartButton";
import OrderCartHandle from "./OrderCartHandle";
import useOrderCartState from "./useOrderCartState";

const OrderCart = ({
  customerProfile,
  orderInfo,
  mode = "newOrder",
  initalCartProducts,
}) => {
  const orderCartState = useOrderCartState(initalCartProducts);
  const { form, cartProduct, totalPrice, orderCartTableColumns } = orderCartState;
  const { onCartUpdate, onCartOrder, onDataChange } =
    OrderCartHandle({ ...orderCartState, orderInfo, customerProfile });
  const { footer, updateOrderButton, newOrderButton } = orderCartButton({
    orderInfo,
    onCartUpdate,
    totalPrice,
    onCartOrder,
  });
  useEffect(() => onDataChange(initalCartProducts), []);
  if (!customerProfile) return <p>Please select a customer profile </p>;
  return (
    <>
      <EditTable
        columns={orderCartTableColumns}
        dataSource={cartProduct}
        multiple
        form={form}
        onDataChange={onDataChange}
        canAddNewRow={true}
        footer={() => footer}
      />
      {mode !== "newOrder" ? updateOrderButton() : newOrderButton()}
    </>
  );
};

export default OrderCart;
