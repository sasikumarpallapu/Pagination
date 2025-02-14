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

  // Logic to display only 3 page numbers at a time
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

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

        {/* Pagination Controls */}
        <nav aria-label="pagination" className="pagination-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn"
          >
            Previous
          </button>

          {/* Display only 3 page numbers */}
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`btn pagination-btn ${
                  currentPage === pageNumber ? "active-page" : ""
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default UserList;
