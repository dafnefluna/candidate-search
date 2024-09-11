import Candidate from '../interfaces/Candidate.interface';
import ListGroup from 'react-bootstrap/ListGroup';
import CandidateSearch from './CandidateSearch';
import { ListGroupItem } from 'react-bootstrap';

const savedCandidates = localStorage.getItem('candidateSaves');
const potentials = JSON.parse(savedCandidates ? savedCandidates : '[]');
console.log(potentials)

const SavedCandidates = () => {
//  get it from local storage and map it to the page.
const savedPotentials = potentials.map((potentialsSaved: Candidate) =>
<ListGroup.Item key={potentialsSaved.login}>
<div>
<ListGroupItem>{potentialsSaved.name}</ListGroupItem>
<ListGroupItem>{potentialsSaved.login}</ListGroupItem>
<ListGroupItem>{potentialsSaved.location}</ListGroupItem>
<ListGroupItem>{potentialsSaved.avatar_url}</ListGroupItem>
<ListGroupItem>{potentialsSaved.email}</ListGroupItem>
<ListGroupItem>{potentialsSaved.html_url}</ListGroupItem>
<ListGroupItem>{potentialsSaved.company}</ListGroupItem>
</div>
</ListGroup.Item>
);
  return (
    <>
      <h1>Potential Candidates</h1>
      <ListGroup>{savedPotentials}</ListGroup>
    </>
  );
};

export default SavedCandidates;


