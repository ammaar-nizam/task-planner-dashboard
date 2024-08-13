import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import TaskCard from "../../components/TaskCard/TaskCard";
import WeatherViewer from "../../components/WeatherViewer/WeatherViewer";
import { CreateButton } from "../../components/Button/Button";
import TaskFormModal from "../../components/TaskFormModal/TaskFormModal";
import "./Dashboard.css";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Another useEffect hook to filter tasks based on the search query
    const results = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.dueDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (newTask) => {
    // Find the highest ID in string format and increment it for the new task
    const highestId = tasks.length
      ? Math.max(...tasks.map((task) => parseInt(task.id, 10)))
      : 0;

    const newId = (highestId + 1).toString(); // Increment and convert to string

    const taskWithId = { id: newId, ...newTask };

    // Post Request
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskWithId),
    })
      .then((response) => response.json())
      .then(() => {
        // Update local state after successful creation
        setTasks([...tasks, taskWithId]);
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="title">Dashboard</h1>
      <div className="header-container">
        <h2 className="sub-title">Your Tasks List</h2>
        <SearchBar
          placeholder="Find a task"
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="weather-viewer-container">
        <WeatherViewer />
      </div>

      <div className="col">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task.name}
            description={task.description}
            dueDate={task.dueDate}
            id={task.id}
          />
        ))}
      </div>
      <CreateButton onClick={openModal} />
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleCreateTask}
      />
    </>
  );
};

export default Dashboard;
