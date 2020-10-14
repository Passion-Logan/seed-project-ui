import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import { Button, Divider, message, Spin, Tag } from 'antd';
import styles from './index.less';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, queryRole } from './service';
import CreateForm from './components/CreateForm';

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRole({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const Role = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
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
      rules: [
        {
          required: true,
          message: '角色名称为必填项',
        },
      ],
    },
    {
      title: '备注',
      hideInSearch: true,
      dataIndex: 'remark',
      valueType: 'textarea',
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
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <TableDropdown
            key="actionGroup"
            onSelect={(key) => message.info(key)}
            menus={[
              {key: 'authority', name: '授权'},
              {key: 'delete', name: '删除'},
            ]}
           />
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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && <Button>批量删除</Button>,
        ]}
        request={(params, sorter, filter) => queryRole({ ...params, sorter, filter })}
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
    </PageHeaderWrapper>
  );
};

export default Role;
