import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useRef } from 'react';
import { Button, Divider, Spin, Tag } from 'antd';
import styles from './index.less';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { queryRole } from './service';

const Role = () => {
  const actionRef = useRef();

  const columns = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '角色编码为必填项',
        },
      ],
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      hideInSearch: true,
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '菜单路径为必填项',
        },
      ],
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '排序为必填项',
        },
      ],
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
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <ProTable
        actionRef={actionRef}
        rowKey={(row) => row.id}
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
          <Button>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && <Button>批量删除</Button>,
        ]}
        request={(params, sorter, filter) => queryRole({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      ></ProTable>
    </PageHeaderWrapper>
  );
};

export default Role;
