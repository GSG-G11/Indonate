import React from 'react';
import Comment from './Comment';
import './style.less';

const comments = [
  {
    id: 1,
    title: 'comment1',
    comment: 'I love this page, its make donation easy I love this page, its make ddda donation easy I love this page, its make donation easy.',
    imgSrc: 'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png',
  },
  {
    id: 2,
    title: 'comment2',
    comment: 'I love this page, its make donation easy I love this page, its make ddda donation easy I love this page, its make donation easy.',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU',
  },
  {
    id: 3,
    title: 'comment3',
    comment: 'I love this page, its make donation easy I love this page, its make ddda donation easy I love this page, its make donation easy.',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZldEPvFgz5ysckNAa5ztdf4Exw00bb1a9qA&usqp=CAU',
  },
];

function Review() {
  return (
    <div className="review-comment">
      {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

export default Review;
