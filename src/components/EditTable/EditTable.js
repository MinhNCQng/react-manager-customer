import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import { Form, Table, Row, Col, Button, Input } from "antd";
import { useState, useEffect, useImperativeHandle, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import "./EditTable.css";

const EditTable = ({
  editTable,
  multiple,
  columns,
  dataSource,
  onDataChange,
  footer,
  onRow,
  canAddNewRow = true,
  onDeleteRow,
  onUpdateRow,
}) => {
  const [initialFormValues, setInitialFormValues] = useState(() =>
    getFormData(dataSource)
  );

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isNewRecord, setIsNewRecord] = useState(false);
  const isEditing = (record) => record.key === editingKey;
  const cancelEdit = () => setEditingKey("");
  useImperativeHandle((editTable && editTable.dataRef), () => ({
    getTableValues() {
      if (multiple) return getTableData(form.getFieldsValue());
      if (isNewRecord) return getTableEditingData();
      return tableData;
    },
    getValidateValues() {
      return form.validateFields();
    },
    setTableValues(tableData) {
      setInitialFormValues(getFormData(tableData));
    },
  }));
  const getTableEditingData = () => {
    const formValues = filterFormValuesWithKey(initialFormValues, editingKey);
    return getTableData(formValues);
  };
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        editing: multiple ? true : isEditing(record),
        EditRender: col.EditRender,
        rules: col.rules,
        disabled: col.disabled,
        extraPropsEditComponent: col.extraPropsEditComponent,
        initialValue: col.initialValue,
        onValueChange: col.onValueChange,
      }),
    };
  });
  const onEditBtnClicked = (record) => {
    setEditingKey(record.key);
  };

  const onDoneBtnClicked = (record) => {
    form
      .validateFields()
      .then(() => {
        setInitialFormValues(form.getFieldsValue());
        setIsNewRecord(false);
        onUpdateRow?.(record.key)
        cancelEdit();
      })
      .catch((error) => console.log(error));
  };
  const onCancelBtnClicked = (record) => {
    if (isNewRecord) {
      onRemoveBtnClicked(editingKey);
      setIsNewRecord(false);
    }
    cancelEdit();
  };
  const onRemoveBtnClicked = (recordKey) => {
    const newFormValues = filterFormValuesWithKey(initialFormValues, recordKey);
    setInitialFormValues(newFormValues);
    onDeleteRow?.(recordKey)
  };
  const onValuesChange = (formData) => {
    onDataChange?.(getTableData(form.getFieldsValue()));
    onUpdateRow?.(Object.keys(formData)[0])
  };
  const onAddRecord = () => {
    const newFormValues = { ...initialFormValues };
    const newRecordKey = uuidv4();
    newFormValues[newRecordKey] = {};
    setInitialFormValues(newFormValues);
    if (!multiple) setEditingKey(newRecordKey);
    setIsNewRecord(true);
  };
  const disabledOperation = () => editingKey !== "";
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
  mergedColumns.push(operator);
  const EditableCell = ({
    rules,
    record,
    EditRender,
    dataIndex,
    editing,
    disabled,
    extraPropsEditComponent,
    initialValue,
    onValueChange,
    children,
    ...restProps
  }) => {
    if (!record) return <td>{children}</td>;
    const EditComponent = EditRender ? (
      <EditRender disabled={disabled} {...extraPropsEditComponent} />
     
    ) : (
      <Input {...extraPropsEditComponent} disabled={disabled} />
    )
    return (
      <td {...restProps} style={{ verticalAlign: "top" }}>
        <Form.Item
          name={[record.key, dataIndex]}
          style={{ margin: 0 }}
          rules={rules}
          initialValue={record[dataIndex] ? undefined : initialValue}
          getValueFromEvent={(data) => {
            onValueChange?.(data, form, {
              key: record.key,
              dataIndex: dataIndex,
            });
            if (data.target) return data.target.value;
            return data;
          }}
        >
          {editing ? (
            EditComponent
          ) : (
            <span>{children}</span>
          )}
        </Form.Item>
      </td>
    );
  };
  const tableData = useMemo(
    () => getTableData(initialFormValues),
    [initialFormValues]
  );
  useEffect(() => {
    setEditingKey("");
    setIsNewRecord(false);
  }, [multiple]);
  useEffect(() => {
    onDataChange?.(tableData);
  }, [tableData]);
  console.log(123)
  return (
    <Form
      form={form}
      component={false}
      onValuesChange={multiple && onValuesChange}
      initialValues={initialFormValues}
    >
      <Table
        columns={mergedColumns}
        dataSource={tableData}
        components={tableData.length && { body: { cell: EditableCell } }}
        footer={footer}
        onRow={onRow}
      />
      {canAddNewRow && (
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={onAddRecord}
              disabled={!multiple && disabledOperation()}
            >
              Add a record
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

const getFormData = (dataSource) => {
  const formData = {};
  if (!dataSource) return formData;
  for (const data of dataSource) {
    formData[data.key] = data;
  }
  return formData;
};

const getTableData = (formData) => {
  const tableData = [];
  if (!formData) return tableData;
  for (const [key, value] of Object.entries(formData)) {
    const newData = { key: key, ...value };
    tableData.push(newData);
  }
  return tableData;
};

function filterFormValuesWithKey(initialFormValues, recordKey) {
  const newFormValues = {};
  for (const [key, value] of Object.entries(initialFormValues)) {
    if (key.toString() !== recordKey.toString()) newFormValues[key] = value;
  }
  return newFormValues;
}

export default EditTable;
