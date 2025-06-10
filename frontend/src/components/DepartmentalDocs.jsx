import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiFolder,
  HiFolderOpen,
  HiDocument,
  HiArrowDownTray,
  HiHome,
} from "react-icons/hi2";

export default function DepartmentalDocs() {
  const [folderData, setFolderData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [expandedPaths, setExpandedPaths] = useState({});
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dept = params.get("department");
    if (dept) setSelectedDept(dept);
  }, [location.search]);

  useEffect(() => {
    if (!selectedDept) return;

    setFolderData([]);
    setExpandedPaths({});
    setBreadcrumb([]);
    setLoading(true);

    fetch(
      `/api/departmental-docs?department=${encodeURIComponent(selectedDept)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setFolderData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch departmental docs", err);
        setFolderData([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDept]);

  const toggleExpand = (path) => {
    setExpandedPaths((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleBreadcrumbClick = (index) => {
    const newPathArray = breadcrumb.slice(0, index + 1);
    const newExpanded = {};
    newPathArray.forEach((_, i) => {
      const partial = newPathArray.slice(0, i + 1).join("/");
      newExpanded[partial] = true;
    });

    setExpandedPaths(newExpanded);
    setBreadcrumb(newPathArray);
  };

  const filterFiles = (items) => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item) => {
        if (item.type === "folder") {
          return {
            ...item,
            children: filterFiles(item.children || []),
          };
        }
        return item;
      });
  };
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return <HiDocument className="text-red-600" />;
      case "doc":
      case "docx":
        return <HiDocument className="text-blue-600" />;
      case "xls":
      case "xlsx":
        return <HiDocument className="text-green-600" />;
      case "ppt":
      case "pptx":
        return <HiDocument className="text-orange-600" />;
      case "txt":
        return <HiDocument className="text-gray-600" />;
      default:
        return <HiDocument className="text-gray-500" />;
    }
  };

  const renderFiles = (files, parentPath = []) => {
    return (
      <ul className="pl-4 space-y-1">
        {files.map((item) => {
          const currentPath = [...parentPath, item.name].join("/");
          if (item.type === "folder") {
            const isExpanded = expandedPaths[currentPath] || false;
            return (
              <li key={currentPath}>
                <div
                  className="flex items-center gap-2 cursor-pointer text-blue-800 font-medium hover:underline"
                  onClick={() => {
                    toggleExpand(currentPath);
                    setBreadcrumb(parentPath.concat(item.name));
                  }}
                >
                  {isExpanded ? <HiFolderOpen /> : <HiFolder />}
                  <span className="truncate">{item.name}</span>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded &&
                    (item.children.length > 0 ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderFiles(item.children, [...parentPath, item.name])}
                      </motion.div>
                    ) : (
                      <p className="text-gray-500 italic pl-6">Empty folder</p>
                    ))}
                </AnimatePresence>
              </li>
            );
          } else if (item.type === "file") {
            return (
              <li
                key={currentPath}
                className="pl-5 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(item.name)}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline break-all"
                    onClick={() => setBreadcrumb(parentPath)}
                  >
                    {item.name}
                  </a>
                </div>
                <a
                  href={item.url}
                  download
                  title="Download"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <HiArrowDownTray />
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 space-y-4">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-900">
        Departmental Documents{selectedDept ? ` : ${selectedDept}` : ""}
      </h1>

      {/* Search */}
      {selectedDept && (
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search files or folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <div className="text-sm text-center text-gray-700 flex flex-wrap justify-center gap-1 items-center">
          <HiHome className="text-blue-600" />
          <span className="font-semibold text-blue-600">Navigate:</span>
          {breadcrumb.map((folder, index) => (
            <span key={index} className="flex items-center gap-1">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleBreadcrumbClick(index)}
              >
                {folder}
              </button>
              {index < breadcrumb.length - 1 && <span>{">"}</span>}
            </span>
          ))}
        </div>
      )}

      {/* File Tree */}
      <div className="bg-white border border-gray-200 rounded p-4 shadow-sm overflow-x-auto">
        {loading ? (
          <p className="text-center text-blue-600 animate-pulse">
            Loading files...
          </p>
        ) : selectedDept && folderData.length > 0 ? (
          renderFiles(filterFiles(folderData))
        ) : (
          <p className="text-gray-600 text-center">
            {selectedDept
              ? "No files available for this department."
              : "Please select a department from the sidebar."}
          </p>
        )}
      </div>
    </div>
  );
}
