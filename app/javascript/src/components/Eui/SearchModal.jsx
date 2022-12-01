import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Modal, Input, Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/public/articles";

const SearchModal = ({ setShowSearchModal }) => {
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();

  const searchArticle = async query => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch(query);
      setSearchedArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    searchArticle();
  }, []);

  return (
    <Modal isOpen closeButton={false} onClose={() => setShowSearchModal(false)}>
      <Input
        className="w-full"
        placeholder="Search for an article"
        prefix={<Search />}
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
          searchArticle(e.target.value);
        }}
      />
      <div className="rounded h-48 overflow-scroll bg-white">
        {searchedArticles.map(article => (
          <div
            className="cursor-pointer p-2 hover:bg-gray-400"
            key={article.id}
            onClick={() => {
              history.push(`/public/${article.slug}`);
              setShowSearchModal(false);
            }}
          >
            <Typography>{article.title}</Typography>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SearchModal;
