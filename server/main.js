const localConfig = require('./local-config.json');
const AppGenerator = require('./app-generator');

async function start(){
    const appGenerator = new AppGenerator(localConfig.mongodbUrl, true);
    await appGenerator.generate();
    appGenerator.startServer();
}

start();