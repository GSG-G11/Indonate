import React from 'react';
import { Card, Image } from 'antd';
import 'antd/dist/antd.css';

function Comment() {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title="Comment title" bordered={false} style={{ width: 300 }}>
        <p>
          I love this page, its make donation easy I
          love this page, its make ddda donation easy
          I love this page, its make donation easy.
        </p>
        <Image
          className="comment-img"
          width={70}
          height={70}
          src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
        />
      </Card>
    </div>
  );
}

export default Comment;
