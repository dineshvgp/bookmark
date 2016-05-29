import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/Constants";

/**
 * Contains a list of actions that are called from component.
 * Actions are then provided to dispatcher with action type and data if any.
 */
const BookmarkAction = {
  /**
   * Action to fetch all folders along with the bookmarks
   * @emits {Constants.ALL_FOLDER_WITH_BOOKMARKS}
   */
  fetchAllFolders() {
    AppDispatcher.dispatch({
      actionType: Constants.ALL_FOLDER_WITH_BOOKMARKS
    });
  },
  /**
  * Action to create bookmark
  * @emits {Constants.CREATE_BOOKMARK}
   */
  createBookmark(bookmark) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_BOOKMARK,
      data: bookmark
    });
  },
  /**
  * Action to create folder
  * @emits {Constants.CREATE_FOLDER}
   */
  createFolder(folder) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_FOLDER,
      data: folder
    });
  },
  /**
  * Action to delete folder
  * @emits {Constants.DELETE_FOLDER}
   */
  deleteFolder(id) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_FOLDER,
      data: id
    });
  },
  /**
  * Action to delete bookmark
  * @emits {Constants.DELETE_BOOKMARK}
   */
  deleteBookmark(data) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_BOOKMARK,
      data: data
    });
  }
};

export default BookmarkAction;
