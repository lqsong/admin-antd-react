import React from 'react';
import { connect, Dispatch, Link, useIntl, history } from 'umi';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

import { LoginParamsType } from './data.d';
import { StateType } from './model';

import styles from './style.less';

interface LoginProps {
  userlogin: StateType;
  submitLoading?: boolean;
  dispatch: Dispatch;
  location: Location & { query: any };
}

const Login: React.FC<LoginProps> = props => {
  const { userlogin, submitLoading, dispatch, location } = props;
  const { query } = location;
  const { redirect } = query;
  const { loginStatus } = userlogin;

  const { formatMessage } = useIntl();

  // 登录
  const handleSubmit = async (values: LoginParamsType) => {
    const res: boolean = await dispatch({
      type: 'userlogin/login',
      payload: values,
    });
    if (res === true) {
      message.success(
        formatMessage({ id: 'page.user.login.form.login-success' }),
      );
      history.replace(redirect || '/');
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        {formatMessage({ id: 'page.user.login.form.title' })}
      </h1>

      <Form name="basic" onFinish={handleSubmit}>
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user.login.form-item-username.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'page.user.login.form-item-username',
            })}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user.login.form-item-password.required',
              }),
            },
          ]}
        >
          <Input.Password
            placeholder={formatMessage({
              id: 'page.user.login.form-item-password',
            })}
            prefix={<UnlockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className={styles.submit}
            htmlType="submit"
            loading={submitLoading}
          >
            {formatMessage({ id: 'page.user.login.form.btn-submit' })}
          </Button>
          <div className="text-align-right">
            <Link to="/user/register">
              {formatMessage({ id: 'page.user.login.form.btn-jump' })}
            </Link>
          </div>
        </Form.Item>

        {loginStatus === 'error' && !submitLoading && (
          <Alert
            message={formatMessage({ id: 'page.user.login.form.login-error' })}
            type="error"
            showIcon
          />
        )}
      </Form>
    </div>
  );
};

export default connect(
  ({
    userlogin,
    loading,
  }: {
    userlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userlogin: userlogin,
    submitLoading: loading.effects['userlogin/login'],
  }),
)(Login);
