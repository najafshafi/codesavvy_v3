import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "./GetCroppedImg";
import { MdClose, MdEdit } from "react-icons/md";

const avatars = [
  "https://mighty.tools/mockmind-api/content/human/41.jpg",
  "https://mighty.tools/mockmind-api/content/human/75.jpg",
  "https://mighty.tools/mockmind-api/content/human/42.jpg",
  "https://mighty.tools/mockmind-api/content/human/39.jpg",
  "https://mighty.tools/mockmind-api/content/human/43.jpg",
  "https://mighty.tools/mockmind-api/content/human/44.jpg",
  "https://mighty.tools/mockmind-api/content/human/36.jpg",
  "https://mighty.tools/mockmind-api/content/human/8.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/9.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/10.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/11.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/13.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/14.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/17.jpg",
  "https://mighty.tools/mockmind-api/content/cartoon/8.jpg",
];

const ProfilePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [isClose, setIsClose] = useState(false);
  const [currentUser, setUser] = useState(user);
  const [editableName, setEditableName] = useState(currentUser?.name || "User");
  const [isEditingName, setIsEditingName] = useState(false);

  const NoticeClose = () => {
    setIsClose(!isClose);
  };

  useEffect(() => {
    if (!currentUser) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setEditableName(JSON.parse(savedUser)?.name || "User");
      }
    }
  }, [currentUser]);

  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatar || avatars[0]
  );
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
      setUser((prev) => ({ ...prev, avatar: savedAvatar }));
    }
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setSelectedAvatar(croppedImage);
      setUser((prev) => ({ ...prev, avatar: croppedImage }));
      localStorage.setItem("avatar", croppedImage);
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping image: ", error);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUser((prev) => ({ ...prev, avatar }));
    localStorage.setItem("avatar", avatar);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setUser((prev) => ({ ...prev, name: editableName }));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...currentUser, name: editableName })
    );
    setIsEditingName(false);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between p-5 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex items-center gap-7 bg-blue-500 rounded-l-full w-full shadow-md bg-contain bg-no-repeat bg-right"
            style={{ backgroundImage: 'url("/randomShape.svg")' }}
          >
            <div className="relative">
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="w-40 h-40 border-3 rounded-full"
              />
              <div className="absolute bottom-0 right-2">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <MdEdit className="text-3xl p-2 bg-slate-400 hover:bg-slate-600 text-white rounded-full" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                    className="border rounded p-2 text-xl"
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <h2 className="text-3xl font-semibold">
                    Welcome, {editableName}
                  </h2>
                  <button onClick={handleEditName} className="">
                    <MdEdit className="text-xl text-white hover:text-gray-50" />
                  </button>
                </div>
              )}
              <h4 className="text-lg text-white">
                Email: {currentUser?.email}
              </h4>
            </div>
          </div>
        </div>

        <div className="relative flex justify-between items-start mt-14">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl">
              Select One of the images below to set new Avatar
            </p>
            <div className="overflow-x-auto flex gap-4 avatarScroll w-10/12">
              {avatars.map((avatar, index) => (
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`w-28 h-28 object-cover border-4 rounded-full my-2 ${
                    selectedAvatar === avatar
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300 grayscale hover:grayscale-0"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className={` ${isClose ? " translate-x-[1000px] transition-transform duration-250 " : " translate-x-0 "} absolute top-0 right-0 w-2/5 md:w-1/3 lg:w-[30%] bg-[#1691FF]/85 text-white p-2 rounded-md shadow-md z-30`}
          >
            <div className="flex justify-between">
              <h4>Note!</h4>
              <MdClose
                className="size-5 hover:text-gray-100"
                onClick={NoticeClose}
              />
            </div>
            <p>
              Please refresh the page to see the changes after updating Username
              or Avatar
            </p>
          </div>
        </div>

        {showCropper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Crop Your Image</h2>
              <div className="relative w-96 h-96">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowCropper(false)}
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Set as Avatar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
