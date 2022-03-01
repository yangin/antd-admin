import React, { useCallback } from 'react';
import { useModel, history } from 'umi';
import { message } from 'antd';
import LoginForm from '@/components/LoginForm';
import { login, getCurrentUser } from '@/services/system';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');

  const initUserInfo = async () => {
    const response = await getCurrentUser();
    const { preference, ...currentUser } = response.data;
    await setInitialState((state: any) => ({
      ...state,
      currentUser,
      preference,
    }));
  };

  /**
   * 关于为何要将login接口与getCurrentUser接口分开的问题
   * 当用户信息发生变更时，需要刷新当前页面即可改变，而非必须要重新登录
   * 方便实时获取最新用户信息状态
   */
  const onSubmit = useCallback(async (values) => {
    const { username, password, remember } = values;
    const response = await login({ username, password });
    const { success, token, msg } = response;
    if (!success) {
      message.error(msg);
      return;
    }

    localStorage.setItem('token', token);
    //记住密码
    if (remember) {
      localStorage.setItem('account', JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem('account');
    }

    await initUserInfo();

    //登陆成功后跳转
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, []);

  return (
    <LoginForm
      logo="/logo.svg"
      title="城市年票管理系统"
      backgroundImage="/login-background.png"
      forgetFontColor="#fff"
      onSubmit={onSubmit}
    />
  );
};

export default Login;
