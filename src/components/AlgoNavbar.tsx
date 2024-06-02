import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useAlgorithmState } from '../hooks/useAlgorithmState';
import { useEffect } from 'react';

const AlgoNavbar = () => {
  const { state, dispatch, algorithms } = useAlgorithmState();

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand href="#home">Sorting Algo Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              {Object.keys(algorithms).map((key) => (
                <NavDropdown.Item href={key}>{key}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button variant="primary" onClick={() => dispatch({ type: 'RESET_ARRAY' })}>Reset</Button>
        <Button variant="primary" className="mx-1">
          Run Algorithm
        </Button>
        <Button variant="primary">Take Step Forward</Button>
      </Container>
    </Navbar>
  );
};

export default AlgoNavbar;