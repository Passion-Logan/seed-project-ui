import React, { useState } from 'react';
import { Input, List, message } from 'antd';
import { updatePwd } from '../service';
import { clearToken } from '@/utils/token';

const SecurityView = () => {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  const changePwd = (pwd, type) => {
    if (type === 1) {
      setOldPwd(pwd)
    } else {
      setNewPwd(pwd)
    }
  }

  const submitChange = async () => {
    if (!oldPwd || !newPwd) {
      message.error('密码不能为空')
      return;
    }
    if (oldPwd === newPwd) {
      message.error('新旧密码不能相同')
      return;
    }

    const params = {
      oldPwd,
      newPwd
    }

    const rep = await updatePwd(JSON.stringify(params));
    if (rep.code === 200) {
      message.success(rep.message)
      clearToken()
      setTimeout(() => {
        window.location.replace('/login')
      }, 1000)
    }
  }

  const getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码:<Input.Password placeholder="请输入当前密码" onChange={(e) => changePwd(e.target.value, 1)} style={{ width: 150, marginLeft: 10, marginRight: 20 }} size='small' />
          新密码:<Input.Password placeholder="请输入新密码" onChange={(e) => changePwd(e.target.value, 2)} style={{ width: 150, marginLeft: 10 }} size='small' />
        </>
      ),
      actions: [<a key="Modify" href="###" onClick={submitChange}>修改</a>],
    },
  ];

  const data = getData();
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
