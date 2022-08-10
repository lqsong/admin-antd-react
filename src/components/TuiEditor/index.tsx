import React, { createRef } from 'react';
import request from '@/utils/request';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface TuiEditorProps {
  value: string;
  onChange: (value?: string) => void;
}

const TuiEditor: React.FC<TuiEditorProps> = (props) => {
  const { value = '', onChange } = props;

  const editorRef = createRef<Editor>();

  return (
    <Editor
      ref={editorRef}
      initialValue={value}
      onChange={() => {
        onChange(editorRef.current?.getInstance().getMarkdown());
      }}
      hooks={{
        addImageBlobHook: (fileOrBlob, callback) => {
          const param = new FormData();
          param.append('file', fileOrBlob);

          request({
            url: '/uploads',
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            data: param,
          })
            .then((res) => {
              const { data } = res as any;
              const { url, name } = data || {};
              callback(url, name);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      }}
    />
  );
};

export default TuiEditor;
