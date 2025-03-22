const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const generateSummary = async (meetingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

export const findSimilarItems = async (summary) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/similar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary })
    });
    
    if (!response.ok) {
      throw new Error('Failed to find similar items');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error finding similar items:', error);
    throw error;
  }
};

export const generateDocumentation = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate/documentation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate documentation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating documentation:', error);
    throw error;
  }
};

export const analyzeRfc = async (rfc) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze/rfc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rfc })
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze RFC');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing RFC:', error);
    throw error;
  }
}; 