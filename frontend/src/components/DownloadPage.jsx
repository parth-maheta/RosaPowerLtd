import React, { useEffect, useState } from "react";
import relianceLogo from "../assets/images/ReliancePower.svg";
import axios from "axios";

export default function DownloadPage({ category, department = null }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setFiles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const source = axios.CancelToken.source();

    const fetchFiles = async () => {
      try {
        let url = `http://localhost:5000/api/files?category=${encodeURIComponent(
          category
        )}`;
        if (department) url += `&department=${encodeURIComponent(department)}`;
        const res = await axios.get(url, { cancelToken: source.token });
        setFiles(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching files:", err);
          setError("Failed to load files. Please try again.");
          setFiles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
    return () => {
      source.cancel("Operation canceled due to new request.");
    };
  }, [category, department]);

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 px-4 py-3">
        <img src={relianceLogo} alt="Reliance Logo" className="h-10 w-auto" />
        <h2 className="text-xl font-semibold text-gray-800">Download Files</h2>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 pt-4">
        {loading ? (
          <p className="text-gray-600">Loading files...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500">No files available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm text-gray-800">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 border">S.No</th>
                  <th className="p-2 border text-left">Filename</th>
                  <th className="p-2 border">Download</th>
                  <th className="p-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={file.sno} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{file.filename}</td>
                    <td className="p-2 border text-center">
                      <a
                        href={`http://localhost:5000${file.downloadUrl}`}
                        download
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    </td>
                    <td className="p-2 border text-center">
                      <a
                        href={`http://localhost:5000${file.downloadUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
