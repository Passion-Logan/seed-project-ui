import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { getFakeCaptcha, getCaptcha } from '@/services/login';
import ItemMap from './map';
import LoginContext from './LoginContext';
import styles from './index.less';

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
  const options = {
    rules: rules || customProps.rules,
  };

  if (onChange) {
    options.onChange = onChange;
  }

  if (defaultValue) {
    options.initialValue = defaultValue;
  }

  return options;
};

const LoginItem = (props) => {
  const [count, setCount] = useState(props.countDown || 0);
  const [timing, setTiming] = useState(false); // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const [imgData, setImgData] = useState();
  const [imgUUID, setImgUUID] = useState();

  const [myUseForm] = Form.useForm();

  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (mobile) => {
    const result = await getFakeCaptcha(mobile);

    if (result === false) {
      return;
    }

    message.success('获取验证码成功！验证码为：1234');
    setTiming(true);
  }, []);

  const onGetVerification = useCallback(async () => {
    const result = await getCaptcha();

    if (result.code !== 200) {
      message.success('获取验证码失败！');
      return;
    }

    myUseForm.setFieldsValue({
      uuid: result.result.uuid,
    });

    console.log('uuid', myUseForm.getFieldValue('uuid'));

    setImgData(result.result.img);
    setImgUUID(result.result.uuid);
  }, []);

  useEffect(() => {
    let interval = 0;
    const { countDown } = props;

    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval); // 重置秒数

            return countDown || 60;
          }

          return preSecond - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timing]);

  // useEffect(() => {
  //   myUseForm.setFieldsValue({
  //     uuid: imgUUID,
  //   });
  //   console.log('uuid', myUseForm.getFieldValue('uuid'));
  // }, [imgUUID]);

  if (!name) {
    return null;
  } // get getFieldDecorator props

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === 'ImgCode') {
    return (
      <FormItem shouldUpdate noStyle>
        {() => (
          <Row gutter={8}>
            <Col span={16}>
              <FormItem name={name} {...options}>
                <Input {...customProps} />
              </FormItem>
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
            <Col span={16}>
              <Input value={imgUUID} />
              <FormItem name="uuid">
                <Input />
              </FormItem>
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }

  if (type === 'Captcha') {
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
    return (
      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={16}>
              <FormItem name={name} {...options}>
                <Input {...customProps} {...inputProps} />
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                disabled={timing}
                className={styles.getCaptcha}
                size="large"
                onClick={() => {
                  const value = getFieldValue('mobile');
                  onGetCaptcha(value);
                }}
              >
                {timing ? `${count} 秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];

  LoginItems[key] = (props) => (
    <LoginContext.Consumer>
      {(context) => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});
export default LoginItems;
