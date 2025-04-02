import React, { use, useRef, useState } from "react";
import InputComment from "./InputComment";
import useClickOutside from "../useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import CommentEdit from "./CommentEdit";
import { changeScore } from "../store/CommentSlice";
const Comment = ({
  id,
  replyingTo,
  content,
  createdAt,
  score,
  user,
  replies,
  handleDelID,
}) => {
  const [isReplying, setisReplying] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  function handleIsReplying() {
    setisReplying(false);
  }

  const ref = useRef(null);

  useClickOutside(ref, () => {
    handleIsReplying();
  });

  const currUser = useSelector((store) => store.comments.currentUser);
  const dispatch = useDispatch();
  const [sc, setSc] = useState(score);

  const increaseScore = () => {
    setSc((prev) => prev + 1);

    dispatch(changeScore(sc));
  };
  const decreaseScore = () => {
    setSc((prev) => prev - 1);

    dispatch(changeScore(sc));
  };

  return (
    <>
      <div className="p-2 w-full">
        <article className="w-full p-4 bg-white shadow-md shadow-light-gray rounded-lg relative flex flex-col md:flex-row-reverse">
          <section className="text-grayish-blue w-full">
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <img
                  className="w-[35px] h-[35px]"
                  src={user.image.png}
                  alt={user.username}
                />
                <p className="font-semibold text-dark-blue">
                  {user.username}{" "}
                  {currUser.username === user.username && (
                    <span className="font-thin ml-1 text-xs sm:text-sm bg-moderate-blue text-white px-2 pb-1 rounded-sm">
                      you
                    </span>
                  )}
                </p>
              </div>
              <p className="sm:text-base text-xs">{createdAt}</p>
            </div>
            <div className="w-full my-3">
              {isEditing ? (
                <CommentEdit
                  content={content}
                  setisEditing={setisEditing}
                  username={user.username}
                  id={id}
                />
              ) : (
                <p className="text-sm sm:text-base">
                  {replyingTo && (
                    <span className="text-moderate-blue font-semibold">
                      @{replyingTo}
                    </span>
                  )}{" "}
                  {content}
                </p>
              )}
            </div>
          </section>
          <section className="w-full md:w-fit flex items-center justify-between">
            <div
              className="w-fit h-fit flex flex-row md:flex-col
             items-center gap-3 bg-gray-100 text-light-grayish-blue p-2 rounded-lg md:mr-4"
            >
              <button
                onClick={increaseScore}
                className="p-1 rounded-full text-2xl cursor-pointer filter transition duration-100 hover:contrast-[60%]"
              >
                <img
                  src="./images/icon-plus.svg"
                  alt="plus-icon"
                  className="min-w-[12px] max-w-[12px] "
                />
              </button>
              <p className="text-moderate-blue font-semibold">{sc}</p>
              <button
                onClick={decreaseScore}
                className="p-1 rounded-full text-2xl cursor-pointer filter transition duration-100 hover:contrast-[60%]"
              >
                <img
                  src="./images/icon-minus.svg"
                  alt="plus-minus"
                  className="min-w-[12px] max-w-[12px] "
                />
              </button>
            </div>
            {/* ----------------------------------------------------------- */}
            {user.username === currUser.username ? (
              <div className="flex items-center gap-4 md:absolute md:top-2 md:right-0 md:transform-[translate(-20%,50%)]">
                <button
                  onClick={() => handleDelID(id)}
                  className="capitalize cursor-pointer font-semibold text-red-400  flex items-center gap-2 text-sm sm:text-base"
                >
                  <img
                    src="./images/icon-delete.svg"
                    className="sm:max-w-[14px] max-w-[10px]"
                    alt="icon-delete"
                  />
                  Delete
                </button>

                {isEditing === false && (
                  <button
                    onClick={() => setisEditing(true)}
                    className="capitalize font-semibold text-moderate-blue  flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                  >
                    <img
                      src="./images/icon-edit.svg"
                      alt="edit-icon"
                      className="sm:max-w-[14px] max-w-[10px]"
                    />{" "}
                    Edit
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setisReplying(true)}
                className="capitalize text-moderate-blue  font-semibold flex items-center gap-2 cursor-pointer text-sm sm:text-base  md:absolute md:top-2 md:right-0 md:transform-[translate(-50%,50%)]"
              >
                <img
                  src="./images/icon-reply.svg"
                  className="sm:max-w-[14px] max-w-[10px]"
                  alt="icon-reply"
                />
                reply
              </button>
            )}
          </section>
        </article>
      </div>
      {isReplying === true && (
        <div ref={ref} className="w-full">
          <InputComment
            id={id}
            username={user.username}
            isReply={true}
            func={handleIsReplying}
          />
        </div>
      )}
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <div
            key={reply.id}
            className="ml-3 md:ml-12 sm:ml-5 border-l-3 border-light-gray pl-1 sm:pl-5"
          >
            <Comment {...reply} handleDelID={handleDelID} />
          </div>
        ))}
    </>
  );
};

export default Comment;
