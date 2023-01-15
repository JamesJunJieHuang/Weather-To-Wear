// server/server.js
const path = require("path");
//access express library
const express = require("express");
//request for HTTP requests to API, HTTP client library
//body PARSER
const bodyParser = require("body-parser");
const cors = require("cors");
//file system
const fs = require("fs");
const app = express();
app.use(bodyParser.json());
//CORS
app.use(cors({ origin: "http://localhost:8080" }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client")));

//GET ROUTE HANDLER at '/'
app.get("/", async (req, res) => {
  const datafile = fs.readFileSync("data.json");
  const dataArr = JSON.parse(datafile);
  console.log('dataArr: ', dataArr)
  let dataArr2 = [];
  for (const dataObj of dataArr){
    const cityName = dataObj.name;
    console.log('cityName: ', cityName)
    const APIkey = "6e1a0f5534e59feddcb2739dab099610";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
    console.log('before fetch')
    await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log("hi1");
        if (data.main.feels_like <= 285 && data.main.feels_like >= 275) {
          dataArr2.push({ ...data, clothes: "Brrrr... It's chilly. Wear a jacket" });
        } else if (data.main.feels_like < 275) {
          dataArr2.push({ ...data, clothes: "Brace yourselves. Winter is coming." });
        } else if (data.main.feels_like > 285 && data.main.feels_like <= 290) {
          dataArr2.push({ ...data, clothes: "Light Jacket Season" });
        } else if (data.main.feels_like > 290 && data.main.feels_like <= 297) {
          dataArr2.push({ ...data, clothes: "Sweater Weather" });
        } else if (data.main.feels_like > 297 && data.main.feels_like <= 305) {
          dataArr2.push({ ...data, clothes: "T-shirt Type Of Day" });
        } else {
          dataArr2.push({
            ...data,
            clothes: "Sun's Out Guns Out",
          });
        }
        console.log('dataArr2[0].weather.main: ', dataArr2[0].weather)
        console.log('hi2')
      })
      .catch((error) => {
        console.error("ERROR ALERT BACK END", error); // log the error to the console
      });
  }

  await fs.writeFile("data.json", JSON.stringify(dataArr2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("DataArr2 written to file");
  });


  await fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(data);
  });
});



//POST ROUTE HANDLER at '/'
app.post("/", (req, res) => {
  console.log("reqbody: ", req.body);
  fs.writeFile("data.json", JSON.stringify(req.body), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file");
  });
  res.status(200).json({ "data saved": 0 });
});

//GET ROUTE HANDLER at '/'
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
});

//API ENDPOINT
app.get("/weather", (req, res) => {
  const cityName = req.query.q;
  //req.query
  const APIkey = "6e1a0f5534e59feddcb2739dab099610";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error getting weather data for city: " + city);
        res.status(404).send({ error: "City not found" });
      }
      return response.json();
    })
    .then((data) => {
      if (data.main.feels_like <= 285 && data.main.feels_like >= 275) {
        res.json({ ...data, clothes: "Brrrr... It's chilly. Wear a jacket" });
      } else if (data.main.feels_like < 275) {
        res.json({ ...data, clothes: "Brace yourselves. Winter is coming." });
      } else if (data.main.feels_like > 285 && data.main.feels_like <= 290) {
        res.json({ ...data, clothes: "Light Jacket Season" });
      } else if (data.main.feels_like > 290 && data.main.feels_like <= 297) {
        res.json({ ...data, clothes: "Sweater Weather" });
      } else if (data.main.feels_like > 297 && data.main.feels_like <= 305) {
        res.json({ ...data, clothes: "T-shirt Type Of Day" });
      } else {
        res.json({ ...data, clothes: "Sun's Out Guns Out" });
      }
    })
    .catch((error) => {
      console.error("ERROR ALERT BACK END", error);
      res.status(404).send({ error: "City not found" }); // log the error to the console
    });
});

//error route handler
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);


//PORT 3001 LISTENER
//used to bind and listen the connections on the specified host and port
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
