import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigaion?: boolean;
}
const PostList = ({ hasNavigaion = true }: PostListProps) => {
  return (
    <>
      {/* nav */}
      {hasNavigaion && (
        <div className='post__navigation'>
          <div className='post__navigation--active'>전체</div>
          <div>내 글</div>
        </div>
      )}
      <div className='post__list'>
        {[...Array(10)].map((e, i) => (
          <div key={i} className='post__box'>
            <Link to={`/posts/${i}`}>
              <div className='post__profile-box'>
                <div className='post__profile'></div>
                <div className='post__author-name'>fast campus</div>
                <div className='post__date'>2025.02.04</div>
              </div>
              <div className='post__title'>게시글 {i + 1}</div>
              <div className='post__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur ipsum non justo molestie, at placerat tellus
                faucibus. Donec non condimentum odio, vel bibendum neque. Sed
                vulputate, quam id tincidunt malesuada, mauris velit consectetur
                lectus, in iaculis nisi nisi ac arcu.
              </div>
              <div className='post__utils-box'>
                <div className='post__delete'>삭제</div>
                <div className='post__edit'>수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
