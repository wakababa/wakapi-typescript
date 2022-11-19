import {doPlural} from "../../util.js"

interface IModelTemplate{
    name:String
    prop:Object
}
const modelTemplate = ({name,prop}:IModelTemplate):string => {
  const bignames =  JSON.stringify(doPlural(name,true))
  const plural = JSON.stringify(doPlural(name,false))
  const myprop = JSON.stringify(prop)
  return`
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  let user = new Schema(
  
   ${myprop}
  ,
  { collection:  ${bignames}  }
  );

  module.exports = mongoose.model(${plural}, user);
  `
};

export default modelTemplate

