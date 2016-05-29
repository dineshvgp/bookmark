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
  },

  /**
   * Update the folder and bookmarks on drop
   * @param  {String} folderId The folder id in which bookmark is getting moved
   * @param  {String} bookmark The bookmark object
   */
  handleDrop(oldFolderId, newFolderId, bookmark) {
    //Find the Target folder obj and push the bookmark
    let folder = _allFolderBookmarks[
      _.findIndex(_allFolderBookmarks, {
        id: newFolderId
      })
    ];
    folder.bookmark = folder.bookmark || [];
    folder.bookmark.push(bookmark);
    //Find the source bookmark folder
    let bookmarksWithoutFolder = _allFolderBookmarks[
      _.findIndex(_allFolderBookmarks, {
        id: oldFolderId
      })
    ];
    //Remove the source from it
    bookmarksWithoutFolder.bookmark.splice(
      _.findIndex(bookmarksWithoutFolder.bookmark, {id: bookmark.id}), 1
    );
    this.emit("change");
  }
});

/**
 * The app dispatcher
 * @todo yet to handle errs
 */
AppDispatcher.register(function(payload) {
  const {actionType, data} = payload;
  switch (actionType) {
    case Constants.ALL_FOLDER_WITH_BOOKMARKS:
      BookmarkApi.fetchAllFolders().then((response) => {
        _allFolderBookmarks = response.data;
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    case Constants.CREATE_BOOKMARK:
      BookmarkApi.createBookmark(data).then((response) => {
        //Find the source bookmark folder
        let bookmarksWithoutFolder = _allFolderBookmarks[
          _.findIndex(_allFolderBookmarks, {
            name: null
          })
        ];
        bookmarksWithoutFolder.bookmark = bookmarksWithoutFolder.bookmark || [];
        bookmarksWithoutFolder.bookmark.push(response.data);
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    case Constants.CREATE_FOLDER:
      BookmarkApi.createFolder(data).then((response) => {
        _allFolderBookmarks.push(response.data);
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    case Constants.DELETE_FOLDER:
      BookmarkApi.deleteFolder(data).then((response) => {
        const folderIndex = _.findIndex(_allFolderBookmarks, {
          id: data
        });
        _allFolderBookmarks.splice(folderIndex, 1);
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    case Constants.DELETE_BOOKMARK:
      BookmarkApi.deleteBookmark(data).then((response) => {
        let folder = _allFolderBookmarks[
          _.findIndex(_allFolderBookmarks, {
            id: data.folderId
          })
        ];
        folder.bookmark.splice(
          _.findIndex(folder.bookmark, {id: data.bookmarkId}), 1
        );
        BookmarkStore.emitChange();
      }, (err)=> {
        console.log("err", err);
      });
      break;
    case Constants.MOVE_BOOKMARK:
      const { oldFolderId, newFolderId, bookmark } = data;
      BookmarkApi.moveBookmark(data).then((response) => {
        BookmarkStore.handleDrop(oldFolderId, newFolderId, bookmark);
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
