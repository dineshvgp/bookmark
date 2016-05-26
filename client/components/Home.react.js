import React from "react";
import BookmarkAction from "../actions/BookmarkAction";
import BookmarkStore from "../stores/BookmarkStore";

/**
 * Home component which just shows that the react and router works fine.
 */
class Home extends React.Component {
  /**
   * constructor
   */
  constructor() {
    super();
    BookmarkAction.fetchAllFolders();
  }

  /**
   * clean up event listener
   */
  componentWillUnmount() {
    BookmarkStore.removeChangeListener(this.onStoreChange.bind(this));
  }

  /**
   * @listens {BookmarkStore} change event
   */
  componentDidMount() {
    BookmarkStore.addChangeListener(this.onStoreChange.bind(this));
  }

  /**
   * The bookmark object
   */
  onStoreChange() {
    console.log("bookmark obj", BookmarkStore.getAllFolderBookmarks());
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        Hello, React is up!!
      </div>
    );
  }
}

export default Home;
