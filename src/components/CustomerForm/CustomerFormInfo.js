const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 11,
  },
};

const customerFormRules = {
  firstName: [{ required: true, message: "Please input your first name!" }],
  lastName: [{ required: true, message: "Please input your last name!" }],
  phoneNumber: [{ required: true, message: "Please input your phone number!" }],
};

export {formItemLayout,customerFormRules}
