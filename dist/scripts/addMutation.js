'use strict';

var fs = require('fs');
var util = require('util');
fs.access = util.promisify(fs.access);
fs.readFile = util.promisify(fs.readFile);
fs.writeFile = util.promisify(fs.writeFile);
if (process.argv.length !== 3) {
    throw new Error("You must have exactly 1 command line argument.");
}
var args = process.argv[2].split(".");
if (args.length !== 2) {
    throw new Error("Argument must be in the format of Entity.methodName");
}
async function ensureControllerExists(name) {
    var controllerFilePath = './src/app/controllers/' + name + 'Controller.js';
    var appFilePath = './src/app/App.js';
    try {
        await fs.access(controllerFilePath);
    } catch (e) {
        console.log("Controller does not exist.");
        await fs.writeFile(controllerFilePath, 'class ' + name + 'Controller {\n    constructor(app) {\n        this.app = app;\n        // ADD BINDINGS BELOW\n    }\n    \n    // ADD MUTATION METHODS BELOW\n    \n}\nmodule.exports = ' + name + 'Controller;\n');
        // Need to also create bindings in App.js
        var appContent = await fs.readFile(appFilePath, 'utf-8');
        // Add imports
        appContent = appContent.split("// ADD CONTROLLER IMPORTS BELOW");
        if (appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD CONTROLLER IMPORTS BELOW");
        }
        var importStr = '// ADD CONTROLLER IMPORTS BELOW\nconst ' + name + 'Controller = require(\'./controllers/' + name + 'Controller\');';
        appContent = appContent[0] + importStr + appContent[1];
        // Add initializations
        appContent = appContent.split("// ADD CONTROLLERS BELOW");
        if (appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD CONTROLLERS BELOW");
        }
        var initStr = '// ADD CONTROLLERS BELOW\n        this._' + name.toLowerCase() + 'Controller = new ' + name + 'Controller(this);';
        appContent = appContent[0] + initStr + appContent[1];
        // Add getters
        appContent = appContent.split("// ADD GETTERS BELOW");
        if (appContent.length !== 2) {
            throw new Error("App file must have exactly one block of // ADD GETTERS BELOW");
        }
        var getterStr = '// ADD GETTERS BELOW\n        \n    get ' + name + '() {\n        return {\n        };\n    }';
        appContent = appContent[0] + getterStr + appContent[1];
        await fs.writeFile(appFilePath, appContent, 'utf-8');
    }
}
(async function () {
    var controllerFilePath = './src/app/controllers/' + args[0] + 'Controller.js';
    var appFilePath = './src/app/App.js';
    await ensureControllerExists(args[0]);
    var content = await fs.readFile(controllerFilePath, { encoding: 'utf-8' });
    // Add mutation method
    content = content.split("// ADD MUTATION METHODS BELOW");
    if (content.length !== 2) {
        throw new Error("Controller file must have exactly one block of // ADD MUTATION METHODS BELOW");
    }
    var mutationStr = '// ADD MUTATION METHODS BELOW\n    \n    ' + args[1] + '(/* TODO: your arguments */){\n        return new Promise((resolve, reject) => {\n            let mutationString = `\n                mutation (/* TODO: your arguments */) {\n                    ' + args[1] + args[0] + '(/* TODO: your arguments */)\n                }\n            `;\n            this.app.getAdaptor().mutate(mutationString, {\n                /* TODO: your arguments */\n            }).then((result) => {\n                resolve(result.' + args[1] + args[0] + ');\n            }).catch(e => {\n                reject(e);\n            });\n        });\n    }';
    content = content[0] + mutationStr + content[1];
    // Bind mutation method
    content = content.split("// ADD BINDINGS BELOW");
    if (content.length !== 2) {
        throw new Error("Controller file must have exactly one block of // ADD BINDINGS BELOW");
    }
    var bindingStr = '// ADD BINDINGS BELOW\n        this.' + args[1] + ' = this.' + args[1] + '.bind(this);';
    content = content[0] + bindingStr + content[1];
    // Link to App.js
    var appContent = await fs.readFile(appFilePath, { encoding: 'utf-8' });
    appContent = appContent.split('get ' + args[0] + '() {\n        return {');
    if (appContent.length !== 2) {
        throw new Error("Cannot find correct getter within App.js.");
    }
    var linkingStr = 'get ' + args[0] + '() {\n        return {\n            ' + args[1] + ': this._' + args[0].toLowerCase() + 'Controller.' + args[1] + ',';
    appContent = appContent[0] + linkingStr + appContent[1];
    await fs.writeFile(controllerFilePath, content, 'utf-8');
    await fs.writeFile(appFilePath, appContent, 'utf-8');
    // console.log(content);
})();