import api from "axios";

/**
 * Contains a list of api calls to fetch data from Server
 */
  const BookmarkApi = {
  /**
   * Api to fetch all folders with bookmarks
   *
   * @return {object} Promise
   */
  fetchAllFolders() {
    return api.get("/api/bookmarkFolders");
  },
};

export default BookmarkApi;
