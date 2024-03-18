import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  if (loading) return <div>logging you in...</div>;

  return (
    <form onSubmit={handleLogin} className="text-black flex flex-col">
      <label>Username: </label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="bg-green-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;