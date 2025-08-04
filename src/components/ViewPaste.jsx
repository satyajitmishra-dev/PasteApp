import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function ViewPaste() {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  
  // Find the specific paste by ID
  const paste = pastes.find(p => p._id === id);
  
  // Handle copy functionality
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Content copied to clipboard!");
  };

  // Handle share functionality
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard!");
  };

  // If paste not found
  if (!paste) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Paste Not Found</h2>
          <p className="text-gray-600 mb-6">The paste you're looking for doesn't exist or may have been deleted.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col space-y-6">
        
        {/* Header with title and date */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">View Paste</h1>
          {paste.date && (
            <span className="text-sm text-gray-500">
              Created: {new Date(paste.date).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Title Input (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none w-full text-lg bg-gray-50"
            value={paste.title || "Untitled"}
            placeholder="Enter your title"
            disabled
            readOnly
          />
        </div>

        {/* Content Textarea (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-base resize-none"
            value={paste.value || "No content"}
            placeholder="No content available"
            disabled
            readOnly
            rows={12}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleCopyText(paste.value)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
          >
            📋 Copy Content
          </button>
          
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            🔗 Share Link
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Paste Stats (Optional) */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Character Count:</span> {paste.value?.length || 0}
            </div>
            <div>
              <span className="font-medium">Word Count:</span> {paste.value?.split(/\s+/).filter(word => word.length > 0).length || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
