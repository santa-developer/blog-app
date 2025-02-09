import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.code);
      console.log(error);
    }
  };
  return (
    <div className='profile__box'>
      <div className='flex__box-lg'>
        <div className='profile__image'></div>
        <div>
          <div className='profile__email'>{auth?.currentUser?.email}</div>
          <div className='profile__name'>
            {auth?.currentUser?.displayName || "사용자"}
          </div>
        </div>
      </div>
      <div
        role='presentation'
        className='profile__logout'
        onClick={logOutHandler}
      >
        로그아웃
      </div>
    </div>
  );
};

export default Profile;
