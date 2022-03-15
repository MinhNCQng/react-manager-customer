import { Button } from "antd";
import { useEffect } from "react";

function MinhFormButton({ htmlType, submitText, updateCallBack }) {
  useEffect(() => {
    if (updateCallBack?.time <= 0) updateCallBack.updateCallback();
  }, [updateCallBack]);

  return (
    <Button htmlType={htmlType}>
      {updateCallBack?.time || submitText || "Order"}
    </Button>
  );
}

export default MinhFormButton;
