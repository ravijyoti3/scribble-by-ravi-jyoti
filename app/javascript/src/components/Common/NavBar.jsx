import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ isEditArticleRoute }) => (
  <nav className=" border-b sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-5">
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
      <NavLink
        activeClassName="neeto-ui-text-primary-500 mx-6"
        className="neeto-ui-text-gray-500 mx-6"
        to="/analytics"
      >
        <Typography style="h4">Analytics</Typography>
      </NavLink>
    </div>
    <div className="flex items-center">
      {isEditArticleRoute && (
        <div className="mr-4 rounded-md bg-green-500 px-2">
          <Typography className="text-white" style="body2">
            Published
          </Typography>
        </div>
      )}
      <Link target="_blank" to="/public">
        <Button icon={ExternalLink} label="Preview" style="secondary" />
      </Link>
    </div>
  </nav>
);

export default NavBar;
