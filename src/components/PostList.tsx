import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigaion?: boolean;
}
export interface PostProps {
  id: string;
  title: string;
  summary: string;
  email: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

type TabType = "all" | "my";
const PostList = ({ hasNavigaion = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  // 게시글 가져오기
  const getPosts = async () => {
    try {
      // query와 orderBy를 이용하여 createdAt기준으로 데이터 정렬
      let postsRef = collection(db, "posts");
      let postQuery = query(postsRef, orderBy("createdAt", "asc"));
      // 쿼리 실행하여 정렬된 데이터 가져오기
      const datas = await getDocs(postQuery);
      const newPosts = datas.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as PostProps)
      );
      setPosts(newPosts);
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생:", error);
    }
  };

  // console.log(posts);

  // 게시글 삭제하기
  const handleDelte = async (id: string) => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");

      getPosts(); // 게시글 리스트 새로 호출
    }
  };

  // 페이지 렌더링 될 때 getPosts 가져오기
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {/* nav */}
      {hasNavigaion && (
        <div className='post__navigation'>
          <div
            role='presentation'
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role='presentation'
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            내 글
          </div>
        </div>
      )}
      <div className='post__list'>
        {posts?.length > 0 ? (
          posts?.map((post, i) => (
            // 키값을 인덱스로 주면 리스트에서 키값이 변경되었을 때 제대로 업데이트가 되지 않을 수 있기 때문에 꼭 id로 줘야 한다.
            <div key={post?.id} className='post__box'>
              <Link to={`/posts/${post?.id}`}>
                <div className='post__profile-box'>
                  <div className='post__profile'></div>
                  <div className='post__author-name'>{post?.email}</div>
                  <div className='post__date'>{post?.createdAt}</div>
                </div>
                <div className='post__title'>{post?.title}</div>
                <div className='post__text'>{post?.summary}</div>
              </Link>
              {user?.email === post?.email && (
                <div className='post__utils-box'>
                  <div
                    className='post__delete'
                    role='presentation'
                    onClick={async () => handleDelte(post.id as string)}
                  >
                    삭제
                  </div>
                  <div className='post__edit'>
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='post__no-post'>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
