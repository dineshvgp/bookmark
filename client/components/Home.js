/**
 * The Home Component
 * @ref: https://github.com/gaearon/react-dnd/blob/master/examples/01%20Dustbin/Multiple%20Targets/Container.js
 */
import React, { Component } from "react";
import _ from "underscore";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "react/lib/update";
//components
import BookmarksFolder from "./BookmarksFolder";
import Bookmark from "./Bookmark";
import AddBookmark from "./AddBookmark";
import AddFolder from "./AddFolder";
//actions and stores
import BookmarkAction from "../actions/BookmarkAction";
import BookmarkStore from "../stores/BookmarkStore";

/**
 * Home component which renders the folder and bookmarks.
 */
@DragDropContext(HTML5Backend)
export default class Home extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);
    /**
     * @type {Object}
     * @property {array} bookmarksFolder The folder with bookmarks
     * @property {array} bookmarks THe bookmarks without folder
     */
    this.state = {
      bookmarksFolder : [],
      bookmarks: {}
    }
  }

  /**
   * clean up event listener
   */
  componentWillUnmount() {
    BookmarkStore.removeChangeListener(this.onStoreChange);
  }

  /**
   * @listens {BookmarkStore} change event
   */
  componentDidMount() {
    BookmarkStore.addChangeListener(this.onStoreChange);
    BookmarkAction.fetchAllFolders();
  }

  /**
   * Update the folder and bookmark object if values are emitted from store
   */
  onStoreChange = () => {
    const bookmarksFolder = BookmarkStore.getAllFolderBookmarks();
    this.setState({
      bookmarksFolder: _.reject(bookmarksFolder, (folder) => folder.name === null),
      bookmarks: _.find(bookmarksFolder, (folder) => folder.name === null)
    });
  }

  /**
   * Update the folder and bookmarks object on drop
   * @param  {String} folderId The folder id in which bookmark is getting moved
   * @param  {String} bookmark The bookmark object
   */
  handleDrop(newFolderId, bookmark) {
    const oldFolderId = this.state.bookmarks.id;
    BookmarkAction.moveBookmark({
      oldFolderId: oldFolderId,
      newFolderId: newFolderId,
      bookmark: bookmark
    });
  }

  /**
   * Call action to delete bookmark
   * @param {String} folderId The folder id
   * @param {String} bookmarkId The bookmark Id
   */
  deleteBookmark(folderId, bookmarkId) {
    BookmarkAction.deleteBookmark({
      folderId: folderId,
      bookmarkId: bookmarkId
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { bookmarksFolder, bookmarks } = this.state;
    return (
      <div class="container">
        <AddBookmark />
        <AddFolder />
        <div id="folder" className="folder-wrapper">
          <h5>Folders</h5>
          {
            bookmarksFolder.map((folder) =>
              <BookmarksFolder
                folderId={folder.id}
                name={folder.name}
                deleteBookmark = {this.deleteBookmark}
                bookmarks={folder.bookmark || []}
                onDrop={(bookmark) => this.handleDrop(folder.id, bookmark)}
                key={folder.id} />
            )
          }
        </div>
        <div id="bookmark" className="bookmark-wrapper">
          <h5>Bookmarks</h5>
          {
            bookmarks.bookmark ?
              bookmarks.bookmark.map((bookmark) =>
                <Bookmark bookmark={bookmark}
                  folderId={bookmarks.id}
                  deleteBookmark={this.deleteBookmark}
                  key={bookmark.id} />
              )
            : null
          }
        </div>
      </div>
    );
  }
}
