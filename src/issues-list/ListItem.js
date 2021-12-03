import React, { useState, useEffect } from "react";
import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "./Label";
import UserTooltip from "./UserTooltip";
import IssueTooltip from "./IssueTooltip";

function ListItem({
  issue,
  project,
  organization,
  onLabelSelected,
  onAuthorSelected
}) {
  const [showUserTooltip, setShowUserTooltip] = useState(false);
  const [showIssueTooltip, setShowIssueTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDescription = () => {
    const date = new Date(issue.created_at);
    return (
      <>
        #{issue.number} opened on {date.toLocaleDateString()} by{" "}
        <a
          href="#"
          className="user"
          onMouseOver={() => setUserTooltipState(true)}
          onMouseOut={() => setUserTooltipState(false)}
          onClick={() => onAuthorSelected(issue.user.login)}
        >
          {issue.user.login}
          {showUserTooltip && <UserTooltip user={issue.user} />}
        </a>
      </>
    );
  };

  const setUserTooltipState = state => {
    if (isMounted) {
      setShowUserTooltip(state);
    }
  };

  const setIssueTooltipState = state => {
    if (isMounted) {
      setShowIssueTooltip(state);
    }
  };

  const getStateColor = state => {
    switch (state) {
      case "open":
        return "#28a745";
      case "closed":
        return "#cb2431";
      default:
        return "#d3d3d3";
    }
  };

  return (
    <div className="list-item-container">
      <div className="left">
        <FontAwesomeIcon
          icon="exclamation-circle"
          color={getStateColor(issue.state)}
        />
        <div className="content-wrapper">
          <div className="title-container">
            <a
              href="#"
              className="title"
              onMouseOver={() => setIssueTooltipState(true)}
              onMouseOut={() => setIssueTooltipState(false)}
            >
              {issue.title}
              {showIssueTooltip && (
                <IssueTooltip
                  issue={issue}
                  project={project}
                  organization={organization}
                />
              )}
            </a>
            <div className="label-container">
              {issue.labels.map(label => (
                <Label
                  key={label.id}
                  {...label}
                  onLabelSelected={onLabelSelected}
                />
              ))}
            </div>
          </div>
          <div className="description">{getDescription()}</div>
        </div>
      </div>
      {issue.comments > 0 && (
        <div className="right">
          <FontAwesomeIcon icon="comment-alt" color="#586069" />
          <span>{issue.comments}</span>
        </div>
      )}
    </div>
  );
}

export default ListItem;
