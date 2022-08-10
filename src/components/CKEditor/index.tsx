/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
import React from 'react';
import request from '@/utils/request';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
// import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh'; // 繁体
import styles from './index.module.less';

export const CKEditorConfig = {
  toolbar: [
    'heading',
    '|',
    'fontfamily',
    'fontsize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignment',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'indent',
    'outdent',
    '|',
    'link',
    'blockquote',
    'imageUpload',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  language: 'zh-cn',
};

export interface CKEditorProps {
  value: string;
  toolbars?: string[];
  onChange?: (data: string, editor: any, event: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
  onReady?: (editor: any) => void;
}

const Editor: React.FC<CKEditorProps> = (props) => {
  const { toolbar, ...config } = CKEditorConfig;

  const { value = '', toolbars = toolbar, onChange, onBlur, onFocus, onReady } = props;

  let thisEditor: any = null;

  return (
    <div className={styles['document-editor']}>
      <CKEditor
        editor={DecoupledEditor}
        config={{
          toolbar: toolbars,
          ...config,
        }}
        data={value}
        onReady={(editor: any) => {
          // console.log( 'Editor is ready to use!', editor );
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());

          editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
            // let val = editor.getData();
            ({
              upload: async () => {
                return await loader.file.then((f: any) => {
                  // console.log("file:", f);

                  const param = new FormData();
                  param.append('file', f);

                  return new Promise((resolve, reject) => {
                    request({
                      url: '/uploads',
                      headers: { 'Content-Type': 'multipart/form-data' },
                      method: 'POST',
                      data: param,
                    })
                      .then((res) => {
                        const { data } = res as any;
                        resolve({
                          default: data.url || '',
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        reject(err);
                      });
                  });
                });

                /* return await loader.file.then((f: any) => {
                                    console.log("file:", f);
                                    const F = new FileReader();
                                    F.readAsArrayBuffer(f);
                                    return new Promise(resolve => {
                                        F.onload = function () {
                                            resolve({bufAsArray: F.result, file: f});
                                        };
                                    });
                                }).then((v: any) => {
                                    // 执行上传 Ajax
                                    console.log("执行上传 ajax", v);
                                    //返回标准格式
                                    return {
                                        default: 'http://img/BG.png'
                                    }
                                }); */
              },
            });

          thisEditor = editor;

          if (onReady) {
            onReady(editor);
          }
        }}
        onError={({ willEditorRestart }: { willEditorRestart: boolean }) => {
          if (willEditorRestart) {
            thisEditor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          // console.log( { event, editor, data } );
          if (onChange) {
            onChange(data, editor, event);
          }
        }}
        onBlur={(event: any, editor: any) => {
          // console.log( 'Blur.', editor );
          if (onBlur) {
            onBlur(event, editor);
          }
        }}
        onFocus={(event: any, editor: any) => {
          // console.log( 'Focus.', editor );
          if (onFocus) {
            onFocus(event, editor);
          }
        }}
      />
    </div>
  );
};

export default Editor;
