import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import relianceLogo from "../assets/images/ReliancePower.svg";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TelephoneDirectory() {
  const { dept } = useParams();
  const [search, setSearch] = useState("");
  const [generalExt, setGeneralExt] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 20;

  const getLocationFromDept = (deptParam) => {
    if (!deptParam) return "rpl";
    return deptParam.toLowerCase() === "ho" ? "ho" : "rpl";
  };

  const fetchEmployees = async (searchTerm, pageNum, genExt, locationParam) => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        page: pageNum,
        perPage,
        location: locationParam,
      };
      if (genExt) params.generalExt = true;

      const res = await axios.get(
        "http://localhost:5000/api/telephone-directory",
        { params }
      );
      setEmployees(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployees([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const location = getLocationFromDept(dept);

  useEffect(() => {
    setPage(1);
    setSearch("");
    setGeneralExt(false);
    fetchEmployees("", 1, false, location);
  }, [dept]);

  const handleSearchClick = () => {
    setPage(1);
    fetchEmployees(search.trim(), 1, generalExt, location);
  };

  const handleShowAll = () => {
    setSearch("");
    setGeneralExt(false);
    setPage(1);
    fetchEmployees("", 1, false, location);
  };

  const handleGeneralExt = () => {
    setSearch("");
    setGeneralExt(true);
    setPage(1);
    fetchEmployees("", 1, true, location);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchEmployees(search.trim(), newPage, generalExt, location);
  };

  const exportToExcel = () => {
    if (employees.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Directory");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "telephone_directory.xlsx");
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <main className="flex flex-col min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={relianceLogo}
          alt="ReliancePower Logo"
          className="h-12 w-auto"
        />
        <h1 className="text-2xl font-semibold text-gray-800">
          Telephone Directory
        </h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, emp code, department, mobile no, ext no"
          className="flex-grow border border-gray-300 rounded px-3 py-2 mb-2 md:mb-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
        />
        <div className="flex gap-2 flex-wrap">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSearchClick}
          >
            Search
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handleShowAll}
          >
            Show All
          </button>
          <button
            className={`px-4 py-2 rounded border ${
              generalExt
                ? "bg-green-600 text-white border-green-700"
                : "border-gray-400"
            }`}
            onClick={handleGeneralExt}
          >
            General Ext No.
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Emp Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Designation</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Mobile No.</th>
              <th className="p-2 border">Ext No.</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-600">
                  No records found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.emp_code} className="hover:bg-gray-50">
                  <td className="p-2 border">{emp.emp_code}</td>
                  <td className="p-2 border">{emp.name}</td>
                  <td className="p-2 border">{emp.designation}</td>
                  <td className="p-2 border">{emp.department}</td>
                  <td className="p-2 border">{emp.mobile_no}</td>
                  <td className="p-2 border">{emp.ext_no}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <button
            className="px-3 py-1 rounded border border-gray-400 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`px-3 py-1 rounded border ${
                page === idx + 1
                  ? "bg-blue-600 text-white border-blue-700"
                  : "border-gray-400"
              }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded border border-gray-400 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
