import React from "react";

import { Typography } from "neetoui";

import Table from "./Table";

const Redirections = () => (
  <div className="flex w-full justify-center">
    <div className="w-3/5 pt-12">
      <Typography style="h3">Redirections</Typography>
      <Typography className="mt-1 text-gray-600" style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="mt-5 bg-indigo-100 p-8">
        <Table />
      </div>
    </div>
  </div>
);
export default Redirections;
