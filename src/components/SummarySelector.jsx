import React, { useState } from 'react';
import { Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { meetings } from '../data/meetings';
import { formatDate } from '../utils/helpers';

const SummarySelector = ({ onSelectSummary }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Фильтрация по поиску и типу
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        meeting.summary.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'technical': return 'info';
      case 'product': return 'success';
      case 'organizational': return 'warning';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'technical': return 'Техническая';
      case 'product': return 'Продуктовая';
      case 'organizational': return 'Организационная';
      default: return type;
    }
  };

  return (
    <div>
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <span className="material-icons" style={{ fontSize: '1.25rem' }}>search</span>
            </InputGroup.Text>
            <Form.Control
              placeholder="Поиск по названию или содержанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Все типы встреч</option>
            <option value="technical">Технические</option>
            <option value="product">Продуктовые</option>
            <option value="organizational">Организационные</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredMeetings.map((meeting) => (
          <Col key={meeting.id}>
            <Card 
              className="summary-card h-100"
              onClick={() => onSelectSummary(meeting)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg={getBadgeVariant(meeting.type)}>
                    {getTypeLabel(meeting.type)}
                  </Badge>
                  <small className="text-muted">{formatDate(meeting.date)}</small>
                </div>
                <Card.Title className="mb-2">{meeting.title}</Card.Title>
                <Card.Text className="text-muted">
                  {meeting.summary.content.length > 150 
                    ? `${meeting.summary.content.substring(0, 150)}...` 
                    : meeting.summary.content}
                </Card.Text>
                <div className="d-flex mt-3">
                  <small className="text-muted me-3">
                    <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                      person
                    </span>
                    {meeting.participants.length} участников
                  </small>
                  <small className="text-muted">
                    <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                      check_circle
                    </span>
                    {meeting.summary.decisions.length} решений
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {filteredMeetings.length === 0 && (
        <div className="text-center py-5">
          <span className="material-icons" style={{ fontSize: '3rem', color: 'var(--gray-300)' }}>
            search_off
          </span>
          <p className="mt-3 text-muted">Не найдено встреч, соответствующих критериям поиска</p>
        </div>
      )}
    </div>
  );
};

export default SummarySelector; 