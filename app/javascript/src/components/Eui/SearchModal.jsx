import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Modal, Input, Typography, Kbd } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/public/articles";
import { useKey } from "hooks/useKey";

const SearchModal = ({ setShowSearchModal }) => {
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOption, setActiveOption] = useState(0);

  const history = useHistory();

  const searchArticle = async query => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch(query);
      setSearchedArticles(!query ? articles.slice(0, 5) : articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useKey("ArrowDown", () => {
    if (activeOption < searchedArticles.length - 1) {
      setActiveOption(activeOption + 1);
    }
  });

  useKey("ArrowUp", () => {
    if (activeOption > 0) {
      setActiveOption(activeOption - 1);
    }
  });

  useKey("Enter", () => {
    history.push(`/public/${searchedArticles[activeOption].slug}`);
    setShowSearchModal(false);
  });

  useEffect(() => {
    searchArticle();
  }, []);

  return (
    <Modal isOpen closeButton={false} onClose={() => setShowSearchModal(false)}>
      <div className="rounded-xl bg-white p-3 pb-0">
        <Input
          autoComplete="off"
          className="mb-2 w-full"
          placeholder="Search for an article"
          prefix={<Search />}
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            searchArticle(e.target.value);
          }}
        />
        <div className="rounded h-48 overflow-scroll bg-white">
          {searchedArticles.map(article => {
            const isActive = searchedArticles[activeOption].id === article.id;

            return (
              <div
                key={article.id}
                className={` ${
                  isActive ? "bg-indigo-400" : ""
                } rounded mb-2 cursor-pointer bg-gray-200 px-2 py-1 hover:bg-gray-400`}
                onClick={() => {
                  history.push(`/public/${article.slug}`);
                  setShowSearchModal(false);
                }}
              >
                <Typography>{article.title}</Typography>
              </div>
            );
          })}
        </div>
      </div>
      <Modal.Footer className="flex items-center p-0">
        <div className="mr-4 flex">
          <Kbd className="mr-1" keyName="↑" />
          <Kbd className="mr-1" keyName="↓" />
          <Typography style="body2">to navigate</Typography>
        </div>
        <div className="flex">
          <Kbd className="mr-1" keyName="Enter" />
          <Typography style="body2">to select</Typography>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
