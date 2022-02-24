import type { RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { getMenu } from '@/services/system';
import IconMap from '@/components/IconMap';
import { handleRoutesTreeToArray } from '@/helper/access';

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>{
  return menus.map(({ icon, routes, key, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  })); 
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    return {
      menu: {
        // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
        params: {
          userId: initialState?.currentUser?.userid,
        },
        request: async (params, defaultMenuData) => {
          // initialState.currentUser 中包含了所有用户信息
          const menuData = await getMenu();
          const menuAccess = handleRoutesTreeToArray(menuData, []);
          localStorage.setItem('menuAccess', JSON.stringify(menuAccess));
          return loopMenuItem(menuData);
        },
      },
    };
  };
