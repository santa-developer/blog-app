import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import Loader from "./Loader";
import AuthContext from "context/AuthContext";

const PostDetail = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  // console.log(params?.id); // id 잘 넘어오는지 확인

  const [post, setPost] = useState<PostProps | null>(null);

  // 문서 가져오기(id를 받아서 해당 ID의 문서를 Firebase Firestore에서 가져온다.)
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

  // 삭제 이벤트
  const handleDelete = () => {
    console.log("delete!");
  };

  // 페이지가 마운트 될 때마다 document를 가져오는 함수를 실행
  useEffect(() => {
    // params의 ID 값이 있을 때만 getPosts 호출을 해야 한다.
    if (params?.id) getPosts(params?.id);
  }, [params?.id]);
  return (
    <div className='post__detail'>
      {post ? (
        <div className='post__box'>
          <div className='post__title'>{post?.title}</div>
          <div className='post__profile-box'>
            <div className='post__profile'></div>
            <div className='post__author-name'>{post?.email}</div>
            <div className='post__date'>{post?.createAt}</div>
          </div>
          {user?.email === post?.email && (
            <div className='post__utils-box'>
              <div className='post__edit'>
                <Link to={`/posts/edit/1`}>수정</Link>
              </div>
              <div
                className='post__delete'
                role='presentation'
                onClick={handleDelete}
              >
                삭제
              </div>
            </div>
          )}
          <div className='post__text post__text--pre-wrap'>{post?.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
