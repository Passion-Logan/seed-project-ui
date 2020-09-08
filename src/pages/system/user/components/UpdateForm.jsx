import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { values, update } from 'lodash';
import Modal from 'antd/lib/modal/Modal';

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

const renderFooter = () => {
  return (
    <>
      <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
      <Button onClick={() => handleNext()}>完成</Button>
    </>
  );
};

return (
  <Modal
    width={640}
    bodyStyle={{
      padding: '32px 40px 48px',
    }}
    destroyOnClose
    title="修改用户"
    visible={updateModalVisible}
    footerr={renderFooter}
    onCancel={() => handleUpdateModalVisible()}
  >
    <Form
      {...formLayout}
      form={form}
      initialValues={{
        userName: formVals.userName,
        nickName: formVals.nickName,
        password: formVals.password,
        sex: formVals.sex,
        email: formVals.email,
        enabled: formVals.enabled,
      }}
    >
      {renderContent()}
    </Form>
  </Modal>
);

export default UpdateForm;
