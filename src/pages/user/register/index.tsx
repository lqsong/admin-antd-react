import React from 'react';
import { connect, Link, useIntl, Dispatch, history } from 'umi';
import { Form, Input, Button, message, Alert } from 'antd';

import { StateType } from './model';

import styles from './style.less';

interface RegisterProps {
  userregister: StateType;
  submitLoading?: boolean;
  dispatch: Dispatch;
}

const Register: React.FC<RegisterProps> = props => {
  const { userregister, submitLoading, dispatch } = props;
  const { errorMsg } = userregister;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const fieldsValue = await form.validateFields();
      const res: boolean = await dispatch({
        type: 'userregister/register',
        payload: fieldsValue,
      });
      if (res === true) {
        message.success(
          formatMessage({ id: 'page.user.register.form.register-success' }),
        );
        history.replace('/user/login');
      }
    } catch (error) {
      message.warning(
        formatMessage({ id: 'app.global.form.validatefields.catch' }),
      );
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        {' '}
        {formatMessage({ id: 'page.user.register.form.title' })}{' '}
      </h1>

      <Form form={form} name="basic">
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user.register.form-item-username.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'page.user.register.form-item-username',
            })}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user.register.form-item-password.required',
              }),
            },
          ]}
        >
          <Input.Password
            placeholder={formatMessage({
              id: 'page.user.register.form-item-password',
            })}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'page.user.register.form-item-password.required',
              }),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  formatMessage({
                    id: 'page.user.register.form-item-confirmpassword.compare',
                  }),
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={formatMessage({
              id: 'page.user.register.form-item-confirmpassword',
            })}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className={styles.submit}
            onClick={() => onFinish()}
            loading={submitLoading}
          >
            {formatMessage({ id: 'page.user.register.form.btn-submit' })}
          </Button>
          <div className="text-align-right">
            <Link to="/user/login">
              {formatMessage({ id: 'page.user.register.form.btn-jump' })}
            </Link>
          </div>
        </Form.Item>

        {errorMsg !== '' &&
          typeof errorMsg !== 'undefined' &&
          !submitLoading && <Alert message={errorMsg} type="error" showIcon />}
      </Form>
    </div>
  );
};

export default connect(
  ({
    userregister,
    loading,
  }: {
    userregister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userregister: userregister,
    submitLoading: loading.effects['userregister/register'],
  }),
)(Register);
