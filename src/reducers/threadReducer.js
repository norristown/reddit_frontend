import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
  comments: [],
};

//toolkit
const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    appendThread(state, action) {
      return { ...state, threads: [...state.threads, action.payload] };
    },
    initializeThreads(state, action) {
      return { ...state, threads: action.payload };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    appendComment(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.parentId);
      const newThread = { ...findThread, comments: [...findThread.comments, action.payload] };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.parentId);
      return { ...state, threads: [...newThreads, newThread] };
    },
    initializeComments(state, action) {
      return { ...state, comments: action.payload };
    },
    appendReply(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },
    appendUpVotes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const upVoted = findThread.upVotes.find((user) => user === action.payload.user);
      const downVoted = findThread.downVotes.find((user) => user === action.payload.user);
      if (upVoted) {
        return { ...state };
      }
      if (downVoted) {
        const removeDownVote = findThread.downVotes.filter(
          (userId) => userId !== action.payload.user
        );
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          downVotes: removeDownVote,
        };
        const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
        return { ...state, threads: [...newThreads, newThread] };
      }
      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        upVotes: action.payload.upVotes,
      };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
      return { ...state, threads: [...newThreads, newThread] };
    },
    appendDownVotes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const upVoted = findThread.upVotes.find((user) => user === action.payload.user);
      const downVoted = findThread.downVotes.find((user) => user === action.payload.user);

      if (downVoted) {
        console.log('test');
        return { ...state };
      }
      if (upVoted) {
        console.log('here');
        const removeUpvote = findThread.upVotes.filter((userId) => userId !== action.payload.user);
        console.log(removeUpvote);
        const newThread = {
          ...findThread,
          likes: action.payload.likes,
          upVotes: removeUpvote,
        };
        const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
        return { ...state, threads: [...newThreads, newThread] };
      }
      const newThread = {
        ...findThread,
        likes: action.payload.likes,
        downVotes: action.payload.downVotes,
      };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
      return { ...state, threads: [...newThreads, newThread] };
    },
  },
});

export const {
  appendThread,
  initializeThreads,
  initializeComments,
  setLoading,
  appendComment,
  replyToComment,
  initializeThread,
  appendReply,
  appendUpVotes,
  appendDownVotes,
} = threadSlice.actions;

export const createThread = (object) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const newThread = await threadService.create(object);
    dispatch(appendThread(newThread));
    dispatch(setLoading(false));
  };
};

export const getThreads = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const threads = await threadService.getAll();
    dispatch(initializeThreads(threads));
    dispatch(setLoading(false));
  };
};

export const getComments = () => {
  return async (dispatch) => {
    const comments = await threadService.getComments();
    dispatch(initializeComments(comments));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await threadService.addComment(id, comment);
    console.log('addcomment', newComment);
    dispatch(appendComment(newComment));
  };
};

export const addReply = (id, comment) => {
  return async (dispatch) => {
    const newReply = await threadService.addReply(id, comment);
    console.log('reply', newReply);
    dispatch(appendReply(newReply));
  };
};

// export const updateLikes = (newObj) => {
//   return async (dispatch) => {
//     const newPost = await threadService.update(newObj);
//     console.log(newPost);
//     dispatch(appendUpVotes(newPost));
//   };
// };

export const upVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.upVote(newObj);
    console.log(newPost);
    dispatch(appendUpVotes(newPost));
  };
};

export const downVote = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.downVote(newObj);
    console.log(newPost);
    dispatch(appendDownVotes(newPost));
  };
};

export default threadSlice.reducer;
