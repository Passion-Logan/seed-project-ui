import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, Button, Dropdown, Menu, Divider, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
import { queryUser, addUser, updateUser, removeUser } from './service';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { map } from 'lodash';

/**
 * 添加用户
 * @param {用户实体} fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试!');
    return false;
  }
};

/**
 * 修改用户
 * @param {用户实体} fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在修改');

  try {
    await updateUser({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error(error);
    return false;
  }
};

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

const User = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
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
        },
        true: {
          text: '开启',
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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button
              key="remove"
              onClick={async () => {
                // window.alert(selectedRowKeys.join(','));
                await handleRemove(selectedRowKeys.join(','));
                action.reload();
              }}
              selectedKeys={[]}
            >
              批量删除
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>

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
    </PageHeaderWrapper>
  );
};

export default User;
