import React, { useRef, useState } from "react";
import useClickOutside from "../useClickOutside";
import { useDispatch } from "react-redux";
import { editComment } from "../store/CommentSlice";

const CommentEdit = ({ id, content, username, setisEditing }) => {
  const [text, settext] = useState(`@${username}, `.concat(content));
  const textRef = useRef(null);
  const dispatch = useDispatch();

  const handleSend = () => {
    const name = `@${username},`;
    const arr = text.split(name).map((txt) => txt.trim());
    const content = arr.filter((txt) => txt !== name).join(" ");
    dispatch(
      editComment({
        content,
        id,
      })
    );
    settext(username && username.length > 0 ? `@${username}, ` : "");
    setisEditing(false);
  };

  useClickOutside(textRef, () => {
    setisEditing(false);
  });

  return (
    <article ref={textRef} className="flex items-end flex-col ">
      <textarea
        onChange={(e) => settext(e.target.value)}
        value={text}
        name="text"
        id="text"
        className="w-full min-h-[100px] border rounded-lg p-2 my-4 resize-none outline-none"
      ></textarea>
      <button
        onClick={handleSend}
        className="bg-moderate-blue py-2 px-6 rounded-lg text-white text-right font-semibold text-sm sm:text-base"
      >
        SAVE
      </button>
    </article>
  );
};

export default CommentEdit;
