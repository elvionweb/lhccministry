import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  fetchGallery,
  uploadGalleryImages,
  deleteGalleryImage,
  updateGalleryImage,
} from "../../utils/api";
import { HiTrash, HiPencil, HiX, HiPlus } from "react-icons/hi";

const CATEGORIES = [
  "Sunday Service",
  "Youth Event",
  "Worship Night",
  "Outreach",
  "Weddings",
  "Women Programe",
  "Other",
];

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Upload form state
  const [uploadCategory, setUploadCategory] = useState("Other");
  const [uploadTitle, setUploadTitle] = useState("");

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Other");

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchGallery("All");
      setImages(data || []);
    } catch (error) {
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error("You can only upload up to 10 images at once");
      return;
    }

    setSelectedFiles(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeSelectedFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0)
      return toast.error("Please select images to upload");

    try {
      setUploading(true);
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("images", file));
      formData.append("category", uploadCategory);
      if (uploadTitle) formData.append("title", uploadTitle);

      await uploadGalleryImages(formData);

      toast.success("Images uploaded successfully");
      setSelectedFiles([]);
      setPreviews([]);
      setUploadTitle("");
      setUploadCategory("Other");

      loadImages();
    } catch (error) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteGalleryImage(id);
      toast.success("Image deleted");
      loadImages();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const handleEditClick = (image) => {
    setEditingId(image._id);
    setEditTitle(image.title || "");
    setEditCategory(image.category);
  };

  const handleUpdate = async (id) => {
    try {
      await updateGalleryImage(id, {
        title: editTitle,
        category: editCategory,
      });
      toast.success("Image updated");
      setEditingId(null);
      loadImages();
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-blue-700 tracking-tighter uppercase">
          Gallery Manager
        </h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-cyan-500 mb-4">
          Upload New Images
        </h2>
        <form onSubmit={handleUpload}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images (Max 10)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md p-1"
                disabled={uploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Category
              </label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-36 text-sm md:text-base md:w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={uploading}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Global Title (Optional - applied to all uploads)
              </label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Sunday Service Highlights"
                disabled={uploading}
              />
            </div>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Previews ({previews.length}/10):
              </p>
              <div className="flex flex-wrap gap-3">
                {previews.map((preview, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <HiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
          >
            {uploading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <HiPlus />
            )}
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </form>
      </div>

      {/* Grid Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-blue-700 font-heading mb-4">
          Manage Images
        </h2>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : images.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No images found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="border border-gray-200 rounded-lg overflow-hidden group"
              >
                <div className="aspect-square relative flex bg-gray-100">
                  <img
                    src={image.imageUrl.replace(
                      "/upload/",
                      "/upload/w_300,h_300,c_fill,q_auto,f_auto/",
                    )}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(image)}
                      className="bg-white p-1.5 rounded-md shadow text-blue-600 hover:text-blue-800"
                    >
                      <HiPencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="bg-white p-1.5 rounded-md shadow text-red-600 hover:text-red-800"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-2 border-t border-gray-100 h-28 flex flex-col justify-between">
                  {editingId === image._id ? (
                    <div className="flex flex-col gap-1 w-full text-sm h-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border rounded px-1.5 py-1 text-xs w-full"
                        placeholder="Title..."
                      />
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="border rounded px-1.5 py-1 text-xs w-full bg-white flex-1"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1 mt-1 shrink-0">
                        <button
                          onClick={() => handleUpdate(image._id)}
                          className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-full"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded w-full"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded font-medium mb-1 truncate max-w-full">
                          {image.category}
                        </span>
                        <p
                          className="text-sm font-medium text-gray-800 truncate"
                          title={image.title || "No title"}
                        >
                          {image.title || (
                            <span className="text-gray-400 italic">
                              No title
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
