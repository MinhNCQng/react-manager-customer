import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import { Form, Table, Row, Col, Button, Input } from "antd";
import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { v4 as uuidv4  } from "uuid";
import "./EditTable.css";

const EditTable = ({editTable, multiple, columns, dataSource, onDataChange, footer}) => {
  const setState = useState(false)[1];
  const tableDataRef= useRef(dataSource || []);
  const setTableData = (tableData) => {
    tableDataRef.current = [...tableData];
    onDataChange?.(tableDataRef.current);
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEdititing = (record) => record.key === editingKey;
  const disabledOperation = () => editingKey !== ""
  const cancelEdit = ()=> setEditingKey("")
  useImperativeHandle(editTable.dataRef, () => ({
    getTableData() {
      return tableDataRef.current;
    },
    getValidate(){
      return form.validateFields()
    },
    setTableValues(tableValues){
      tableDataRef.current = tableValues;
      updateNewFormData();

    }
  }));

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        editing: multiple ? true: isEdititing(record),
        EditRender:col.EditRender,
        rules: col.rules,
        disabled: col.disabled,
        extraPropsEditComponent:col.extraPropsEditComponent
      }),
    };
  });
  const onEditBtnClicked = (record) => {
    setEditingKey(record.key)
  }
  const rerenderTable = () =>{
    setState(prev=>!prev)
  }
  const onDoneBtnClicked = (record) => {
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue();
        saveData(formData);
        cancelEdit();
      })
      .catch((error) => console.log(error));
  };
  const onCancelBtnClicked = (record) => {
    cancelEdit()
  }
  const onRemoveBtnClicked = (record) => {
    deleteRecord(record)
    rerenderTable()
  }
  const onValuesChange = (formData) => {
    saveData(formData);
  }
  const onAddRecord = () =>{
    const newDataKey = uuidv4()
    const newTableData = [...tableDataRef.current]
    newTableData.push({key:newDataKey})
    setTableData(newTableData)
    setEditingKey(newDataKey)
  }
  const updateNewFormData = ()=>{
    const formData = getDataForm(tableDataRef.current)
    form.setFieldsValue(formData)
    rerenderTable()
  }
  const removeOperation = (record) =>  (
    <Row justify="space-around">
      <Col span={23}>
        <Button block key="enableEditing" onClick={()=>onRemoveBtnClicked(record)} danger>
          <DeleteOutlined />
          Remove
        </Button>
      </Col>
    </Row>
  );
  const editOperation = (record) => (
    <Row justify="space-around" style={{ minWidth: "220px" }}>
      <Col key={1} span={11}>
        <Button block key="enableEditing" onClick={()=>onEditBtnClicked(record)} disabled={disabledOperation()}>
          <EditOutlined />
          Edit
        </Button>
      </Col>
      <Col key={2} span={11}>
        <Button block key="deleteRecord" onClick={()=>onRemoveBtnClicked(record)} danger type="primary" disabled={disabledOperation()}>
          <DeleteOutlined />
          Remove
        </Button>
      </Col>
    </Row>
  );
  const editingOperation = (record) =>  (
    <Row justify="space-around">
      <Col span={11}>
        <Button block type="primary" onClick={()=>onDoneBtnClicked(record)} key="editDone" >
          <CheckOutlined />
          Done!
        </Button>
      </Col>
      <Col span={11}>
        <Button block onClick={()=>onCancelBtnClicked(record)} key="cancelEdit">
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
        if (isEdititing(record)) return editingOperation(record);
        return editOperation(record);
      } else {
        return removeOperation(record);
      }
    },
  };
  mergedColumns.push(operator);
  const EditableCell = ({
    rules,
    record,
    EditRender,
    dataIndex,
    editing,
    disabled,
    extraPropsEditComponent,
    children,
    ...restProps
  }) => {
    const changeSameRowData = (rowData) => {
      const newRowData = { [record.key]: { ...rowData } };
      saveData(newRowData);
    };
    return (
      <td {...restProps} style={{ verticalAlign: "top" }}>
        {editing ? (
          <Form.Item
            name={[record.key, dataIndex]}
            style={{ margin: 0 }}
            rules={rules}
          >
            {EditRender ? (
              <EditRender
                changeSameRowData={changeSameRowData}
                disabled={disabled}
                {...extraPropsEditComponent}
              />
            ) : (
              <Input {...extraPropsEditComponent} disabled={disabled} />
            )}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  useEffect(()=>{
    updateNewFormData()
  },[])
  const deleteRecord = (record) => {
    const deleteRecordKey = record.key;
    const newTableData = [...tableDataRef.current]
    const dataDeleteIndex = newTableData.findIndex(data => data.key === deleteRecordKey);
    newTableData.splice(dataDeleteIndex,1)
    setTableData(newTableData)
  }
  const saveData = (formData) =>{
      const dataChangeKeys = Object.keys(formData);
      const newTableData = [...tableDataRef.current];
      for (const dataKey of dataChangeKeys){
          const dataChangeIndex = newTableData.findIndex(data => data.key.toString() === dataKey);
          const dataChange = newTableData[dataChangeIndex]
          newTableData[dataChangeIndex] = {...dataChange,...formData[dataKey]}
          setTableData(newTableData)
      }
      updateNewFormData()

  }
  return (
    <Form form={form}  component={false} onValuesChange = {multiple && onValuesChange} >
      <Table
        columns={mergedColumns}
        dataSource={tableDataRef.current}
        components={{ body: { cell: EditableCell } }}
        footer={footer}
      />
      <Row>
        <Col>
        <Button type="primary" onClick={onAddRecord} disabled={!multiple && disabledOperation()} >Add a record</Button>
        </Col>
      </Row>
    </Form>
  );
};

const getDataForm = (dataSource) => {
    const dataForm = {}
    if (!dataSource) return dataForm;
    for (const data of dataSource){
        dataForm[data.key] = data
    }
    return dataForm
}

export default EditTable;
