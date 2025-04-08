'use client'; 
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SurveyData {
  
  pet_info: {
    PetGender: string,
  };

}

interface GenderProps {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any | null, field: string, value: string) => void;
}

const Gender: React.FC<GenderProps> = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer }) => {
  const [selectedGender, setSelectedGender] = useState<'boy' | 'girl' | null>(null);

  useEffect(() => {
    console.log('Current Survey Data:', surveyData);
  }, [surveyData]);

  const handleGenderSelect = (gender: 'boy' | 'girl') => {
    if (selectedGender === gender) {
      setSelectedGender(null);
      updateAnswer('pet_info', null, 'PetGender', ''); // Clear the survey data
    } else {
      setSelectedGender(gender);
      updateAnswer('pet_info', null, 'PetGender', gender);
    }
  };

  const handleNextPage3 = () => {
    
    if (surveyData.pet_info.PetGender) {
      handleNext(); 
    } 
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative max-w-[1440px] h-[calc(100svh-96px)] md:h-[calc(100vh-140px)] mx-auto w-full flex justify-center">
    

        <div className=" w-full max-w-[320px] md:max-w-[540px] h-full">
          <div className="w-full h-full flex flex-col">

              <div className=" text-[16px] md:text-[18px] text-[#101828] font-inter tracking-[-0.4px] mt-[40px] md:mt-[85px] pl-[10px]">
                What is your pet's gender?
              </div>
              
              <div className=" relative h-[44px] mt-5">
                <button 
                  className={`absolute left-0 md:w-[260px] w-[128px] h-[44px] rounded-[22px] border border-[#717680] flex items-center justify-center gap-[10px] transition-all px-8 md:px-0
                    ${surveyData.pet_info.PetGender === 'boy' ? 'bg-[#5777D0] text-white border-[#5777D0]' : 'bg-white text-[#5777D0]'}`}
                  onClick={() => handleGenderSelect('boy')}
                >
                  <div className={surveyData.pet_info.PetGender === 'boy' ? 'brightness-0 invert' : ''}>
                    <Image 
                      src="/boy.svg" 
                      alt="Boy icon" 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="font-semibold text-[16px]">Boy</span>
                </button>
                
                <button 
                  className={`absolute md:left-[280px] left-[148px] md:w-[260px] w-[128px] h-[44px] rounded-[22px] border border-[#717680] flex items-center justify-center gap-[10px] transition-all px-8 md:px-0
                    ${surveyData.pet_info.PetGender === 'girl' ? 'bg-[#FFC542] text-white border-[#FFC542]' : 'bg-white text-[#FFC542]'}`}
                  onClick={() => handleGenderSelect('girl')}
                >
                  <div className={surveyData.pet_info.PetGender === 'girl' ? 'brightness-0 invert' : ''}>
                    <Image 
                      src="/girl.svg" 
                      alt="Girl icon" 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="font-semibold text-[16px]">Girl</span>
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
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
                className={`w-[44px] h-[44px] rounded-[22px] flex items-center justify-center md:w-[101px] md:p-0
                  ${surveyData.pet_info.PetGender ? 'bg-[#5777D0]' : 'bg-[#C3C3C3]'}`}
                onClick={handleNextPage3}
              >
                <span className="hidden md:inline text-white">Next</span>
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
              </button>

            </div>
          </div>
        </div>
  
 
  );
};

export default Gender;