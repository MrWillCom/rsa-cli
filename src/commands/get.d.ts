declare function get(args: {
    keyName: string;
    params?: {
        password?: string;
        quiet?: boolean;
    };
}): Promise<string>
export = get;
