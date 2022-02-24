export default {
    'GET /api/menu': [
        {
            path: '/home', 
            name: '首页' ,
            icon: 'home',
        },
        { 
            path: '/system', 
            name: '系统设置' ,
            icon: 'setting',
            routes: [
                { path: '/system/users', name: '用户管理' },
                { path: '/system/roles', name: '角色管理'},
                { path: '/system/menus', name: '菜单管理'},
                // { path: '/system/logs', name: '日志管理'},
            ],
        },
    ]
}
