module.exports = {
    handle(req,res,branch,url,args) {
        return require("../../host").basicHandler(req,res,branch,url,args);
    }
}