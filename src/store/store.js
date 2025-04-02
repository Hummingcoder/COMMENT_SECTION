import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./CommentSlice";

const store = configureStore({
  reducer: {
    comments: commentSlice,
  },
});

export default store;
