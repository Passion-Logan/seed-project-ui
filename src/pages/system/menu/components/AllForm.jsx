import React, { useState } from 'react';
import { Form, Button, Modal, Select, Input, Radio, InputNumber } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const AllForm = (props) => {
  const [formVals, setFormVals] = useState({
    id: props.values.id,
    menu: props.values.menu,
    type: props.values.type,
    componentName: props.values.componentName,
    path: props.values.path,
    redirect: props.values.redirect,
    icon: props.values.icon,
    sort: props.values.sort,
    isFrame: props.values.isFrame,
    visible: props.values.hideInMenu,
  });

  const [form] = Form.useForm();
  const {
    onSubmit: handleAddOrUpdate,
    onCancel: handleModalVisible,
    formModalVisible,
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
        <FormItem hidden name="id" label="主键">
          <Input placeholder="主键" />
        </FormItem>
        <FormItem name="type" label="菜单类型">
          <RadioGroup>
            <Radio value={1}>目录</Radio>
            <Radio value={2}>子菜单</Radio>
            <Radio value={3} disabled>
              按钮
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          name="menu"
          label="显示名称"
          rules={[
            {
              required: true,
              message: '显示名称不能为空',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="componentName"
          label="菜单名称"
          rules={[
            {
              required: true,
              message: '请输入菜单名称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="path"
          label="菜单路径"
          rules={[
            {
              required: true,
              message: '请输入菜单路径',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="redirect" label="跳转地址">
          <Input placeholder="没有可不填" />
        </FormItem>
        <FormItem name="icon" label="菜单图标">
          <Input placeholder="点击右侧按钮选择图标" />
        </FormItem>
        <FormItem name="sort" label="排序">
          <InputNumber
            style={{
              width: '100%',
            }}
            min={1}
          />
        </FormItem>
        <FormItem name="isFrame" label="是否外链菜单">
          <RadioGroup>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="visible" label="是否可见菜单">
          <RadioGroup>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleModalVisible(false)}>取消</Button>
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
      title="新建/编辑菜单"
      visible={formModalVisible}
      footer={renderFooter()}
      onCancel={() => handleModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          menu: formVals.menu,
          type: formVals.type,
          componentName: formVals.componentName,
          path: formVals.path,
          redirect: formVals.redirect,
          icon: formVals.icon,
          sort: formVals.sort,
          isFrame: formVals.isFrame,
          visible: formVals.visible,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AllForm;
