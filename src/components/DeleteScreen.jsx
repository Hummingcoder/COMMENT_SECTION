import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useClickOutside from "../useClickOutside";
import { addComment, deleteComment } from "../store/CommentSlice";

const DeleteScreen = ({ id, handleDelete }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  function ClickDelete() {
    if (id !== null) {
      dispatch(deleteComment(id));
    }
    handleDelete();
  }
  useClickOutside(ref, handleDelete);
  return (
    <div className="fixed z-10 bg-[#2625437e] min-w-full min-h-screen flex items-center justify-center">
      <article
        ref={ref}
        className="bg-white p-4 rounded-md shadow-md w-[90%] max-w-[380px]"
      >
        <p className="capitalize text-xl sm:text-2xl text-dark-blue">
          Delete Comment
        </p>
        <p className="mt-3 mb-4 text-sm sm:text-base text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex items-center justify-center gap-4 sm:gap-6 p-2 ">
          <button
            onClick={handleDelete}
            className="w-full bg-grayish-blue uppercase font-semibold text-white py-3 px-1 rounded-md shadow"
          >
            no, cancel
          </button>
          <button
            onClick={ClickDelete}
            className="w-full uppercase  font-semibold text-white bg-soft-red py-3 px-1 rounded-md shadow"
          >
            yes, delete
          </button>
        </div>
      </article>
    </div>
  );
};

export default DeleteScreen;
