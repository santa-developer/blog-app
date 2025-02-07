import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import Carousel from "components/Carousel";

const Home = () => {
  return (
    <div>
      {/* header */}
      <Header />
      <Carousel />
      {/* post list */}
      <PostList />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
