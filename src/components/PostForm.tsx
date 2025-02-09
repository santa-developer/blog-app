import React, { useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType, PostProps } from "./PostList";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | string>("");
  const [post, setPost] = useState<PostProps | null>(null);

  // 게시글 생성시 유저 메일을 남겨놓기 위해 유저 정보 가져옴
  const { user } = useContext(AuthContext);
  // 게시글 수정을 위해 useParams 통해 id 추출
  const params = useParams();

  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };

  // 폼 제풀 핸들러
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작을 하지 않도록

    try {
      if (post && post?.id) {
        // 게시글이 있다면 firestore 통해 데이터 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category: category,
        });

        toast?.success("게시글을 수정했습니다.");
        navigate(`/posts/${post?.id}`);
      } else {
        //게시글이 없다면 firebase로 posts 라는 이름으로 데이터 생성
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
        });

        toast?.success("게시글을 생성했습니다.");
        navigate("/");
      }
    } catch (error: any) {
      toast?.error(error?.code);
      console.log(error);
    }
  };

  // 게시글 수정일 경우 게시글 가져오기 (PostDeatil.tsx 페이지와 동일)
  const getPosts = async (id: string) => {
    try {
      if (id) {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);

        console.log(docSnap.data());
      }
    } catch (e) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다.:", e);
    }
  };

  // 페이지가 마운트 될 때마다 document를 가져오는 함수를 실행
  useEffect(() => {
    // params의 ID 값이 있을 때만 getPosts 호출을 해야 한다.
    if (params?.id) getPosts(params?.id);
  }, [params?.id]);

  // post가 있으면 form 필드에 값을 넣어 줌
  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

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
        <label htmlFor='category'>카테고리</label>
        <select
          name='category'
          id='category'
          onChange={onChange}
          defaultValue={category}
        >
          <option value=''>카테고리를 선택해주세요.</option>
          {CATEGORIES?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
        <input
          type='submit'
          value={post ? "수정" : "생성"}
          className='form__btn--submit'
        />
      </div>
    </form>
  );
};

export default PostForm;
