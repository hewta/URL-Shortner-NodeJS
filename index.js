const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/user");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://skvermadbg4:Saurav1508@cluster0.d1frdkg.mongodb.net/Ritesh?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("MongoDb connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: {timeStamp: Date.now()} } },
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
