import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IPropsDeltaView {
    delta: number;
    measurement: string;
    maxAbsDelta: number;
}

/**
 * Delta view for table.
 *
 * @param props Properties.
 */
export const DeltaView: React.SFC<IPropsDeltaView> = (props: IPropsDeltaView) => {
    const deltaAbsNormalized = 0 === props.maxAbsDelta ? 0 : Math.abs(props.delta) / props.maxAbsDelta;

    const progressNegative = props.delta < 0
        ? <div className="progress progress-negative">
            <i style={{width: `${100 * deltaAbsNormalized}%`}}></i>
        </div>
        : <div className="progress progress-placeholder"></div>;

    const progressPositive = props.delta > 0
        ? <div className="progress progress-positive">
            <i style={{width: `${100 * deltaAbsNormalized}%`}}></i>
        </div>
        : <div className="progress progress-placeholder"></div>;

    return <div className="delta">
        {progressNegative}
        <div className="delta-value">{props.delta} {props.measurement}</div>
        {progressPositive}
    </div>;
};
