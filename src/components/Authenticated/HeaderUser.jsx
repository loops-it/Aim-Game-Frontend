import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";

export default function HeaderUser() {
  const [avatarSrc, setAvatarSrc] = useState("/images/test.png"); // Default avatar

  // Load avatar from localStorage on component mount
  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setAvatarSrc(storedAvatar); // Set stored avatar if it exists
    }
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        setAvatarSrc(newAvatar); // Update the avatar source
        localStorage.setItem("userAvatar", newAvatar); // Save to localStorage
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  const triggerFileInput = () => {
    document.getElementById("avatarInput").click(); // Simulate a click on the hidden input
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        style={{ display: "none" }} // Hidden input
        onChange={handleAvatarChange}
      />
      <Avatar
        alt="User Avatar"
        src={avatarSrc}
        sx={{
          border: "0.5px solid #ABB3BB",
          objectFit: "contain",
          cursor: "pointer",
        }}
        onClick={triggerFileInput} // Click handler to trigger file input
      />
      <div className="text-sm">
        <div className="font-semibold">{localStorage.userName}</div>
        <div className="text-xs">{localStorage.userRole}</div>
      </div>
    </div>
  );
}
