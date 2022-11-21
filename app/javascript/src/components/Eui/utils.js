export const getDefaultSlug = categories =>
  categories
    .filter(
      category =>
        category.articles.filter(article => article.status === "published")
          .length > 0
    )[0]
    .articles.filter(article => article.status === "published")[0].slug;

export const getSlugs = categories =>
  categories
    .map(category => category.articles)
    .flat()
    .filter(article => article.status === "published")
    .map(article => article.slug);
