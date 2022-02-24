import { IRoute } from 'umi';

/**
 * 获取当前访问的路由的access
 * @param path 当前访问的路由
 * @param routes config/routes中的菜单数据
 */

export const getPathAccess = (path: string, routes: IRoute | undefined): string => {
    let access: string = '';
    if (!routes) return access;

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.path === path) {
            access = route.access;
            break;
        }
        if (route.routes) {
            access = getPathAccess(path, route.routes);
        }
    }

    return access;
}

/**
 * 将路径tree转换为权限数组
 * 返回值 ['/home', '/system/users']
 */
export const handleRoutesTreeToArray = (tree: any[] | undefined, access: string[] = []) => {
    if(!tree) return access;
    tree.forEach(item => {
        if (item.routes) {
            handleRoutesTreeToArray(item.routes, access);
        } else {
            access.push(item.path);
        }
    });
    return access;
}
