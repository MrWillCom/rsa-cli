declare function encrypt(args: {
    keyName: string;
    object?: string;
    params?: {
        input?: string;
        output?: string;
        quiet?: boolean;
    };
}): Promise<string>;
export = encrypt;
