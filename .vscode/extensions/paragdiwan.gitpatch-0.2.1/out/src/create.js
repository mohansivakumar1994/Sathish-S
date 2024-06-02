"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process = require("child_process");
const constants_1 = require("./constants");
function createPatch(isStaged) {
    let cwd = vscode.workspace.rootPath;
    let cmd;
    const defaultUri = vscode.Uri.parse(cwd);
    const options = { saveLabel: 'Create patch', filters: { 'patch files': ['patch', 'diff'] } };
    vscode.window.showSaveDialog(options).
        then(function (pathObject) {
        if (!pathObject.fsPath) {
            vscode.window.showErrorMessage(constants_1.GP.ERROR_NO_FILE_NAME);
            return;
        }
        if (isStaged) {
            cmd = `git diff --cached > ${pathObject.fsPath}`;
        }
        else {
            cmd = `git diff > ${pathObject.fsPath}`;
        }
        child_process.exec(cmd, {
            cwd: cwd
        }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(constants_1.GP.FAILED_CREATE_PATCH);
            }
            else {
                vscode.window.showInformationMessage(constants_1.GP.SUCCESS_CREATE_PATCH);
            }
        });
    });
}
exports.createPatch = createPatch;
//# sourceMappingURL=create.js.map