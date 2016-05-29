# Bookmark
A web app for organizing bookmarks.

##Prerequisite
* Install Nodejs
* Install Mongodb  
  Create the database named "bookmark" and add user "dineshvgp" with read, write permission.  
  <pre>
  use bookmark;
  db.addUser(
      {
          user: "dineshvgp",
          pwd: "dineshi2it13$",
          roles: [ "readWrite", "dbAdmin" ]
      }
  );
  </pre>
* Install Strongloop
  <pre>npm install -g strongloop</pre>
* Install gulp
  <pre>npm install -g gulp</pre>

##Build
<pre>npm install</pre>
<pre>gulp</pre>

##Start the server:
<pre>npm start</pre>
