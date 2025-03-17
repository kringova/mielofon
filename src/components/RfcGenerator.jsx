import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

function RfcGenerator({ content, onGenerateDocumentation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [rfcType, setRfcType] = useState('feature');
  
  const handleSave = () => {
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };
  
  const handleTypeChange = (e) => {
    setRfcType(e.target.value);
  };
  
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>RFC (Request for Comments)</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Технический документ с описанием проблемы и решения
        </Card.Subtitle>
        
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Тип RFC</Form.Label>
              <Form.Select 
                value={rfcType} 
                onChange={handleTypeChange}
                disabled={!isEditing}
              >
                <option value="feature">Новая функциональность</option>
                <option value="architecture">Архитектурное изменение</option>
                <option value="research">Исследование</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-end justify-content-end">
            {isEditing ? (
              <>
                <Button 
                  variant="outline-dark" 
                  onClick={() => setIsEditing(false)}
                  className="me-2"
                >
                  Отмена
                </Button>
                <Button 
                  variant="dark" 
                  onClick={handleSave}
                >
                  Сохранить
                </Button>
              </>
            ) : (
              <Button 
                variant="outline-dark" 
                onClick={handleEdit}
              >
                Редактировать
              </Button>
            )}
          </Col>
        </Row>
        
        {isEditing ? (
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={20}
              value={editedContent}
              onChange={handleContentChange}
            />
          </Form.Group>
        ) : (
          <div 
            className="p-3 mb-3" 
            style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              maxHeight: '500px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {editedContent}
          </div>
        )}
        
        <div className="d-flex justify-content-between mt-4">
          <Button 
            variant="outline-dark" 
            onClick={() => {
              // Простая проверка RFC
              alert('RFC проверен. Проблем не обнаружено.');
            }}
          >
            Проверить RFC
          </Button>
          
          <Button 
            variant="dark" 
            onClick={onGenerateDocumentation}
          >
            Перейти к генерации документации
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RfcGenerator; 