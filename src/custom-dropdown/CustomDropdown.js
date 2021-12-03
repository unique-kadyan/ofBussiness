import React, { useState, useRef, useEffect } from "react";
import "./CustomDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDebounce from "../custom-effects/useDebounce";
import {
  searchUsers,
  getLabels,
  getMilestones,
  getUsers,
  getReposForOrganization,
  searchReposInOrganization,
  getOrganizations,
  searchOrganizations
} from "../api/index";
import UserList from "./lists/UserList";
import LabelList from "./lists/LabelList";
import SortingList from "./lists/SortingList";
import MilestoneList from "./lists/MilestoneList";
import ReposList from "./lists/ReposList";
import OrgsList from "./lists/OrgsList";

const defaultAssigneItems = [
  { id: "nobody", login: "none", text: "Assigned to nobody" },
  { id: "anyone", login: "*", text: "Assigned to anyone" }
];

const defaultMilestoneItems = [
  { id: "nomilestone", number: "none", title: "Issues with no milestone" },
  { id: "anymilestone", number: "*", title: "Issues with any milestone" }
];

const defaultSortingItems = [
  { id: "newest", label: "Newest", sortBy: "created", sortDirection: "desc" },
  { id: "oldest", label: "Oldest", sortBy: "created", sortDirection: "asc" },
  {
    id: "mcommented",
    label: "Most commented",
    sortBy: "comments",
    sortDirection: "desc"
  },
  {
    id: "lcommented",
    label: "Least commented",
    sortBy: "comments",
    sortDirection: "asc"
  },
  {
    id: "rupdated",
    label: "Recently updated",
    sortBy: "updated",
    sortDirection: "desc"
  },
  {
    id: "lrupdated",
    label: "Least recently updated",
    sortBy: "updated",
    sortDirection: "asc"
  }
];

function CustomDropdown(props) {
  const node = useRef();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingItems, setSortingItems] = useState([]);
  const [labels, setLabels] = useState([]);
  const [searchedLabels, setSearchedLabels] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [searchedMilestones, setSearchedMilestones] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedAuthors, setSearchedAuthors] = useState([]);
  const [searchedAssignees, setSearchedAssignees] = useState([]);
  const [repos, setRepos] = useState([]);
  const [searchedRepos, setSearchedRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [searchedOrgs, setSearchedOrgs] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      switch (props.type) {
        case "author":
          searchUsers(debouncedSearchTerm).then(res => {
            setSearchedAuthors(res.items);
          });
          break;
        case "assignee":
          searchUsers(debouncedSearchTerm).then(res => {
            setSearchedAssignees([...defaultAssigneItems, ...res.items]);
          });
          break;
        case "labels":
          const searchedLabels = labels.filter(l =>
            l.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setSearchedLabels(searchedLabels);
          break;
        case "milestones":
          const searchedMilestones = milestones.filter(m =>
            m.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setSearchedMilestones(searchedMilestones);
          break;
        case "repos":
          searchReposInOrganization(
            props.organization,
            debouncedSearchTerm
          ).then(res => {
            setSearchedRepos(res.items);
          });
          break;
        case "orgs":
          searchOrganizations(debouncedSearchTerm).then(res => {
            setSearchedOrgs(res.items);
          });
          break;
        default:
          break;
      }
    } else {
      switch (props.type) {
        case "author":
        case "assignee":
          getAllUsers();
          break;
        case "labels":
          getLabelsForIssues();
          break;
        case "milestones":
          getMilestonesForIssues();
          break;
        case "sort":
          setSortingItems(defaultSortingItems);
          break;
        case "repos":
          getReposForOrg();
          break;
        case "orgs":
          getOrgs();
          break;
        default:
          break;
      }
    }
  }, [debouncedSearchTerm]);

  const handleClickOutside = event => {
    if (node.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const inputChanged = event => {
    setSearchTerm(event.target.value);
  };

  const getLabelsForIssues = () => {
    if (labels && labels.length) {
      setSearchedLabels(labels);
    } else {
      getLabels(props.organization, props.project).then(labels => {
        setLabels(labels);
        setSearchedLabels(labels);
      });
    }
  };

  const getMilestonesForIssues = () => {
    if (milestones && milestones.length) {
      setSearchedMilestones(milestones);
    } else {
      getMilestones(props.organization, props.project).then(milestones => {
        setMilestones([...defaultMilestoneItems, ...milestones]);
        setSearchedMilestones([...defaultMilestoneItems, ...milestones]);
      });
    }
  };

  const getAllUsers = () => {
    if (users && users.length) {
      if (props.type === "assignee") {
        setSearchedAssignees([...defaultAssigneItems, ...users]);
      } else if (props.type === "author") {
        setSearchedAuthors(users);
      }
    } else {
      getUsers().then(users => {
        setUsers(users);
        if (props.type === "assignee") {
          setSearchedAssignees([...defaultAssigneItems, ...users]);
        } else if (props.type === "author") {
          setSearchedAuthors(users);
        }
      });
    }
  };

  const getReposForOrg = () => {
    if (repos && repos.length) {
      setSearchedRepos(repos);
    } else {
      getReposForOrganization(props.organization).then(repos => {
        setRepos(repos);
        setSearchedRepos(repos);
      });
    }
  };

  const getOrgs = () => {
    if (orgs && orgs.length) {
      setSearchedOrgs(orgs);
    } else {
      getOrganizations().then(orgs => {
        setOrgs(orgs);
        setSearchedOrgs(orgs);
      });
    }
  };

  const onAuthorChange = author => {
    props.onAuthorChange(author);
    setOpen(false);
  };

  const onLabelsChange = labels => {
    props.onLabelsChange(labels);
    setOpen(false);
  };

  const onAssigneeChange = assignee => {
    props.onAssigneeChange(assignee);
    setOpen(false);
  };

  const onSortingChange = order => {
    props.onSortingChange(order);
    setOpen(false);
  };

  const onMilestoneChange = milestone => {
    props.onMilestonesChange(milestone);
    setOpen(false);
  };

  const onRepoChange = repo => {
    props.onRepoChange(repo);
    setOpen(false);
  };

  const onOrgChange = org => {
    props.onOrgChange(org);
    setOpen(false);
  };

  return (
    <>
      <div className="dropdown-container" ref={node}>
        <span onClick={toggleOpen}>{props.label}</span>
        <FontAwesomeIcon
          onClick={toggleOpen}
          className="icon"
          icon="sort-down"
          color="#586069"
        />
        {open && (
          <div className="dropdown-wrapper">
            <div className="header">{props.header}</div>
            {props.filterPlaceholder && (
              <div className="filter">
                <input
                  type="text"
                  placeholder={props.filterPlaceholder}
                  onChange={inputChanged}
                />
              </div>
            )}
            {props.type === "author" && (
              <UserList
                items={searchedAuthors}
                user={props.author}
                onUserChange={onAuthorChange}
              />
            )}
            {props.type === "labels" && (
              <LabelList
                items={searchedLabels}
                labels={props.labels}
                onLabelsChange={onLabelsChange}
              />
            )}
            {props.type === "milestones" && (
              <MilestoneList
                items={searchedMilestones}
                milestone={props.milestone}
                onMilestoneChange={onMilestoneChange}
              />
            )}
            {props.type === "assignee" && (
              <UserList
                items={searchedAssignees}
                user={props.assignee}
                onUserChange={onAssigneeChange}
              />
            )}
            {props.type === "sort" && (
              <SortingList
                items={sortingItems}
                sortBy={props.sortBy}
                sortDirection={props.sortDirection}
                onSortingChange={onSortingChange}
              />
            )}
            {props.type === "repos" && (
              <ReposList
                items={searchedRepos}
                repo={props.repo}
                onRepoChange={onRepoChange}
              />
            )}
            {props.type === "orgs" && (
              <OrgsList
                items={searchedOrgs}
                org={props.org}
                onOrgChange={onOrgChange}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CustomDropdown;
