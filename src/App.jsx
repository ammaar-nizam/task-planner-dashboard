import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import Dashboard from "./pages/Dashboard/Dashboard";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
