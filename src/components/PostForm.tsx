import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  // 게시글 생성시 유저 메일을 남겨놓기 위해 유저 정보 가져옴
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }, // 디스트럭쳐링
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  // 폼 제풀 핸들러
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작을 하지 않도록

    try {
      //firebase로 posts 라는 이름으로 데이터 생성
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      toast?.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (error: any) {
      toast?.error(error?.code);
      console.log(error);
    }
  };

  return (
    // <form action='/post' method='POST' className='form'>
    <form onSubmit={onSubmit} className='form'>
      <div className='form__block'>
        <label htmlFor='title'>제목</label>
        <input
          type='text'
          name='title'
          value={title}
          id='title'
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='summary'>요약</label>
        <input
          type='text'
          name='summary'
          value={summary}
          id='summary'
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='content'>내용</label>
        <textarea
          name='content'
          id='content'
          value={content}
          required
          onChange={onChange}
        ></textarea>
      </div>
      <div className='form__block'>
        <input type='submit' value='제출' className='form__btn--submit' />
      </div>
    </form>
  );
};

export default PostForm;
