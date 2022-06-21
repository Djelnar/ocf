import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Cards from "./examples/Cards";
import Table from "./examples/Table";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.links}>
        <Link to={"/table"} className={styles.link}>
          Table
        </Link>
        <Link to={"/cards"} className={styles.link}>
          Cards
        </Link>
        <Link to={"/overloaded"} className={styles.link}>
          Overloaded
        </Link>
      </div>
      <div className={styles.container}>
        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="*" element={<Navigate to={"/table"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
