import React, {useEffect, useRef, useState} from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import { CircularProgress } from '@material-ui/core';

export default function asyncComponent(importComponent) {
    return (props) => {
        Nprogress.start();

        const [component, setComponent] = useState(null);
        let mounted = useRef(true);

        useEffect(() => {
            const asyncComponentDidMount = async () => {
                const {default: Component} = await importComponent();
                if (mounted.current) {
                    setComponent(<Component {...props} />);
                    mounted.current = false;
                }
            };
            asyncComponentDidMount().then(r => Nprogress.done());

        }, [component]);

        const Component = component ||
            <div className="loader-view"
                 style={{height: 'calc(100vh - 200px)'}}>
                <CircularProgress/>
            </div>;
        return (
            <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
                {Component}
            </ReactPlaceholder>
        );
    };
}