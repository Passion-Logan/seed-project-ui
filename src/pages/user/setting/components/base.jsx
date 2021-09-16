import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, Form, DatePicker, Radio, Tag } from 'antd';
// import ProForm, {
//   ProFormDependency,
//   ProFormFieldSet,
//   ProFormSelect,
//   ProFormText,
//   ProFormTextArea,
// } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { getUserInfo, queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';
import styles from './BaseView.less';
import moment from 'moment';

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
}; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return getUserInfo();
  });

  const [form] = Form.useForm();

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <Form
              layout='vertical'
              form={form}
              // initialValues={{ layout: formLayout }}
              initialValues={{ ...currentUser, birthday: moment(currentUser.birthday) }}
            >
              <Form.Item name="id" label="ID" hidden>
                <Input disabled />
              </Form.Item>
              <Form.Item name="userName" label="登录账号">
                <Input disabled />
              </Form.Item>
              <Form.Item name="nickName" label="用户昵称">
                <Input placeholder="请输入用户昵称" />
              </Form.Item>
              <Form.Item name="email" label="用户邮箱">
                <Input placeholder="请输入用户邮箱" />
              </Form.Item>
              <Form.Item name="phone" label="手机号码">
                <Input placeholder="请输入手机号码" />
              </Form.Item>
              <Form.Item name="birthday" label="出生日期">
                <DatePicker style={{ width: '100%' }} placeholder="请选择出生时间" />
              </Form.Item>
              <Form.Item name="sex" label="性别">
                <Radio.Group >
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="角色信息">
                <Tag>{currentUser.roles}</Tag>
                {/* <Input placeholder="请输入手机号码" /> */}
              </Form.Item>
            </Form>
          </div>

          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )
      }
    </div >
  );
};

export default BaseView;
