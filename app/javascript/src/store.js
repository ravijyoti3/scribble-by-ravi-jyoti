import create from "zustand";

const useStore = create(set => ({
  articleStatus: "draft",
  setArticleStatus: status => set({ articleStatus: status }),
}));

export default useStore;
