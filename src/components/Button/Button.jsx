import React from "react";
import { PencilIcon, PlusIcon, TrashIcon, ShareIcon } from "@heroicons/react/24/outline";
import "./Button.css";

export const CreateButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Create Task</span>{" "}
      <PlusIcon className="btn-icon" />
    </button>
  );
};

export const ShareButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Share Task</span>{" "}
      <ShareIcon className="btn-icon" />
    </button>
  );
};

export const EditButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Edit Task</span>{" "}
      <PencilIcon className="btn-icon" />
    </button>
  );
};

export const RemoveButton = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Remove Task</span>{" "}
      <TrashIcon className="btn-icon" />
    </button>
  );
};
