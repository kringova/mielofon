import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Row, Col, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
import { generateSummary } from '../services/api';

// Получаем иконку для категории
const getCategoryIcon = (category) => {
  switch(category) {
    case 'Разработка': return 'code';
    case 'Инфраструктура': return 'cloud';
    case 'Продукт': return 'insights';
    default: return 'article';
  }
};

const SummaryCard = styled(motion.div)`
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  border: none;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin: 0;
  
  .icon {
    color: var(--primary);
  }
`;

const InputField = styled.input`
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-dark);
  padding: var(--spacing-md);
  width: 100%;
  transition: var(--transition);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 1px var(--primary-light);
  }
`;

const TextareaField = styled.textarea`
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-dark);
  padding: var(--spacing-md);
  width: 100%;
  transition: var(--transition);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  margin-bottom: var(--spacing-md);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 1px var(--primary-light);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const StyledButton = styled(motion.button)`
  background: ${props => props.primary ? 'var(--primary)' : 'var(--bg-white)'};
  color: ${props => props.primary ? 'var(--bg-white)' : 'var(--text-dark)'};
  border: 1px solid ${props => props.primary ? 'var(--primary)' : 'var(--border-light)'};
  border-radius: var(--radius-md);
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.primary ? 'var(--primary-dark)' : 'var(--bg-white)'};
    border-color: var(--primary);
    ${props => !props.primary && 'color: var(--primary);'}
  }
  
  .icon {
    font-size: 1.125rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    font-size: 1rem;
  }
`;

export const SummaryInput = ({ onSummaryGenerated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Разработка');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const summary = await generateSummary({
        title: event.target.title.value,
        content: event.target.content.value,
        category: event.target.category.value
      });
      
      onSummaryGenerated(summary);
    } catch (err) {
      setError('Не удалось сгенерировать саммари. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Разработка', 'Инфраструктура', 'Продукт'];

  return (
    <SummaryCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader>
        <CardTitle>
          <span className="icon material-icons">edit</span>
          Создание саммари
        </CardTitle>
      </CardHeader>

      <InputField
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextareaField
        placeholder="Описание изменений"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        {categories.map((cat) => (
          <StyledButton
            key={cat}
            onClick={() => setCategory(cat)}
            primary={category === cat}
            style={{ marginRight: 'var(--spacing-sm)' }}
          >
            <span className="icon material-icons">{getCategoryIcon(cat)}</span>
            {cat}
          </StyledButton>
        ))}
      </div>

      {error && (
        <ErrorMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="icon material-icons">error</span>
          {error}
        </ErrorMessage>
      )}

      <ButtonRow>
        <StyledButton
          primary
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="icon material-icons">send</span>
          {loading ? 'Создание...' : 'Создать'}
        </StyledButton>
      </ButtonRow>
    </SummaryCard>
  );
};

export default SummaryInput;
