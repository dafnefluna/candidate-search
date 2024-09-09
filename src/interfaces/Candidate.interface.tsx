// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    login: string;
    name: string;
    location: string;
    avatar_url: string;
    email: string;
    html_url: string;
    company: string;
}

/*
const candidate: Candidate = {
    name: "name",
    username: "login",
    location: "location",
    avatar_url: "avatar",
    email: "email",
    html_url: "repo",
    company: "company"
}
    */

export default Candidate;