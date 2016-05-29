/**
 * THe Bookmark Component
 * @ref: https://github.com/gaearon/react-dnd/blob/master/examples/01%20Dustbin/Multiple%20Targets/Box.js
 */
import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

const bookmarkSource = {
  beginDrag(props) {
    return props.bookmark;
  }
};

/**
 * The Bookmark class which renders the bookmarks without folders
 */
@DragSource("all", bookmarkSource, (connect) => ({
  connectDragSource: connect.dragSource(),
}))
export default class Bookmark extends Component {
  /**
   * propTypes
   * @property {function} connectDragSource
   * @property {Object} bookmark The bookmark object
   */
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    bookmark: PropTypes.object.isRequired,
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { bookmark, folderId, deleteBookmark, connectDragSource } = this.props;
    return connectDragSource(
      <div className="bookmark-container">
        <div onClick={() => deleteBookmark(folderId, bookmark.id)}
          className="delete-folder">
          x
        </div>
        <div> title: {bookmark.title} </div>
        <div> link: {bookmark.link} </div>
      </div>
    );
  }
}
