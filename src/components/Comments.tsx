import React, { useContext, useState } from "react";
import { CommentsInterface, PostProps } from "./PostList";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface CommentProps {
  post: PostProps;
  getPosts: (id: string) => void;
}
const Comments = ({ post, getPosts }: CommentProps) => {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  // 입력 값 변경 핸들러
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  // console.log(post);
  // 폼 제출 핸들러
  // 댓글이 제출되기 위한 조건: posts값이 필요하기 때문에 props로 받아와야.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commetObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commetObj), // 댓글은 배열로 가져와야 하기 때문에
            updatedAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
          await getPosts(post.id);
        }
      }
      toast.success("댓글을 생성하였습니다.");
      setComment("");
    } catch (e: any) {
      toast?.error(e?.code);
      console.log(e);
    }
  };

  //  댓글 삭제 이벤트
  const handleDelete = async (data: CommentsInterface) => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirm && post.id) {
      const postRef = doc(db, "posts", post?.id);
      // 댓글은 게시글에 배열형태로 데이터가 업데이트 되는 것이기 때문에
      // 삭제할 때 updateDoc 으로 호출
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success("댓글이 삭제되었습니다.");
      getPosts(post?.id);
    }
  };
  return (
    <div className='comments'>
      <form onSubmit={onSubmit} className='comments__form'>
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
        <div className='form__block form__block-reverse'>
          <input
            type='submit'
            id='submit'
            value='입력'
            className='form__btn-submit'
          />
        </div>
      </form>
      <div className='comments__list'>
        {post?.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.createdAt} className='comment__box'>
              <div className='comment__profile-box'>
                <div className='comment__email'>{comment?.email}</div>
                <div className='cooment__date'>{comment?.createdAt}</div>
                {user?.uid === comment.uid && (
                  <div
                    className='comment__delete'
                    role='presentation'
                    onClick={() => handleDelete(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className='comment__text'>{comment?.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
