import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const generateRfc = async (summaryData) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate an RFC document based on the following summary: ${summaryData.content}`,
      max_tokens: 1500,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating RFC:', error);
    throw error;
  }
};

export const generateDocumentation = async (summaryData, type = 'technical') => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a ${type} documentation based on the following summary: ${summaryData.content}`,
      max_tokens: 1500,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating documentation:', error);
    throw error;
  }
}; 