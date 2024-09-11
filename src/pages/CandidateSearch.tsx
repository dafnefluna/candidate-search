import { useState, useEffect, } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// first set up the scaffolding for the card
// then you have to pull the data from the API and using the interface pull out what I need
// use that for the the dataset to go into the template literal part in the card
/*const candidate: Candidate = [
  {
    return searchGithubUser;
  }
]
  */
   // const [variableData, methodToUpdate] = useState()
   // state for our Current Candidate --> INITALIZING fields to empty strings ''
  // Set State for ALL users that we get back from the gitHub API Call

const CandidateSearch = () => {
  const [current, setCurrent] = useState<Candidate>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: ''
  });

  const [allUsers, setAllUsers] = useState<Candidate[]>([]);
  // Make the QUERY for data
  const queryGitHub = async () => {
    const results: Candidate[] = await searchGithub();
    // update our state(results)
    console.log('results (non State): ', results);
    setAllUsers(results); //setting state. 
    setCurrent(results[0]);
  };

  const queryUser = async () => {
    const singleUser: Candidate = await searchGithubUser(current.login);
    console.log(singleUser);
  }

  // query the GitHub API
  // Fetch GitHub data when the component mounts
  useEffect(() => {
    queryGitHub();
  }, []); // Empty dependency array ensures this runs only on component mount

  // Call queryUser only when `current` has been updated
  useEffect(() => {
    if (current.login) {
      queryUser();
    }
  }, [current]); // This will run whenever `current` changes

const skip = async () => {
const randomIndex = Math.floor(Math.random() * allUsers.length);
setCurrent(allUsers[randomIndex])
}

const save = async () => {
  const saved = localStorage.getItem('candidateSaves');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed != typeof 'string') {
      parsed.push(current);
      localStorage.setItem("candidateSaves", JSON.stringify(parsed));
    }
  } else {
    localStorage.setItem("candidateSaves", JSON.stringify([current]));
  }

  const randomIndex = Math.floor(Math.random() * allUsers.length);
  setCurrent(allUsers[randomIndex])
}

  return (
    <section className="candidateCards">
      {/* Use login instead of name to check if user data is loaded */}
      {!current.login ? (
        <p>Loading...</p> // Show loading indicator
      ) : (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={current.avatar_url} />
          <Card.Body>
            <Card.Title>{current.login}</Card.Title>
          </Card.Body>
          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{current.location || 'Location not available'}</ListGroup.Item>
              <ListGroup.Item>{current.email || 'Email not available'}</ListGroup.Item>
              <ListGroup.Item>
                <Card.Link href={current.html_url}>{current.html_url}</Card.Link>
              </ListGroup.Item>
              <ListGroup.Item>{current.company || 'Company not available'}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Button onClick={skip}>No</Button>{' '}
          <Button onClick={save} >Save</Button>{' '}
        </Card>
      )}
    </section>
  );
};

export default CandidateSearch;