import * as React from 'react';

export interface BaseProps {}

export class Base extends React.Component<BaseProps, {}> {
    render() {
        return <div>Tja!</div>;
    }
}
