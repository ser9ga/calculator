const express = require("express");
const config = require("config")
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function calculateResult(buffer) {
  if (buffer.length === 0) {
    result = 0;
  }
  if (buffer.length !== 0) {
    if (buffer[buffer.length - 1].type === "number") {
      result = eval(
        buffer
          .map((item) => {
            return item.key;
          })
          .join("")
      );
    } else {
      result = eval(
        buffer
          .slice(0, buffer.length - 1)
          .map((item) => {
            return item.key;
          })
          .join("")
      );
    }
  }
  return result;
}
// const back = config.get('back') || 5000
app.post("/back", (req, res) => {
  res.json(calculateResult(req.body));
});

app.use("/",  express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "index.html"));
// });

const PORT = config.get('port') || 5000
app.listen(PORT, () => {
  console.log(`Ready to do big dids on port ${PORT}`);
});
