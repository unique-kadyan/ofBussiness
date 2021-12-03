import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LabelList(props) {
  const isItemSelected = item => {
    return !!props.labels.find(i => i === item.name);
  };

  const itemSelected = item => {
    const newSelected = [...props.labels];
    
    const idx = newSelected.findIndex(i => i === item.name);
    if (idx > -1) {
      newSelected.splice(idx, 1);
      
    } else {
      newSelected.push(item.name);
    }
    props.onLabelsChange(newSelected);
  };

  return (
    <div className="list">
      {props.items.map(item => (
        <div className="item" key={item.id} onClick={() => itemSelected(item)}>
          {isItemSelected(item) && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          <div
            className="color"
            style={{ backgroundColor: "#" + item.color }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default LabelList;
