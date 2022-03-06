import type { RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { history } from 'umi';
import { ConfigProvider } from 'antd';
import { getMenu, getCurrentUser } from '@/services/system';
import IconMap from '@/components/IconMap';
import HeaderRight from '@/components/HeaderRight';
import { handleRoutesTreeToArray } from '@/helper/access';
import { DEFAULT_PREFERENCE } from '@/constants/preference';
import { preference as configPreference } from '../config/preference.config';

const loginPath = '/login';

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
  return menus.map(({ icon, routes, key, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // 动态设置主题色
  ConfigProvider.config({
    theme: {
      primaryColor: initialState?.preference?.primaryColor,
    },
  });

  return {
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await getMenu();
        const menuAccess = handleRoutesTreeToArray(menuData, []);
        localStorage.setItem('menuAccess', JSON.stringify(menuAccess));
        return loopMenuItem(menuData);
      },
    },
    rightContentRender: () => <HeaderRight />,
    ...initialState?.preference,
  };
};

/**
 * 在此处初始化全局变量，通过 useModel('@@initialState') 获取
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  preference?: object;
  currentUser?: object;
}> {
  if (history.location.pathname === loginPath) {
    return {};
  }
  const response = await getCurrentUser();
  const { preference, ...currentUser } = response.data;
  return {
    preference: { ...DEFAULT_PREFERENCE, ...configPreference, ...preference },
    currentUser,
  };
}
