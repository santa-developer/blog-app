import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // 입력값 변경 핸들러
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

      if (value.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요.");
      } else {
        setError("");
      }
    }
  };
  console.log(app);

  // 폼 제출 핸들러
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작을 하지 않도록 작업

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setError("");

      toast.success("로그인 하였습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.code);
      console.log(error);
    }
  };
  return (
    // <form action='/post' method='POST' className='form form--lg'>
    <form onSubmit={onSubmit} className='form form--lg'>
      <h2 className='form__title'>로그인</h2>
      <div className='form__block'>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          name='email'
          value={email}
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
          value={password}
          id='password'
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
        계정이 없으신가요?
        <Link to='/signup' className='form__link'>
          회원가입하기
        </Link>
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value='로그인'
          className='form__btn--submit'
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default LoginForm;
