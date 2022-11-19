import {readParseFile, writeJson} from '../../util.js'
const configTemplate = async({ name }) => {

    const parsed = await readParseFile("config.json")

    if(parsed.includes(name)){
      console.log(`${name.toUpperCase()} already added ! `)
    }else{
      const data = [...parsed,name]
      await writeJson('config.json',data)
    }


  };

  export default configTemplate
