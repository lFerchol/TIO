module.exports = {
  debugMode: true,
  server: {
    port: 3000,
    host: "http://api.localhost"
  },
  mongodb: {
    development: {
      connectionString: "mongodb://localhost/ordinario"
    },
    production: {
      connectionString: "mongodb://localhost/ordinario"
    }
  },
  tweets: {  maxTweetSize: 140 }
}