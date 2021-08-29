declare function _import(args: {
    keyName: string;
    params?: {
        public?: string;
        private?: string;
        overwrite?: boolean;
        quiet?: boolean;
        password?: string;
    };
}): Promise<string>;
export = _import;
