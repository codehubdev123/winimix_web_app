// components/loaders/AdvancedTableLoader.tsx
import React from "react";

interface AdvancedTableLoaderProps {
  colSpan?: number;
  rows?: number;
  withHeader?: boolean;
}

export const AdvancedTableLoader: React.FC<AdvancedTableLoaderProps> = ({
  colSpan = 6,
  rows = 5,
  withHeader = true,
}) => {
  return (
    <>
      {withHeader && (
        <tr>
          {Array.from({ length: colSpan }).map((_, index) => (
            <th key={index} className="px-6 py-4">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            </th>
          ))}
        </tr>
      )}

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="group">
          {Array.from({ length: colSpan }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <div
                className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-wave"
                style={{ animationDelay: `${colIndex * 0.1}s` }}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
