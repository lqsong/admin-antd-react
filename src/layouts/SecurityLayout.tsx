import React, { useState, useEffect } from 'react';
import { connect, ConnectProps, Loading, Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';

import { UserModelState, CurrentUser } from '@/models/user';

export interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {
  const { loading, currentUser, dispatch, location, children } = props;
  const { pathname, search } = location;

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>('');

  useEffect(() => {
    setIsLogin(currentUser ? currentUser.id > 0 : false);
  }, [currentUser]);

  useEffect(() => {
    setQueryString(stringify({ redirect: pathname + search }));
  }, [location]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    setIsReady(true);
  }, [1]);

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }

  if (!isLogin && pathname !== '/user/login') {
    return <Redirect to={`/user/login?${queryString}`} />;
  }

  return <>{children}</>;
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    currentUser: user.currentUser,
    loading: loading.effects['user/fetchCurrent'],
  }),
)(SecurityLayout);
