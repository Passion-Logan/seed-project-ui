import { Button, Drawer } from 'antd';

const TreeMenuList = (props) => {
  const { onSubmit: xxxx, onClose: handleUpdateAuthModal, authModal, values } = props;

  const handleNext = async () => {};

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
    ></Drawer>
  );
};

export default TreeMenuList;
