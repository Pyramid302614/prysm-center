const http = require("http");
const config = require("./config.json");

const server = http.createServer((req,res) => {
    const branch = req.url == "/" ? "root" : req.url.slice(1).split("/")[0];
    const url = req.url.slice(1).split("/")?.[1]?.slice?.("?")?.[0] ?? "root";
    if(url == "src") return;
    // return (<branch>/<url>.html) or smth
});

server.listen(config.port);