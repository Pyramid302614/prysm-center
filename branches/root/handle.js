const THIS = "branches/root/";

module.exports = {
    handle(req,res,branch,url,args) {
        return require("../../host").basicHandler(req,res,branch,url,args); // TODO, get my fonts back, and make it just shared-fonts/....  and add handle.js
    }
}