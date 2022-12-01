import React from "react";

import { Input, Typography } from "neetoui";

const Header = ({ title, setShowSearchModal }) => (
  <div className="border-b grid w-full grid-flow-col grid-cols-4 items-center py-3">
    <div className="w-full pl-5">
      <Input
        className="text-gray-600"
        placeholder="Search for articles here."
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

export default Header;
