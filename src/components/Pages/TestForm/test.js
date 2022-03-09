import ProCard from "@ant-design/pro-card";
import ProForm, {
  ProFormGroup,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";
import MinhForm from "./MinhForm";

function TestForm(props) {
  return (
    <MinhForm
      disabled
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
    
        <ProFormList
          name="users"
          label="Hello"
          initialValue={[
            {
              name: "1111",
            },
          ]}
          itemRender={({ listDom, action }, { record }) => {
            return (
              <ProCard
                bordered
                extra={action}
                title={record?.name}
                style={{
                  marginBottom: 8,
                }}
              >
                {listDom}
              </ProCard>
            );
          }}
        >
          <ProFormGroup>
            <ProFormText name="name" label="name" />
            <ProFormText name="nickName" label="nickname" />
          </ProFormGroup>
          <ProFormList
            name="labels"
            label="list2"
            initialValue={[
              {
                value: "333",
                label: "333",
              },
            ]}
            copyIconProps={{
              tooltipText: "copy ne",
            }}
            deleteIconProps={{
              tooltipText: "delete ne",
            }}
          >
            <ProFormGroup key="group">
              <ProFormText name="value" label="cuc cu" />
              <ProFormText name="label" label="hello" />
            </ProFormGroup>
          </ProFormList>
        </ProFormList>
     
    </MinhForm>
  );
}

export default TestForm;
