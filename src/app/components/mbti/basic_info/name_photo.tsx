'use client'; 
import React, { useEffect, useState } from 'react';
import ImageUpload from '../ImageUpload';
import { SurveyData } from '@/app/types/survey';


interface NamePhotoProps {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string | File) => void;
    setPart2: React.Dispatch<React.SetStateAction<boolean>>;
}

const NamePhoto: React.FC<NamePhotoProps>  = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, setPart2  }) => {
  const [showBanner, setShowBanner] = useState(true);
  
  const handleCloseBanner = () => {
    setShowBanner(false);
  }


  const handleNextPage5 = () => {
    
    if (surveyData.pet_info.PetName && surveyData.pet_info.PetPhoto) {
      setPart2(true);
    } 
  };

  const handleSkip = () => {
    setPart2(true);

  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className=" relative w-full mx-auto h-auto md:h-[calc(100vh-140px)] max-h-[1440px]">
        {showBanner && (

        <div className=" h-[100px] md:h-[80px] w-full bg-[#FEF0C7] flex items-center justify-center">
          
          <div className=" mx-auto w-[320px] md:w-[540px] flex flex-row items-center justify-between ">
            <div className="flex flex-col max-w-[289px] md:max-w-[450px] gap-[10px]">
              <span className="max-w-[289px] md:max-w-[450px] text-[14px] text-[#717680] leading-[16.94px]">
                A name and image help us create a more personalized result poster for you, but feel free to skip if you're not comfortable!
              </span>
              <a
                // href="#sample" 
                className=" text-[14px] text-[#5777D0] underline hover:opacity-80 leading-[16.94px]"
              >
                View Sample
              </a>
            </div>

            <button
              onClick={handleCloseBanner}
              className="text-[#27355D] hover:opacity-80 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className=" flex flex-col w-[320px] md:w-[540px] mx-auto ">
        <label
          className= {`
            ${showBanner ? 'mt-[40px] md:mt-[45px]' : 'mt-[40px] md:mt-[85px]'} 
            text-[16px] md:text-[18px]
            font-[Inter]
            font-[400]
            ml-[10px]
            text-[#101828]
            `}
        >
          {surveyData.pet_info.PetGender === 'boy' ? 'His name is' : 'Her name is'}
        </label>
        <input
          type="text"
          placeholder="Please enter a name"
          className="
            w-[100%] 
            md:w-[540px] 
            md:h-[44px]
            mt-[20px]
            py-[12px] pl-[12px] pr-[130px]
            border border-[1px] border-[#717680]
            rounded-[22px]
            bg-white
            font-[Inter]
            text-[#27355D]
            focus:outline-none focus:border-[#FFC542]
            placeholder:[#C3C3C3] placeholder:text-[16px] md:placeholder:text-[18px]
          "
          value={surveyData.pet_info.PetName}
          onChange={(e) => {
            updateAnswer('pet_info', null, 'PetName', e.target.value);
          }}
        />

        <label
          className="
            mt-[20px]
            mb-[20px]
            text-[16px] md:text-[18px]
            font-[Inter]
            font-[400]
            ml-[10px]
            text-[#101828]
          "
        >
        {surveyData.pet_info.PetGender === 'boy' ? 'Please upload his stunning photo' : 'Please upload her stunning photo'}
        </label>
        <ImageUpload updateAnswer={updateAnswer} surveyData={surveyData} />

      </div>

      <div className= 
      {` mt-[112px]   
       left-0 right-0 mx-auto w-[320px] md:w-[540px] h-[44px] flex justify-between `}>
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
          className="
            w-[100px] h-[44px]
            rounded-[22px]
            text-black
            flex items-center justify-center
            hover:opacity-90
            border border-[1px] border-[#C3C3C3]
            transition-all
            bg-[#ffffff]
          "
          onClick={handleSkip}
        >
          <span className="font-semibold">Skip</span>
        </button>

        <button 
            className={`w-[44px] h-[44px] rounded-[22px] flex items-center justify-center md:w-[101px] md:p-0
              ${surveyData.pet_info.PetName && surveyData.pet_info.PetPhoto ? 'bg-[#5777D0]' : 'bg-[#C3C3C3]'}`}
            onClick={handleNextPage5}
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

export default NamePhoto;
