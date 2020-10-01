import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Divider, Form, Space, Spin, Tag } from 'antd';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getMenuList } from './service';
import AllForm from './components/AllForm';

const handleAdd = async (fields) => {};

const handleUpdate = async (fields) => {};

const Menu = () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const actionRef = useRef();

  const [modalVisible, handleModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const columns = [
    {
      title: '显示名称',
      dataIndex: 'menu',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '账号为必填项',
        },
      ],
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      filters: false,
      hideInSearch: true,
      valueEnum: {
        1: <Tag color="blue">目录</Tag>,
        2: <Tag color="green">菜单</Tag>,
      },
    },
    {
      title: 'icon',
      hideInSearch: true,
      dataIndex: 'icon',
    },
    {
      title: '菜单名称',
      hideInSearch: true,
      dataIndex: 'componentName',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '密码为必填项',
        },
      ],
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '是否可见菜单',
      dataIndex: 'hideInMenu',
      hideInSearch: true,
      valueEnum: {
        false: {
          status: 'Default',
          text: '否',
        },
        true: {
          status: 'Success',
          text: '是',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
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
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <ProTable
        search={false}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
          <Button type="primary">
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button key="removes" selectedKeys={[]}>
              批量删除
            </Button>
          ),
        ]}
        request={() => getMenuList()}
        columns={columns}
        rowSelection={{}}
      />

      <AllForm
        onSublit={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);
            setStepFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onUpdate={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleModalVisible(false);
            setStepFormValues({});

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        formModalVisible={modalVisible}
        values={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default Menu;
