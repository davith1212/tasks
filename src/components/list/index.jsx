import React from 'react';
import Modal from '../modal';
import _ from 'lodash';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            id: null,
            task: '',
            priority: 'Low',
            showModal: false,
            isEditing: false
        }
    }

    mapList = () => {
        return this.state.list.map((item) => {
            return <li key={item.id}>{item.task} <button onClick={() => this.openEditor(item.id)}>edit</button></li>
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
    
    openEditor = (e) => {
		const listClone = _.cloneDeep(this.state.list);
		const current = _.find(listClone, (o) => o.id === e);
		this.setState({
			id: e,
			task: current.task,
			priority: current.priority,
			isEditing: true
		})

		this.toggleModal();
	}

    addTask = () => {
		const listClone = _.cloneDeep(this.state.list);
		listClone.push({ id: Math.floor(Math.random() * 1000), task: this.state.task, priority: this.state.priority });
		this.setState({
			list: listClone,
			task: '',
			priority: 'Low'
		});

        this.setSessionData(listClone);
		this.toggleModal();
    }

    editTask = () => {
		const listClone = _.cloneDeep(this.state.list);
		const current = _.find(listClone, (o) => o.id === this.state.id);
		current.task = this.state.task;
		current.priority = this.state.priority;
		this.setState({
			list: listClone,
			id: null,
			task: '',
			priority: 'Low',
			isEditing: false
		})

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
            modal = <Modal toggleModal={this.toggleModal} setValue={this.setValue} addTask={this.addTask} priority={this.state.priority} task={this.state.task} isEditing={this.state.isEditing} editTask={this.editTask} />
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