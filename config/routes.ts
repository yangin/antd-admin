/**
 * 此处配置path到component的映射关系（必须）
 * 在app.ts中通过服务端返回的menu数据来控制菜单的显示及权限
 * 此处与app.ts中的路由协同使用
 */
const routes = [
    {
        path: '/login',
        layout: false,
        component: '@/pages/Login',
    },
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home', 
                component: '@/pages/Home',
                access: 'home',
            },
            { 
                path: '/system', 
                routes: [
                    { path: '/system/users', component: '@/pages/UserManager', access: 'systemUsers',},
                    { path: '/system/roles', component: '@/pages/RoleManager', access: 'systemRoles',},
                    { path: '/system/menus', component: '@/pages/MenuManager', access: 'systemMenus',},
                    { path: '/system/logs', component: '@/pages/LogManager', access: 'systemLogs',},
                ],
            },
        ]
    },
];

export default routes ;
