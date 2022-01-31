declare function remove(args: {
    keyName: string;
    params?: {
        quiet?: boolean;
    };
}): Promise<string>;
export = remove;
