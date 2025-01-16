import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cropper from "react-easy-crop";
import getCroppedImg from "./GetCroppedImg";
import { MdClose, MdEdit } from "react-icons/md";
import { useTheme } from "../../context/themeContext";

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

const themes = [
  {
    name: "Light",
    colors: {
      primary: "#e2effb",
      secondary: "#acd2f4",
      gradColor1: "#00F2FE",
      gradColor2: "#4FACFE",
      gradColor3: "#248ae4",
      theme: "#4FACFE", // Matches the primary gradient
      fontFamily: "Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
  },
  {
    name: "Green",
    colors: {
      primary: "#E8F5E9", // Light green background
      secondary: "#A5D6A7", // Pastel green accent
      gradColor1: "#66BB6A", // Vibrant green gradient start
      gradColor2: "#43A047", // Rich green gradient end
      gradColor3: "#2E7D32", // Deep green accent
      theme: "#66BB6A", // Matches the primary gradient
      fontFamily: "'Poppins', sans-serif",
    },
  },
  {
    name: "Brown",
    colors: {
      primary: "#FAF4EB", // Beige background
      secondary: "#D7CCC8", // Soft brown accent
      gradColor1: "#BCAAA4", // Earthy brown gradient start
      gradColor2: "#8D6E63", // Warm brown gradient end
      gradColor3: "#5D4037", // Dark brown for contrast
      theme: "#8D6E63", // Matches the primary gradient
      fontFamily: "'Georgia', serif",
    },
  },
  {
    name: "Retro",
    colors: {
      primary: "#FFF8E1", // Creamy retro background
      secondary: "#FFECB3", // Soft yellow accent
      gradColor1: "#FF8A80", // Retro orange-pink gradient start
      gradColor2: "#FF5252", // Vibrant red gradient end
      gradColor3: "#FF1744", // Bold red accent
      theme: "#FF8A80", // Matches the primary gradient
      fontFamily: "'Courier New', monospace",
    },
  },
];

const Card = ({ theme }) => {
  const { colors } = theme;
  const { switchTheme } = useTheme(); // Access theme switch function

  return (
    <button
      onClick={() => switchTheme(theme.name.toLowerCase())}
      className="card font-sans scale-95 hover:scale-105 transition-transform duration-300 hover:shadow-md"
      style={{ fontFamily: colors.fontFamily }}
    >
      <div className="title text-center" style={{ color: colors.third }}>
        <p className="heading font-bold p-4 tracking-[7px] text-xl relative">
          {theme.name} Theme
        </p>
      </div>
      <div className="wrapper w-full text-sm">
        {Object.keys(colors).map((key, index) => {
          if (key !== "fontFamily") {
            const colorName = key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <div
                key={index}
                className="color p-[10px] [20px] flex justify-between"
                style={{
                  backgroundColor: colors[key],
                  color: colors.textColor1,
                  borderRadius:
                    index === 0
                      ? "5px 5px 0 0"
                      : index === 5
                        ? "0 0 5px 5px"
                        : "0",
                }}
              >
                {colorName}
                <span className="hex text-end font-mono uppercase">
                  {colors[key]}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Dynamic button to change theme */}
      {/* <div className="flex justify-center mt-2">
        <button
          className="w-full px-6 py-3 text-white grayscale hover:grayscale-0 rounded-full m-2"
          style={{ backgroundColor: colors.theme }}
          onClick={() => switchTheme(theme.name.toLowerCase())}
        >
          Change to {theme.name}
        </button>
      </div> */}

      {/* <button
        onClick={() => switchTheme(theme.name.toLowerCase())}
        class={`w-10/12 bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[${colors.gradColor1}] before:to-[${colors.gradColor2}] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]`}
      >
        {theme.name}
      </button> */}
    </button>
  );
};

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
            className="flex items-center gap-7 bg-theme rounded-l-full w-full shadow-md bg-contain bg-no-repeat bg-right"
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
                  <MdEdit className="text-3xl p-2 bg-textColor2 hover:bg-textColor1 text-Primary rounded-full" />
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
                    className="bg-green-700 text-Primary px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-Primary">
                  <h2 className="text-3xl font-semibold">
                    Welcome, {editableName}
                  </h2>
                  <button onClick={handleEditName} className="">
                    <MdEdit className="text-xl text-Primary hover:text-gray-50" />
                  </button>
                </div>
              )}
              <h4 className="text-lg text-Primary">
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
            <div className="overflow-x-auto flex gap-4 avatarScroll">
              {avatars.map((avatar, index) => (
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`w-28 h-28 object-cover border-4 rounded-full my-2 ${
                    selectedAvatar === avatar
                      ? "border-theme"
                      : "border-transparent hover:border-gray-300 grayscale hover:grayscale-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* WARNING MESSAGE */}
          <div
            className={` ${isClose ? " translate-x-[1000px] transition-transform duration-250 " : " translate-x-0 "} absolute top-0 right-0 w-2/5 md:w-2/5 lg:w-[30%] bg-Primary bg-opacity-80 text-gradColor3 p-3 rounded-md shadow-lg z-30`}
          >
            <div className="flex justify-between">
              <h4>Note!</h4>
              <MdClose
                className="size-5 hover:text-gradColor1"
                onClick={NoticeClose}
              />
            </div>
            <p>
              Please refresh the page to see the changes after updating Username
              or Avatar. Click on Theme to activate it.
            </p>
          </div>
        </div>

        {showCropper && (
          <div className="fixed inset-0 bg-Third bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-Primary p-6 rounded shadow-lg">
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
                  className="mr-2 bg-textColor2 text-Primary px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="bg-theme text-Primary px-4 py-2 rounded"
                >
                  Set as Avatar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-7">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-10 py-7 lg:mt-20 text-start">
            Themes
          </h2>
          <div className="flex flex-wrap gap-4">
            {themes.map((theme, index) => (
              <Card key={index} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
