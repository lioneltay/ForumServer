module.exports = [
  require("./api/forum/BasicAPI"),
  require("./api/Auth"),

  require("./types/User"),

  require("./types/forum/Comment"),
  require("./types/forum/CommentLike"),
  require("./types/forum/Thread"),
  require("./types/forum/ThreadLike"),
  require("./types/forum/Follow"),
]
