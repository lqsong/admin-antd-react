import IndexLayoutLocales from '@/layouts/IndexLayout/locales/en-US';
import UserLayoutLocales from '@/layouts/UserLayout/locales/en-US';
import components from './en-US/components';

export default {
  'app.global.form.validatefields.catch':
    'The validation did not pass, please check the input',
  ...IndexLayoutLocales,
  ...UserLayoutLocales,
  ...components,
};
