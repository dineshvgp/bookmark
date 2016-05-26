import _ from "underscore";
import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/Constants";
import BookmarkApi from "../api/BookmarkApi";

let _allFolderBookmarks = {};

/**
 * Extend Bookmark Store with EventEmitter to add eventing capabilities
 */
const BookmarkStore = _.extend({}, EventEmitter.prototype, {

  /**
   * @emit change event
   */
  emitChange() {
    this.emit("change");
  },

  /**
   * Listen change event
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on("change", callback);
  },

  /**
   * remove listened change event
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener("change", callback);
  },

  /**
   * @return {object} _allFolderBookmarks The all folder bookmark object
   */
  getAllFolderBookmarks() {
    return _allFolderBookmarks;
  }
});

/**
 * The app dispatcher
 * @todo yet to handle errs
 */
AppDispatcher.register(function(payload) {
  switch (payload.actionType) {
    case Constants.ALL_FOLDER_WITH_BOOKMARKS:
      BookmarkApi.fetchAllFolders().then((response) => {
        _allFolderBookmarks = response.data;
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    default:
      return true;
  }
  return true;
});

export default BookmarkStore;
