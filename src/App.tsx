import { useContext, useEffect, useState } from "react";
import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

function App() {
  const auth = getAuth(app);

  // auth를 체크하기 전에(= initialized 전)는 loader를 띄어주는 용도
  const [init, setInit] = useState<boolean>(false);
  // auth의 currentUser가 있으면 uathenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  const context = useContext(ThemeContext);

  // currentUser 값이 실시간으로 업데이트
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsAuthenticated(true);
        // ...
      } else {
        // User is signed out
        // ...
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
