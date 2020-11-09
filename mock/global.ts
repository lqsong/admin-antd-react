import { Request, Response } from 'express';
const { API_HOST } = process.env;
const mock = {};

mock[`POST ${API_HOST || ''}/uploads`] = (req: Request, res: Response) => {
  const file = req.files && req.files[0];
  res.send({
    code: 0,
    data: {
      id: 1,
      url:
        'http://uploads.liqingsong.cc/20200531/583057e8-8bab-4eee-b5a0-bec915089c0c.jpg',
      name: file['originalname'],
    },
    msg: '',
  });
};
mock[`GET ${API_HOST || ''}/500`] = (req: Request, res: Response) => {
  res.status(500).send({
    timestamp: 1513932555104,
    status: 500,
    error: 'error',
    message: 'error',
    path: '/500',
  });
};

mock[`GET ${API_HOST || ''}/404`] = (req: Request, res: Response) => {
  res.status(404).send({
    timestamp: 1513932643431,
    status: 404,
    error: 'Not Found',
    message: 'No message available',
    path: '/404',
  });
};

export default mock;
