import React, { useCallback } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const layout = {
  labelCol: { span: 6, offset: 1 },
  wrapperCol: { span: 16 },
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = (props) => {
  const { visible, onClose } = props;
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    console.log('onSubmit');
    // const { oldPassword, newPassword } = form.getFieldsValue();
    // modPassword({
    //   oldPassword: CryptoJS.AES.encrypt(
    //     oldPassword,
    //     CryptoJS.enc.Utf8.parse('8ttukDdkMC7l3q7z'),
    //     {
    //       mode: CryptoJS.mode.ECB,
    //       padding: CryptoJS.pad.Pkcs7,
    //     },
    //   ).toString(),
    //   newPassword: CryptoJS.AES.encrypt(
    //     newPassword,
    //     CryptoJS.enc.Utf8.parse('8ttukDdkMC7l3q7z'),
    //     {
    //       mode: CryptoJS.mode.ECB,
    //       padding: CryptoJS.pad.Pkcs7,
    //     },
    //   ).toString(),
    // }).then((response) => {
    //   if (response?.result?.c === 200) {
    //     window.lockLogout = 1;
    //     message.success(response.result.m);
    //     dispatch({ type: 'login/logout' });
    //   }
    // });
  }, []);

  return (
    <Modal
      title="修改密码"
      visible={visible}
      footer={null}
      onCancel={onClose}
      destroyOnClose
    >
      <Form onFinish={onSubmit} form={form} {...layout}>
        <Form.Item
          rules={[{ required: true, message: '请输入原密码' }]}
          name="oldPassword"
          label="原密码"
        >
          <Input.Password placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: '请输入新密码' },
            {
              pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_~`!@#$%^&*()\-+_=:;"',.?])[a-zA-Z0-9\\W_~`!@#$%^&*()\-+_=:;"',.?]{8,16}$/,
              message: '输入的密码不符合格式，请重新输入',
            },
          ]}
          name="newPassword"
          label="新密码"
          extra={
            <span>
              需包含 “大小写字母”、“数字” 及 “指定特殊字符”，长度为8-16。
              特殊字符包括（英文状态下） ~`!@#$%^&*()-+_=:;&quot;&#39;,.?
            </span>
          }
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('两次输入的密码不一样，请重新输入'),
                );
              },
            }),
          ]}
          name="renewPassword"
          label="再次输入密码"
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7 }}>
          <Button style={{ width: 200 }} type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;
