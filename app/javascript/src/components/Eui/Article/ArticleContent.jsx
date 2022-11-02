import React, { useEffect, useState } from "react";

import { Typography, Tag, PageLoader } from "neetoui";
import { formatCreatedTimeToDate } from "utils";

import articlesApi from "apis/articles";

const ArticleContent = () => {
  const slug = window.location.pathname.split("/")[2];

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const showArticle = async slug => {
    try {
      const { data } = await articlesApi.show_by_slug(slug);
      setArticle(data);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    showArticle(slug);
  }, []);

  if (loading) {
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
