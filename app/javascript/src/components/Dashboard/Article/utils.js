export const filterData = (data, filter) => {
  Object.keys(filter).forEach(key => {
    if (filter[key] && typeof filter[key] === "string") {
      data = data.filter(item => item[key] === filter[key]);
    } else if (
      filter[key] &&
      typeof filter[key] === "object" &&
      filter[key].length > 0
    ) {
      data = data.filter(item => filter[key].includes(item[key]));
    }
  });

  return data;
};

export const searchArticle = (articles, searchQuery) => {
  if (searchQuery.length === 0) return articles;

  return articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );
};

export const dataIntersection = (data1, data2) =>
  data1.filter(item => data2.some(item2 => item.id === item2.id));

export const searchCategory = (categoryList, searchCategory) =>
  categoryList.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase().trim())
  );
