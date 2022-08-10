import React, { useEffect, createRef } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface TuiEditorViewerProps {
  value: string;
}

const TuiEditorViewer: React.FC<TuiEditorViewerProps> = (props) => {
  const { value } = props;

  const editorRef = createRef<Viewer>();

  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(value);
  }, [value]);

  return <Viewer ref={editorRef} initialValue={value} />;
};

export default TuiEditorViewer;
