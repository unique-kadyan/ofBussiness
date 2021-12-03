import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getColorForBackground from "../helpers/ColorHelpers";
import "./IssueTooltip.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function IssueTooltip({ issue, project, organization }) {
  const getDate = dateStr => {
    const date = new Date(dateStr);
    const now = new Date();
    if (date.getFullYear() === now.getFullYear()) {
      return `${months[date.getMonth()]} ${date.getDate()}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="issue-tooltip">
      <div className="head-info">
        {organization}/{project} on {getDate(issue.created_at)}
      </div>
      <div className="body-wrapper">
        <div className="left">
          <FontAwesomeIcon
            icon="exclamation-circle"
            color={issue.state === "open" ? "#28a745" : "#cb2431"}
          />
        </div>
        <div className="right">
          <div className="issue-title">
            {issue.title} <span>#{issue.number}</span>
          </div>
          <div
            className={
              issue.labels.length > 0
                ? "issue-description"
                : "issue-description long"
            }
          >
            {issue.body}
          </div>
          <div className="issue-labels">
            {issue.labels.map(label => (
              <span
                key={label.id}
                style={{
                  background: `#${label.color}`,
                  color: getColorForBackground(label.color)
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueTooltip;
