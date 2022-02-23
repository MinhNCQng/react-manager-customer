import { Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const ProductSelector = ({ onProductChange, defaultProductName, value, onChange, changeSameRowData }) => {

  const products = useSelector((storeData) => storeData.products);
  const onChangeDefault = (selectedIndex) => {
    const selectedProduct = products[selectedIndex]
    onChange?.(selectedProduct.name)
    changeSameRowData?.({
      orderUnitPrice:selectedProduct.price,
      orderProductId:selectedProduct.productId,
    })
  };
  return (
    <Select
      defaultValue={ value || defaultProductName}
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
