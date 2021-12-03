import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import List from "./issues-list/List";
import { getIssues } from "./api/index";
import Pagination from "./pagination/Pagination";
import ListHeader from "./issues-header/ListHeader";
import useDebounce from "./custom-effects/useDebounce";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamationCircle,
  faCommentAlt,
  faCheck,
  faSortDown,
  faTimesCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import CustomDropdown from "./custom-dropdown/CustomDropdown";
import ClearFilters from "./clear-filters/ClearFilters";
import { getMaxPageFromHeader } from "./helpers/Helpers";

library.add(
  faExclamationCircle,
  faCommentAlt,
  faCheck,
  faSortDown,
  faTimesCircle,
  faSpinner
);

function App() {
  const [organization, setOrganization] = useState("facebook");
  const [project, setProject] = useState("create-react-app");
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [state, setState] = useState("open");
  const [author, setAuthor] = useState(null);
  const [assignee, setAssignee] = useState("");
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc");
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedOrganization = useDebounce(organization, 500);
  const debouncedProject = useDebounce(project, 500);

  useEffect(() => {
    getGithubIssues();
  }, [
    page,
    state,
    author,
    labels,
    assignee,
    debouncedOrganization,
    debouncedProject,
    sortBy,
    sortDirection,
    milestone
  ]);

  const getGithubIssues = useCallback(() => {
    setLoading(true);
    getIssues(
      organization,
      project,
      page,
      5,
      state,
      author,
      labels,
      assignee,
      sortBy,
      sortDirection,
      milestone
    )
      .then(data => {
        // console.log(data.data);
        setIssues(data.data);
        setError(null);
        setLoading(false);
        if (data.linkHeader) {
          let max = getMaxPageFromHeader(data.linkHeader);
          max = max === -1 ? page : max === 0 ? maxPage : max;
          setMaxPage(max);
        }
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [
    organization,
    project,
    page,
    state,
    author,
    labels,
    assignee,
    sortBy,
    sortDirection,
    milestone
  ]);

  const onPrev = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const onNext = () => {
    setPage(page + 1);
  };

  const onPage = page => {
    setPage(page);
  };

  const stateChanged = state => {
    setState(state);
    setPage(1);
  };

  const onAuthorChange = author => {
    setAuthor(author);
  };

  const onLabelsChange = labels => {
    setLabels(labels);
  };

  const onLabelChanged = label => {
    setLabels([label]);
  };

  const onAssigneeChange = assignee => {
    setAssignee(assignee);
  };

  const onSortingChange = event => {
    if (event.sortBy !== sortBy) {
      setSortBy(event.sortBy);
    }
    if (event.sortDirection !== sortDirection) {
      setSortDirection(event.sortDirection);
    }
  };

  const onMilestonesChange = event => {
    setMilestone(event);
  };

  const onRepoChange = event => {
    setProject(event);
  };

  const onOrgChange = event => {
    setOrganization(event);
  };

  const onClearFilters = event => {
    setLabels([]);
    setSortBy("created");
    setSortDirection("desc");
    setMilestone(undefined);
    setAuthor(undefined);
    setAssignee(undefined);
  };

  return (
    <div className="App">
      <h1>Github issues</h1>
      <div className="options">
        <CustomDropdown
          label={organization}
          header="Select organization"
          filterPlaceholder="Search by name"
          type="orgs"
          org={organization}
          onOrgChange={onOrgChange}
        />
        <CustomDropdown
          label={project}
          header="Select repository"
          filterPlaceholder="Search by name"
          type="repos"
          repo={project}
          organization={organization}
          onRepoChange={onRepoChange}
        />
      </div>

      <ClearFilters
        labels={labels}
        sortBy={sortBy}
        sortDirection={sortDirection}
        milestone={milestone}
        author={author}
        assignee={assignee}
        onClearFilters={onClearFilters}
      />

      <ListHeader
        state={state}
        author={author}
        assignee={assignee}
        labels={labels}
        organization={organization}
        project={project}
        sortBy={sortBy}
        sortDirection={sortDirection}
        milestone={milestone}
        stateChanged={stateChanged}
        onAuthorChange={onAuthorChange}
        onLabelsChange={onLabelsChange}
        onAssigneeChange={onAssigneeChange}
        onSortingChange={onSortingChange}
        onMilestonesChange={onMilestonesChange}
      />
      {issues.length > 0 && !error && (
        <>
          <List
            issues={issues}
            project={project}
            organization={organization}
            loading={loading}
            onLabelSelected={onLabelChanged}
            onAuthorSelected={onAuthorChange}
          />
          <Pagination
            page={page}
            maxPage={maxPage}
            loading={loading}
            onPrev={onPrev}
            onNext={onNext}
            onPage={onPage}
          />
        </>
      )}

      {issues.length === 0 && !error && (
        <div className="no-issues">No issues</div>
      )}
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
