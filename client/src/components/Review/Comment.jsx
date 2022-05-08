import React from 'react';
import Proptypes from 'prop-types';
import { Card, Image, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Paragraph } = Typography;

function Comment({ comment: { title, comment, imgSrc } }) {
  return (
    <div className="site-card-border-less-wrapper">
      <Card title={title} bordered={false} style={{ width: 300 }}>
        <Paragraph>{comment}</Paragraph>
        <Image
          className="comment-img"
          width={70}
          height={70}
          src={imgSrc}
        />
      </Card>
    </div>
  );
}
Comment.propTypes = {
  comment: Proptypes.shape({
    title: Proptypes.string,
    comment: Proptypes.string,
    imgSrc: Proptypes.string,
  }).isRequired,
};

export default Comment;
