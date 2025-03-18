// Мок-сервис для расчета схожести между материалами

/**
 * Сервис для поиска похожих материалов и связей между ними
 */
export const similarityService = {
  /**
   * Находит похожие встречи по идентификатору текущей встречи
   * @param {string} currentMeetingId - ID текущей встречи
   * @param {Array} allMeetings - Массив всех встреч
   * @returns {Array} Массив похожих встреч с рейтингом схожести
   */
  findSimilarMeetings: (currentMeetingId, allMeetings) => {
    // Для MVP используем заранее определенные связи
    // В реальном приложении здесь была бы сложная логика сравнения
    const similarityMap = {
      'meeting-001': ['meeting-003', 'meeting-006'],
      'meeting-002': ['meeting-005'],
      'meeting-003': ['meeting-001', 'meeting-006'],
      'meeting-004': ['meeting-007'],
      'meeting-005': ['meeting-002'],
      'meeting-006': ['meeting-001', 'meeting-003'],
      'meeting-007': ['meeting-004']
    };
    
    // Находим предопределенные схожие встречи
    const similarIds = similarityMap[currentMeetingId] || [];
    
    // Фильтруем и добавляем рейтинг схожести
    return allMeetings
      .filter(meeting => similarIds.includes(meeting.id) && meeting.id !== currentMeetingId)
      .map(meeting => {
        // Чем раньше в массиве similarIds, тем выше схожесть
        const similarityIndex = similarIds.indexOf(meeting.id);
        const similarity = 0.9 - (similarityIndex * 0.1);
        
        return {
          ...meeting,
          similarity
        };
      })
      .sort((a, b) => b.similarity - a.similarity);
  },
  
  /**
   * Находит связанные тикеты по идентификатору встречи
   * @param {string} meetingId - ID встречи
   * @param {Array} allTickets - Массив всех тикетов
   * @returns {Array} Массив связанных тикетов с рейтингом релевантности
   */
  findRelatedTickets: (meetingId, allTickets) => {
    const ticketMap = {
      'meeting-001': ['ticket-005', 'ticket-003', 'ticket-002'],
      'meeting-002': ['ticket-008', 'ticket-010', 'ticket-011'],
      'meeting-003': ['ticket-003', 'ticket-004'],
      'meeting-004': ['ticket-012', 'ticket-007'],
      'meeting-005': ['ticket-009', 'ticket-011', 'ticket-010'],
      'meeting-006': ['ticket-001', 'ticket-006'],
      'meeting-007': ['ticket-007', 'ticket-012']
    };
    
    const relatedIds = ticketMap[meetingId] || [];
    
    return allTickets
      .filter(ticket => relatedIds.includes(ticket.id))
      .map(ticket => {
        const relevanceIndex = relatedIds.indexOf(ticket.id);
        const relevance = 0.95 - (relevanceIndex * 0.15);
        
        return {
          ...ticket,
          relevance
        };
      })
      .sort((a, b) => b.relevance - a.relevance);
  },
  
  /**
   * Находит связанные вики-страницы по идентификатору встречи
   * @param {string} meetingId - ID встречи
   * @param {Array} allWiki - Массив всех вики-страниц
   * @returns {Array} Массив связанных вики с рейтингом релевантности
   */
  findRelatedWiki: (meetingId, allWiki) => {
    const wikiMap = {
      'meeting-001': ['wiki-002', 'wiki-003'],
      'meeting-002': ['wiki-004', 'wiki-001'],
      'meeting-003': ['wiki-005', 'wiki-002'],
      'meeting-004': ['wiki-001', 'wiki-006'],
      'meeting-005': ['wiki-004', 'wiki-001'],
      'meeting-006': ['wiki-007'],
      'meeting-007': ['wiki-001', 'wiki-006']
    };
    
    const relatedIds = wikiMap[meetingId] || [];
    
    return allWiki
      .filter(wiki => relatedIds.includes(wiki.id))
      .map(wiki => {
        const relevanceIndex = relatedIds.indexOf(wiki.id);
        const relevance = 0.9 - (relevanceIndex * 0.1);
        
        return {
          ...wiki,
          relevance
        };
      })
      .sort((a, b) => b.relevance - a.relevance);
  },
  
  /**
   * Находит людей, которые могут помочь с темой
   * @param {Object} selectedSummary - Выбранное саммари
   * @param {Array} relatedItems - Связанные материалы
   * @returns {Array} Массив релевантных людей
   */
  findRelevantPeople: (selectedSummary, relatedItems) => {
    const people = new Map();
    
    // Проверка на случай, если selectedSummary.participants не определено
    if (selectedSummary && selectedSummary.participants) {
      selectedSummary.participants.forEach(person => {
        people.set(person.id, person);
      });
    }
    
    // Добавляем людей из связанных материалов
    relatedItems.forEach(item => {
      if (item.participants) {
        item.participants.forEach(person => {
          if (!people.has(person.id)) {
            people.set(person.id, person);
          }
        });
      }
      
      if (item.assignee && !people.has(item.assignee.id)) {
        people.set(item.assignee.id, item.assignee);
      }
    });
    
    // Фильтруем, чтобы исключить текущих участников
    const currentParticipantIds = selectedSummary.participants.map(p => p.id);
    const relevantPeople = Array.from(people.values())
      .filter(person => !currentParticipantIds.includes(person.id));
    
    // Возвращаем не более 4 человек
    return relevantPeople.slice(0, 4);
  }
}; 