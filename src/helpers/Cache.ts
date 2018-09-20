/**
 * Simple cache method for function.
 */
export class Cache<TReturn> {
    /**
     * Create new Cache object from function.
     *
     * @param f Cached function.
     */
    public static it<TReturn>(f: (...args: any[]) => TReturn): Cache<TReturn> {
        return new Cache<TReturn>(f);
    }

    private dependenciesOld: any[];
    private inited: boolean;
    private f: (...args: any[]) => TReturn;
    private cache: TReturn;

    constructor(f: (...args: any[]) => any) {
        this.f = f;
        this.inited = false;
    }

    /**
     * Return cached value.
     *
     * @param args Args for the function.
     * @param dependencies Additional dependencies.
     */
    public get(args: any[], ...dependencies: any[]): TReturn {
        const hasChanges = ! this.inited
            || -1 !== dependencies.findIndex((item, i) => this.dependenciesOld[i] !== item);

        if (hasChanges) {
            this.cache = this.f(...args);

            this.inited = true;
            this.dependenciesOld = [...args, ...dependencies];
        }

        return this.cache;
    }
}
