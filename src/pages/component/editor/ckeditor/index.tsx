import React, { useState } from 'react';
import { Card } from 'antd';

import CKEditor from '@/components/CKEditor';

interface CkeditorPageProps {}

const CkeditorPage: React.FC<CkeditorPageProps> = () => {
  const [editorVal, setEditorVal] = useState<string>('<h1>This is Editor</h1>');

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false} title="Editor:">
        <CKEditor
          value={editorVal}
          onChange={(data: string) => setEditorVal(data)}
        />
      </Card>

      <Card bordered={false} title="Content:" style={{ marginTop: '10px' }}>
        <div dangerouslySetInnerHTML={{ __html: editorVal }} />
      </Card>
    </div>
  );
};

export default CkeditorPage;
