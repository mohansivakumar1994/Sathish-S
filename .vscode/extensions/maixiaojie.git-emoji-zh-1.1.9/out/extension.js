"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const display_method_1 = require("./api/display-method");
const git_emoji_zh_1 = require("./api/git_emoji_zh");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.gitEmoji', (uri) => {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage('unable to load Git Extension');
            return;
        }
        // init pick items use emoji 展现方式
        // let items = emojis.map(use_emoji)
        const method_key = context.globalState.get('display_method', 'default');
        let items = git_emoji_zh_1.default.map(display_method_1.display_method[method_key]);
        // 显示选项列表，提示用户选择
        vscode.window.showQuickPick(items).then(function (selected) {
            if (selected) {
                console.log(uri);
                vscode.commands.executeCommand('workbench.view.scm');
                if (uri) {
                    let selectedRepository = git.repositories.find((repository) => {
                        return repository.rootUri.path === uri._rootUri.path;
                    });
                    if (selectedRepository) {
                        prefixCommit(selectedRepository, selected.emoji);
                    }
                }
                else {
                    for (let repo of git.repositories) {
                        prefixCommit(repo, selected.emoji);
                    }
                }
            }
        });
    });
    let label_switching = vscode.commands.registerCommand('extension.switching', (uri) => {
        const items = [];
        for (const key in display_method_1.display_method) {
            items.push(key);
        }
        vscode.window.showQuickPick(items).then((res) => {
            context.globalState.update('display_method', res);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function prefixCommit(repository, prefix) {
    repository.inputBox.value = `${prefix}${repository.inputBox.value}`;
}
function getGitExtension() {
    const vscodeGit = vscode.extensions.getExtension('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map