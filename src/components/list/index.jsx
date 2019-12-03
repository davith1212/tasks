import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['one', 'two', 'three', 'four']
        }
    }

    mapList() {
        return this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }

    render() {
        return (
            <main>
                <ul>
                    {this.mapList()}
                </ul>
            </main>
        )
    }
}