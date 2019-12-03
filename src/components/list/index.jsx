import React from 'react';
import Modal from '../modal';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['one', 'two', 'three', 'four'],
            showModal: false
        }
    }

    mapList = () => {
        return this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        let modal;
        if (this.state.showModal) {
            modal = <Modal toggleModal={this.toggleModal} />
        }
        return (
            <main>
                <ul>
                    {this.mapList()}
                </ul>
                <button onClick={this.toggleModal}>Add Task</button>
                {modal}
            </main>
        )
    }
}