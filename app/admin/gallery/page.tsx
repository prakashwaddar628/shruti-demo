"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, UploadCloud, Plus, Loader2 } from "lucide-react";

export default function GalleryManager() {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Wedding");

  // 1. Fetch Images on Load
  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setImages(data);
  }

  // 2. Handle File Upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileName = `${Date.now()}-${file.name}`;
    setUploading(true);

    try {
      // A. Upload to Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // B. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(fileName);

      // C. Save to Database Table
      const { error: dbError } = await supabase
        .from("gallery_images")
        .insert([{ image_url: publicUrl, category: selectedCategory }]);

      if (dbError) throw dbError;

      // D. Refresh Grid
      fetchImages();
      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      // Extract filename from URL to delete from storage
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("portfolio").remove([fileName]);
      }

      // Delete from Database
      await supabase.from("gallery_images").delete().eq("id", id);

      // Update UI
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      alert("Error deleting image");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gallery Manager</h1>
          <p className="text-gray-500">
            Add or remove photos from your public portfolio.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          {/* Category Selector */}
          <select
            className="bg-gray-900 border border-gray-700 text-white p-3 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Wedding">Wedding</option>
            <option value="Pre-Wedding">Pre-Wedding</option>
            <option value="Portraits">Portraits</option>
            <option value="Events">Events</option>
            <option value="Cinematic">Cinematic</option>
          </select>

          {/* Hidden File Input + Custom Button */}
          <label className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors cursor-pointer">
            {uploading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <UploadCloud size={20} />
            )}
            {uploading ? "Uploading..." : "Upload New"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group aspect-square rounded-xl overflow-hidden bg-gray-900 border border-gray-800"
          >
            <img
              src={img.image_url}
              alt="Gallery"
              className="w-full h-full object-cover"
            />

            {/* Delete Button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(img.id, img.image_url)}
                className="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-1 text-xs text-center text-gray-300 font-bold uppercase">
              {img.category}
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500">
            No images yet. Select a category and upload one!
          </div>
        )}
      </div>
    </div>
  );
}
