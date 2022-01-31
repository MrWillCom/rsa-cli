declare function help(args: {
    keyName?: string;
    params?: {
        quiet?: boolean;
    };
}): Promise<string>;
export = help;
