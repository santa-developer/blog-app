import React, { useState } from "react";

const COMMENTS = [
  {
    id: 1,
    email: "test@test.com",
    content: "댓글입니다1",
    createdAt: "2023-06-12",
  },
  {
    id: 2,
    email: "test@test.com",
    content: "댓글입니다2",
    createdAt: "2023-06-13",
  },
  {
    id: 3,
    email: "test@test.com",
    content: "댓글입니다3",
    createdAt: "2023-06-14",
  },
  {
    id: 4,
    email: "test@test.com",
    content: "댓글입니다4",
    createdAt: "2023-06-15",
  },
  {
    id: 5,
    email: "test@test.com",
    content: "댓글입니다5",
    createdAt: "2023-06-18",
  },
  {
    id: 6,
    email: "test@test.com",
    content: "댓글입니다6",
    createdAt: "2023-07-12",
  },
  {
    id: 7,
    email: "test@test.com",
    content: "댓글입니다7",
    createdAt: "2023-08-12",
  },
];

const Comments = () => {
  const [comment, setComment] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  return (
    <div className='comments'>
      <form className='comments__form'>
        <div className='form__block'>
          <label htmlFor='comment'>댓글 입력</label>
          <textarea
            name='comment'
            id='comment'
            value={comment}
            required
            onChange={onChange}
          />
        </div>
        <div className='form__block'>
          <input
            type='submit'
            id='submit'
            value='입력'
            className='form__btn-submit'
          />
        </div>
      </form>
      <div className='comments__list'>
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className='comment__box'>
            <div className='comment__profile-box'>
              <div className='comment__email'>{comment?.email}</div>
              <div className='cooment__date'>{comment?.createdAt}</div>
              <div className='comment__delete'>삭제</div>
            </div>
            <div className='comment__text'>{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
