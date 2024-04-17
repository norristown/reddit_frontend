import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getThreads } from '../reducers/threadReducer';
import Reply from './Reply';
import Timestamp from './Timestamp';
import ModalComment from './ModalComment';
import VoteReply from './VoteReply';
import Dropdown from './Dropdown';
import { getImages } from '../reducers/imageReducer';
import Toggle from './Toggle';
import { Link } from 'react-router-dom';
import VotePost from './VotePost';

const Thread = () => {
  const threads = useSelector((state) => state.thread.threads);
  const comments = useSelector((state) => state.thread.comments);
  const id = useParams().id;
  const dispatch = useDispatch();
  const thread = threads.find((t) => t.id === id);
  useEffect(() => {
    dispatch(getThreads());
    dispatch(getComments());
    dispatch(getImages());
  }, [dispatch]);
  const user = useSelector((state) => state.login.user);
  const users = useSelector((state) => state.users);
  const author = users.find((user) => user.id === thread.author);
  const images = useSelector((state) => state.images);

  if (!thread) return null;

  const findComments = comments.filter((comment) => comment.parentId === id);
  const sorted = [...findComments].sort((a, b) => a.created - b.created);
  const image = images.find((image) => image.threadId === thread.id);

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="md:bg-zinc-200 py-4 md:px-8 rounded md:shadow-lg md:border text-sm md:text-base">
        <div className="flex flex-row justify-between">
          <h1 className="px-2 font-bold md:text-3xl text-xl text-zinc-100 md:text-zinc-900">
            {thread.title} posted by{' '}
            <Link to={`/users/${thread.author}`} className="hover:underline">
              {!author ? <span>loading</span> : <span>{author.username}</span>}
            </Link>
          </h1>
          {user && thread.author === user.id && <Dropdown />}
        </div>
        {thread.edited && (
          <div className="ml-4 mt-2 text-xs text-red-700">this post has been edited</div>
        )}
        <div className="my-4 md:ml-0 p-2 md:p-8 bg-zinc-300 text-zinc-900 md:rounded whitespace-pre-wrap">
          <div>{thread.content}</div>
          {image && (
            <Toggle>
              <img src={image.url} className="rounded" alt="alt" />
            </Toggle>
          )}
        </div>
        <div className="flex justify-center items-center md:justify-start gap-4">
          <VotePost thread={thread} />
          <ModalComment />
        </div>
        {sorted.length === 0 && (
          <div className="text-zinc-100 md:text-zinc-800 mt-2 mr-2">
            Nothing seems to be here yet...
          </div>
        )}
        {sorted.map((c, i) => (
          <div key={i} className="text-zinc-100 text-sm bg-zinc-800 my-2 md:pb-2 rounded">
            <div className="px-2">
              <Timestamp c={c} />
              <div className="whitespace-pre-wrap p-1">{c.text}</div>
              <VoteReply comment={c} />
              {comments.map((reply) => {
                return (
                  reply.parentId === c.id && (
                    <div
                      className="flex flex-col mx-2 border-l border-green-600 px-2"
                      key={reply.id}
                    >
                      <Timestamp c={reply} />
                      <div className="whitespace-pre-wrap p-1">{reply.text}</div>
                      <VoteReply comment={reply} />
                      <Reply replyId={reply.id} />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
