import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import { Button, Col, Row } from "antd";

const getEditTableActions = ({
  isEditing,
  multiple,
  disabledOperation,
  onRemoveBtnClicked,
  onEditBtnClicked,
  onDoneBtnClicked,
  onCancelBtnClicked,
}) => {
  const removeOperation = (record) => (
    <Row justify="space-around">
      <Col span={23}>
        <Button
          block
          key="enableEditing"
          onClick={() => onRemoveBtnClicked(record.key)}
          danger
        >
          <DeleteOutlined />
          Remove
        </Button>
      </Col>
    </Row>
  );
  const editOperation = (record) => (
    <Row justify="space-around" style={{ minWidth: "220px" }}>
      <Col key={1} span={11}>
        <Button
          block
          key="enableEditing"
          onClick={() => onEditBtnClicked(record)}
          disabled={disabledOperation()}
        >
          <EditOutlined />
          Edit
        </Button>
      </Col>
      <Col key={2} span={11}>
        <Button
          block
          key="deleteRecord"
          onClick={() => onRemoveBtnClicked(record.key)}
          danger
          type="primary"
          disabled={disabledOperation()}
        >
          <DeleteOutlined />
          Remove
        </Button>
      </Col>
    </Row>
  );
  const editingOperation = (record) => (
    <Row justify="space-around">
      <Col span={11}>
        <Button
          block
          type="primary"
          onClick={() => onDoneBtnClicked(record)}
          key="editDone"
        >
          <CheckOutlined />
          Done!
        </Button>
      </Col>
      <Col span={11}>
        <Button
          block
          onClick={() => onCancelBtnClicked(record)}
          key="cancelEdit"
        >
          <CloseOutlined />
          Cancel
        </Button>
      </Col>
    </Row>
  );
  const operator = {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    width: 220,
    render: (_, record) => {
      if (!multiple) {
        if (isEditing(record)) return editingOperation(record);
        return editOperation(record);
      } else {
        return removeOperation(record);
      }
    },
  };
  return {operator};
};

export default getEditTableActions;
