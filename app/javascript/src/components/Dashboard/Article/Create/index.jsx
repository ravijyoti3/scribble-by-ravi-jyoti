import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { assoc } from "ramda";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";
import useStore from "store";

import Form from "./Form";
import ScheduleArticleModal from "./ScheduleArticleModal";
import SideBar from "./SideBar";

const Create = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [article, setArticle] = useState(null);
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Save Draft");
  const [versionData, setVersionData] = useState([]);
  const [showScheduleArticleModal, setShowScheduleArticleModal] =
    useState(false);

  const { id } = useParams();

  const setArticleStatus = useStore(state => state.setArticleStatus);

  const { mutate: fetchArticle, isLoading: isLoadingArticles } = useMutation(
    async () => {
      const { data } = await articlesApi.show(id);

      return data;
    },
    {
      onSuccess: article => {
        setArticle(
          assoc(
            "category",
            {
              label: article.category.name,
              value: article.category.id,
            },
            article
          )
        );
        setVersionData(article.versions.slice(1));
        setSubmitButtonLabel(
          article.status === "published" ? "Publish" : "Save Draft"
        );
        setArticleStatus(article.status);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { mutate: fetchCategories, isLoading: isLoadingCategories } =
    useMutation(
      async () => {
        const { data } = await categoriesApi.fetch();

        return data.categories;
      },
      {
        onSuccess: categories => {
          setCategoryList(
            categories.map(category => ({
              label: category.name,
              value: category.id,
            }))
          );
        },
        onError: error => {
          logger.error(error);
        },
      }
    );

  const isLoading = isLoadingArticles || isLoadingCategories;

  useEffect(() => {
    fetchCategories();
    if (id) fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div
      className={`place grid h-screen auto-cols-max grid-flow-row overflow-y-hidden ${
        id ? "grid-cols-4" : "grid-cols-3"
      }`}
    >
      <Form
        article={article}
        categoryList={categoryList}
        history={history}
        id={id}
        refetch={fetchArticle}
        setShowScheduleArticleModal={setShowScheduleArticleModal}
        setSubmitButtonLabel={setSubmitButtonLabel}
        submitButtonLabel={submitButtonLabel}
      />
      {id && (
        <SideBar
          article={article}
          refetch={fetchArticle}
          versionData={versionData}
        />
      )}
      {showScheduleArticleModal && (
        <ScheduleArticleModal
          article={article}
          articleId={id}
          refetch={fetchArticle}
          scheduleAction={submitButtonLabel}
          onClose={() => setShowScheduleArticleModal(false)}
        />
      )}
    </div>
  );
};

export default Create;
