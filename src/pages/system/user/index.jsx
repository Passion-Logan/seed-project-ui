import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import { Button, Divider, message, Input, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
import { queryUser, addUser, updateUser, removeUser, updatePassword } from './service';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import Modal from 'antd/lib/modal/Modal';

/**
 * 修改/添加用户
 * @param {用户实体} fields
 */
const handleUpdate = async (fields) => {
  let msg = '添加';
  let flag = true;
  if (fields.id != null) {
    msg = '修改';
    flag = false;
  }
  const hide = message.loading('正在' + msg);

  if (fields.roleIds.length != 0) {
    fields.roleIds = fields.roleIds.join(',');
  } else {
    fields.roleIds = null;
  }

  try {
    if (flag) {
      await addUser({ ...fields });
    } else {
      await updateUser({ ...fields });
    }
    hide();
    message.success(msg + '成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除用户
 * @param {*} selectedRowKeys
 */
const handleRemove = async (selectedRowKeys) => {
  const hide = message.loading('正在删除');
  if (!selectedRowKeys) return true;

  try {
    await removeUser({
      ids: selectedRowKeys,
    });
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改密码
 */
const updatePwd = async (fields) => {
  const hide = message.loading('正在修改');

  try {
    await updatePassword({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const formLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};

const User = () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updatePwdVisible, handleUpdatePwdVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [pwdValues, setPwdValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '账号',
      dataIndex: 'userName',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '账号为必填项',
        },
      ],
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '密码为必填项',
        },
      ],
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        1: {
          text: '男',
        },
        2: {
          text: '女',
        },
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      hideInForm: true,
      valueEnum: {
        false: {
          text: '禁用',
          status: 'Default',
        },
        true: {
          text: '开启',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdatePwdVisible(true);
              setPwdValues(record);
            }}
          >
            修改密码
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <ProTable
        headerTitle="查询表格"
        // 获取表格数据
        actionRef={actionRef}
        rowKey={(row) => row.id}
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
          <Button
            type="primary"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues({ id: null, sex: '1', enabled: 'true' });
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button
              key="remove"
              onClick={async () => {
                await handleRemove(selectedRowKeys.join(','));
                action.reload();
              }}
            >
              批量删除
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Modal
        title="修改密码"
        visible={updatePwdVisible}
        onOk={async () => {
          const formValues = await form.validateFields();
          updatePwd(formValues);
          handleUpdatePwdVisible(false);
        }}
        onCancel={() => {
          handleUpdatePwdVisible(false);
        }}
        okText="确认"
        cancelText="取消"
        destroyOnClose
      >
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            userName: pwdValues.userName,
            password: null,
          }}
        >
          <FormItem label="账号" name="userName">
            <Input disabled />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input placeholder="请输入新密码" />
          </FormItem>
        </Form>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default User;
