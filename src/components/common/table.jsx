import React from "react";
import TableBody from "./tableBody.jsx";
import TableHeader from "./tableHeader.jsx";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table container mt-5 ms-5">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
