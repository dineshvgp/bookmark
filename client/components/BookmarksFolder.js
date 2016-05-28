/**
 * The Folder Component
 * @ref: https://github.com/gaearon/react-dnd/blob/master/examples/01%20Dustbin/Multiple%20Targets/Dustbin.js
 */
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
//components
import Bookmark from './Bookmark';

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
   * render
   * @return {ReactElement} markup
   */
  render() {
    let { name, bookmarks, connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        <h5>{name}</h5>
        {
          bookmarks.map(({id, title, link}) =>
            <div key={id}>
              {title} - {link}
            </div>
          )
        }
      </div>
    );
  }
}
