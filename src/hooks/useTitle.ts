import { useEffect } from 'react';
import settings from '@/config/settings';

const useTitle = (title?: string): void => {
  const setTitle = (title: string): void => {
    document.title = `${title} - ${settings.siteTitle}`;
  };

  useEffect(() => {
    setTitle(title || '');
  }, [title]);
};

export default useTitle;
