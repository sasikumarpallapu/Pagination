import React, { useState, useEffect } from "react";
import "./index.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="card-container">
          {currentUsers.map((user) => (
            <div key={user.id} className="card">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
          ))}
        </div>
        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="btn">
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index + 1} 
              onClick={() => goToPage(index + 1)} 
              className={`btn pagination-btn ${currentPage === index + 1 ? 'active-page' : ''}`}
              style={{ background: currentPage === index + 1 ? '#007bff' : 'transparent', color: currentPage === index + 1 ? 'white' : '#007bff', border: '2px solid #007bff', margin: '0 5px' }}>
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className="btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
