/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

 // 权限白名单
 const accessRoutes = ['/'];

 export default function access(initialState: { currentUser: any }) {
    const { currentUser } = initialState || {};
    return {
      canAdmin: currentUser && currentUser.access === 'admin',
      canViewPage: (path: string, accessList: string[]) => {
        return [...accessRoutes,...accessList].includes(path);
      },
    };
  }

