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
  },
  /**
   * Api to delete folder
   *
   * @return {object} Promise
   */
  deleteFolder(data) {
    return api.delete(`/api/bookmarkFolders/${data}`);
  },
  /**
   * Api to delete bookmark
   *
   * @return {object} Promise
   */
  deleteBookmark(data) {
    return api.delete(`/api/bookmarkFolders/${data.folderId}/bookmark/${data.bookmarkId}`);
  },
  /**
   * Api to move bookmark
   *
   * @return {object} Promise
   */
  moveBookmark(data) {
    return api.post(`/api/bookmarkFolders/${data.oldFolderId}/move/${data.newFolderId}`, data.bookmark);
  }
};

export default BookmarkApi;
