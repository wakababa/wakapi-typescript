
//  CAPITALIZATION TO FIRST CHARACTER

const doCapital = (value) => {
  const modelname = String(value);
  const colelctionName =
    modelname[0].toUpperCase() + modelname.slice(1, modelname.length);
  return colelctionName;
};

const doPlural = (value,capital) => {
  if(!capital){
    return value + "s";
  }else{
     return  doCapital(value) + "s"
  }
};

const deletefromArray = async(name)=>{
  const readFile = await Deno.readFileSync('config.json','utf-8',(res)=>{
      return res
    })
    const parsed = JSON.parse(readFile)

      const data = [...parsed.filter(item=>item !== name)]
      const result  = JSON.stringify(data)
     console.log(result)
      await Deno.writeFileSync('config.json',result)
    }


const readParseFile =async(path)=>{
    const decoder = new TextDecoder('utf-8')
    const bytes = await Deno.readFile(path)
    let configs = JSON.parse(decoder.decode(bytes))
    return configs
}
function writeJson(path,data) {
    try {
        Deno.writeTextFileSync(path, JSON.stringify(data));
    } catch (e) {
        return e.message;
    }
}

export  { doCapital, doPlural, deletefromArray,readParseFile,writeJson };
