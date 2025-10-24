import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import image from "../assets/myImage.jpg"
const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", photoURL: "" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setFormData({ name: u.displayName || "", photoURL: u.photoURL || "" });
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      {user ? (
        <div className="flex flex-col md:flex-row items-center gap-6 bg-base-100 shadow-lg p-6 rounded-lg">
          <img
            src={user.photoURL || image}
            alt={user.displayName}
            className="w-32 h-32 rounded-full object-cover border-2 border-primary"
          />
          <div className="flex-1">
            {!editMode ? (
              <>
                <p className="text-xl font-semibold">Name: {user.displayName}</p>
                <p className="text-lg">Email: {user.email}</p>
                <button className="btn btn-primary mt-4" onClick={() => setEditMode(true)}>
                  Update Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
