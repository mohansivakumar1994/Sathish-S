"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process = require("child_process");
const constants_1 = require("./constants");
function applyPatch() {
    let cwd = vscode.workspace.rootPath;
    let patchFiles = [];
    const defaultUri = vscode.Uri.parse(cwd);
    const options = { openLabel: 'Apply patch', filters: { 'patch files': ['patch', 'diff'] }, canSelectMany: false };
    vscode.window.showOpenDialog(options).
        then(function (pathObject) {
        let file = pathObject[0].fsPath;
        if (file) {
            const cmd = `git apply --ignore-space-change --ignore-whitespace -v < ${file}`;
            child_process.exec(cmd, {
                cwd: cwd
            }, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showInformationMessage(constants_1.GP.FAILED_APPLY_PATCH);
                }
                else {
                    vscode.window.showInformationMessage(constants_1.GP.SUCCESS_APPLY_PATCH);
                }
            });
        }
        else {
            vscode.window.showErrorMessage(constants_1.GP.NO_PATCH_FILES);
        }
    });
}
exports.applyPatch = applyPatch;
//# sourceMappingURL=apply.js.map