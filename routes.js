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
  .add("FooterPage1", "/terms", "footerPages")
  .add("FooterPage2", "/aboutus", "footerPages")
  .add("FooterPage3", "/contact", "footerPages")
  .add("FooterPage4", "/privacy", "footerPages");
