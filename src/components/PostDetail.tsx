import React from "react";

const PostDetail = () => {
  return (
    <div className='post__detail'>
      <div className='post__box'>
        <div className='post__title'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
        <div className='post__profile-box'>
          <div className='post__profile'></div>
          <div className='post__author-name'>fast campus</div>
          <div className='post__date'>2025.02.04</div>
        </div>
        <div className='post__utils-box'>
          <div className='post__delete'>삭제</div>
          <div className='post__edit'>수정</div>
        </div>
        <div className='post__text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur ipsum non justo molestie, at placerat tellus faucibus.
          Donec non condimentum odio, vel bibendum neque. Sed vulputate, quam id
          tincidunt malesuada, mauris velit consectetur lectus, in iaculis nisi
          nisi ac arcu.
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
