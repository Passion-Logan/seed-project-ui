import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import { Button, Divider, message, Spin, Tag } from 'antd';
import styles from './index.less';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, queryRole, removeRole, updateRole, updateRolePermission } from './service';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import TreeMenuList from './components/MenuTreeList';

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

const handleUpdate = async (fields) => {
  const hide = message.loading('正在修改');

  try {
    await updateRole({ ...fields });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleRemove = async (selectedRowKeys) => {
  const hide = message.loading('正在删除');

  if (!selectedRowKeys) return true;

  try {
    await removeRole({
      ids: selectedRowKeys,
    });

    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleRolePermission = async (value) => {
  const hide = message.loading('正在修改权限');
  console.log(value);

  try {
    await updateRolePermission({ ...value });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const Role = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateAuthModal, handleUpdateAuthModal] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [roleMenuValues, setRoleMenuValues] = useState({});
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
      render: (text, row, _, action) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(row);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <TableDropdown
            key="actionGroup"
            onSelect={(key) => {
              if (key == 'authority') {
                handleUpdateAuthModal(true);
                setRoleMenuValues({ id: row.id });
              }
              if (key == 'delete') {
                handleRemove(row.id);
                action.current.reload();
              }
            }}
            menus={[
              { key: 'authority', name: '授权' },
              { key: 'delete', name: '删除' },
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
          selectedRows && selectedRows.length > 0 && (
            <Button
              key="remove"
              onClick={async () => {
                await handleRemove(selectedRowKeys.join(','));
                action.reload();
              }}
              selectedKeys={[]}
            >
              批量删除
            </Button>
          ),
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

      {roleMenuValues && Object.keys(roleMenuValues).length ? (
        <TreeMenuList
          onSubmit={async (value) => {
            const success = await handleRolePermission(value);

            if (success) {
              handleUpdateAuthModal(false);
              setRoleMenuValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onClose={() => {
            handleUpdateAuthModal(false);
            setTimeout(() => {
              setRoleMenuValues({});
            }, 300);
          }}
          authModal={updateAuthModal}
          values={roleMenuValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Role;
