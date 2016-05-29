"use strict";
const ObjectId = require("mongodb").ObjectID;

module.exports = function(BookmarkFolder) {
  /**
   * Create a new bookmark inside empty folder name
   *
   * @param  {Object} bookmark The bookmark object which includes title and link
   * @callback  {Function} cb The callback function
   * @returns {Function(Error, Object)} callback
   */
  BookmarkFolder.addBookmark = function(bookmark, cb) {
    if(bookmark && bookmark.title && bookmark.link) {
      //Maintain unique id for each bookmark object
      bookmark.id = new ObjectId();
    } else {
      let error = new Error();
      error.message = "Bookmark title or link should not be empty";
      error.name = "BookmarkRequired";
      return cb(error);
    }
    //Find the empty folder and push the new bookmark object
    BookmarkFolder.updateAll(
      {
        "name": null
      },
      {
        "$push": {
          "bookmark": bookmark
        }
      },
      function (err, data) {
        if(err) {
          return cb(err);
        }
        cb(null, bookmark);
      }
    );
  }

  BookmarkFolder.remoteMethod(
    "addBookmark",
    {
      description: "Create a new bookmark in empty folder",
      accepts: {
        arg: "bookmark",
        type: "object",
        required: true,
        http: {
          source: "body"
        }
      },
      returns: {
        arg: "bookmark",
        type: "object",
        root: true
      },
      http: {
        verb: "post"
      }
    }
  );

  /**
   * Delete a bookmark from folder
   * @param {String} folderId The folder id
   * @param {String} id The bookmark id
   * @returns {Function(Error, Object)} cb
   */
  BookmarkFolder.deleteBookmark = function(folderId, id, cb) {
    BookmarkFolder.updateAll(
      {
        "id": folderId
      },
      {
        "$pull": {
          "bookmark": {
            "id": ObjectId(id)
          }
        }
      },
      function (err, data) {
        if(err) {
          return cb(err);
        }
        cb(null, data);
      }
    );
  }

  BookmarkFolder.remoteMethod(
    "deleteBookmark",
    {
      description: "Delete a bookmark from folder",
      accepts: [
        {
          arg: "folderId",
          type: "string",
          required: true,
          description: "Folder id",
          http: {
            source: "path"
          }
        }, {
          arg: "bookmarkId",
          type: "string",
          required: true,
          description: "Bookmark id",
          http: {
            source: "path"
          }
        }
      ],
      returns: {
        type: "object",
        root: true
      },
      http: {
        verb: "delete",
        path: "/:folderId/bookmark/:bookmarkId"
      }
    }
  );
};
