import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

const Header = ({ onReset }) => {
  return (
    <div className="crystal-header">
      <Navbar>
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <span className="material-icons brand-icon">mediation</span>
            <span className="logo-text">Миелофон</span>
          </Navbar.Brand>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={onReset}
            className="d-flex align-items-center"
          >
            <span className="material-icons me-1" style={{ fontSize: '1rem' }}>refresh</span>
            Сбросить
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header; 