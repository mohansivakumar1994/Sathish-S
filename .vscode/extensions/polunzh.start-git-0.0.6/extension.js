const vscode = require('vscode');
const spawn = require('child_process').spawn;

function activate(context) {
    const cwd = vscode.workspace.rootPath;
    var disposable = vscode.commands.registerCommand('extension.startGit', function () {
        const path = readOptions();
        if (!path) {
            vscode.window.showErrorMessage('Please set git shell path first!');
            return;
        }

        const child = spawn('cmd.exe', ['/c', 'start', path], {
            cwd
        });

        child.on('error', (err) => {
            vscode.window.showErrorMessage('start  shell error:' + err);
        });
    });

    var shellDisposable = vscode.commands.registerCommand('extension.startshell', () => {
        const shells = readShells();
        if (!shells) {
            vscode.window.showErrorMessage('Please set shells path first!');
            return;
        }

        vscode.window.showQuickPick(Object.keys(shells))
            .then((item) => {
                if (!item) return;
                const child = spawn('cmd.exe', ['/c', 'start', shells[item]], {
                    cwd: cwd
                });

                child.on('error', (err) => {
                    vscode.window.showErrorMessage('start shell error:' + err);
                });
            });
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(shellDisposable);
}

function readShells() {
    const config = vscode.workspace.getConfiguration('startshell');

    const shells = config.get('shells');
    if (!shells) return;

    const result = {};
    shells.forEach((shell) => {
        result[shell.name] = shell.path;
    });

    return result;
}

function readOptions() {
    const config = vscode.workspace.getConfiguration('startgit');
    const path = config.get('shellPath') || config.get('path');


    return path;
}

exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;