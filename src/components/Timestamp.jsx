import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  const comments = useSelector((state) => state.thread.comments);
  const comment = comments.find((comment) => comment.id === c.id);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === c.user.id);

  console.log('c id', c.user.id);
  // console.log(comment);
  console.log('users', users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!user) return <div>loading...</div>;
  return (
    <div className="font-bold">
      <Link to={`/users/${user.id}`}>
        <span>{user.username}</span>
      </Link>
      {'\u2219'} {c.date}
    </div>
  );
};
export default Timestamp;

// need to get user id nested
