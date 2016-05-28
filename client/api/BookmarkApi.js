import api from "axios";

/**
 * Contains a list of api calls to post/fetch data from Server
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
  /**
   * Api to create bookmark
   *
   * @return {object} Promise
   */
  createBookmark(data) {
    return api.post("/api/bookmarkFolders/addBookmark", data);
  },
  /**
   * Api to create folder
   *
   * @return {object} Promise
   */
  createFolder(data) {
    return api.post("/api/bookmarkFolders", data);
  }
};

export default BookmarkApi;
