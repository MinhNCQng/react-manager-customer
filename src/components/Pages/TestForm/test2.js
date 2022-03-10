import { Button } from "antd";
import { useEffect, useState } from "react";
import MinhForm from "./MinhForm";

function TestDisableWithProForm() {
  const [data, setData] = useState(0);
  useEffect(
    () =>
      setInterval(() => {
        setData((prev) => prev + 1);
      }, 2000),
    []
  );
  return <>{data}</>;
}

export default TestDisableWithProForm;
