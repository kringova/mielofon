import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Row, Col, Alert, Tabs, Tab, Badge } from 'react-bootstrap';

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

const ExamplesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

const ExampleButton = styled(motion.button)`
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-dark);
  padding: var(--spacing-sm);
  text-align: left;
  transition: var(--transition);
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
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

const SummaryInput = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Разработка');
  const [showExamples, setShowExamples] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    const summary = {
      title: title.trim(),
      content: content.trim(),
      category,
      timestamp: new Date().toISOString()
    };

    onSubmit(summary);
    setTitle('');
    setContent('');
    setError('');
  };

  const examples = [
    { 
      title: 'Обновление API', 
      content: 'Добавлены новые эндпоинты для работы с пользователями',
      category: 'Разработка'
    },
    { 
      title: 'Оптимизация кеша', 
      content: 'Улучшена производительность кеширования данных',
      category: 'Инфраструктура'
    },
    { 
      title: 'Рефакторинг UI', 
      content: 'Переработан интерфейс главной страницы',
      category: 'Продукт'
    }
  ];

  const handleExampleClick = (example) => {
    setTitle(example.title);
    setContent(example.content);
    setCategory(example.category);
    setShowExamples(false);
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
          onClick={() => setShowExamples(!showExamples)}
        >
          <span className="icon material-icons">
            {showExamples ? 'visibility_off' : 'visibility'}
          </span>
          {showExamples ? 'Скрыть примеры' : 'Показать примеры'}
        </StyledButton>

        <StyledButton
          primary
          onClick={handleSubmit}
        >
          <span className="icon material-icons">send</span>
          Создать
        </StyledButton>
      </ButtonRow>

      <AnimatePresence>
        {showExamples && (
          <ExamplesGrid
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {examples.map((example, index) => (
              <ExampleButton
                key={index}
                onClick={() => handleExampleClick(example)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="icon material-icons">{getCategoryIcon(example.category)}</span>
                {example.title}
              </ExampleButton>
            ))}
          </ExamplesGrid>
        )}
      </AnimatePresence>
    </SummaryCard>
  );
};

export default SummaryInput;
