import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { logout } from '@/services/system';
import PersonCenter from './PersonCenter';
import Preference from './Preference';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const onLogout = async () => {
  await logout();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      query: {
        redirect: pathname + search,
      },
    });
  }
};

const onPersonCenter = () => {
  history.push('/personCenter');
};

const onSetting = () => {};

const eventMap = {
  logout: () => onLogout(),
  center: () => onPersonCenter(),
  setting: () => onSetting(),
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const {
    currentUser: { name, avatar },
  } = initialState as any;

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      eventMap[key] && eventMap[key]();
    },
    [setInitialState],
  );

  const loading = (
    <span>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState || !name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        <span className={styles.menuLabel}>个人中心</span>
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        <span className={styles.menuLabel}>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span className={styles.menuLabel}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menuHeaderDropdown} placement="bottomCenter">
        <div>
          <Avatar size="small" src={avatar} alt="avatar" />
          <span className={styles.name}>{name}</span>
        </div>
      </Dropdown>
      <PersonCenter />
      <Preference />
    </>
  );
};

export default AvatarDropdown;
