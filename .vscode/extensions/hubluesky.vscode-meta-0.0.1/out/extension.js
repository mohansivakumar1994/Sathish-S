"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const metafilewatcher = require("./metafilewatcher");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    metafilewatcher.activate(context);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    metafilewatcher.deactivate();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map