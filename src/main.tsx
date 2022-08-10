import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter /* , HashRouter */ } from 'react-router-dom';

// Register icon sprite
import 'virtual:svg-icons-register';
// 全局css
import '@/assets/css/index.less';
// App
import App from '@/App';

// 挂载
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
