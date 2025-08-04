import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromPaste } from "../features/pasteSlice";

// Note: The 'updateToPaste' import was unused, so it has been removed.

function Pastes() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Filter pastes based on the search term
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for deleting a paste
  const handleDelete = (pasteID) => {
    // Optional: Add a confirmation dialog for a better UX
    // if (window.confirm("Are you sure you want to delete this paste?")) {
    dispatch(removeFromPaste(pasteID));
    toast.success("Paste deleted successfully!");
    // }
  };

  // Handler for copying the paste content
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  
  // Handler for sharing the paste link
  const handleShare = (pasteID) => {
    // Correctly constructs the URL using the window origin and paste's _id
    const url = `${window.location.origin}/pastes/${pasteID}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard!");
  };

  // Base styles for buttons to keep the code DRY
  const buttonBaseStyles = "px-3 py-1 text-xs text-white rounded hover:opacity-90 cursor-pointer transition-opacity text-center";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Search pastes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <ul>
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <li
              key={paste?._id}
              className="p-4 mb-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex flex-col gap-3 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-lg text-gray-800">{paste.title}</span>
                <span className="text-xs text-gray-500">{paste.date || ""}</span>
              </div>
              
              <div className="mb-2 break-words text-gray-700">{paste.value}</div>
              
              <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-gray-200">
                
                
                {/* "Edit" is now a Link styled as a button for correct navigation */}
                <Link
                  to={`/pastes/${paste._id}`}
                  className={`${buttonBaseStyles} bg-blue-500`}
                >
                  Edit
                </Link>

                {/* "View" is also a Link styled as a button with a corrected path */}
                <Link
                  to={`/pastes/${paste._id}`}
                  className={`${buttonBaseStyles} bg-indigo-500`}
                >
                  View
                </Link>

                <button
                  onClick={() => handleCopyText(paste.value)}
                  className={`${buttonBaseStyles} bg-green-500`}
                >
                  Copy Text
                </button>

                <button
                  onClick={() => handleShare(paste._id)}
                  className={`${buttonBaseStyles} bg-gray-500`}
                >
                  Share
                </button>
                
                {/* "Delete" button uses a more intuitive red color */}
                <button
                  onClick={() => handleDelete(paste._id)}
                  className={`${buttonBaseStyles} bg-red-500 ml-auto`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found.</p>
        )}
      </ul>
    </div>
  );
}

export default Pastes;