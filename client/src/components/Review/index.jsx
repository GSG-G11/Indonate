import React from 'react';
import Comment from './Comment';
import './style.less';

const comments = [
  {
    id: 1,
    title: 'Maria',
    comment:
      'I searched for many sites to donate from my own money safely, this site provided me with that.',
    imgSrc:
      'https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png',
  },
  {
    id: 2,
    title: 'John',
    comment:
      'I love this site for its ease of use and ease of communication with its staff.',
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU',
  },
  {
    id: 3,
    title: 'Fatima',
    comment:
      "I can start my own campaign and follow its stats, that's very nice.",
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZldEPvFgz5ysckNAa5ztdf4Exw00bb1a9qA&usqp=CAU',
  },
];

function Review() {
  return (
    <div className="review-comment">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Review;
