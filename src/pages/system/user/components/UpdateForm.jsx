import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Select, Input, Radio } from 'antd';
import { getAllRole, queryUserRole } from '../service';

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

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    id: props.values.id,
    userName: props.values.userName,
    nickName: props.values.nickName,
    sex: props.values.sex,
    email: props.values.email,
    roleIds: [],
    enabled: props.values.enabled.toString(),
  });

  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    afterClose,
    values,
  } = props;

  const [children, setChildren] = useState([]);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const handleChange = (value) => {
    console.log(value.join(','));
  };

  const renderContent = () => {
    return (
      <>
        <FormItem hidden name="id" label="主键">
          <Input placeholder="主键" />
        </FormItem>
        <FormItem
          name="userName"
          label="账号"
          rules={[
            {
              required: true,
              message: '请输入账号',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="nickName"
          label="昵称"
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        {formVals.id == null ? (
          <FormItem
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input placeholder="请输入新密码" />
          </FormItem>
        ) : null}
        <FormItem name="roleIds" label="角色">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择"
            onChange={handleChange}
          >
            {children}
          </Select>
        </FormItem>
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
        <FormItem name="email" label="邮箱">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="enabled" label="状态">
          <RadioGroup>
            <Radio value="true">开启</Radio>
            <Radio value="false">禁用</Radio>
          </RadioGroup>
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

  useEffect(() => {
    const getUserRole = async () => {
      const userRoleData = await queryUserRole(props.values.id);

      if (userRoleData.success) {
        form.setFieldsValue({ roleIds: userRoleData.data });
      }
    };

    const getChildren = async () => {
      const childrenData = await getAllRole();
      let result = [];

      if (childrenData.success) {
        childrenData.data.map((item) => {
          result.push(
            <Option key={item.id} value={item.id}>
              {item.roleName}
            </Option>,
          );
        });
      }
      setChildren(result);
    };

    getChildren();
    getUserRole();
  }, []);

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      footer={renderFooter()}
      afterClose={afterClose}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          userName: formVals.userName,
          nickName: formVals.nickName,
          sex: formVals.sex,
          email: formVals.email,
          enabled: formVals.enabled,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
