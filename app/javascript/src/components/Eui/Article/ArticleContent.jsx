import React from "react";

import { Typography, Tag, PageLoader } from "neetoui";
import { useQuery } from "react-query";
import { formatCreatedTimeToDate } from "utils";

import articlesApi from "apis/public/articles";

const ArticleContent = () => {
  const slug = window.location.pathname.split("/")[2];

  const { data: article, isLoading } = useQuery(
    "showArticle",
    async () => {
      const { data } = await articlesApi.show(slug);

      return data;
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
    <>
      <Typography className="font-semibold" style="h1">
        {article?.title}
      </Typography>
      <div className="mt-3 flex">
        <Tag label="Getting Started" size="small" />
        <Typography className="ml-5 text-gray-600" style="body3">
          {formatCreatedTimeToDate(article?.created_at)}
        </Typography>
      </div>
      <Typography className="mt-6" style="body2">
        {article?.body}
      </Typography>
    </>
  );
};

export default ArticleContent;
