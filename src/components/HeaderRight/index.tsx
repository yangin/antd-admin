import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Space, Avatar } from 'antd';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

interface HeaderRightProps {}

const HeaderRight: React.FC<HeaderRightProps> = (props) => {
  return (
    <Space>
      <AvatarDropdown />
    </Space>
  );
};

export default HeaderRight;
