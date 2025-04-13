'use client'; 
import React, { useEffect, useState } from 'react';
import Loggin from '../loggin_signup/loggin';
import Signup from '../loggin_signup/signup';
import Email from '../loggin_signup/email';
import Loading from '../loading/loading';

import { SurveyData } from '@/app/types/survey';
import download from '../downloads/download';
import { AnimatePresence } from 'framer-motion';
import { useLoggin } from '@/app/context/LogginContext';

interface Question13Props {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string | File) => void;
    aiResult: any;
    setAiResult: React.Dispatch<React.SetStateAction<any>>;
    setResult1: React.Dispatch<React.SetStateAction<boolean>>;
    setResult2: React.Dispatch<React.SetStateAction<boolean>>;
    setResult3: React.Dispatch<React.SetStateAction<boolean>>;
    setPart1: React.Dispatch<React.SetStateAction<boolean>>;
    result1: boolean;
    result2: boolean;
    result3: boolean;
    showEmail: boolean;
    showSignup: boolean;
    showLogin: boolean;
    setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    download: boolean;
    setDownload: React.Dispatch<React.SetStateAction<boolean>>;
    setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
    setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
    isFromUserProfile: boolean;
    setPart2: React.Dispatch<React.SetStateAction<boolean>>;
  
    
}

const Question13: React.FC<Question13Props>  = ({ handleNext, handleBack, step, setStep, surveyData, aiResult, setAiResult, setResult1, setResult2, setResult3, setPart1, result1, result2, result3, showEmail, showSignup, showLogin, setShowEmail, setShowSignup, setShowLogin, isLoading, setIsLoading, download, setDownload, updateAnswer, setSurveyData, setIsFromUserProfile, isFromUserProfile, setPart2}) => {
  
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false); 

  const { userInfo, setUserInfo } = useLoggin();

 

  const images = [
    '/test1.svg',
    '/test2.svg',
  ];

  const handleNextClick = async() => {
    setShowEmail(true); 
 
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };


  return (

    <div className=" relative w-full mx-auto  h-[calc(100svh-96px)] md:h-[calc(100vh-140px)] max-h-[1440px]">
    
    {isLoading && (
        <Loading 
        step={step}
        setStep={setStep}
        setPart1={setPart1}
        result1={result1}
        result2={result2}
        result3={result3}
        setResult1={setResult1}
        setResult2={setResult2}
        setResult3={setResult3}
        showEmail={showEmail}
        showSignup={showSignup}
        showLogin={showLogin}
        loading={isLoading}
        download={download}
        setShowEmail={setShowEmail}
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setLoading={setIsLoading}
        setDownload={setDownload}
        setIsFromUserProfile={setIsFromUserProfile}
        isFromUserProfile={isFromUserProfile}
        setPart2={setPart2}
        />
    )} 
   
    {showEmail && (
      <Email 
        showEmail={showEmail}
        showSignup={showSignup}
        showLogin={showLogin}
        setPart1={setPart1}
        result1={result1}
        result2={result2}
        result3={result3}
        setResult1={setResult1}
        setResult2={setResult2}
        setResult3={setResult3}
        step={step}
        setStep={setStep} 
        handleNext={handleNext} 
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setShowEmail={setShowEmail}
        surveyData={surveyData}
        aiResult={aiResult}
        setAiResult={setAiResult}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        download={download}
        setDownload={setDownload}
        setUserInfo={setUserInfo}
        updateAnswer={updateAnswer}
        setIsFromUserProfile={setIsFromUserProfile}
        isFromUserProfile={isFromUserProfile}
        setPart2={setPart2}
      />
     
    )}


    {showSignup && (
      <Signup 
        showEmail={showEmail}
        showSignup={showSignup}
        showLogin={showLogin}
        setPart1={setPart1}
        result1={result1}
        result2={result2}
        result3={result3}
        setResult1={setResult1}
        setResult2={setResult2}
        setResult3={setResult3}
        step={step}
        setStep={setStep} 
        handleNext={handleNext} 
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setShowEmail={setShowEmail}
        loading={isLoading}
        download={download}
        setLoading={setIsLoading}
        setDownload={setDownload}
        setAiResult={setAiResult}
        aiResult={aiResult}
        surveyData={surveyData}
        setSurveyData={setSurveyData}
        setIsFromUserProfile={setIsFromUserProfile}
        isFromUserProfile={isFromUserProfile}
        updateAnswer={updateAnswer}
        setPart2={setPart2}
      />
    )}

    {showLogin && (
      <Loggin
        showEmail={showEmail}
        showSignup={showSignup}
        showLogin={showLogin}
        setPart1={setPart1}
        result1={result1}
        result2={result2}
        result3={result3}
        setResult1={setResult1}
        setResult2={setResult2}
        setResult3={setResult3}
        step={step}
        setStep={setStep} 
        handleNext={handleNext} 
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setShowEmail={setShowEmail}
        loading={isLoading}
        download={download}
        setLoading={setIsLoading}
        setDownload={setDownload}
        setAiResult={setAiResult}
        aiResult={aiResult}
        surveyData={surveyData}
        updateAnswer={updateAnswer}
        setIsFromUserProfile={setIsFromUserProfile}
        isFromUserProfile={isFromUserProfile}
        setPart2={setPart2}
      />
    )}
       
      <div className=" flex flex-col w-[320px] md:w-[540px] mx-auto mt-0 ">
        <div
          className= {`
            mt-[40px] md:mt-[85px]
            text-[16px] md:text-[18px]
            text-grey-900
            font-[Inter]
            font-[400]
            ml-[10px]`}
        >
          Anything else you want to tell us?
        </div>
        <input
          type="text"
          placeholder="Tell us more about your pet"
          className="
            
            w-[100%] 
            md:w-[540px] 
            md:h-[44px]
            mt-[20px]
            py-[12px] pl-[12px] pr-[12px]
            border border-[1px] border-[#717680]
            rounded-[22px]
            bg-white
            font-[Inter]
            text-[#27355D]
            focus:outline-none focus:border-[#FFC542]
            placeholder:[#C3C3C3] placeholder:text-[16px] md:placeholder:text-[18px]
          "
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

      </div>

     <div className="  mx-auto w-[320px] md:w-[540px] absolute max-md:bottom-[48px] md:top-[393px] left-0 right-0 flex justify-between">
              <button 
                className="w-[44px] h-[44px] rounded-[22px] bg-[#D1D7EF] flex items-center justify-center md:w-[132px] md:p-0"
                onClick={handleBack}
              >
                <span className="hidden md:inline text-white">Previous</span>
                <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
                </svg>
              </button>

              <button 
                className="w-[44px] h-[44px] rounded-[22px] flex items-center justify-center md:w-[101px] md:p-0 bg-[#5777D0]"
                onClick={handleNextClick}
              >
                <span className="hidden md:inline text-white">Next</span>
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
              </button>

            </div>
      </div>
  );
};

export default Question13;
