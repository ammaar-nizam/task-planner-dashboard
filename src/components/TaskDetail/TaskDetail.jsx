import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TaskDetail.css";
import { EditButton, RemoveButton, ShareButton } from "../Button/Button";
import TaskFormModal from "../TaskFormModal/TaskFormModal";

const TaskDetail = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Task not found");
        }
        const data = await response.json();
        setTaskData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleShare = () => {
    if (taskData) {
      const subject = `Task Details: ${taskData.name}`;
      const body = `
        Task Name: ${taskData.name}
        Description: ${taskData.description}
        Due Date: ${taskData.dueDate}
      `;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleEdit = () => {
    openModal();
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      window.location.href = "/";
    } catch (error) {
      alert(`Error removing task: ${error.message}`);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      console.log(updatedTask); // Debugging was done here
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      setTaskData(updatedTask);
      closeModal();
    } catch (error) {
      alert("Error updating task");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskData) {
    return <div>No task found</div>;
  }

  return (
    <div className="wrapper">
      <div className="task-detail">
        <h1>{taskData.name}</h1>
        <p>
          <b>Description:</b> {taskData.description}
        </p>
        <p>
          <b>Due Date:</b> {taskData.dueDate}
        </p>

        <div className="button-container">
          <ShareButton onClick={handleShare} />
          <EditButton onClick={handleEdit} />
          <TaskFormModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialTask={taskData}
            onSave={handleUpdateTask}
          />
          <RemoveButton onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
