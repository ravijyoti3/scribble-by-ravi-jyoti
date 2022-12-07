import React, { useState } from "react";

import { Typography, Button } from "neetoui";
import { formatCreatedTimeToDateAndTime } from "utils";

import CurrentVersion from "./CurrentVersion";
import VersionDetailModal from "./VersionDetailModal";

const SideBar = ({ versionData, refetch, article }) => {
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  return (
    <div className="col-span-1 overflow-y-auto">
      <div className="border-l px-5 ">
        <div className="sticky top-0 z-10 bg-white pt-5">
          <Typography style="h2">Version History</Typography>
          <Typography className="text-gray-600" style="body2">
            Version history of Setting up an account in Scribble.
          </Typography>
          <CurrentVersion article={article} />
        </div>
        {versionData.reverse().map(version => {
          const articleData = version.object;

          return (
            <div
              className="border mt-2 grid grid-flow-row grid-cols-3 items-center rounded-lg border-gray-400 p-3"
              key={version.id}
            >
              <div className="col-span-2">
                <Typography className="text-gray-600" style="body3">
                  {formatCreatedTimeToDateAndTime(version.created_at)}
                </Typography>
                {articleData?.restored_from && (
                  <Typography className=" text-gray-600" style="body3">
                    (Restored from version{" "}
                    {formatCreatedTimeToDateAndTime(articleData.restored_from)})
                  </Typography>
                )}
              </div>
              <Button
                className="ml-5"
                disabled={articleData.restored_from}
                style="link"
                label={
                  articleData?.status === "published"
                    ? "Article Published"
                    : "Article Drafted"
                }
                onClick={() => {
                  setSelectedVersion(version);
                  setShowVersionModal(true);
                }}
              />
            </div>
          );
        })}
      </div>
      {showVersionModal && (
        <VersionDetailModal
          refetch={refetch}
          setShowVersionModal={setShowVersionModal}
          versionArticleData={selectedVersion.object}
        />
      )}
    </div>
  );
};

export default SideBar;
