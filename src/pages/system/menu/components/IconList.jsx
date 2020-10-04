import iconEnum from './IconEnum';
import { Button, Card, List, Menu, Modal } from 'antd';
import { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

const MenuItem = Menu.Item;

const IconList = (props) => {
  const { cancle: handleIconVisible, visible: IconVisible } = props;

  const [iconStr, setIconStr] = useState(
    'SmileOutlined,HomeOutlined,PicLeftOutlined,SettingOutlined',
  );

  const data = [
    {
      icon: 'SmileOutlined',
    },
    {
      icon: 'SmileOutlined',
    },
    {
      icon: 'SmileOutlined',
    },
    {
      icon: 'SmileOutlined',
    },
  ];

  const tabList = [
    {
      key: 'tab1',
      tab: '方向性图标',
    },
    {
      key: 'tab2',
      tab: '提示建议性图标',
    },
    {
      key: 'tab3',
      tab: '编辑类图标',
    },
    {
      key: 'tab4',
      tab: '数据类图标',
    },
    {
      key: 'tab5',
      tab: '品牌和标识',
    },
    {
      key: 'tab6',
      tab: '网站通用图标',
    },
  ];

  // const contentList = {
  //   // tab1: () => {
  //   //   iconStr.split(',').map(item => (iconEnum[item]))
  //   // },
  //   tab1: iconStr.split(',').map(item => (iconEnum[item])),
  //   tab2: <p>content2</p>,
  // };

  const [key, setKey] = useState('tab1');

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
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={(key) => setKey(key)}
      >
        {iconStr.split(',').map((item) => iconEnum[item])}
      </Card>
    </Modal>
  );
};

export default IconList;
