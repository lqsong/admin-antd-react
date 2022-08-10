/**
 * 环境变量 ts定义
 * @author LiQingSong
 */

/// <reference types="vite/client" />

// vite import.meta.env 变量
interface ImportMetaEnv {
  readonly VITE_APP_APIHOST: string; // api接口域名
  // 更多环境变量...
}
// vite import.meta.env 变量
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

