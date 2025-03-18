import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

function Header({ resetFlow }) {
  return (
    <header className="crystal-header">
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="#home">
            <span className="material-icons brand-icon">podcasts</span>
            Миелофон
          </Navbar.Brand>
          <div className="ms-auto">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={resetFlow}
            >
              <span className="material-icons">refresh</span>
              Сбросить
            </Button>
          </div>
        </Navbar>
        
        <div className="text-center mt-4 mb-3 text-white">
          <h1 className="display-5 mb-2">Миелофон</h1>
          <p className="lead">
            Мысли → Документация → Знания
          </p>
        </div>
      </Container>
    </header>
  );
}

export default Header; 