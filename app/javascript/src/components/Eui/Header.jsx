import React, { useEffect } from "react";

import { Search } from "neetoicons";
import { Input, Typography, Kbd } from "neetoui";

const Header = ({ title, showSearchModal, setShowSearchModal }) => {
  const keysPressed = {};

  const handleShortcuts = event => {
    keysPressed[event.key] = true;
    if ((keysPressed["Control"] || keysPressed["Meta"]) && event.key === "k") {
      if (!showSearchModal) {
        event.preventDefault();
        setShowSearchModal(true);
      } else {
        setShowSearchModal(false);
      }
    }

    if (event.code === "Escape" && showSearchModal) {
      setShowSearchModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShortcuts);

    return () => {
      window.removeEventListener("keydown", handleShortcuts);
    };
  }, [showSearchModal]);

  return (
    <div className="border-b grid w-full grid-flow-col grid-cols-4 items-center py-3">
      <div className="w-full pl-5">
        <Input
          className="text-gray-600"
          placeholder="Search for articles here."
          prefix={<Search />}
          suffix={
            <div className="flex items-center">
              <Kbd className="mr-1" keyName="⌘" />
              <Kbd keyName="K" />
            </div>
          }
          onClick={() => setShowSearchModal(true)}
        />
      </div>
      <Typography
        className="col-span-3 place-items-center text-center"
        style="h4"
      >
        {title}
      </Typography>
    </div>
  );
};

export default Header;
