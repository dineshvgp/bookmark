/**
 * The Home Component
 * @ref: https://github.com/gaearon/react-dnd/blob/master/examples/01%20Dustbin/Multiple%20Targets/Container.js
 */
import React, { Component } from 'react';
import _ from "underscore";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
//components
import BookmarksFolder from './BookmarksFolder';
import Bookmark from './Bookmark';
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
      bookmarks: []
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
    let bookmarksFolder = BookmarkStore.getAllFolderBookmarks();
    this.setState({
      bookmarksFolder: _.reject(bookmarksFolder, (folder) => !folder.name),
      bookmarks: _.find(bookmarksFolder, (folder) => !folder.name).bookmark,
    });
  }

  /**
   * Update the folder and bookmarks object on drop
   * @param  {String} folderId The folder id in which bookmark is getting moved
   * @param  {String} bookmark The bookmark object
   */
  handleDrop(folderId, bookmark) {
    this.setState(update(this.state, {
      bookmarksFolder: {
        [_.findIndex(this.state.bookmarksFolder, {id: folderId})]: {
          bookmark: {
            $push: [bookmark]
          }
        }
      },
      bookmarks: {
        $splice: [[_.findIndex(this.state.bookmarks, {id: bookmark.id}), 1]]
      }
    }));
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    let { bookmarksFolder, bookmarks } = this.state;
    return (
      <div class="container">
        <div id="folder">
          <h5>Folders</h5>
          {
            bookmarksFolder.map((folder) =>
              <BookmarksFolder
                name={folder.name}
                bookmarks={folder.bookmark}
                onDrop={(bookmark) => this.handleDrop(folder.id, bookmark)}
                key={folder.id} />
            )
          }
        </div>
        <div id="bookmark">
          <h5>Bookmarks</h5>
          {
            bookmarks.map((bookmark) =>
              <Bookmark bookmark={bookmark}
                key={bookmark.id} />
            )
          }
        </div>
      </div>
    );
  }
}
