import React from "react";

import { Typography, Tag } from "neetoui";

const ArticleContent = ({ article }) => (
  <>
    <Typography className="font-semibold" style="h1">
      {article.title}
    </Typography>
    <div className="mt-3 flex">
      <Tag label="Getting Started" size="small" />
      <Typography className="ml-5 text-gray-600" style="body3">
        {article.created_at}
      </Typography>
    </div>
    <Typography className="mt-6" style="body2">
      {article.body}
    </Typography>
  </>
);

export default ArticleContent;
