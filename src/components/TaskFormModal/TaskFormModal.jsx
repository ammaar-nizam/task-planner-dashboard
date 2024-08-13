import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TaskFormModal.css";

const TaskFormModal = ({ isOpen, onClose, initialTask, onSave }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.name || "");
      setDescription(initialTask.description || "");
      setDueDate(initialTask.dueDate || "");
    } else {
      setTaskName("");
      setDescription("");
      setDueDate("");
    }
  }, [initialTask]);

  const validateForm = () => {
    const newErrors = {};
    if (!taskName.trim()) {
      newErrors.taskName = "Task Name is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!dueDate) {
      newErrors.dueDate = "Due Date is required";
    } else if (new Date(dueDate) < new Date()) {
      newErrors.dueDate = "Due Date must be in the future";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const taskData = {
        name: taskName,
        description,
        dueDate,
      };
      onSave(taskData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={initialTask ? "Edit Task" : "Create Task"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{initialTask ? "Edit Task" : "Create a New Task"}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {errors.taskName && <span className="error">{errors.taskName}</span>}
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </label>

        <div className="task-modal-button-container">
          <button type="submit" className="create-btn">
            {initialTask ? "Save Changes" : "Create Task"}
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
