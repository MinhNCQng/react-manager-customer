import { Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const ProductSelector = ({ value, onChange }) => {

  const products = useSelector((storeData) => storeData.products);
  const onChangeDefault = (productId) => {
    onChange?.(productId)
  };
  return (
    <Select
      showSearch
      style={{ width: "190px" }}
      placeholder="Search to select product"
      value={value}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
      onChange={onChangeDefault}
    >
      {products.map((product, index) => (
        <Option key={index} value={product.productId} >
          {product.name}
        </Option>
      ))}

    </Select>
  );
};

export default ProductSelector;
