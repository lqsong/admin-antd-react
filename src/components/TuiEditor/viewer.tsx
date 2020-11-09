import React, { useRef, useEffect } from 'react';
import Viewer from '@toast-ui/editor';
import { Viewer as ViewerReact } from '@toast-ui/react-editor';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface TuiEditorViewerProps {
  value: string;
}

const TuiEditorViewer: React.FC<TuiEditorViewerProps> = props => {
  const { value } = props;

  const viewerRef = useRef<Viewer>();

  useEffect(() => {
    viewerRef.current?.setMarkdown(value);
    /* viewerRef.current?.getHtml(); */
  }, [value]);

  return (
    <ViewerReact
      initialValue={value}
      events={{
        load: param => {
          if (!viewerRef.current) {
            viewerRef.current = param;
          }
        },
      }}
    />
  );
};

export default TuiEditorViewer;
