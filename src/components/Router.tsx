import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/home";
import PostList from "pages/posts";
import Postdetail from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignUpPage from "pages/signup";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  // firebase Auth 인증 상태 여부(boolean)에 따른 상태관리

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          // 로그인 사용자 전용 라우트
          <>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<PostList />} />
            <Route path='/posts/:id' element={<Postdetail />} />
            <Route path='/posts/new' element={<PostNew />} />
            <Route path='/posts/edit/:id' element={<PostEdit />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='*' element={<Navigate replace to='/' />} />
          </>
        ) : (
          // 비로그인 사용자 전용 라우트
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            {/* path='*': 존재하지 않는 경로로 이동하면 로그인 페이지로 리다이렉트. */}
            <Route path='*' element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
