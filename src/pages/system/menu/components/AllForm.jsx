import React, { useState } from 'react';
import { Form, Button, Select, Input, Radio, InputNumber, TreeSelect, Drawer } from 'antd';
import { getTreeList } from '../service';
import { SettingOutlined } from '@ant-design/icons';
import IconList from './IconList';

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
    pid: props.values.pid == 0 ? null : props.values.pid,
    sort: props.values.sort,
    isFrame: props.values.isFrame,
    visible: props.values.hideInMenu,
  });

  const [isMenuChildren, setIsMenuChildren] = useState(false);
  const [iconVisible, handleIconVisible] = useState(false);
  const [treeNode, setTreeNode] = useState(() => {
    getTreeList().then((data) => {
      if (data.success) {
        setTreeNode(genTreeNode(data.data.treeList));
      }
    });
  });
  const [form] = Form.useForm();
  const {
    onSubmit: handleAddOrUpdate,
    onClose: handleModalVisible,
    formModalVisible,
  } = props;

  const genTreeNode = (dataList) => {
    let data = [];

    if (dataList.length != null) {
      dataList.map((item) => {
        data.push({
          key: item.value,
          pId: item.pid,
          value: item.value,
          title: item.title,
          isLeaf: !(item.pid == '0'),
          children: item.children != null ? genTreeNode(item.children) : [],
        });
      });
    }

    return data;
  };

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleAddOrUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem hidden name="id" label="主键">
          <Input placeholder="主键" />
        </FormItem>
        <FormItem name="type" label="菜单类型">
          <RadioGroup>
            <Radio onClick={() => setIsMenuChildren(false)} value={1}>
              目录
            </Radio>
            <Radio onClick={() => setIsMenuChildren(true)} value={2}>
              子菜单
            </Radio>
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
        {isMenuChildren || formVals.type == 2 ? (
          <FormItem name="pid" label="上级菜单">
            <TreeSelect
              treeDataSimpleMode
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择父级菜单"
              treeData={treeNode}
            />
          </FormItem>
        ) : null}
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
          <Input
            placeholder="点击右侧按钮选择图标"
            addonAfter={
              <SettingOutlined
                onClick={() => {
                  handleIconVisible(true);
                }}
              />
            }
          />
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
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 10 }} onClick={() => handleModalVisible(false)}>
            取消
          </Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </div>
      </>
    );
  };

  return (
    <Drawer
      width={550}
      title="新增/编辑菜单"
      placement="right"
      closable={false}
      onClose={() => handleModalVisible()}
      visible={formModalVisible}
      footer={renderFooter()}
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
          pid: formVals.pid,
        }}
      >
        {renderContent()}
      </Form>
      <IconList
        cancle={() => {
          handleIconVisible(false);
        }}
        visible={iconVisible}
      />
    </Drawer>
  );
};

export default AllForm;
