const path = require('path');

module.exports = class ViewController{

    static sendIndexPage(req, res){
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    }

}