import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigaion?: boolean;
}
export interface PostProps {
  id: string;
  title: string;
  summary: string;
  email: string;
  content: string;
  createAt: string;
  updatedAt: string;
  uid: string;
}

type TabType = "all" | "my";
const PostList = ({ hasNavigaion = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    try {
      const datas = await getDocs(collection(db, "posts"));
      const newPosts = datas.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as PostProps)
      );
      setPosts(newPosts);
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생:", error);
    }
  };

  // console.log(posts);

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
                  <div className='post__date'>{post?.createAt}</div>
                </div>
                <div className='post__title'>{post?.title}</div>
                <div className='post__text'>{post?.summary}</div>
              </Link>
              {user?.email === post?.email && (
                <div className='post__utils-box'>
                  <div className='post__delete'>삭제</div>
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
