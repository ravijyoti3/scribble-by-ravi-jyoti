import React from "react";

import { Button, Typography } from "neetoui";
import { Link } from "react-router-dom";

import UrlNotFoundImage from "images/urlNotFound";

const UrlNotFound = ({ entity = "Page", link = "/" }) => (
  <div className="flex h-screen flex-col items-center justify-center">
    <img alt="Url Not Found" className="w-1/3" src={UrlNotFoundImage} />
    <Typography style="h1">Invalid URL</Typography>
    <Typography style="body1">
      {entity} you are looking for is not found!
    </Typography>
    <Link to={link}>
      <Button className="mt-4" label="Go to home" />
    </Link>
  </div>
);

export default UrlNotFound;
