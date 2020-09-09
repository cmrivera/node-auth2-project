const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("./users/users-router");
const restrict = require("./middleware/restrict");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use(usersRouter);
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});
server.use("/users", restrict, usersRouter);

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
server.get("/", (req, res) => {
  res.status(200).json({ message: "pulling from server" });
});

/*Client sends credentials.
Server verify credentials.
Server creates a session for the client.
Server produces and sends back cookie.
Client stores the cookie.
Client sends cookie on every request.
Server verifies that cookie is valid.
Server provides access to resource.*/
