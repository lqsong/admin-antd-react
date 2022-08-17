import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import { userState, CurrentUser } from '@/store/user';

import PageLoading from '@/components/PageLoading';

import { ResponseData } from '@/utils/request';
import { queryCurrent } from '@/services/user';

export interface SecurityLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: SecurityLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const isLogin = useMemo(() => user.id > 0, [user]);

  const getUser = useCallback(async () => {
    try {
      const response: ResponseData<CurrentUser> = await queryCurrent();
      const { data } = response;
      setUser({
        ...user,
        ...data,
      });
    } catch (error: any) {
      console.log('error', error);
      if (error.message && error.message === 'CustomError') {
        const response = error.response || { data: { code: 10002, msg: '' } };
        const { code, msg } = response.data;
        if (code === 10002) {
          navigate('/user/login', { replace: true });
        } else {
          message.error(msg || error);
        }
      }
    }
  }, [user, setUser]);

  useEffect(() => {
    getUser();
  }, []);
  return <>{isLogin ? children : <PageLoading />}</>;
});
