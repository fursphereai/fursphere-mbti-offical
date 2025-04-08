'use client'; 
import React, { useEffect, useState } from 'react';
import ProgressBar from '../ProgressBar';
import Image from 'next/image';

interface SurveyData {
  user_info: {
    name: string,
    email: string,
    ip: string;
    mbti: string
  };
  pet_info: {
    PetSpecies: string;
    PetBreed: string,
    PetGender: string,
    PetSex: string,
    PetAge: string,
    PetName: string,
    PetPhoto: string,
  };
  personality_and_behavior: {
      Energy_Socialization: {
          seek_attention: string,
          interact_with_toys: string,
          stranger_enter_territory: string,
      },
      Routin_Curiosity: {
          prefer_routine: string,
          friend_visit_behaviors: string,
          fur_care_7days: string,
      },
      Decision_Making: {
          react_when_sad: string,
          toy_out_of_reach: string,
          react_new_friend: string, 
      },
      Structure_Spontaneity: {
          react_new_environment:string,
          respond_to_scold:string,
          follow_commands:string,
      };
  };
}


interface BasicInfoScreenProps {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any | null, field: string, value: string) => void;
    setPart2: React.Dispatch<React.SetStateAction<boolean>>;
}




const Part2: React.FC<BasicInfoScreenProps>  = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, setPart2 }) => {
  const handleNextClick = () => {
    setPart2(false);
    handleNext();
    console.log(step);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className=" h-[calc(100svh-56px)] mt-0 md:mt-[100px] bg-[#F5F5F5]">
      
      <div className="flex flex-col  mx-auto max-w-[1440px] max-h-[531px] md:max-h-[461px] items-center h-full ">
        <label className="
                  mt-[40px]
                  text-[14px]
                  text-[#C3C3C3]
                  font-[400]
                  font-[Inter]
                  leading-[16.94px]
                      ">This test has two parts.
        </label>

        <label className="
                  mt-[20px]
                  text-[20px]
                  text-[#5777D0]
                  font-[600]
                  font-[Inter]
                  leading-[24.2px]
                      ">Part 2
        </label>

        <label className="
                  text-[32px]
                  text-[#27355D]
                  font-[600]
                  font-[Inter]
                  leading-[38.73px]
                      ">Behavioral Quiz
        </label>

        <Image
          src="/part2-cat-dog.svg"
          alt="pet" 
          width={320}
          height={320}
          className=" w-[320px] h-[320px]  mt-[8px] md:mt-[-33px]"
        />

        <label className="
                  mt-[12px] md:mt-[0px]
                  max-w-[300px] md:max-w-[540px]
                  text-[14px]
                  text-[#27355D]
                  font-[400]
                  font-[Inter]
                  leading-[16.94px]
                      ">Your pet's daily behaviors and habits reflect its unique MBTI personality.
        </label>
        </div>
        <div className="flex flex-col items-center">
          <button 
            className="
            mx-auto flex flex-row items-center justify-center
            absolute bottom-[48px]
            w-[150px] h-[44px]
            rounded-[22px]
            bg-[#5777D0] 
            text-[16px]
            text-white"
            onClick={handleNextClick}
            >
              Let’s go
              <svg 
                className="ml-2" 
                width="16" 
                height="32" 
                viewBox="0 0 16 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" 
                  fill="currentColor"
                />
              </svg>
          </button>
        </div>

      </div>
      

 
  );

};

export default Part2;
