module.exports = {
  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.HOST || "http://localhost:3001"
      : "https://wickedity.herokuapp.com",
  serverUrl: "https://www.wickedity.com"
};
