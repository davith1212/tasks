import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
    render() {
        return (
            <div className="modal-container">
                <div className="modal-wrapper">
                    <span className="close-modal" onClick={this.props.toggleModal}>X</span>
                    <label htmlFor="task">Create a task</label>
                    <input id="task" name="task" type="text" />
                    <label htmlFor="priority">Set a priority</label>
                    <select name="priority" id="priority">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button onClick={this.props.toggleModal}>Add Task</button>
                </div>
            </div>
        )
    }
}