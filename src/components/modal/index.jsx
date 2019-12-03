import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
    addTask = () => {
        this.props.addTask()
    }
    render() {
        let submit = this.addTask;
        let btnText = 'Add Task'
        if (this.props.isEditing) {
            submit = this.props.editTask;
            btnText = 'Edit Task'
        }
        return (
            <div className="modal-container">
                <div className="modal-wrapper">
                    <span className="close-modal" onClick={this.props.toggleModal}>X</span>
                    <label htmlFor="task">Create a task</label>
                    <input id="task" name="task" onChange={this.props.setValue} type="text" value={this.props.task} />
                    <label htmlFor="priority">Set a priority</label>
                    <select onChange={this.props.setValue} defaultValue={this.props.priority} name="priority" id="priority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button onClick={submit}>{btnText}</button>
                </div>
            </div>
        )
    }
}