/**
 * The Folder Component
 * @ref: https://github.com/gaearon/react-dnd/blob/master/examples/01%20Dustbin/Multiple%20Targets/Dustbin.js
 */
import React, { PropTypes, Component } from 'react';
import {Link} from "react-router";
import { DropTarget } from 'react-dnd';
//components
import Bookmark from './Bookmark';
//actions and stores
import BookmarkAction from "../actions/BookmarkAction";

const folderTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

/**
 * The BookmarksFolder class which renders the folder along with its bookmarks
 */
@DropTarget("all", folderTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class BookmarksFolder extends Component {
  /**
   * propTypes
   * @property {String} name Name of the bookmark
   * @property {Array} bookmarks THe bookmarks object
   * @property {Function} connectDropTarget
   * @property {Function} onDrop
   */
  static propTypes = {
    name: PropTypes.string.isRequired,
    bookmarks: PropTypes.array.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  /**
   * Call action to delete folder
   * @param {String} id The folder id
   */
  deleteFolder(id) {
    BookmarkAction.deleteFolder(id);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { folderId, name, deleteBookmark, bookmarks, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="folder-container">
        <div onClick={() => this.deleteFolder(folderId)} className="delete-folder">
          x
        </div>
        <div className="folder-name">{name}</div>
        {
          bookmarks.map(({id, title, link}) =>
            <div key={id}>
              <div className="moved-bookmark">
                <div onClick={() => deleteBookmark(folderId, id)}
                  className="delete-bookmark">
                  x
                </div>
                <a href={link}>{title}</a>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
