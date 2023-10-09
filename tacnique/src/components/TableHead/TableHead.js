import React from "react";

const TableHead = () => {
  return (
    <thead className="header">
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Company</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
