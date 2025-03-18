import React, { useState } from 'react';
import { Card, ListGroup, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SimilarCard = styled(motion.div)`
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  border: none;
`;

const SummaryItem = styled(motion.div)`
  background: var(--bg-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: var(--transition);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  &.selected {
    background: var(--primary-light);
    box-shadow: 0 4px 12px rgba(4, 217, 255, 0.12);
    
    h3 {
      color: var(--primary);
    }
  }
`;

function SimilarSummaries({ summaries, onGenerateDocumentation, showRfc, generateRfc, onGenerateRfc }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleConnect = (summary) => {
    setSelectedSummary(summary);
    setShowModal(true);
  };

  const handleSendMessage = () => {
    // В реальном приложении здесь был бы запрос к API
    console.log(`Отправка сообщения участникам ${selectedSummary.participants.join(', ')}: ${messageText}`);
    setMessageSent(true);
    
    // Сбрасываем состояние через 3 секунды
    setTimeout(() => {
      setMessageSent(false);
      setShowModal(false);
      setMessageText('');
    }, 3000);
  };

  if (!summaries || summaries.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Похожие обсуждения не найдены</Card.Title>
          <Card.Text>
            Миелофон не обнаружил похожих обсуждений в базе знаний компании.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="crystal-card">
      <Card.Header>
        <div className="d-flex align-items-center">
          <span className="material-icons me-2" style={{ color: 'var(--primary-crystal)', fontSize: '24px' }}>
            find_in_page
          </span>
          <div>
            <Card.Title className="mb-0">Похожие встречи</Card.Title>
            <Card.Subtitle className="mt-1">
              Найдено {summaries.length} похожих обсуждений
            </Card.Subtitle>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {summaries.map(summary => (
          <Card key={summary.id} className="mb-3 summary-card">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Card.Title>{summary.title}</Card.Title>
                  <Card.Text>{summary.content}</Card.Text>
                  <div className="mb-2">
                    <small className="text-muted d-flex align-items-center">
                      <span className="material-icons me-1" style={{ fontSize: '16px' }}>
                        people
                      </span>
                      {summary.participants.join(', ')}
                    </small>
                  </div>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="crystal-badge mb-2">
                      <span className="material-icons" style={{ fontSize: '14px' }}>
                        percent
                      </span>
                      Схожесть: {(summary.similarity * 100).toFixed(0)}%
                    </div>
                    <div className="similarity-indicator">
                      <div className="bar" style={{ width: `${(summary.similarity * 100).toFixed(0)}%` }}></div>
                    </div>
                    <div className="mb-3 mt-3">
                      <strong>Команда:</strong> {summary.team}
                    </div>
                    <div className="mb-3">
                      <strong>Контакт:</strong> <a href={`mailto:${summary.contact}`}>{summary.contact}</a>
                    </div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleConnect(summary)}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="material-icons me-1" style={{ fontSize: '16px' }}>
                      mail
                    </span>
                    Связаться с командой
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
        
        <div className="mt-4 d-flex justify-content-center gap-3">
          {!generateRfc && (
            <Button 
              variant="primary" 
              size="lg"
              onClick={onGenerateRfc}
              className="px-4 py-3 d-flex align-items-center"
            >
              <span className="material-icons me-2">description</span>
              <span>Сгенерировать RFC</span>
            </Button>
          )}
          
          {!generateRfc || (generateRfc && showRfc) ? (
            <Button 
              variant="dark" 
              size="lg"
              onClick={onGenerateDocumentation}
              className="px-4 py-3 d-flex align-items-center"
            >
              <span className="material-icons me-2">article</span>
              <span>Перейти к генерации документации</span>
            </Button>
          ) : (
            <div className="text-muted d-flex align-items-center">
              <div className="crystal-spinner me-2" style={{ width: '20px', height: '20px' }}></div>
              Ожидание генерации RFC...
            </div>
          )}
        </div>
      </Card.Body>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <span className="material-icons me-2">mail</span>
            Связаться с участниками
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <div className="text-center py-4">
              <div className="mb-3">
                <span className="material-icons" style={{ fontSize: '48px', color: '#198754' }}>
                  check_circle
                </span>
              </div>
              <h4>Сообщение отправлено!</h4>
              <p>Участники получат ваше сообщение и смогут связаться с вами.</p>
            </div>
          ) : (
            <>
              <p>
                Отправить сообщение участникам обсуждения "{selectedSummary?.title}":
                <br />
                <strong>{selectedSummary?.participants.join(', ')}</strong>
              </p>
              <Form>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Введите ваше сообщение..."
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        {!messageSent && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="d-flex align-items-center"
            >
              <span className="material-icons me-1" style={{ fontSize: '16px' }}>
                send
              </span>
              Отправить
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Card>
  );
}

export default SimilarSummaries; 