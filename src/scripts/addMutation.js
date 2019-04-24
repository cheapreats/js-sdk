const fs = require('fs');
const util = require('util');
fs.access = util.promisify(fs.access);
fs.readFile = util.promisify(fs.readFile);
fs.writeFile = util.promisify(fs.writeFile);

if(process.argv.length !== 3) {
    throw new Error("You must have exactly 1 command line argument.");
}

let args = process.argv[2].split(".");

if(args.length !== 2) {
    throw new Error("Argument must be in the format of Entity.methodName");
}

async function ensureControllerExists(name) {
    const controllerFilePath = `./src/app/controllers/${name}Controller.js`;
    const appFilePath = `./src/app/App.js`;
    try {
        await fs.access(controllerFilePath);
    } catch (e) {
        console.log("Controller does not exist.");
        await fs.writeFile(controllerFilePath, `class ${name}Controller {
    constructor(app) {
        this.app = app;
        // ADD BINDINGS BELOW
    }
    
    // ADD MUTATION METHODS BELOW
    
}
module.exports = ${name}Controller;
`);
        // Need to also create bindings in App.js
        let appContent = await fs.readFile(appFilePath, 'utf-8');

        // Add imports
        appContent = appContent.split("// ADD CONTROLLER IMPORTS BELOW");
        if(appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD CONTROLLER IMPORTS BELOW");
        }
        let importStr = `// ADD CONTROLLER IMPORTS BELOW
const ${name}Controller = require('./controllers/${name}Controller');`;
        appContent = appContent[0] + importStr + appContent[1];

        // Add initializations
        appContent = appContent.split("// ADD CONTROLLERS BELOW");
        if(appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD CONTROLLERS BELOW");
        }
        let initStr = `// ADD CONTROLLERS BELOW
        this._${name.toLowerCase()}Controller = new ${name}Controller(this);`;
        appContent = appContent[0] + initStr + appContent[1];

        // Add getters
        appContent = appContent.split("// ADD GETTERS BELOW");
        if(appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD GETTERS BELOW");
        }
        let getterStr = `// ADD GETTERS BELOW
        
    get ${name}() {
        return {
        };
    }`;
        appContent = appContent[0] + getterStr + appContent[1];


        await fs.writeFile(appFilePath, appContent, 'utf-8');
    }
}

(async () => {

    const controllerFilePath = `./src/app/controllers/${args[0]}Controller.js`;
    const appFilePath = `./src/app/App.js`;

    await ensureControllerExists(args[0]);

    let content = await fs.readFile(controllerFilePath, {encoding: 'utf-8'});

    // Add mutation method
    content = content.split("// ADD MUTATION METHODS BELOW");
    if(content.length !== 2) {
        throw new Error("Controller file must have exactly one block of // ADD MUTATION METHODS BELOW");
    }

    let mutationStr = `// ADD MUTATION METHODS BELOW
    
    ${args[1]}(/* TODO: your arguments */){
        return new Promise((resolve, reject) => {
            let mutationString = \`
                mutation (/* TODO: your arguments */) {
                    ${args[1]}${args[0]}(/* TODO: your arguments */)
                }
            \`;
            this.app.getAdaptor().mutate(mutationString, {
                /* TODO: your arguments */
            }).then((result) => {
                resolve(result.${args[1]}${args[0]});
            }).catch(e => {
                reject(e);
            });
        });
    }`;

    content = content[0] + mutationStr + content[1];

    // Bind mutation method
    content = content.split("// ADD BINDINGS BELOW");
    if(content.length !== 2) {
        throw new Error("Controller file must have exactly one block of // ADD BINDINGS BELOW");
    }

    let bindingStr = `// ADD BINDINGS BELOW
        this.${args[1]} = this.${args[1]}.bind(this);`;

    content = content[0] + bindingStr + content[1];

    // Link to App.js
    let appContent = await fs.readFile(appFilePath, {encoding: 'utf-8'});
    appContent = appContent.split(`get ${args[0]}() {
        return {`);
    if(appContent.length !== 2) {
        throw new Error("Cannot find correct getter within App.js.");
    }

    let linkingStr = `get ${args[0]}() {
        return {
            ${args[1]}: this._${args[0].toLowerCase()}Controller.${args[1]},`;

    appContent = appContent[0] + linkingStr + appContent[1];

    await fs.writeFile(controllerFilePath, content, 'utf-8');
    await fs.writeFile(appFilePath, appContent, 'utf-8');

    // console.log(content);
})();
