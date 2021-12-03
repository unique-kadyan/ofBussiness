import React from "react";
import ListItem from "./ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./List.css";

function List(props) {
  return (
    <div className="list-container">
      {props.issues.map(issue => (
        <ListItem
          key={issue.id}
          issue={issue}
          project={props.project}
          organization={props.organization}
          onLabelSelected={props.onLabelSelected}
          onAuthorSelected={props.onAuthorSelected}
        />
      ))}
      {props.loading && (
        <div className="loader">
          <div className="spinner">
            <FontAwesomeIcon
              className="spinner-icon"
              icon="spinner"
              color="#000000"
            />
            <span>Loading</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
