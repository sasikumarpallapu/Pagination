import React from "react";
import UserList from "./UserList";
import  "./index.css";

const App = () => {
  return (
    <div>
      <h1 className="page-header">Paginated UserList</h1>
      <UserList />
    </div>
  );
};

export default App;
