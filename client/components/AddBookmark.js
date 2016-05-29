import React, { Component } from "react";
import ReactDOM from "react-dom";
import BookmarkAction from "../actions/BookmarkAction";
import ErrorMessages from "../utils/ValidationMessages";

/**
 * Add Bookmark Component
 */
export default class AddBookmark extends Component {
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
      title : "",
      link: ""
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
   *
   */
  validateBookmark = () => {
    const { title, link } = this.state;
    const timeToShow = 2000;
    if(!title) {
      Materialize.toast(ErrorMessages.titleRequired, timeToShow);
      return false;
    }
    if(!link) {
      Materialize.toast(ErrorMessages.linkRequired, timeToShow);
      return false;
    } else {
      const urlRegex = new RegExp("^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
      if(!urlRegex.test(link)) {
        Materialize.toast(ErrorMessages.invalidLink, timeToShow);
        return false;
      }
    }
    return true;
  }

  /**
   * Call create bookmark action
   */
  onSubmit = () => {
    const bookmark = this.state;
    if(this.validateBookmark()) {
      BookmarkAction.createBookmark(bookmark);
      this.el.find("#create-bookmark").closeModal();
      this.setState({
        title: "",
        link: ""
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
        <a className="modal-trigger" href="#create-bookmark">Create Bookmark</a>
        <div id="create-bookmark" className="modal mini-modal">
          <div className="modal-header">
            <h5 className="head">Create Bookmark</h5>
          </div>
          <div className="modal-content">
            <div className="input-field">
              <input id="title" type="text"
                onChange={(e) => this.handleChange(e, "title")}
                value={this.state.title} />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field">
              <input id="link" type="text"
                onChange={(e) => this.handleChange(e, "link")}
                value={this.state.link} />
              <label htmlFor="link">Link</label>
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
