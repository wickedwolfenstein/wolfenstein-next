const axios = require("axios");
const config = require("./config/backendUrl");
module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.module.rules.push({
      test: require.resolve("zepto"),
      use: "imports-loader?this=>window"
    });
    return config;
  },
  exportPathMap: async function(defaultPathMap) {
    const pages = {
      "/": { page: "/index" },
      "/about": { page: "/about" },
      "/contact": { page: "/contact" },
      "/privacy": { page: "/privacy" },
      "/terms": { page: "/terms" },
      "/login": { page: "/login" },
      "/profile": { page: "/profile" },
      "/posts": { page: "/posts" },
      "/createpost": { page: "/createpost" },
      "/404": { page: "/_error" }
    };
    let paths = await axios
      .get(config.baseURL + "/post")
      // get all the posts and return those with slug
      .then(data => {
        let posts = data.data.reduce((acc, curr) => {
          let postid = curr._id;
          let Obj = Object.assign(acc, {
            [`${curr.pageURL}`]: {
              page: "/viewpost",
              query: { postId: postid }
            }
          });
          return Obj;
        }, {});
        let editPosts = data.data.reduce((acc, curr) => {
          let postid = curr._id;
          let Obj = Object.assign(acc, {
            [`/editpost/${postid}`]: {
              page: "/editpost",
              query: { postId: postid }
            }
          });
          return Obj;
        }, {});
        return { ...pages, ...posts, ...editPosts };
      });
    return paths;
  }
};
