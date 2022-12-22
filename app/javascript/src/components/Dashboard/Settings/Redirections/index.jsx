import React from "react";

import { Typography, PageLoader } from "neetoui";
import { useQuery } from "react-query";

import redirectionsApi from "apis/admin/redirections";

import Table from "./Table";

const Redirections = () => {
  const {
    data: redirections,
    isLoading,
    refetch: fetchRedirections,
  } = useQuery(
    "fetchRedirections",
    async () => {
      const { data } = await redirectionsApi.fetch();

      return data.redirections;
    },
    {
      onError: error => logger.error(error),
    }
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-3/5 pt-12">
        <Typography style="h3">Redirections</Typography>
        <Typography className="mt-1 text-gray-600" style="body2">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
        <div className="mt-5 bg-indigo-100 p-8">
          <Table redirections={redirections} refetch={fetchRedirections} />
        </div>
      </div>
    </div>
  );
};
export default Redirections;
