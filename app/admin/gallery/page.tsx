"use client";

import { useState } from "react";
import { Trash2, UploadCloud, Plus } from "lucide-react";

// Mock Data (Connect to Supabase 'gallery_images' later)
const initialImages = [
  { id: 1, url: "1519741497674-611481863552", category: "Wedding" },
  { id: 2, url: "1511285560982-1351cdeb9821", category: "Pre-Wedding" },
  { id: 3, url: "1532712938310-341d957b4473", category: "Portraits" },
  { id: 4, url: "1529636798413-087529f79c24", category: "Events" },
];

export default function GalleryManager() {
  const [images, setImages] = useState(initialImages);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id));
      // Add Supabase delete logic here
    }
  };

  const handleUpload = () => {
    alert("This will open the File Picker to upload to Supabase Storage.");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gallery Manager</h1>
          <p className="text-gray-500">
            Add or remove photos from your public portfolio.
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
        >
          <UploadCloud size={20} /> Upload New Photo
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Upload Placeholder */}
        <div
          onClick={handleUpload}
          className="aspect-square border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 cursor-pointer transition-all"
        >
          <Plus size={40} />
          <span className="font-bold mt-2">Add Photo</span>
        </div>

        {/* Existing Images */}
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group aspect-square rounded-xl overflow-hidden bg-gray-900"
          >
            <img
              src={`https://images.unsplash.com/photo-${img.url}?w=400&q=80`}
              alt="Gallery"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleDelete(img.id)}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-xl"
                title="Delete Image"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-xs text-center text-gray-400">
              {img.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
