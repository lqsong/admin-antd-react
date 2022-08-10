import { atom, selector } from 'recoil';
import { queryMessage } from '@/services/user';
import { ResponseData } from '@/utils/request';

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

export const initialState: CurrentUser = {
  id: 0,
  name: '',
  avatar: '',
  roles: [],
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});

export const userMessageState = selector({
  key: 'userMessageState',
  get: async () => {
    const response: ResponseData<number> = await queryMessage();
    const { data, code } = response;
    if (code !== 0) {
      throw response.msg;
    }
    return data || 0;
  },
});
