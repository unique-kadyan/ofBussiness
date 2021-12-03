import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OrgsList(props) {
  return (
    <div className="list">
      {props.items.map(item => (
        <div
          className="item"
          key={item.id}
          onClick={() => props.onOrgChange(item.login)}
        >
          {props.org === item.login && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          <img src={item.avatar_url} alt={`@${item.login}`} />
          <span>{item.login}</span>
        </div>
      ))}
    </div>
  );
}

export default OrgsList;
