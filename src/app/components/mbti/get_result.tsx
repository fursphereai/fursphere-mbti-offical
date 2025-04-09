'use client';
import axios from 'axios';


export const getResult = async (submissionId: number): Promise<any> => {
  try {
    const response = await axios.get(`/api/proxy?submissionId=${submissionId}`);
    console.log('response.data.status', response.data.status);
    
    if (response.data.status === 'processing') {
      // If still processing, wait 1 second and try again
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('waiting for 1 second');
      return getResult(submissionId);
    }
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch result');
  }
};