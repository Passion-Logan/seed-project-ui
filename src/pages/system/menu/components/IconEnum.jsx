import React from 'react';
import { SmileOutlined, HomeOutlined, PicLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const gridStyle = {
  width: '20%',
  height: '80px',
  textAlign: 'center',
  marginTop: '10px',
};

const iconStyle = {
  fontSize: '20px',
};

const copy = (val) => {
  // const range = document.createRange();
  // window.getSelection().removeAllRanges();
  // range
};

const iconEnum = {
  SmileOutlined: (
    <Card.Grid style={gridStyle}>
      <span onClick={() => copy('SmileOutlined')}>
        <SmileOutlined style={iconStyle} />
        <p>SmileOutlined</p>
      </span>
    </Card.Grid>
  ),
  HomeOutlined: (
    <Card.Grid style={gridStyle}>
      <HomeOutlined style={iconStyle} />
      <p>SmileOutlined</p>
    </Card.Grid>
  ),
  PicLeftOutlined: (
    <Card.Grid style={gridStyle}>
      <PicLeftOutlined style={iconStyle} />
      <p>PicLeftOutlined</p>
    </Card.Grid>
  ),
  SettingOutlined: (
    <Card.Grid style={gridStyle}>
      <SettingOutlined style={iconStyle} />
      <p>SettingOutlined</p>
    </Card.Grid>
  ),
};

export default iconEnum;
