import React from 'react';
import Proptypes from 'prop-types';
import { Card, Image, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function Comment({ comment: { title, comment, imgSrc } }) {
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        className="comment-card"
        title={<Title className="comment-title">{title}</Title>}
        bordered={false}
      >
        <Paragraph className="comment-paragraph">{comment}</Paragraph>
        <Image className="comment-img" width={70} height={70} src={imgSrc} />
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
