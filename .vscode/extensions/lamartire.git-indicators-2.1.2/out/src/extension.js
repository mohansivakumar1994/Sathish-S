"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const indicators_1 = require("./indicators");
const indicators = new indicators_1.default();
function activate(context) {
    const { git } = vscode_1.workspace.getConfiguration();
    if (git && git.enabled === false)
        return;
    indicators.activate();
}
exports.activate = activate;
function deactivate() {
    indicators.deactivate();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map