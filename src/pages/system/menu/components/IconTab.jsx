import { useState } from "react";

const { Card } = require("antd");

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const [key, setKey] = useState('tab1')

const IconTab = (prop) => {
  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => setKey(key)}
      >
        {contentList[key]}
      </Card>
    </>
  )

}

export default IconTab;