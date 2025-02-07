import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";
import Profile from "components/Profile";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigaion={false} />
      <Footer />
    </>
  );
};

export default ProfilePage;
