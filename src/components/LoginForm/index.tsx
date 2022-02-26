import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';

import styles from './index.less';

interface LoginProps {
  title?: string;
  logo?: string;
  backgroundImage?: string;
  titleColor?: string;
  forgetFontColor?: string;
  onSubmit: (values: { [key: string]: any }) => void;
}

const LoginForm: React.FC<LoginProps> = (props) => {
  const {
    logo,
    title,
    titleColor = '#000',
    forgetFontColor,
    backgroundImage,
    onSubmit,
  } = props;

  return (
    <div
      className={styles.container}
      style={{
        background: `url(${backgroundImage || ''})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      {(logo || title) && (
        <div className={styles.header}>
          {logo && <img alt="logo" className={styles.logo} src={logo} />}
          {title && (
            <div className={styles.title} style={{ color: titleColor }}>
              {title}
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onSubmit(values)}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号是必填项!' }]}
          >
            <Input
              size="large"
              placeholder="请输入账号"
              prefix={<UserOutlined />}
              style={{ width: '320px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码是必填项!' }]}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码"
              prefix={<LockOutlined />}
              style={{ width: '320px' }}
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className={styles.forget}>
              <a style={{ color: forgetFontColor }}>忘记密码?</a>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: '320px' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
