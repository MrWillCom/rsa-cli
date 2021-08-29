declare function password(args: {
    keyName: 'status';
    params?: {
        quiet?: boolean;
    };
}): Promise<boolean>;
export = password;
