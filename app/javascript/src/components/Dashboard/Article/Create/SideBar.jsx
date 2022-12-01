import React, { useState } from "react";

import { Typography, Button } from "neetoui";
import { formatCreatedTimeToDateAndTime } from "utils";

import VersionDetailModal from "./VersionDetailModal";

const SideBar = ({ versionData, refetch }) => {
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  return (
    <div className="col-span-1">
      <div className="border-l h-screen px-5 pt-5">
        <Typography style="h2">Version History</Typography>
        <Typography className="text-gray-600" style="body2">
          Version history of Setting up an account in Scribble.
        </Typography>
        {versionData.map(version => {
          const articleData = JSON.parse(version.object);

          return (
            <div
              className="mt-2 flex items-center justify-between"
              key={version.id}
            >
              <Typography className="text-gray-600" style="body2">
                {formatCreatedTimeToDateAndTime(version.created_at)}
              </Typography>
              <Button
                className="ml-5"
                style="link"
                label={
                  articleData.status === 1
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
          versionArticleData={JSON.parse(selectedVersion.object)}
        />
      )}
    </div>
  );
};

export default SideBar;
