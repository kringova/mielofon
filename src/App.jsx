import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';

import Header from './components/Header';
import SummarySelector from './components/SummarySelector';
import SimilarItems from './components/SimilarItems';
import DocumentationGenerator from './components/DocumentationGenerator';
import RfcAnalyzer from './components/RfcAnalyzer';

// Удалите неиспользуемые импорты или добавьте комментарий
// eslint-disable-next-line
import {
  extractProblem,
  extractSolution,
  extractTechnicalDetails,
  extractCurrentState,
  extractProblems,
  extractGoal,
  extractTechnologies,
  determineAudiences,
  determineProjectType,
  extractTechnologiesFromText,
  generateDevDocumentation,
  generateAdminDocumentation,
  generateUserDocumentation
} from './utils/documentationUtils';

// Настройте marked для обработки всего контента
// marked.setOptions({
//   breaks: true,         // Перенос строк соответствует разрывам строк
//   gfm: true,            // GitHub Flavored Markdown
//   headerIds: true,      // Включить идентификаторы заголовков для навигации
//   mangle: false,        // Отключить экранирование
//   sanitize: false       // Разрешить HTML-теги
// });

function App() {
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [selectedStep, setSelectedStep] = useState('summary'); // 'summary', 'similar', 'documentation', 'analyze'
  const [generatedRfc, setGeneratedRfc] = useState(null);
  const [isAnalyzingRfc, setIsAnalyzingRfc] = useState(false);
  const [rfcAnalysis, setRfcAnalysis] = useState(null);
  const [currentRfc, setCurrentRfc] = useState(null);
  const [currentView, setCurrentView] = useState('summary');

  // Переход к следующему шагу
  const handleNextStep = (step) => {
    setSelectedStep(step);
    window.scrollTo(0, 0);
  };

  // Сброс и возврат к начальному состоянию
  const handleReset = () => {
    setSelectedSummary(null);
    setSelectedStep('summary');
    setGeneratedRfc(null);
    setRfcAnalysis(null);
  };

  // Выбор саммари
  const handleSelectSummary = (summary) => {
    setSelectedSummary(summary);
    setSelectedStep('similar');
    window.scrollTo(0, 0);
  };

  // Генерация RFC
  const handleGenerateRfc = (data) => {
    console.log("Получены данные RFC, размер контента:", data.content.length);
    // Сохраняем копию данных, чтобы избежать мутации
    const dataCopy = JSON.parse(JSON.stringify(data));
    setCurrentRfc(dataCopy);
    setGeneratedRfc(dataCopy);
    setSelectedStep('documentation');
    window.scrollTo(0, 0);
  };

  // Анализ RFC
  const handleAnalyzeRfc = (rfc) => {
    // Создаем реалистичные моки для анализа
    const analysisData = {
      score: 72,
      issues: [
        {
          id: 1,
          type: 'warning',
          text: 'Implement OAuth 2.0 for secure authorization.',
          description: 'Необходимо указать конкретную версию OAuth 2.0 и детали реализации.'
        },
        {
          id: 2,
          type: 'warning',
          text: 'Integrate multi-factor authentication using SMS and email.',
          description: 'Следует уточнить механизм доставки SMS и приоритеты методов аутентификации.'
        },
        {
          id: 3,
          type: 'info',
          text: 'Update password encryption to use bcrypt.',
          description: 'Рекомендуется указать параметры хеширования (стоимость/раунды).'
        },
        {
          id: 4,
          type: 'info',
          text: 'Phase 2: Development and testing (4 weeks)',
          description: 'Фаза тестирования кажется короткой для такого критичного компонента.'
        },
        {
          id: 5,
          type: 'warning',
          text: 'The current authentication system has several limitations',
          description: 'Рекомендуется конкретизировать существующие ограничения с примерами.'
        }
      ],
      recommendations: [
        'Добавьте раздел "Риски и зависимости"',
        'Опишите план отката (rollback) в случае проблем',
        'Укажите метрики успеха внедрения'
      ]
    };

    setCurrentRfc(rfc);
    setRfcAnalysis(analysisData);
    setCurrentView('rfcAnalysis');
    setSelectedStep('analyze');
  };

  const handleRfcGenerated = (documentData) => {
    setCurrentRfc(documentData);
    setGeneratedRfc(documentData);
    setCurrentView('documentation');
    setSelectedStep('documentation');
    window.scrollTo(0, 0);
  };

  const renderRfcContent = () => {
    if (!currentRfc) return null;
    
    return (
      <div className="rfc-content">
        <h2>{currentRfc.title}</h2>
        <div className="markdown-content">
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'inherit',
            margin: 0,
            padding: 0
          }}>
            {currentRfc.content}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <Header onReset={handleReset} />
      <Container className="py-4">
        {selectedStep === 'summary' && (
          <div className="fade-in">
            <h4 className="mb-4">Выберите тему встречи из каталога</h4>
            <p className="text-muted mb-4">
              Представьте, что у вас только что прошла встреча по одной из тем из каталога. 
              Выберите саммари, чтобы узнать, обсуждал ли кто-то что-то подобное и чтобы 
              сгенерировать документацию из тикетов, вики и саммари прошедшей встречи.
            </p>
            <SummarySelector onSelectSummary={handleSelectSummary} />
          </div>
        )}

        {selectedStep === 'similar' && selectedSummary && (
          <div className="fade-in">
            <h4 className="mb-4">Анализ похожих материалов</h4>
            <SimilarItems 
              selectedSummary={selectedSummary} 
              onRfcGenerated={handleRfcGenerated} 
              similarItems={[]}
            />
          </div>
        )}

        {(selectedStep === 'documentation' || currentView === 'documentation') && generatedRfc && (
          <div className="fade-in">
            <h4 className="mb-4">Сгенерированный RFC документ</h4>
            <DocumentationGenerator 
              rfc={generatedRfc} 
              onAnalyzeRfc={handleAnalyzeRfc}
              summary={generatedRfc}
            />
          </div>
        )}

        {(selectedStep === 'analyze' || currentView === 'rfcAnalysis') && rfcAnalysis && (
          <div className="fade-in">
            <h4 className="mb-4">Анализ RFC документа</h4>
            <RfcAnalyzer 
              rfc={currentRfc || generatedRfc} 
              analysis={rfcAnalysis} 
              onReset={handleReset} 
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App; 