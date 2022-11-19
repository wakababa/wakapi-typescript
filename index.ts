#!/usr/bin/env bash

import {createApi} from './src/index.ts'
import {readParseFile} from "./util.js";

let configs = await readParseFile("wakapi.config.json")

for (let config of Object.keys(configs.tables)) {
    createApi({
        apiName:config,
        url:configs.mongoDbUrl,
        prop:configs.tables[config]
    })
}


