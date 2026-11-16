process.addListener("uncaughtException",e => console.error(e));
process.addListener("uncaughtException",r => console.error(r));

const http = require("http");
const fs = require("fs");
const config = require("./config.json");
const PLEP = require("./plep/index.js");
const server = http.createServer((req,res) => PLEP.server.handle(req,res,(url,args) => {
    const branch = url.split(".")[0] || "root";
    return require(`./branches/${branch}/handle.js`).handle(req,res,branch,url.split(".")[1] || "root",args);
}));

server.listen(config.port,() => console.log("Ready when you are > " + config.port));

module.exports = {
    basicHandler(req,res,branch,url,args) {
        const subPage = url.split(".")?.[1] || "index";
        const type = (() => { switch(require("node:path").extname(subPage)) {
            case "js": return "application/json";
            case "css": return "text/css";
            case "ttf": return "font/ttf";
            default: return "text/html";  
        }})();
        const file = `branches/${branch}/${require("node:path").extname(subPage)??".html"}`;
        const exists = fs.existsSync(file);
        if(!exists) return {
            code: 404,
            file: "branches/root/404.html"
        }; else return {
            code: 200,
            file: file,
            type: type
        };
    }
}