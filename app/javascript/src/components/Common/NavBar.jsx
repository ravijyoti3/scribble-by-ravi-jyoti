import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  return (
    <nav className="border-b-1 border-b flex h-16 w-full items-center justify-between px-5">
      <div className="flex items-center">
        <Typography className="mr-5" style="h3">
          Scribble
        </Typography>
        <Button
          className="mr-5"
          label="Articles"
          style="secondary-text"
          onClick={() => history.push("/articles", { resetTab: true })}
        />
        <Button label="Settings" style="link" />
      </div>
      <Button icon={ExternalLink} label="Preview" style="secondary" />
    </nav>
  );
};

export default NavBar;
