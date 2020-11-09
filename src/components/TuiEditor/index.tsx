import React, { useMemo, useRef } from 'react';
import request from '@/utils/request';
import Editor from '@toast-ui/editor';
import { Editor as EditorReact } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const toolbarItems: string[] = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'image',
  'link',
  'divider',
  'code',
  'codeblock',
];

type SourceType = 'wysiwyg' | 'markdown';

export interface TuiEditorProps {
  value: string;
  height?: string;
  toolbars?: string[];
  previewStyle?: 'tab' | 'vertical';
  initialEditType?: SourceType;
  useCommandShortcut?: boolean;
  onLoad?: (editor: Editor) => void;
  onChange?: (value: string, editor?: Editor) => void;
  stateChange?: (param: any) => void;
  onFocus?: (param: { source: SourceType }) => void;
  onBlur?: (param: { source: SourceType }) => void;
}

const TuiEditor: React.FC<TuiEditorProps> = props => {
  const {
    value = '',
    height = '300px',
    toolbars = toolbarItems,
    previewStyle,
    initialEditType = 'markdown',
    useCommandShortcut = true,
    onLoad,
    onChange,
    stateChange,
    onFocus,
    onBlur,
  } = props;

  const editorRef = useRef<Editor>();

  const events = useMemo(() => {
    let ret = {
      load: (editor: any) => {
        if (!editorRef.current) {
          editorRef.current = editor;
        }

        if (onLoad) {
          onLoad(editor);
        }
      },
      change: (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
        let value = editorRef.current ? editorRef.current.getMarkdown() : '';

        if (onChange) {
          onChange(value, editorRef.current);
        }
      },
    };

    if (stateChange) {
      ret['stateChange'] = stateChange;
    }

    if (onFocus) {
      ret['focus'] = onFocus;
    }

    if (onBlur) {
      ret['blur'] = onBlur;
    }

    return ret;
  }, [1]);

  return (
    <EditorReact
      initialValue={value}
      toolbarItems={toolbars}
      previewStyle={previewStyle}
      height={height}
      initialEditType={initialEditType}
      useCommandShortcut={useCommandShortcut}
      events={events}
      hooks={{
        addImageBlobHook: (fileOrBlob, callback) => {
          let param = new FormData();
          param.append('file', fileOrBlob);

          request('/uploads', {
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            data: param,
          })
            .then(res => {
              const { data } = res;
              const { url, name } = data;
              callback(url, name);
            })
            .catch(err => {
              console.log(err);
            });
        },
      }}
    />
  );
};

export default TuiEditor;
