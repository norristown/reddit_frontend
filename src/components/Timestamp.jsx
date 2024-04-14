import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === c.user.id);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!user) return <div>loading...</div>;
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        <span className="font-bold md:text-green-500 hover:underline">{c.user.username}</span>
      </Link>{' '}
      {'\u2219'} {c.date}
    </div>
  );
};
export default Timestamp;
