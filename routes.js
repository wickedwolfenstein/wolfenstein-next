const routes = require("next-routes");

module.exports = routes()
  .add("index", "/", "index")
  .add("viewPost", "/posts/:category/:postId/:postTitle", "viewpost")
  .add("postByCategory", "/posts/:category", "posts")
  .add("allPosts", "/posts", "posts")
  .add("login", "/login", "login");
