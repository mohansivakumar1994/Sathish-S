"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    function getRelativeItemPath(projectPath, fullTargetFilePath) {
        var relativeFilePath = fullTargetFilePath.replace(projectPath, '');
        // remove first / or \
        if (relativeFilePath[0] === '/' || relativeFilePath[0] === '\\') {
            relativeFilePath = relativeFilePath.slice(1, relativeFilePath.length);
        }
        return relativeFilePath;
    }
    function executeOperation(commandParam, gitArgumentsFunc, infoMessageFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!commandParam) {
                vscode.window.showErrorMessage('Could not launch merge tool. VSCode did not supply command parameters. Try again in a few seconds.');
                return;
            }
            const fullTargetFilePath = commandParam.resourceUri.fsPath;
            const simpleGit = yield Promise.resolve().then(() => require('simple-git'));
            if (vscode.workspace.workspaceFolders) {
                // Look through the workspace folders and find the one that has our file.
                for (let workspaceFolder of vscode.workspace.workspaceFolders) {
                    const projectPath = workspaceFolder.uri.fsPath;
                    if (fullTargetFilePath.startsWith(projectPath)) {
                        var targetFile = getRelativeItemPath(projectPath, fullTargetFilePath);
                        if (targetFile === null) {
                            vscode.window.showErrorMessage('Could not get target path.');
                            return;
                        }
                        const notifyOnOpen = vscode.workspace.getConfiguration('git-diff-and-merge-tool').get('showNotificationOnOpen');
                        if (notifyOnOpen) {
                            vscode.window.showInformationMessage(infoMessageFunc(targetFile));
                        }
                        simpleGit(projectPath).raw(gitArgumentsFunc(targetFile), (err, result) => {
                            if (err) {
                                vscode.window.showWarningMessage(err);
                            }
                        });
                        return;
                    }
                }
                vscode.window.showErrorMessage('Could not find workspace for ' + fullTargetFilePath);
            }
        });
    }
    let diffCommand = vscode.commands.registerCommand('gitdiffandmergetool.diff', (param) => {
        executeOperation(param, (targetFile) => { return ['difftool', '-y', 'HEAD', targetFile]; }, (targetFile) => { return 'Launching diff tool for ' + targetFile; });
    });
    let mergeCommand = vscode.commands.registerCommand('gitdiffandmergetool.merge', (param) => __awaiter(this, void 0, void 0, function* () {
        executeOperation(param, (targetFile) => { return ['mergetool', '-y', targetFile]; }, (targetFile) => { return 'Launching merge tool for ' + targetFile; });
    }));
    context.subscriptions.push(mergeCommand);
    context.subscriptions.push(diffCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map