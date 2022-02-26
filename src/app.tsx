import type { RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { history } from 'umi';
import { getMenu, getCurrentUser } from '@/services/system';
import IconMap from '@/components/IconMap';
import { handleRoutesTreeToArray } from '@/helper/access';

const loginPath = '/login';

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
  return menus.map(({ icon, routes, key, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
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
  return { preference, currentUser };
}
