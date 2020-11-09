import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

export default () => {
  return (
    <div className="indexlayout-main-conent">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};
