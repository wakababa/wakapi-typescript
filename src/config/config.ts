import {readParseFile, writeJson} from '../../util.js'

interface IConfigTempalte{
    name:String
}
const configTemplate = async({ name }:IConfigTempalte) => {

    const parsed = await readParseFile("config.json")
    if(parsed.includes(name)){
      console.log(`${name.toUpperCase()} already added ! `)
    }else{
      const data = [...parsed,name]
      await writeJson('config.json',data)
    }

  };

  export default configTemplate
