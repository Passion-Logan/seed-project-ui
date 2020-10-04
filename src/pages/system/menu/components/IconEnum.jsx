import React from 'react';
import { SmileOutlined, HomeOutlined, PicLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

// const iconEnum = {
//   SmileOutlined: <SmileOutlined />,
//   HomeOutlined: <HomeOutlined />,
//   PicLeftOutlined: <PicLeftOutlined />,
//   SettingOutlined: <SettingOutlined />,
// };

const { Paragraph } = Typography;

const gridStyle = {
  width: '20%',
  height: '80px',
  textAlign: 'center',
  marginTop: '10px',
};

const divStyle = {
  marginTop: '10px',
  marginRight: '10px',
};

const iconStyle = {
  fontSize: '20px',
};

// const iconEnum = {
//   SmileOutlined: (
//     <span style={divStyle}>
//       <Paragraph style={{display: "inline"}} copyable={{ text: 'SmileOutlined' }}>
//         <SmileOutlined style={iconStyle} />
//       </Paragraph>
//     </span>
//   ),
//   HomeOutlined: <HomeOutlined />,
//   PicLeftOutlined: <PicLeftOutlined />,
//   SettingOutlined: <SettingOutlined />,
// };

const iconEnum = {
  SmileOutlined: (
    <Card.Grid style={gridStyle}>
      <SmileOutlined style={iconStyle} />
      <p>SmileOutlined</p>
    </Card.Grid>
  ),
  HomeOutlined: (
    <Card.Grid style={gridStyle}>
      <SmileOutlined />
    </Card.Grid>
  ),
  PicLeftOutlined: (
    <Card.Grid style={gridStyle}>
      <SmileOutlined />
    </Card.Grid>
  ),
  SettingOutlined: (
    <Card.Grid style={gridStyle}>
      <SmileOutlined />
    </Card.Grid>
  ),
};

export default iconEnum;
