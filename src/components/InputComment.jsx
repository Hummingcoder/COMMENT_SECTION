import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addReply } from "../store/CommentSlice";

const InputComment = ({
  id = null,
  username = "",
  isReply = false,
  func = null,
}) => {
  const user = useSelector((store) => store.comments.currentUser);
  const [input, setInput] = useState(
    username.length > 0 ? `@${username}, ` : ""
  );

  const dispatch = useDispatch();

  const handleSend = () => {
    const name = `@${username},`;
    const arr = input.split(name).map((txt) => txt.trim());
    const content = arr.filter((txt) => txt !== name).join(" ");

    const date = new Date();
    if (!isReply) {
      dispatch(
        addComment({
          id: date.getMilliseconds(),
          content: content,
          createdAt: "Now",
          score: 0,
          user: user,
          replies: [],
        })
      );
    } else {
      dispatch(
        addReply({
          reply: {
            id: date.getMilliseconds(),
            content: content,
            createdAt: "Now",
            score: 0,
            user: user,
            replyingTo: username,
            replies: [],
          },
          repliedTo: id,
        })
      );
      if (func !== null) {
        func();
      }
    }
    setInput(username && username.length > 0 ? `@${username}, ` : "");
  };

  const ref = useRef(null);

  useEffect(() => {
    {
      if (isReply) {
        ref.current.scrollIntoView({ behavior: "smooth" });
        window.scrollBy({ top: -30, behavior: "smooth" });
        ref.current.focus();
      }
    }
  }, []);

  return (
    <div className="w-full p-2">
      <article className="w-full rounded-lg bg-white p-4">
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          ref={ref}
          className="w-full min-h-[100px] text-grayish-blue border border-light-gray hover:border-dark-blue focus:border-dark-blue rounded-lg p-2 resize-none outline-none mb-4 text-sm sm:text-base"
          maxLength={150}
          placeholder="Add a comment..."
          name="comment"
          id="comment"
        ></textarea>
        <div className="flex items-center justify-between">
          <img
            className="w-[40px] h-[40px]"
            src={user.image.png}
            alt={user.username}
          />
          <button
            onClick={() => handleSend()}
            className="bg-moderate-blue py-2 px-6 rounded-lg text-white font-semibold"
          >
            SEND
          </button>
        </div>
      </article>
    </div>
  );
};

export default InputComment;
