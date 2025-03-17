import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header({ resetFlow }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            resetFlow();
          }}
          style={{ cursor: 'pointer' }}
        >
          <span className="me-2">💡</span>
          Миелофон
        </Navbar.Brand>
        <span className="text-light">AI-система для управления знаниями компании</span>
      </Container>
    </Navbar>
  );
}

export default Header; 