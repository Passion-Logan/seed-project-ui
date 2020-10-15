import { Button, Drawer, Tree } from 'antd';
import { useState } from 'react';
import { getTreeList, getRolePermission } from '../service';

const TreeMenuList = (props) => {
  const { onSubmit: handleRolePermission, onClose: handleUpdateAuthModal, authModal } = props;

  const [updateValue, setUpdateValue] = useState({});

  const [roleId, setRoleId] = useState(props.values.id);

  const [expandedKeys, setExpandedKeys] = useState([]);

  const [rolePermission, setRolePermission] = useState(() => {
    getRolePermission({ roleId: roleId }).then((data) => {
      if (data.success) {
        setRolePermission(data.data);
      }
    });
  });

  const [treeData, setTreeData] = useState(() => {
    getTreeList().then((data) => {
      if (data.success) {
        setTreeData(genTreeNode(data.data.treeList));
        let keys = [];
        data.data.treeList.map((item) => keys.push(item.key));
        setExpandedKeys(keys);
      }
    });
  });

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

  const handleNext = () => {
    handleRolePermission(updateValue);
  };

  const onSelect = (checkedKeys, info) => {
    console.log('onSelect ', updateValue);
  };

  const onCheck = (checkedKeys, info) => {
    setUpdateValue({ roleId: roleId, permissionIds: checkedKeys.checked.join(',') });
  };

  const renderFooter = () => {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 10 }} onClick={() => handleUpdateAuthModal()}>
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
      title="角色权限配置"
      placement="right"
      closable={false}
      onClose={() => handleUpdateAuthModal()}
      visible={authModal}
      footer={renderFooter()}
    >
      <Tree
        checkable
        checkStrictly
        defaultSelectedKeys={rolePermission}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    </Drawer>
  );
};

export default TreeMenuList;
