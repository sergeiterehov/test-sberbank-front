/**
 * Interface for response data structure.
 */
interface IResponseData {
    fa: {
        nDynamicTypeID: number,
        fa_data: {
            r: Array<{
                fDeltaPlan: number;
                axis: {
                    r: Array<{
                        sName_RU: string;
                    }>;
                };
                sMeasDelta_RU: string;
            }>;
            axis: {
                r: Array<{
                    sAxisName: string;
                    nAxisID: number;
                }>;
            };
        };
    };
}

/**
 * Interface for GetData's result structure.
 */
export interface IGetDataResult {
    /**
     * Rows data array.
     */
    data: Array<{
        /**
         * Axis vector values.
         */
        vector: string[];
        /**
         * Delta value.
         */
        delta: number;
        /**
         * Delta value's measurements at diff languages.
         */
        deltaMeasurement: {
            /**
             * Russian.
             */
            ru?: string;
        };
    }>;
    /**
     * Axis information.
     */
    axis: Array<{
        /**
         * External ID.
         */
        id: number;
        /**
         * Axis name.
         */
        name: string;
    }>;
}

/**
 * Data provider for the fake API method.
 */
export class DataProvider {
    private baseUrl: string;

    /**
     * @param baseUrl Base URL for API host.
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Returns main data for table.
     */
    public async getData(): Promise<IGetDataResult> {
        const response: IResponseData = await (await fetch(`${this.baseUrl}/data.json`)).json();
        const result: IGetDataResult = {
            data: response.fa.fa_data.r.map(
                (item) => ({
                    vector: item.axis.r.map(
                        (axis) => axis.sName_RU,
                    ),
                    delta: item.fDeltaPlan,
                    deltaMeasurement: {
                        ru: item.sMeasDelta_RU,
                    },
                }),
            ),
            axis: response.fa.fa_data.axis.r.map(
                (axis) => ({
                    id: axis.nAxisID,
                    name: axis.sAxisName,
                }),
            ),
        };

        return result;
    }
}
