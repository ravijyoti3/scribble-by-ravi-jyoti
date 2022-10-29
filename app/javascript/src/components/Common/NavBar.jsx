import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => (
  <nav className="border-b-1 border-b flex h-16 w-full items-center justify-between px-5">
    <div className="flex items-center">
      <Typography className="mr-5" style="h3">
        Scribble
      </Typography>
      <NavLink
        activeClassName="neeto-ui-text-primary-500 mx-6"
        className="neeto-ui-text-gray-500 mx-6 "
        to="/articles"
      >
        <Typography style="h4">Articles</Typography>
      </NavLink>
      <NavLink
        activeClassName="neeto-ui-text-primary-500 mx-6"
        className="neeto-ui-text-gray-500 mx-6"
        to="/settings?tab=general"
      >
        <Typography style="h4">Settings</Typography>
      </NavLink>
    </div>
    <Link target="_blank" to="/public">
      <Button icon={ExternalLink} label="Preview" style="secondary" />
    </Link>
  </nav>
);

export default NavBar;
