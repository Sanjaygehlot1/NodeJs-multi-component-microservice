import express from 'express';
import path from 'path'
import fs from 'fs';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoUrl = "mongodb://sanjay:gehlot@mongodb:27017";
const dbName = "user-account";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({2
  extended: true
}));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/profile-picture', function (req, res) {
  const img = fs.readFileSync('./profile-picture.jpg');
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.post('/update-profile', async function (req, res) {
  const userObj = req.body;

  const client = await MongoClient.connect(mongoUrl);
  const db = client.db(dbName);

  await db.collection("users").updateOne(
    { userid: 1 },
    { $set: userObj },
    { upsert: true }
  );
  res.send(userObj);
});

app.get('/get-profile', async function (req, res) {
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db(dbName);

  const user = await db.collection("users").findOne({ userid: 1 });
  await client.close();

  return res.json(user || {});

});


app.listen(3000, "0.0.0.0", () => console.log("app listening on port 3000!"));

