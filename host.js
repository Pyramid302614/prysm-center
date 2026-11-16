process.addListener("uncaughtException",e => console.error(e));
process.addListener("uncaughtException",r => console.error(r));

const http = require("http");
const fs = require("fs");
const config = require("./config.json");
const PLEP = require("./plep/index.js");
const server = http.createServer((req,res) => PLEP.server.handle(req,res,(url,args) => {
    const branch = url.split("/")[0] || "root";
    const Url = url.slice(branch.length+1) || "index";
    return require(`./branches/${branch}/handle.js`).handle(req,res,branch,Url,args);
}));

server.listen(config.port,() => console.log("Ready when you are > " + config.port));

module.exports = {
    basicHandler(req,res,branch,url,args) {
        const subPage = url + (require("node:path").extname(url) == "" ? ".html" : "");
        const type = (() => { switch(require("node:path").extname(subPage)) {
            case ".js": return "application/json";
            case ".css": return "text/css";
            case ".ttf": return "font/ttf";
            case ".html": return "text/html";
            case ".svg": return "image/svg+xml";
            default: return "text/plain";  
        }})();
        const file = `branches/${branch}/${subPage}`;
        const exists = fs.existsSync(file);
        if(!exists) return {
            code: 404,
            file: "branches/root/404.html",
            type: "text/html"
        }; else return {
            code: 200,
            file: file,
            type: type
        };
    }
}