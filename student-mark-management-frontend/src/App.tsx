import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import StudentList from "./components/StudentList";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<StudentList />} />
          </Routes>
        </Container>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
