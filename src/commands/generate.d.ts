declare function generate(args: {
    keyName: string;
    params?: {
        quiet?: boolean;
        password?: string;
    };
}): Promise<string>;
export = generate;
