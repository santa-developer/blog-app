import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요.");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        // 비밀번호 확인을 먼저 입력한 후 비밀번호를 입력했는데 맞지 않을 때
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요.");
      } else if (value !== password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
      setError("");

      toast.success("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.code);
    }
  };
  return (
    // <form action='/post' method='POST' className='form form--lg'>
    <form onSubmit={onSubmit} className='form form--lg'>
      <h2 className='form__title'>회원가입</h2>
      <div className='form__block'>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          name='email'
          id='email'
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          name='password'
          id='password'
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password_confirm'>비밀번호 확인</label>
        <input
          type='password'
          name='password_confirm'
          id='password_confirm'
          required
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className='form__block'>
          <div className='form__error'>{error}</div>
        </div>
      )}
      <div className='form__block'>
        계정이 이미 있으신가요?
        <Link to='/login' className='form__link'>
          로그인하기
        </Link>
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value='회원가입'
          className='form__btn--submit'
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default SignupForm;
