import React, { useEffect } from "react";

import { useMutation } from "react-query";

import articlesApi from "apis/admin/articles";

const DownloadReport = () => {
  const { mutate: generatePdf } = useMutation(
    async () => await articlesApi.generatePdf(),
    {
      onError: error => logger.error(error),
    }
  );

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const { mutate: downloadPdf, isLoading } = useMutation(
    async () => await articlesApi.download(),
    {
      onSuccess: data => {
        saveAs({ blob: data.data, fileName: "scribble_article_report.pdf" });
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default DownloadReport;
