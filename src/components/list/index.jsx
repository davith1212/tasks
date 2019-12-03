import React from 'react';
import Modal from '../modal';
import _ from 'lodash';
import Level from '../../global'

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            showModal: false,
            id: null,
            task: '',
            priority: Level.low.value,
            isEditing: false,
            currentTask: {},
            priorityOrder: 'asc'
        }
    }
    mapList = () => {
        if (this.state.list) {
            return _.orderBy(this.state.list, ['priority'], [this.state.priorityOrder]).map((item) => {
                return (
                    <li key={item.id} >
                        <p>{item.task}</p>
                        <small>Priority: {_.find(Level, { 'value': item.priority }).label}</small>
                        <button onClick={() => this.openEditor(item.id)}>Edit</button> <button onClick={() => this.removeTask(item.id)}>Remove</button>
                    </li>
                )
            })
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
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

    setValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addTask = () => {
        const listClone = _.cloneDeep(this.state.list);
        listClone.push({ id: Math.floor(Math.random() * 1000), task: this.state.task, priority: Number(this.state.priority) });
        this.setState({
            id: null,
            list: listClone,
            task: '',
            priority: Level.low.value
        });

        this.setSessionData(listClone);
        this.toggleModal();
    }

    editTask = () => {
        const listClone = _.cloneDeep(this.state.list);
        const current = _.find(listClone, (o) => o.id === this.state.id);
        current.task = this.state.task;
        current.priority = Number(this.state.priority);
        this.setState({
            list: listClone,
            id: null,
            task: '',
            priority: Level.low.value,
            isEditing: false
        })

        this.setSessionData(listClone);
        this.toggleModal();
    }

    removeTask = (id) => {
        const listClone = _.cloneDeep(this.state.list);
        listClone.splice(_.findIndex(listClone, (o) => o.id === id), 1)
        this.setState({
            list: listClone
        })

        this.setSessionData(listClone);
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
            modal = <Modal currentTask={this.state.currentTask} toggleModal={this.toggleModal} addTask={this.addTask} task={this.state.task} priority={this.state.priority} setValue={this.setValue} isEditing={this.state.isEditing} editTask={this.editTask} level={Level} />
        }
        return (
            <main>
                <form>
                    <label>
                        <input
                            type="radio"
                            id="priorityOrder"
                            name="priorityOrder"
                            value="asc"
                            checked={this.state.priorityOrder === 'asc'}
                            onChange={this.setValue}
                        />
                        Low
					</label>
                    <label>
                        <input
                            type="radio"
                            id="priorityOrder"
                            name="priorityOrder"
                            value="desc"
                            onChange={this.setValue}
                        />
                        High
					</label>
                </form>
                <ul className="list-wrapper">
                    {this.mapList()}
                </ul>
                <button onClick={this.toggleModal}>Add Task</button>
                {modal}
            </main>
        )
    }

}