import { Button, Menu, Modal } from 'antd';

const MenuItem = Menu.Item;

const IconList = (props) => {
  const { cancle: handleIconVisible, visible: IconVisible } = props;

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleIconVisible(false)}>取消</Button>
        {/* <Button type="primary" onClick={() => handleNext()}> */}
        <Button type="primary">完成</Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      width={800}
      visible={IconVisible}
      // onOk={this.handleOk}
      onCancel={() => handleIconVisible(false)}
      footer={renderFooter()}
    >
      <Menu mode="horizontal">
        <MenuItem key="type1">方向性图标</MenuItem>
        <MenuItem key="type2">提示建议性图标</MenuItem>
        <MenuItem key="type3">编辑类图标</MenuItem>
        <MenuItem key="type4">数据类图标</MenuItem>
        <MenuItem key="type5">品牌和标识</MenuItem>
        <MenuItem key="type6">网站通用图标</MenuItem>
      </Menu>

    </Modal>
  );
};

export default IconList;
