import React, { useState } from 'react';
import { Card } from 'antd';

import TuiEditor from '@/components/TuiEditor';
import TuiEditorViewer from '@/components/TuiEditor/viewer';

interface TuiEditorPageProps {}

const TuiEditorPage: React.FC<TuiEditorPageProps> = () => {
  const [editorVal, setEditorVal] = useState<string>('# This is Editor');

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false} title="Editor:">
        <TuiEditor
          value={editorVal}
          onChange={(value: string) => setEditorVal(value)}
        />
      </Card>

      <Card bordered={false} title="Content:" style={{ marginTop: '10px' }}>
        <TuiEditorViewer value={editorVal} />
      </Card>
    </div>
  );
};

export default TuiEditorPage;
