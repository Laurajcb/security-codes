import React, { Component } from "react";


class Loading extends Component {
    componentDidMount() {
        console.log('componentDidMount')
    }

    render() {
        return (
            <p>Loading...</p>
        )
    }
}

export { Loading };
