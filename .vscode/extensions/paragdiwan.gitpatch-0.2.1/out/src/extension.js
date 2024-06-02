'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const create_1 = require("./create");
const apply_1 = require("./apply");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableCPS = vscode.commands.registerCommand('extension.gitCreatePatchFromStaged', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed    
        create_1.createPatch(true);
    }));
    let disposableCPU = vscode.commands.registerCommand('extension.gitCreatePatchFromUnstaged', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed    
        create_1.createPatch(false);
    }));
    let disposableAP = vscode.commands.registerCommand('extension.gitApplyPatch', () => __awaiter(this, void 0, void 0, function* () {
        apply_1.applyPatch();
    }));
    context.subscriptions.push(disposableCPS);
    context.subscriptions.push(disposableCPU);
    context.subscriptions.push(disposableAP);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map