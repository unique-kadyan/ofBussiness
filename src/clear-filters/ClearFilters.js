import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ClearFilters.css";

function ClearFilters({
  labels,
  sortBy,
  sortDirection,
  milestone,
  author,
  assignee,
  onClearFilters
}) {
  const isFilterActive = () => {
    if (
      labels.length > 0 ||
      milestone ||
      author ||
      assignee ||
      sortBy !== "created" ||
      sortDirection !== "desc"
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      {isFilterActive() && (
        <div className="clear-filters" onClick={onClearFilters}>
          <FontAwesomeIcon className="icon" icon="times-circle" />
          <span>Clear current search query, filters, and sorts</span>
        </div>
      )}
    </>
  );
}

export default ClearFilters;
