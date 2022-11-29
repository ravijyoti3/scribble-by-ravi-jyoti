import React from "react";

import { Typography, Button } from "neetoui";

const SideBar = () => (
  <div className="border-l h-screen px-5 pt-5">
    <Typography style="h2">Version History</Typography>
    <Typography className="text-gray-600" style="body2">
      Version history of Setting up an account in Scribble.
    </Typography>
    <div className="mt-2 flex items-center">
      <Typography className="text-gray-600" style="body2">
        10:00 AM, 12/20/2021
      </Typography>
      <Button className="ml-5" label="Article Drafted" style="link" />
    </div>
  </div>
);

export default SideBar;
