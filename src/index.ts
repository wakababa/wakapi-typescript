import routeTemplate from "./config/route.ts";
import controllerTemplate from "./config/controller.ts"
import modelTemplate from "./config/model.ts"
import serverTemplate from "./config/server.ts"
import configTemplate from "./config/config.ts"
import dbConnectionTemplate from "./config/connection.ts"
import {existsSync} from "https://deno.land/std@0.162.0/node/fs.ts";
import {writeJson} from "../util.js";


interface ICreateApi{
  apiName:String
  prop:Object
  url:String
}


export const createApi = async ({ apiName, prop, url }:ICreateApi) => {
  if (existsSync("config.json")) {
  } else {
    await  writeJson("config.json", [])
  }
  await configTemplate({ name: apiName });
  await Deno.mkdirSync("api", { recursive: true });
  await Deno.mkdirSync(`api/${apiName}/controller`, { recursive: true });
  await Deno.mkdirSync(`api/${apiName}/models`, { recursive: true });
  await Deno.mkdirSync(`api/${apiName}/routes`, { recursive: true });

  await Deno.mkdirSync(`connection`, { recursive: true });
  const connectTemp = dbConnectionTemplate();
  const serverTemp =await serverTemplate(url);
  const routeTemp = routeTemplate({ apiName });
  const controllerTemp = controllerTemplate({
    apiName,
    prop: Object.keys(prop),
  });

  const modelTemp = modelTemplate({
    name: apiName,
    prop: prop,
  });
  await Deno.writeTextFile("server.js", serverTemp);
  await Deno.writeTextFile(".env",`
  PORT= 5000
  URL = ${url}
  `);
  await Deno.writeTextFile(`api/${apiName}/controller/index.js`, controllerTemp);
  await Deno.writeTextFile(`api/${apiName}/models/${apiName}.js`, modelTemp);
  await Deno.writeTextFile(
    `api/${apiName}/routes/index.json`,
    JSON.stringify(routeTemp)
  );
  await Deno.writeTextFile(`connection/connection.js`, connectTemp);

  await console.log(`You created api: ${apiName}`);
};

