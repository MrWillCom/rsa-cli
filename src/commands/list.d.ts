declare function list(args: {
    params?: {
        password?: string;
        quiet?: boolean;
    }
}): Promise<object>;
export = list;
