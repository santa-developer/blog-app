import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

const Home = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* post list */}
      <PostList />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
