import React, { Component } from "react";
import ReactDOM from "react-dom";
//Actios and stores
import BookmarkAction from "../actions/BookmarkAction";

/**
 * Add AddFolder Component
 */
export default class AddFolder extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);
    /**
     * @type {Object}
     * @property {String} title Title of the bookmark
     * @property {String} link Link of the bookmark
     */
    this.state = {
      name: ""
    }
  }

  /**
   * Initiate lean modal
   */
  componentDidMount() {
    this.el = $(ReactDOM.findDOMNode(this));
    this.el.find(".modal-trigger").leanModal();
  }

  /**
   * Handle on change of input vlaue
   * @param {SytheticEvent} e
   * @param  {String} field state fo the input variable
   */
  handleChange(e, field) {
    let state = {};
    state[field] = e.target.value;
    this.setState(state);
  }

  /**
   * Call create folder action
   */
  onSubmit = () => {
    let folder = this.state;
    if(folder) {
      folder.bookmark = [];
      BookmarkAction.createFolder(folder);
      this.el.find("#create-folder").closeModal();
      this.setState({
        name: ""
      });
    }
  }
  /**
   * render
   * @return {ReactElement} markup
   * @todo input validation
   */
  render() {
    return (
      <div className="modal-wrapper">
        <a className="modal-trigger" href="#create-folder">Create Folder</a>
        <div id="create-folder" className="modal mini-modal">
          <div className="modal-header">
            <h5 className="head">Create Folder</h5>
          </div>
          <div className="modal-content">
            <div className="input-field">
              <input id="name" type="text"
                onChange={(e) => this.handleChange(e, "name")}
                value={this.state.name} />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="modal-footer r-btn-container">
            <input type="button" className="btn red modal-action modal-close m-l-15" value="close" />
            <input type="button" onClick={this.onSubmit} className="btn blue modal-action" value="Create" />
          </div>
        </div>
      </div>
    );
  }
}
