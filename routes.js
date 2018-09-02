const routes = require("next-routes");

module.exports = routes()
  .add("index", "/", "index")
  .add("viewPost", "/posts/:category/:postId/:postTitle", "viewpost")
  .add("postByCategory", "/posts/:category", "posts")
  .add("allPosts", "/posts", "posts")
  .add("login", "/login/:redirectPage?", "login")
  .add("createPost", "/createpost", "createpost")
  .add("profile")
  .add("editpost", "/editpost/:postId", "editpost")
  .add("terms")
  .add("about")
  .add("contact")
  .add("privacy");
