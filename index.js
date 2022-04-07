import {readFile, writeFile} from "fs"
import { FileManegement } from "./FileManegement.js"

const file = "codbarras.txt"
const encode = "UTF-8"

readFile(file, encode, (err, text) =>{ if(err) 
    console.error(err) ; return FileManegement.takeCodes(text) });
