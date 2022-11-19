import routeTemplate from "./config/route.ts";
import controllerTemplate from "./config/controller.ts"
import modelTemplate from "./config/model.ts"
import serverTemplate from "./config/server.ts"
import configTemplate from "./config/config.ts"
import dbConnectionTemplate from "./config/connection.ts"
import {existsSync} from "https://deno.land/std@0.162.0/node/fs.ts";
import {writeJson} from "../util.js";

export const createApi = async ({ apiname, prop, url }) => {
  if (existsSync("config.json")) {
  } else {
    await  writeJson("config.json", [])
  }
  await configTemplate({ name: apiname });
  await Deno.mkdirSync("api", { recursive: true });
  await Deno.mkdirSync(`api/${apiname}/controller`, { recursive: true });
  await Deno.mkdirSync(`api/${apiname}/models`, { recursive: true });
  await Deno.mkdirSync(`api/${apiname}/routes`, { recursive: true });

  await Deno.mkdirSync(`connection`, { recursive: true });
  const connectTemp = dbConnectionTemplate();
  const serverTemp =await serverTemplate(url);
  const routeTemp = routeTemplate({ apiname });
  const controllerTemp = controllerTemplate({
    apiname,
    prop: Object.keys(prop),
  });

  const modelTemp = modelTemplate({
    name: apiname,
    prop: prop,
  });
  await Deno.writeTextFile("server.js", serverTemp);
  await Deno.writeTextFile(".env",`
  PORT= 5000
  URL = ${url}
  `);
  await Deno.writeTextFile(`api/${apiname}/controller/index.js`, controllerTemp);
  await Deno.writeTextFile(`api/${apiname}/models/${apiname}.js`, modelTemp);
  await Deno.writeTextFile(
    `api/${apiname}/routes/index.json`,
    JSON.stringify(routeTemp)
  );
  await Deno.writeTextFile(`connection/connection.js`, connectTemp);

  await console.log(`You created api: ${apiname}`);
};

