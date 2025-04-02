import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./components/Comment";
import InputComment from "./components/InputComment";
import DeleteScreen from "./components/DeleteScreen";

const App = () => {
  const comments = useSelector((store) => store.comments.comments);
  const [showDeleteScreen, setshowDeleteScreen] = useState(false);
  const [deleteElemId, setdeleteElemId] = useState(null);

  const handleDelID = (id) => {
    setdeleteElemId(id);
    setshowDeleteScreen(true);
  };

  const handleDelete = () => {
    setshowDeleteScreen(false);
    setdeleteElemId(null);
  };

  return (
    <main className="bg-very-light-gray font-rubik">
      {showDeleteScreen === true && deleteElemId !== null && (
        <DeleteScreen id={deleteElemId} handleDelete={handleDelete} />
      )}
      <div className="w-full min-h-screen pt-4 max-w-[700px] mx-auto">
        {comments.map((item) => (
          <Comment key={item.id} {...item} handleDelID={handleDelID} />
        ))}
        <InputComment />
      </div>
    </main>
  );
};

export default App;
