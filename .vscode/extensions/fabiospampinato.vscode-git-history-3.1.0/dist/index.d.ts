/// <reference types="node" />
declare module "types" {
    type Commit = {
        author_email: string;
        author_name: string;
        date: string;
        hash: string;
        message: string;
    };
    type FileData = {
        filePath: string;
        gitPath: string;
        isBinary: boolean;
        isTextual: boolean;
        language?: string;
        commits: Commit[];
        prevCommit: Commit | undefined;
        commit: Commit;
        nextCommit: Commit | undefined;
        content: Buffer;
    };
    type Options = {
        details: {
            author: {
                enabled: boolean;
            };
            date: {
                enabled: boolean;
            };
            hash: {
                enabled: boolean;
                length: number;
            };
        };
    };
    export type { Commit, FileData, Options };
}
declare module "git" {
    import type { Commit } from "types";
    const Git: {
        exec: (cwd: string, args: string[]) => Promise<Buffer>;
        getCommits: (cwd: string, filePath: string) => Promise<Commit[]>;
        getContentAtCommit: (cwd: string, filePath: string, commit: string) => Promise<Buffer | undefined>;
        getContentAtHead: (cwd: string, filePath: string) => Promise<Buffer>;
    };
    export default Git;
}
declare module "utils" {
    import type { Commit, FileData, Options } from "types";
    const formatDate: (date: Date) => string;
    const getFileData: () => Promise<FileData | undefined>;
    const getFileItems: (commits: Commit[]) => {
        commit: Commit;
        label: string;
        detail: string;
    }[];
    const getFileTemp: (filePath: string, fileContent: Buffer, commit?: Commit) => Promise<string>;
    const getOptions: () => Options;
    const isBoolean: (value: unknown) => value is boolean;
    const isNumber: (value: unknown) => value is number;
    const isString: (value: unknown) => value is string;
    const truncate: (str: string, length: number) => string;
    export { formatDate, getFileData, getFileItems, getFileTemp, getOptions, isBoolean, isNumber, isString, truncate };
}
declare module "commands" {
    const openFileAtCommit: () => Promise<void>;
    const openFileAtCommitToSide: () => Promise<void>;
    const diffFileAtCommit: () => Promise<void>;
    const diffFileAtCommitAgainstCurrent: () => Promise<void>;
    const restoreFileAtCommit: () => Promise<void>;
    export { openFileAtCommit, openFileAtCommitToSide, diffFileAtCommit, diffFileAtCommitAgainstCurrent, restoreFileAtCommit };
}
declare module "index" {
    const activate: () => void;
    export { activate };
}
