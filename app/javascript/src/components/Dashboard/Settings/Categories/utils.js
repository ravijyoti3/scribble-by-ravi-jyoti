import dayjs from "dayjs";

const reorder = (articleList, startIndex, endIndex) => {
  const shuffledArticleList = Array.from(articleList);
  const [removed] = shuffledArticleList.splice(startIndex, 1);
  shuffledArticleList.splice(endIndex, 0, removed);

  return shuffledArticleList;
};

export const calculateCreatedAgo = date => dayjs(date).fromNow();

export const calculateDateToWeekday = date =>
  dayjs(date).format("dddd, hh:mmA");

export const onDragEnd = async (finalPosition, list, setList, api) => {
  if (finalPosition.destination) {
    const reorderedItems = reorder(
      list,
      finalPosition.source.index,
      finalPosition.destination.index
    );
    setList(reorderedItems);
    await api.positionUpdate({
      id: finalPosition.draggableId,
      finalPosition: finalPosition.destination.index + 1,
    });
  }
};
