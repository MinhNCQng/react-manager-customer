import { Button } from "antd";

const getOrderCartTableColumns = ({onRemoveCartProduct})=>[
  {
    title: "Order product",
    dataIndex: "orderProductName",
    key: "orderProductName",
  },
  {
    title: "Unit price",
    dataIndex: "orderUnitPrice",
    key: "orderUnitPrice",
    disabled:true,
  },
  {
    title: "Quantum",
    dataIndex: "orderQuantum",
    key: "orderQuantum",
  },
  {
    title:"Operation",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) =>{
      return <Button type="primary" danger onClick={()=>onRemoveCartProduct(record)}>Remove</Button>
    }
  }
];

export { getOrderCartTableColumns };
