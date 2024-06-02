# start shells

A Visual Studio Code extension for opening shell on windows.

## 1. start-git

> This can be replaced by new feature [startshell](#startshell)

### Configurations
``` json
{
    "startgit": {
        "shellPath": "path of git shell",
        "cwd": "git word directory"
    }
}
```

> shellPath *required*: It's the `git-bash.exe`(not `git-cmd.exe`) file in `git installation directory`

#### Default Key Binding
> `ctrl+alt+g`

## 2. <a name="startshell">startshell</a>

### Configurations

``` json
"startshell": {
    "shells": [{
        "name": "{shell name}",
        "path": "{shell path}",
    }]
}
```

### Usage
- `ctrl + shift + p` > input `start shell` > select your shell
- `ctrl + shift + s` > select your shell