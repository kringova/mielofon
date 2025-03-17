import React, { useState } from 'react';
import { Card, ListGroup, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function SimilarSummaries({ summaries, onGenerateDocumentation, showRfc, generateRfc }) {
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
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Похожие встречи</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Найдено {summaries.length} похожих обсуждений
        </Card.Subtitle>
        
        {summaries.map(summary => (
          <Card key={summary.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Card.Title>{summary.title}</Card.Title>
                  <Card.Text>{summary.content}</Card.Text>
                  <div className="mb-2">
                    <small className="text-muted">
                      Участники: {summary.participants.join(', ')}
                    </small>
                  </div>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-between">
                  <div>
                    <div className="mb-2">
                      <Badge bg="info">Схожесть: {(summary.similarity * 100).toFixed(0)}%</Badge>
                    </div>
                    <div className="mb-3">
                      <strong>Команда:</strong> {summary.team}
                    </div>
                    <div className="mb-3">
                      <strong>Контакт:</strong> <a href={`mailto:${summary.contact}`}>{summary.contact}</a>
                    </div>
                  </div>
                  <Button 
                    variant="outline-dark" 
                    size="sm"
                    onClick={() => window.open(`mailto:${summary.contact}?subject=По поводу встречи "${summary.title}"`, '_blank')}
                  >
                    Связаться с командой
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
        
        <div className="mt-4 text-center">
          {!generateRfc || (generateRfc && showRfc) ? (
            <Button 
              variant="dark" 
              onClick={onGenerateDocumentation}
            >
              Перейти к генерации документации
            </Button>
          ) : (
            <div className="text-muted">
              Ожидание генерации RFC...
            </div>
          )}
        </div>
      </Card.Body>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Связаться с участниками</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <div className="text-center py-4">
              <div className="mb-3">✅</div>
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
            >
              Отправить
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Card>
  );
}

export default SimilarSummaries; 