import SwaggerParser from "@apidevtools/swagger-parser";
import { writeFileSync } from "fs-extra";
import pinyin from "js-pinyin";
pinyin.setOptions({checkPolyphone: false, charCase: 0});

function walk(obj, callback) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      let newKey = pinyin.getFullChars(key)
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      if(key === 'tags' && Array.isArray(obj[key])){
        key === 'tags' && Array.isArray(obj[key])
      }

      walk(obj[newKey || key], callback);
    } else if (key === '$ref' || key === 'originalRef') {
      const val = obj[key]
      obj[key] =  pinyin.getFullChars(val)
      if(key === 'originalRef'){
        delete obj[key]
      }
    }
    callback(obj, key);
  }
}

function convertTags(tags) {
  return tags.map(tag => {
    if (tag.name) {
      tag.name =  pinyin.getFullChars(tag.name)
    }
    return tag;
  });
}

function convertDefinitions(definitions) {
  Object.keys(definitions).forEach(key=>{
    let newKey = pinyin.getFullChars(key)
    definitions[newKey] = definitions[key]
  })  
}

function renameKeysInSchema(schema) {
  if (schema.tags) {
    schema.tags = convertTags(schema.tags);
  }
  walk(schema,() => {});
//  walk(schema.definitions, () => {});
  return schema;
}

export async function transformDoc(input:string) {
  const parser = new SwaggerParser()
  const api = await parser.parse(input)

  const res = renameKeysInSchema(api)

  writeFileSync("./test.json",JSON.stringify(res))
}
