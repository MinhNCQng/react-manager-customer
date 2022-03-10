import { Form, Table, Row, Col, Button } from "antd";
import "./EditTable.css";
import useEditTable from "./useEditTable";
const EditTable = (props) => {
  const canAddNewRow = props.canAddNewRow;
  const { formProps, tableProps, onAddRecord, disabledOperation } =
    useEditTable(props);
  return (
    <Form component={false} {...formProps}>
      <Table pagination={{ pageSize: 10 }} {...tableProps} dataSource={props.dataSource}/>
      {canAddNewRow && (
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={onAddRecord}
              disabled={disabledOperation()}
            >
              Add a record
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default EditTable;
