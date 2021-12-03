import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortingList(props) {
  const isSelected = item => {
    return (
      item.sortBy === props.sortBy && item.sortDirection === props.sortDirection
    );
  };

  const itemSelected = item => {
    props.onSortingChange({
      sortBy: item.sortBy,
      sortDirection: item.sortDirection
    });
  };

  return (
    <div className="list">
      {props.items.map(item => (
        <div className="item" key={item.id} onClick={() => itemSelected(item)}>
          {isSelected(item) && (
            <FontAwesomeIcon className="check-icon" icon="check" />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default SortingList;
