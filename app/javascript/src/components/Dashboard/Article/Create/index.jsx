import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import Form from "./Form";
import SideBar from "./SideBar";

const Create = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Save Draft");
  const [versionData, setVersionData] = useState([]);

  const { id } = useParams();
  const fetchArticle = async () => {
    try {
      const { data } = await articlesApi.show(id);
      const payload = {
        title: data.title,
        body: data.body,
        status: data.status,
        category: {
          label: data.category.name,
          value: data.category.id,
        },
      };
      setArticle(payload);
      setVersionData(data.versions);
      setSubmitButtonLabel(
        data.status === "published" ? "Publish" : "Save Draft"
      );
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(
        categories.map(category => ({
          label: category.name,
          value: category.id,
        }))
      );
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchArticle();
  }, [id]);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div
      className={`place grid auto-cols-max grid-flow-row ${
        id ? "grid-cols-4" : "grid-cols-3"
      }`}
    >
      <Form
        article={article}
        categoryList={categoryList}
        history={history}
        id={id}
        setSubmitButtonLabel={setSubmitButtonLabel}
        submitButtonLabel={submitButtonLabel}
      />
      {id && <SideBar refetch={fetchArticle} versionData={versionData} />}
    </div>
  );
};

export default Create;
