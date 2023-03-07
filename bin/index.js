#! /usr/bin/env node
const chalk = require('chalk')
const boxen = require('boxen')
const translate = require('@vitalets/google-translate-api');
const yargs = require("yargs");
const figlet = require('figlet');
const fs = require('fs');
var pathFile = require("path");


const usage = chalk.keyword('pink')("\nUsage: mytools -p <Path Directory Log> -t <Type Of Convert> -o <Output File>\n"
+ boxen(chalk.green("\n" + "Convert Log File" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
const options = yargs
      .usage(usage)
      .option("p", {alias:"path", describe: "Path Directory Logs", type: "string", demandOption: false })
      .option("o", {alias:"output", describe: "Path Directory Output", type: "string", demandOption: false })
      .option("t", {alias:"type", describe: "Convert Type ( text or json )", type: "string", demandOption: false })
      .help(true)
      .argv;

// console.log(yargs.argv);
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
if(argv.path == null && argv.p == null){
    console.log(
        chalk.yellow(
          figlet.textSync('MyTools', { horizontalLayout: 'full' })
        )
      );
    yargs.showHelp();
    return;
}

const path =  argv.p  || argv.path;
const type =  argv.t  || argv.type;
const output =  argv.o  || argv.output;

var text = fs.readFileSync(path,'utf8')
var fileName = pathFile.basename(path);
array = text.split("\n")
var dataArray = [];
for(var i=0; i<array.length; i++){
  if(array[i] == ''){continue}
  let tempArray = []
  tempArray = array[i].split(",");
  dataArray.push(tempArray)
};

json = {};
var c = 1;
dataArray.forEach( (e1) =>{
  isdate = true;
  var tempjson = {};
  e1.forEach( (e2) =>{
    var key;
    if(isdate )  {
        key = 'date';
        tempjson[key] = e2;
        isdate = false;
    }
    else if(e2.includes("batteryCurrent")){
        key = "batteryCurrent";
        tempjson[key]= e2.split("batteryCurrent=")[1]
    }
    else{
        var arr = e2.split("=");
        key  = arr[0].trim();
        tempjson[key] = arr[1];
    }
  })
  json[c] = tempjson;
  c++
});

if(type == null || type != 'json' || type == 'text'){
  let data = JSON.stringify(json);
  if(output == null){
    fs.writeFile('output/text/' + fileName +'.txt', data, (err) => {
      if (err) throw err;
      console.log('Output has been put to default directory Type Text');
  });
  }else{
    fs.writeFile(output, data, (err) => {
      if (err) throw err;
      console.log('Output has been writed Type Text');
  });
  }
}else{
  let data = JSON.stringify(json, null, 2);
  if(output == null){
    fs.writeFile('output/json/' + fileName +'.json', data, (err) => {
      if (err) throw err;
      console.log('Output has been put to default directory Type Json');
  });
  }else{
    fs.writeFile(output, data, (err) => {
      if (err) throw err;
      console.log('Output has been writed Type Json');
  });
  }
  console.log('This is after the write call');
}






// console.log( language,sentence);
// translate(sentence, {to: language.toLowerCase()}).then(res => {
//     console.log("\n" + boxen(chalk.green( sentence + "\n\n" + res.text ), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
// }).catch(err => {
//     console.error(err);
// });

