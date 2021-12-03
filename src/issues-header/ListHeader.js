import React from "react";
import "./ListHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomDropdown from "../custom-dropdown/CustomDropdown";

function ListHeader(props) {
  const dropdowns = [
    {
      label: "Author",
      header: "Filter by author",
      filterPlaceholder: "Filter users",
      type: "author"
    },
    {
      label: "Labels",
      header: "Filter by label",
      filterPlaceholder: "Filter labels",
      type: "labels"
    },
    {
      label: "Milestones",
      header: "Filter by milestone",
      filterPlaceholder: "Filter milestones",
      type: "milestones"
    },
    {
      label: "Assignee",
      header: "Filter by who's assigned",
      filterPlaceholder: "Filter users",
      type: "assignee"
    },
    { label: "Sort", header: "Sort by", filterPlaceholder: null, type: "sort" }
  ];
  return (
    <div className="list-header-container">
      <div className="left">
        <span
          className={props.state === "open" ? "active" : null}
          onClick={() => props.stateChanged("open")}
        >
          <FontAwesomeIcon
            className="icon"
            icon="exclamation-circle"
            color={props.state === "open" ? "#24292e" : "#586069"}
          />
          Open
        </span>
        <span
          className={props.state === "closed" ? "active" : null}
          onClick={() => props.stateChanged("closed")}
        >
          <FontAwesomeIcon
            className="icon"
            icon="check"
            color={props.state === "closed" ? "#24292e" : "#586069"}
          />
          Closed
        </span>
      </div>
      <div className="right">
        {dropdowns.map(dropdown => (
          <CustomDropdown
            key={dropdown.label}
            {...dropdown}
            author={props.author}
            assignee={props.assignee}
            labels={props.labels}
            organization={props.organization}
            project={props.project}
            sortBy={props.sortBy}
            sortDirection={props.sortDirection}
            milestone={props.milestone}
            onAuthorChange={props.onAuthorChange}
            onLabelsChange={props.onLabelsChange}
            onAssigneeChange={props.onAssigneeChange}
            onSortingChange={props.onSortingChange}
            onMilestonesChange={props.onMilestonesChange}
          />
        ))}
      </div>
    </div>
  );
}

export default ListHeader;
