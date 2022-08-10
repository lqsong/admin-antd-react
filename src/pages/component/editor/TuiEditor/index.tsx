import { useState } from 'react';
import { Card } from 'antd';
import TuiEditor from '@/components/TuiEditor';
import TuiEditorViewer from '@/components/TuiEditor/viewer';

function App() {
  const [editorVal, setEditorVal] = useState<string>('# This is Editor');
  return (
    <div className='layout-main-conent'>
      <Card title='Editor:'>
        <TuiEditor value={editorVal} onChange={(value?: string) => setEditorVal(value || '')} />
      </Card>
      <Card title='Content:' style={{ marginTop: '10px' }}>
        <TuiEditorViewer value={editorVal} />
      </Card>
    </div>
  );
}

export default App;
