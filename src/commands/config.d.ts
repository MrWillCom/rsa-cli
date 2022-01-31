declare function config(args: {
    params?: {
        quiet?: boolean;
    };
    argv: string[];
}): Promise<object>;
export = config;
