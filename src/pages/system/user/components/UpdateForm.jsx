import React, { useState } from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    userName: props.values.userName,
    nickName: props.values.nickName,
    password: props.values.password,
    sex: props.values.sex,
    email: props.values.email,
    enabled: props.values.enabled,
  });

  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };
};

const renderContent = () => {
  return (
    <>
      <FormItem
        name="userName"
        label="账号"
        rules={[
          {
            required: true,
            message: '请输入账号',
          },
        ]}
      ></FormItem>
      <FormItem
        name="nickName"
        label="昵称"
        rules={[
          {
            required: true,
            message: '请输入昵称',
          },
        ]}
      ></FormItem>
      <FormItem
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      ></FormItem>
      <FormItem name="sex" label="性别">
        <Select
          style={{
            width: '100%',
          }}
        >
          <Option value="1">男</Option>
          <Option value="2">女</Option>
        </Select>
      </FormItem>
      <FormItem
        name="email"
        label="邮箱"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
      ></FormItem>
      <FormItem name="enabled" label="状态">
        <Select
          style={{
            width: '100%',
          }}
        >
          <Option value="true">正常</Option>
          <Option value="false">禁用</Option>
        </Select>
      </FormItem>
    </>
  );
};

export default UpdateForm;
