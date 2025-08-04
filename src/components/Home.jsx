import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../features/pasteSlice";
import toast from "react-hot-toast";
function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteID = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  const insertPaste = () => {
    const randomWord = Math.random().toString(36).substring(2, 8);
    const randomNumber = Math.floor(Math.random() * 1000000);
    const paste = {
      title: title,
      value: value,
      _id: pasteID || `${randomWord}${randomNumber}`,
      createdAt: new Date().toISOString(),
    };
    if (!title || !value) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    if (pasteID) {
      // Update
      dispatch(updateToPaste(paste));
    } else {
      // Create
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteID) {
      const paste = allPastes.find((p) => p._id === pasteID);
      setTitle(paste.title);
      setValue(paste.value);
    }
  }, [pasteID]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center space-y-6">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-lg"
          value={title}
          placeholder="Enter your title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-base resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter Your Content"
          rows={12}
        />
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
          onClick={insertPaste}
        >
          {pasteID ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
    </div>
  );
}

export default Home;
