declare function decrypt(args: {
    keyName: string;
    object?: string;
    params?: {
        input?: string;
        output?: string;
        password?: string;
        quiet?: boolean;
    };
}): Promise<string>;
export = decrypt;
