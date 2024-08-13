import React from "react";
import { Link } from 'react-router-dom';
import "./TaskCard.css";

const TaskCard = ({ task, description, dueDate, id }) => {
  return (
    <div className="card-container">
      {task && <h2 className="card-task">{task}</h2>}
      {description && <p className="card-description">{description}</p>}
      {dueDate && <p className="card-due-date"><b>Due Date:</b> {dueDate}</p>}
      <Link to={`/tasks/${id}`} className="card-btn">
        View Task
      </Link>
    </div>
  );
};

export default TaskCard;
