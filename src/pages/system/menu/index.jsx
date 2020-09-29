import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Divider, Form, Spin } from 'antd';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getMenuList } from './service';

const Menu = () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const actionRef = useRef();
  const columns = [
    {
      title: '菜单名称',
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
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '目录',
        },
        2: {
          text: '菜单',
        },
      },
    },
    {
      title: 'icon',
      hideInSearch: true,
      dataIndex: 'icon',
    },
    {
      title: '路由名称',
      hideInSearch: true,
      dataIndex: 'componentName',
    },
    {
      title: '路径',
      dataIndex: 'component',
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
          text: '否',
        },
        true: {
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
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <ProTable
        headerTitle="菜单表格"
        actionRef={actionRef}
        rowKey={(row) => row.id}
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
          <Button type="primary" >
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button key="removes"
            selectedKeys={[]}
            >
              批量删除
            </Button>
          )
        ]}
        request={() => getMenuList()}
        columns={columns}
        rowSelection={{}}
      >

      </ProTable>
    </PageHeaderWrapper>
  );
};

export default Menu;
