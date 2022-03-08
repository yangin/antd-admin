import React, { useState, useMemo, useCallback } from 'react';
import { history, useModel } from 'umi';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import theme from '@/theme';
import { logout } from '@/services/system';
import { Preference } from '@/type/preference';
import PersonCenterDrawer from '../PersonCenterDrawer';
import PreferenceDrawer from '../PreferenceDrawer';
import ResetPasswordModal from '../ResetPasswordModal';
import styles from './index.less';

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

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const {
    currentUser: { name, avatar },
    preference,
  } = initialState as any;
  const [drawer, setDrawer] = useState('');
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false);

  const isShowPersonCenter = drawer === 'personCenter';
  const isShowPreference = drawer === 'preference';
  const currentNavTheme =
    preference.layout === 'mix' ||
    (preference.layout === 'top' && preference.navTheme === 'dark')
      ? 'dark'
      : 'light';

  const handlePreference = useCallback(
    (newPreference: Preference) => {
      setInitialState((state: any) => ({
        ...state,
        preference: newPreference,
      }));
    },
    [setInitialState],
  );

  const onDrawer = useCallback((e) => {
    setDrawer(e.key);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setDrawer('');
  }, []);

  const onPassword = useCallback(() => {
    setIsShowPasswordModal(true);
  }, []);

  if (!initialState || !name) {
    return (
      <span>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }

  const menuHeaderDropdownRender = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="personCenter" onClick={onDrawer}>
          <UserOutlined />
          <span className={styles.menuLabel}>个人中心</span>
        </Menu.Item>
        <Menu.Item key="preference" onClick={onDrawer}>
          <SettingOutlined />
          <span className={styles.menuLabel}>偏好设置</span>
        </Menu.Item>
        <Menu.Item key="preference" onClick={onPassword}>
          <LockOutlined />
          <span className={styles.menuLabel}>修改密码</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={onLogout}>
          <LogoutOutlined />
          <span className={styles.menuLabel}>退出登录</span>
        </Menu.Item>
      </Menu>
    );
  }, []);

  const avatarRender = useMemo(() => {
    return (
      <Dropdown overlay={menuHeaderDropdownRender} placement="bottomCenter">
        <div>
          <Avatar size="small" src={avatar} alt="avatar" />
          <span
            className={styles.name}
            style={{ color: theme['fontColor'][currentNavTheme] }}
          >
            {name}
          </span>
        </div>
      </Dropdown>
    );
  }, [menuHeaderDropdownRender, avatar, currentNavTheme, name]);

  const personCenterDrawerRender = useMemo(() => {
    return (
      <PersonCenterDrawer
        visible={isShowPersonCenter}
        onClose={onCloseDrawer}
      />
    );
  }, [isShowPersonCenter]);

  const preferenceDrawerRender = useMemo(() => {
    return (
      <PreferenceDrawer
        visible={isShowPreference}
        onClose={onCloseDrawer}
        preference={preference}
        onChangeSetting={handlePreference}
      />
    );
  }, [isShowPreference, preference, handlePreference]);

  const resetPasswordModalRender = useMemo(() => {
    return (
      <ResetPasswordModal
        visible={isShowPasswordModal}
        onClose={() => {
          setIsShowPasswordModal(false);
        }}
      />
    );
  }, [isShowPasswordModal]);

  return (
    <>
      {avatarRender}
      {personCenterDrawerRender}
      {preferenceDrawerRender}
      {resetPasswordModalRender}
    </>
  );
};

export default AvatarDropdown;
