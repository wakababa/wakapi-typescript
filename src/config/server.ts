import {readParseFile} from '../../util.js'

interface IServerTemplate{
    url:String
}
const serverTemplate =async (url):string => {
  const data = await readParseFile ("config.json");
  let urls = JSON.stringify(url);
  return `
    const express = require("express");
    const helmet = require("helmet");
    const mongoose = require("mongoose");
    require('dotenv').config()
    const bodyParser = require("body-parser");
    const cors = require("cors");
    const connectDb = require("./connection/connection");
    const app = express();
    const jsonParser = bodyParser.json();
    const createApi = require("wakapi/generate-api/index");
    const fs = require('fs')
    const URL = process.env.URL
    ${data
      .map((item) => `const ${item} = require("./api/${item}/controller/index");`)
      .join("\n")}
    const { doPlural, deletefromArray } = require("wakapi/util");
    connectDb({
    url: URL,
    });
    const PORT = process.env.PORT || 8000;
    app.use(helmet());
    app.use(cors());
    
    app.get("/apiNames", (req, res) => {
    mongoose.connection.db.listCollections().toArray((err, names) => {
        res.send(names.map((item) => item.name));
    });
    });

    app.post("/createdb",jsonParser, async(req, res) => {
    const { apiName, propTitles, prop } = req.body;

    await createApi({
        apiName,
        propTitles,
        prop,
    });
    const name = doPlural(apiName,true)
    await mongoose.connection.createCollection(name)
    await res.send("Created")
    });
    app.post("/deletedb/:name", jsonParser, async (req, res) => {
        const { name } = req.params;
        const plural = doPlural(name, true);
        await mongoose.connection.dropCollection(plural);
        await deletefromArray(name);
        const path = 'api/'+ name;
        await fs.rmdirSync(path, { recursive: true });
        const  serverTemplate = require('./generate-api/config/server')
        const serverTemp = serverTemplate();
        await fs.writeFileSync("server.js", serverTemp)
        res.send("Deleted")
      });
   
      
    ${data
      .map((item) => ` app.use("/${item}s", jsonParser, ${item});`)
      .join("\n")}
      app.listen(PORT, console.log("Server started at :" + PORT));
        `;
};

export default  serverTemplate;
