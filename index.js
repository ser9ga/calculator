const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

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

app.post("/", (req, res) => {
  res.json(calculateResult(req.body));
});

app.listen(port, () => {
  console.log("Ready for do big dids");
});
