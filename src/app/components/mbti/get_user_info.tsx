'use client';
import axios from 'axios';


export const getUserInfo = async (email: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/proxy?email=${email}`);

    console.log('response', response);
    if (response.data.status === 'processing') {
      // If still processing, wait 1 second and try again
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getUserInfo(email);
    }   
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch result');
  }
};