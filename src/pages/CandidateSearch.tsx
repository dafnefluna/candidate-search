import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
//import { candidate } from '../interfaces/Candidate.interface'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// first set up the scaffolding for the card
// then you have to pull the data from the API and using the interface pull out what I need
// use that for the the dataset to go into the template literal part in the card
/*const candidate: Candidate = [
  {
    return searchGithubUser;
  }

]
  */

const CandidateSearch = () => {
  // const [variableData, methodToUpdate] = useState()
  // state for our Current Candidate --> INITALIZING fields to empty strings ''
  const [current, setCurrent] = useState<Candidate>({
    name: '',
    login: '',
    location: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: ''
  });
  
  // Set State for ALL users that we get back from the gitHub API Call
  const [allUsers, setAllUsers] = useState<Candidate[]>([]);
  // Make the QUERY for data
  const queryGitHub = async() => {
    const results: Candidate[] = await searchGithub();
    // update our state(results)
    setAllUsers(results); 
   // queryUser()
  };

  //function to garb a random/select a single USER --> USERNAME
  const selectUser = () => {
      // logic to randomly select a USER (INDEX)
      return allUsers[0];
  }

  const queryUser = async () => {
    const selected = allUsers[0];
    console.log("-------------", selected);
    const singleUser: Candidate = await searchGithubUser(selected.login);

    setCurrent(singleUser);
  }

  // query the GitHub API

  useEffect(() => {  // useEffect is called/invoked when the Component is called but before it RENDERS the VIEW
    queryGitHub();
    queryUser();
  }, [])

  return (
    <section className="candidateCards">
   {/*}  {candidate.map((candidateSet: { avatar: string | undefined; name: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; location: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; repo: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; company: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => ( */ }
      { !current.name ? '' : ( 
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={current.avatar_url} />
          {/* avatar goes in card.img */}
          <Card.Body>
            <Card.Title>{current.login}</Card.Title>
          </Card.Body>
          <Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{current.location}</ListGroup.Item>
              <ListGroup.Item>{current.email}</ListGroup.Item>
              <ListGroup.Item><Card.Link href="#">{current.html_url}</Card.Link></ListGroup.Item>
              <ListGroup.Item>{current.company}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </section>
  )
};

export default CandidateSearch;
