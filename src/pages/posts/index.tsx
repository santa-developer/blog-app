import React from "react";
import Header from "components/Header";
import PostList from "components/PostList";
import Footer from "components/Footer";

const PostPage = () => {
  return (
    <>
      <Header />
      <PostList hasNavigaion={false} />
      <Footer />
    </>
  );
};

export default PostPage;
