import { Link, useLocation } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';

function Nav() {
  const currentPage = useLocation().pathname;
  return (
    <nav>
      <ul>
        <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Home</Link> </ul>
      <ul><Link to="/SavedCandidates" className={currentPage === '/SavedCandidate' ? 'nav-link active' : 'nav-link'}>Potential Candidate</Link> </ul>
    </nav>
  )
};

export default Nav;