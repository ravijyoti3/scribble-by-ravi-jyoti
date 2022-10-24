import React from "react";

import { Typography } from "neetoui";

const Header = ({ title }) => (
  <div className="border-b flex w-full justify-center py-3">
    <Typography style="h4">{title}</Typography>
  </div>
);

export default Header;
