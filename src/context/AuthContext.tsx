import { createContext, ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps {
  children?: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null, // user는 firebase/auth 를 통해 타입을 가져옴
});
// 위의 user를 호출하면 호출할 때 마다 onAuthStateChanged 함수를 통해 currentUser 값이 업데이트 되는지 확인

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);

  // 현재 user 상태 값
  const [currentUser, setCurrentUSer] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUSer(user);
      } else {
        setCurrentUSer(user);
      }
    });
  }, [auth]);

  // Provider는 value라는 props를 하위의 children에게 넘겨줘야 한다.
  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
