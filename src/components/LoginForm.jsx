import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import Modal from './Modal';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  if (loading && !error) return <div>logging you in...</div>;

  return (
    <div className="grid auto-rows-min">
      <form
        onSubmit={handleLogin}
        className="grid auto-rows-min place-content-center place-items-end gap-2"
      >
        {error && <div className="text-red-500">wrong username or password</div>}
        <div className="flex flex-col items-start">
          <label>Username: </label>
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="row-start-2 flex flex-col items-start">
          <label>Password: </label>
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 rounded p-2 text-sm row-start-3"
        >
          Login
        </button>
      </form>

      <div>
        <hr className="my-2" />
        No account? Click here to sign up.
      </div>
    </div>
  );
};

export default LoginForm;
