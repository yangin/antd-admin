import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = '';

const getAccess = () => {
  return access;
};

const getPreference = () => {
  return {
    theme: 'light',
  };
};

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
    //   return;
    // }
    res.send({
      success: true,
      data: {
        name: 'Serati Ma',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
        preference: getPreference(),
      },
    });
  },

  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  'POST /api/login': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    await waitTime(2000);
    if (password === '11223344' && username === 'admin') {
      access = 'admin';
      res.send({
        success: true,
        token: '3e313ba457c34d5cbe167bda3498171d',
      });
      return;
    }
    if (password === '11223344' && username === 'user') {
      access = 'user';
      res.send({
        success: true,
        token: '3e313ba457c34d5cbe167bda3498171d',
      });
      return;
    }

    res.send({
      success: false,
      msg: '账户或密码错误！',
    });
  },

  'POST /api/logout': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
};
