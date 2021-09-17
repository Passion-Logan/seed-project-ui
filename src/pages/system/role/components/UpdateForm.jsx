import React, { useState } from 'react';
import { Form, Button, Modal, Input } from 'antd';

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
    id: props.values.id,
    roleCode: props.values.roleCode,
    roleName: props.values.roleName,
    remark: props.values.remark,
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

  const renderContent = () => {
    return (
      <>
        <FormItem
          hidden
          name="id"
          label="主键"
          rules={[
            {
              required: true,
              message: '主键不能为空',
            },
          ]}
        >
          <Input placeholder="主键" />
        </FormItem>
        <FormItem
          name="roleName"
          label="角色名称"
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="roleCode"
          label="角色编码"
          rules={[
            {
              required: true,
              message: '请输入角色编码',
            },
          ]}
        >
          <Input disabled placeholder="请输入" />
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
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
      title="修改角色"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          roleName: formVals.roleName,
          roleCode: formVals.roleCode,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
