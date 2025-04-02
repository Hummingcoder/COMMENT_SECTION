import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = { ...data };

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (store, action) => {
      store.comments.push(action.payload);
    },
    deleteComment: (store, action) => {
      const deleteReply = (comments) => {
        return comments
          .filter((comment) => comment.id !== action.payload)
          .map((comment) => {
            return comment.replies
              ? { ...comment, replies: deleteReply(comment.replies) }
              : comment;
          });
      };

      store.comments = deleteReply(store.comments);
    },
    addReply: (store, action) => {
      const ID = action.payload.repliedTo;
      const addNewReply = (comments) => {
        return comments.map((comment) => {
          if (comment.id === ID) {
            return comment.replies
              ? {
                  ...comment,
                  replies: [...comment.replies, action.payload.reply],
                }
              : { ...comment, replies: [action.payload.reply] };
          } else if (comment.replies) {
            return { ...comment, replies: addNewReply(comment.replies) };
          }
          return comment;
        });
      };

      store.comments = addNewReply(store.comments);
    },

    editComment: (store, action) => {
      const updateComment = (comments) => {
        return comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return { ...comment, content: action.payload.content };
          } else if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies) };
          }
          return comment;
        });
      };

      store.comments = updateComment(store.comments);
    },

    changeScore: (store, action) => {
      const ID = action.payload.repliedTo;
      const addNewReply = (comments) => {
        return comments.map((comment) => {
          if (comment.id === ID) {
            return {
              ...comment,
              score: action.payload.score,
            };
          } else if (comment.replies) {
            return { ...comment, replies: addNewReply(comment.replies) };
          }
          return comment;
        });
      };

      store.comments = addNewReply(store.comments);
    },
  },
});

export const { addComment, deleteComment, addReply, editComment, changeScore } =
  commentSlice.actions;
export default commentSlice.reducer;
