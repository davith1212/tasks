import React from 'react';
import Modal from '../modal';
import _ from 'lodash';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            task: '',
            priority: 'Low',
            showModal: false
        }
    }

    mapList = () => {
        return this.state.list.map((item, index) => {
            return <li key={index}>{item.task}</li>
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    setValue = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
    }
    
    setSessionData = (data) => {
		sessionStorage.setItem('taskList', JSON.stringify(data))
	}

    addTask = () => {
		const listClone = _.cloneDeep(this.state.list);
		listClone.push({ task: this.state.task, priority: this.state.priority });
		this.setState({
			list: listClone,
			task: '',
			priority: 'Low'
		});

        this.setSessionData(listClone);
		this.toggleModal();
    }
    
    componentDidMount() {
		if (sessionStorage.getItem('taskList')) {
			this.setState({
				list: JSON.parse(sessionStorage.getItem('taskList'))
			})
		}
	}

    render() {
        let modal;
        if (this.state.showModal) {
            modal = <Modal toggleModal={this.toggleModal} setValue={this.setValue} addTask={this.addTask} priority={this.state.priority} task={this.state.tast} />
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