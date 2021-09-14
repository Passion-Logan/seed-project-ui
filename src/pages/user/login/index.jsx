import { InsuranceOutlined, LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, message } from 'antd';
import React, { useState, useCallback } from 'react';
import { connect } from 'umi';
import { getCaptcha } from '@/services/login';
import styles from './style.less';



const Login = (props) => {
  const [imgData, setImgData] = useState();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  const onGetVerification = useCallback(async () => {
    const result = await getCaptcha();

    if (result.code !== 200) {
      message.success('获取验证码失败！');
      return;
    }

    setImgData(result.data.img);
    form.setFieldsValue({ uuid: result.data.uuid });
  }, []);

  return (
    <div className={styles.main}>
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号!',
            },
          ]}
        >
          <Input size="large" placeholder="请输入账号" prefix={<UserOutlined className={styles.prefixIcon} style={{ color: '#1890ff' }} />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input size="large" placeholder="请输入密码" type="password" prefix={<LockTwoTone className={styles.prefixIcon} style={{ color: '#1890ff' }} />} />
        </Form.Item>
        <Form.Item
          name="imgCode"
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        >

          <Row gutter={8}>
            <Col span={16}>
              <Input size="large" placeholder="请输入验证码" prefix={<InsuranceOutlined className={styles.prefixIcon} style={{ color: '#1890ff' }} />} />
            </Col>
            <Col span={8}>
              <img
                src={imgData === undefined ? onGetVerification() : imgData}
                style={{ width: '116px', height: '40px', display: 'block' }}
                alt="验证码"
                onClick={() => {
                  onGetVerification();
                }}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="uuid" hidden>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" className={styles.submit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div >
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
