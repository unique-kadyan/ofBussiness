import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserList(props) {
  const itemSelected = item => {
    if (item.login === props.user) {
      props.onUserChange(null);
    } else {
      props.onUserChange(item.login);
    }
  };

  return (
    <div className="list">
      {props.items.map(item => (
        <div className="item" key={item.id} onClick={() => itemSelected(item)}>
          {props.user === item.login && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          {item.avatar_url && (
            <img src={item.avatar_url} alt={`@${item.login}`} />
          )}
          <span>{item.avatar_url ? item.login : item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;
