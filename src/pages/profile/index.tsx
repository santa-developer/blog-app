import Footer from "components/Footer";
import Header from "components/Header";
import PostList from "components/PostList";
import Profile from "components/Profile";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigaion={false} defaultTab='my' />
      <Footer />
    </>
  );
};

export default ProfilePage;
