import { Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const ProductSelector = ({ onProductChange, defaultProductName, onChange }) => {

  const products = useSelector((storeData) => storeData.products);
  const onChangeDefault = (selectedIndex) => {
    onChange?.(products[selectedIndex])
    onProductChange && onProductChange(products[selectedIndex]);

  };
  return (
    <Select
      defaultValue={defaultProductName}
      showSearch
      style={{ width: "190px" }}
      placeholder="Search to select product"
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
        <Option key={index} >
          {product.name}
        </Option>
      ))}

    </Select>
  );
};

export default ProductSelector;
