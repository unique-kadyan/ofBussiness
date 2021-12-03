import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReposList(props) {
  return (
    <div className="list">
      {props.items.map(item => (
        <div
          className="item"
          key={item.id}
          onClick={() => props.onOrgChange(item.name)}
        >
          {props.org === item.name && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          <span>
            {item.name} ({item.open_issues_count} issues)
          </span>
        </div>
      ))}
    </div>
  );
}

export default ReposList;
