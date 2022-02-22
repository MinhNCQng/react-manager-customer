import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
const editingActions = ({ onDoneButtonClicked, onCancelButtonClicked }) => [
  <Row justify="space-around">
    <Col span={11}>
      <Button onClick={onDoneButtonClicked} block type="primary" key="editDone">
        <CheckOutlined />
        Done!
      </Button>
    </Col>
    <Col span={11}>
      <Button onClick={onCancelButtonClicked} block key="cancelEdit">
        <CloseOutlined />
        Cancel
      </Button>
    </Col>
  </Row>,
];

const addingNewAction = ({ onSubmitButtonClicked, onResetButtonClicked }) => [
  <Row justify="space-around">
    <Col span={11}>
      <Button onClick={onSubmitButtonClicked} block type="primary" key="editDone">
        <CheckOutlined />
        Add
      </Button>
    </Col>
    <Col span={11}>
      <Button onClick={onResetButtonClicked} block key="cancelEdit">
        <EditOutlined />
        Reset
      </Button>
    </Col>
  </Row>,
];

const editedActions = ({ onEditButtonCLicked }) => [
  <Row justify="space-around">
    <Col span={23}>
      <Button block onClick={onEditButtonCLicked} key="enableEditing">
        <EditOutlined />
        Edit
      </Button>
    </Col>
  </Row>,
];

const editAndRemoveActions = ({onEditButtonCLicked, onRemoveButtonCLicked}) => [
  <Row justify="space-around" style={{minWidth:"220px"}}>
    <Col key={1} span={11}>
      <Button block onClick={onEditButtonCLicked} key="enableEditing">
        <EditOutlined />
        Edit
      </Button>
    </Col>
    <Col key={2} span={11}>
      <Button block onClick={onRemoveButtonCLicked} key="deleteRecord" danger type="primary">
        <DeleteOutlined />
        Remove
      </Button>
    </Col>
  </Row>]
;



export { editingActions, editedActions, addingNewAction, editAndRemoveActions };
