import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className='profile__box'>
      <div className='flex__box-lg'>
        <div className='profile__image'></div>
        <div>
          <div className='profile__email'>test@gmail.com</div>
          <div className='profile__name'>santa</div>
        </div>
      </div>
      <Link to='/' className='profile__logout'>
        로그아웃
      </Link>
    </div>
  );
};

export default Profile;
