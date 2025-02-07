import React, { useState } from "react";

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1); // 현재 선택된 이미지 상태 확인

  console.log(activeImage);
  // image url
  const IMAGE_1_URL =
    "https://images.unsplash.com/photo-1534670053436-88d7fd4a8f96?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const IMAGE_2_URL =
    "https://images.unsplash.com/photo-1619389136796-ebf6a39d507c?q=80&w=3554&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const IMAGE_3_URL =
    "https://images.unsplash.com/photo-1519567141891-788b756572ab?q=80&w=4034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div>
      <div className='carousel'>
        <ul className='carousel__slides'>
          {/* 1st image */}
          <input
            type='radio'
            name='radio-buttons'
            id='img-1'
            checked={activeImage === 1}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img src={IMAGE_1_URL} alt='scenery 1' />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(3)}
                className='carousel__slide-prev'
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(2)}
                className='carousel__slide-next'
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          {/* 2nd image */}
          <input
            type='radio'
            name='radio-buttons'
            id='img-2'
            checked={activeImage === 2}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img src={IMAGE_2_URL} alt='scenery 2' />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(1)}
                className='carousel__slide-prev'
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(3)}
                className='carousel__slide-next'
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          {/* 3rd image */}
          <input
            type='radio'
            name='radio-buttons'
            id='img-3'
            checked={activeImage === 3}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img src={IMAGE_3_URL} alt='scenery 3' />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(2)}
                className='carousel__slide-prev'
              >
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(1)}
                className='carousel__slide-next'
              >
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div className='carousel__dots'>
            <label
              onClick={() => setActiveImage(1)}
              className='carousel__dot'
              id='img-dot-1'
            ></label>
            <label
              onClick={() => setActiveImage(2)}
              className='carousel__dot'
              id='img-dot-2'
            ></label>
            <label
              onClick={() => setActiveImage(3)}
              className='carousel__dot'
              id='img-dot-3'
            ></label>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
