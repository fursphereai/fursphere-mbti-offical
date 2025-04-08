'use client';
import axios from 'axios';
import { getResult } from './get_result';


export const checkingSignup = async (email: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/proxy?check_signup=${email}`);
    console.log(response);
    
    if (response.data.status === 'processing') {
      // If still processing, wait 1 second and try again
      await new Promise(resolve => setTimeout(resolve, 1000));
      return checkingSignup(email);
    }
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to check signup');
  }
};