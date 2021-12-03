import axios from "axios";

const BASE_URL = "https://api.github.com/";

export function getIssues(
  org,
  project,
  page = 1,
  perPage = 205,
  state = "open",
  creator = "",
  labels = [],
  assignee = "",
  sortBy = "created",
  sortDirection = "desc",
  milestone = ""
) {
  let url =
  'https://api.github.com/repos/facebook/react/issues';
  if (creator) {
    url = url.concat(`&creator=${creator}`);
  }
  if (labels.length) {
    url = url.concat(`&labels=${labels.join(",")}`);
  }
  if (assignee) {
    url = url.concat(`&assignee=${assignee}`);
  }
  if (milestone) {
    url = url.concat(`&milestone=${milestone}`);
  }

  return axios
    .get(url, {
      headers: {
        Authorization: "token f8fc7b75d94700d56113ecf79e299a57ed76d14c"
      }
    })
    .then(res => {
      return {
        linkHeader: res.headers["link"],
        data: res.data
      };
    })
    .catch(err => Promise.reject(err));
}

export function searchUsers(searchTerm) {
  let url = `${BASE_URL}search/users?q=${searchTerm}`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function getLabels(org, project) {
  let url = `${BASE_URL}repos/${org}/${project}/labels`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function getMilestones(org, project) {
  let url = `${BASE_URL}repos/${org}/${project}/milestones`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function getUsers() {
  let url = `${BASE_URL}users?per_page=15&page=1`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function getReposForOrganization(org) {
  let url = `${BASE_URL}orgs/${org}/repos`;
  return axios
    .get(url, {
      headers: { Accept: "application/vnd.github.baptiste-preview+json" }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function searchReposInOrganization(org, searchTerm) {
  let url = `${BASE_URL}search/repositories?q=org:${org}%20${searchTerm}&per_page=15`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function getOrganizations() {
  let url = `${BASE_URL}organizations`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

export function searchOrganizations(searchTerm) {
  let url = `${BASE_URL}search/users?q=type:org%20${searchTerm}`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}
