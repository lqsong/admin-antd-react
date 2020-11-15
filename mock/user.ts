import { Request, Response } from 'express';
import settings from '../src/config/settings';
const { API_HOST } = process.env;
const mock = {};

mock[`GET ${API_HOST || ''}/user/info`] = (req: Request, res: Response) => {
  const headers = req.headers;
  if (headers[settings.ajaxHeadersTokenKey] === 'admin') {
    res.send({
      code: 0,
      data: {
        id: 1,
        name: 'Admins',
        avatar: '',
        roles: ['admin'],
      },
    });
  } else if (headers[settings.ajaxHeadersTokenKey] === 'user') {
    res.send({
      code: 0,
      data: {
        id: 2,
        name: 'Users',
        avatar: '',
        roles: ['user'],
      },
    });
  } else if (headers[settings.ajaxHeadersTokenKey] === 'test') {
    res.send({
      code: 0,
      data: {
        id: 3,
        name: 'Tests',
        avatar: '',
        roles: ['test'],
      },
    });
  } else {
    res.send({
      code: 10002,
      data: {},
      msg: '未登录',
    });
  }
};

mock[`GET ${API_HOST || ''}/user/message`] = (req: Request, res: Response) => {
  res.send({
    code: 0,
    data: 10,
  });
};

mock[`POST ${API_HOST || ''}/user/login`] = (req: Request, res: Response) => {
  const { password, username } = req.body;
  const send = { code: 0, data: {}, msg: '' };
  if (username === 'admin' && password === '123456') {
    send['data'] = {
      token: 'admin',
    };
  } else if (username === 'user' && password === '123456') {
    send['data'] = {
      token: 'user',
    };
  } else if (username === 'test' && password === '123456') {
    send['data'] = {
      token: 'test',
    };
  } else {
    send['code'] = 201;
    send['msg'] = 'Wrong username or password';
  }

  res.send(send);
};

mock[`POST ${API_HOST || ''}/user/register`] = (
  req: Request,
  res: Response,
) => {
  res.send({
    code: 0,
    data: '',
    msg: '',
  });
};

export default mock;
