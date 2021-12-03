import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MilestoneList(props) {
  const itemSelected = item => {
    if (item.number === props.milestone) {
      props.onMilestoneChange(null);
    } else {
      props.onMilestoneChange(item.number);
    }
  };

  return (
    <div className="list">
      {props.items.map(item => (
        <div className="item" key={item.id} onClick={() => itemSelected(item)}>
          {item.number === props.milestone && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default MilestoneList;
