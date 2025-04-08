'use client';
import axios from 'axios';
import { getResult } from './get_result';
interface SurveyData {
  email?: string;
  [key: string]: any;
}

export const handleSubmit = async (surveyData: SurveyData) => {
  const requestData = {
    "survey_data": surveyData
  };

  try {
    console.log('About to send request:', {
      url: '/api/proxy',
      data: requestData,
      headers: { 'Content-Type': 'application/json' }
    });

    const submitResponse = await axios.post('/api/proxy', requestData, {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: function (status) {
      // Consider all status codes for debugging
      return true;
      }
    });

    console.log('Full response:', {
      status: submitResponse.status,
      statusText: submitResponse.statusText,
      headers: submitResponse.headers,
      data: submitResponse.data
    });
    
    const submissionId = submitResponse.data;
    console.log('Submission ID:', submissionId);
    return submissionId;

    if (submitResponse.status === 200 || submitResponse.status === 202) {
      return {
        submissionId: submitResponse.data.submission_id,
        success: true
      };
    }
    return { success: false, error: 'Submission failed' };
  } catch (err: any) {
    if (err.response?.status === 500) {
      const errorMessage = err.response.data?.error || 
                         err.response.data?.message || 
                         err.response.statusText || 
                         'Internal Server Error';
      
      console.error('Server Error:', {
        endpoint: '/api/proxy',
        status: err.response.status,
        error: errorMessage,
        details: err.response.data,
        requestData: requestData
      });
      
      throw new Error(`Error submitting survey: ${errorMessage}`);
    }
    
    console.error('Error details:', {
      endpoint: '/api/proxy',
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      statusText: err.response?.statusText,
      error: err.response?.data?.error,
      details: err.response?.data?.details,
      requestData: requestData
    });
    
    throw new Error(
      `Request failed (${err.response?.status || 'unknown'}): ${err.response?.data?.error || err.message || 'Failed to submit data'}`
    );
  }
};