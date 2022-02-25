import { Form, Input } from "antd";

const EditableCell = ({
  record,
  InputType,
  dataIndex,
  editing,
  disabled,
  editComponentProps,
  labelItemProps,
  onValueChange,
  form,
  inputRender,
  children,
  ...restProps
}) => {
  if (!record) return <td>{children}</td>;
  const InputNode = InputType ? InputType : Input
  const EditComponent = inputRender ? (
    inputRender()
  ) : <InputNode disabled={disabled} {...editComponentProps} />
 
  return (
    <td {...restProps} style={{ verticalAlign: "top" }}>
      <Form.Item
        name={[record.key, dataIndex]}
        style={{ margin: 0 }}
        {...labelItemProps}
      >
        {editing ? EditComponent : <span>{children}</span>}
      </Form.Item>
    </td>
  );
};

export default EditableCell;
