import ProForm, { ProFormText } from "@ant-design/pro-form";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

const inputNode = [Input, Button, Input.Password, Checkbox, ProFormText];

function getDisabledNode(inputNode, disabled) {
  const disabledNode = React.cloneElement(inputNode, {
    disabled,
  });
  return disabledNode;
}
function recursiveDisableFormItemNode(childrens, disabled) {
  if (!childrens) return;
  let newChildren = childrens;
  if (!Array.isArray(childrens)) {
    newChildren = [childrens];
  }
  const newDisabledChildren = newChildren.map((childNode, index) => {
    if (typeof childNode === "string") return childNode;
    // if (inputNode.includes(childNode.type))
    childNode = getDisabledNode(childNode, disabled);
    childNode = React.cloneElement(
      childNode,
      {
        key: index,
      },
      recursiveDisableFormItemNode(childNode.props.children, disabled)
    );
    return childNode;
  });
  if (newDisabledChildren.length === 1) return newDisabledChildren.at(0);
  return newDisabledChildren;
}
function MinhForm(props) {
  const children = props.children;
  const disabled = props.disabled;
  const disabledChildren = recursiveDisableFormItemNode(children, disabled);

  return <ProForm {...props} >{disabledChildren}</ProForm>;
}

export default MinhForm;
