import React, { useState, useEffect } from './react-imports';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

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
  const handleGenerateRfc = (content) => {
    console.log("Сгенерирован контент:", content.type || "RFC");
    
    setGeneratedRfc(content);
    setSelectedStep('documentation');
    window.scrollTo(0, 0);
  };

  // Анализ RFC
  const handleAnalyzeRfc = () => {
    setIsAnalyzingRfc(true);
    
    // Имитация анализа (в реальном приложении это был бы запрос к API)
    setTimeout(() => {
      const analysis = {
        score: 72,
        issues: [
          { type: 'critical', text: 'Не описана стратегия миграции данных', location: 'section-4' },
          { type: 'warning', text: 'Не определены метрики для измерения успеха внедрения', location: 'section-5' },
          { type: 'info', text: 'Рекомендуется добавить диаграмму архитектуры', location: 'section-2' },
          { type: 'warning', text: 'Не указаны ответственные за ключевые компоненты', location: 'section-3' },
          { type: 'critical', text: 'Отсутствует анализ рисков и план отката', location: 'section-6' }
        ],
        recommendations: [
          'Свяжитесь с Марией Ивановой для консультации по миграции данных',
          'Изучите тикет PROJ-235 с информацией о подобной миграции',
          'Добавьте секцию с критериями успеха и измеримыми метриками',
          'Включите план отката и стратегию минимизации рисков'
        ]
      };
      setRfcAnalysis(analysis);
      setIsAnalyzingRfc(false);
      setSelectedStep('analyze');
    }, 2000);
  };

  const handleRfcGenerated = (documentData) => {
    setCurrentRfc(documentData);
    setCurrentView('documentation');
    window.scrollTo(0, 0);
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
            />
          </div>
        )}

        {selectedStep === 'documentation' && generatedRfc && (
          <div className="fade-in">
            <h4 className="mb-4">Сгенерированный RFC документ</h4>
            <DocumentationGenerator 
              rfc={generatedRfc} 
              onAnalyzeRfc={handleAnalyzeRfc} 
            />
          </div>
        )}

        {selectedStep === 'analyze' && rfcAnalysis && (
          <div className="fade-in">
            <h4 className="mb-4">Анализ RFC документа</h4>
            <RfcAnalyzer 
              rfc={generatedRfc} 
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