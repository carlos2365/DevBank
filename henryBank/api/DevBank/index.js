const server = require("./src/app");
const { conn } = require("./src/database/db");
const { Users } = require("./src/database/db");
const fetch = require("node-fetch");
// const cors = require("cors");

// server.use(cors());

server.get("/api/divisa", (req, res) => {
  fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
    .then((response) => response.json())
    .then((data) => res.send(data));
});


conn
  .authenticate()
  .then(() => {
    return conn.sync({ force: false });
  })
  .then(() => {
    return server.listen(3000, () => {
      console.log("Connection has been established successfully at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
