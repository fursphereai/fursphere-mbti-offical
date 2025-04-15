'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { SurveyData } from '@/app/types/survey';
// import { handleDownload2 } from '../downloads/breakdown-m';
// import Breakdown from '../downloads/breakdown-m';
import { useLoggin } from '@/app/context/LogginContext';

interface Result3Props {
  setResult1: (result: boolean) => void;
  setResult2: (result: boolean) => void;
  setResult3: (result: boolean) => void;
  aiResult: any;
  surveyData: SurveyData;
  setDownload: (result: boolean) => void;
  isFromUserProfile: boolean;
  setIsFromUserProfile: (result: boolean) => void;
}

const Result3: React.FC<Result3Props> = ({ setResult1, setResult2, setResult3,  aiResult, surveyData, setDownload, isFromUserProfile, setIsFromUserProfile}) => {
  const router = useRouter();

  const handlePreviousClick = () => {
    setResult1(false);
    setResult2(true);
    setResult3(false);
  };

  const handleExploreMoreClick = () => {
    setResult1(false);
    setResult2(false);
    setResult3(false);
  };
 
  const generateDownload = () => {
    setDownload(true);
  }

  const { userInfo, setUserInfo } = useLoggin();

  let result;
  if (isFromUserProfile) {
    result = userInfo ;
  } else {
    result = JSON.parse(aiResult) ;
  }


  const mbti = result.ai_output.text.m_label.charAt(0).toUpperCase() + 
  (result.ai_output.text.b_label === "Sensing" ? result.ai_output.text.b_label.charAt(0).toUpperCase() : result.ai_output.text.b_label.charAt(1).toUpperCase()) + 
  result.ai_output.text.t_label.charAt(0).toUpperCase() + 
  result.ai_output.text.i_label.charAt(0).toUpperCase();

  return (
<>  
    
    <div className="relative bg-[#FFFFFF] w-full mx-auto h-[688px] md:h-[993px] flex flex-col items-center bg-white">
      {/* 🔹 进度条 */}
      <div className="mt-0 h-[40px] md:h-[70px] bg-[#EEF1FA] w-full">

      <div className="relative flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px]">
        <button className="inline max-[1056px]:hidden absolute left-1/2 -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px] text-[#C3C3C3] text-[14px]">
          Exit
        </button>
        <p className=" hidden md:flex text-[#27355D] text-[14px]">Result</p>

        <div className=" flex flex-row justify-between bg-[#EEF1FA] mx-[20px] md:mx-[24px] w-full max-w-[276px] md:max-w-[740px] h-[10px] rounded-[8px]"> 
          <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
          <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
          <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#5777D0] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
        </div>

        <p className="text-[#27355D] text-[14px] font-[600]">3/3</p>
      </div>

      </div>

      {/* 🔹 主要内容 */}
      <div className="relative  w-[320px] md:w-[540px] mt-[30px] md:mt-[80px] flex flex-col items-center">
        {/* 标题区域 */}
        <div className="flex flex-row h-[42px] md:h-[84px] justify-between w-full">
          <div className=" flex flex-col">
            {/* MBTI 详情标题（左侧） */}
            <h1 className="text-[14px] md:text-[20px] text-[#27355D] font-[400] md:font-[600] font-Inter leading-[1.2]">Do and Do not</h1>
            {/* Mingming（在 MBTI 详情标题下方） */}
            <h2 className="text-[20px] md:text-[36px] text-[#000000] font-[600] md:font-[710] font-Inter leading-[1.2]"> {surveyData.pet_info.PetName}</h2>

          </div>
          {/* MBTI 结果框（右侧） */}
          <div className="flex items-center justify-center text-white rounded-[10px] md:rounded-[20px] w-[82px] md:w-[164px] h-[42px] md:h-[84px] "
               style={{ backgroundColor: 
              (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
            }}>
            <h3 className="text-[18px] md:text-[36px] font-[710] font-Inter leading-none uppercase">
            {mbti}
            </h3>
          </div>
        </div>

        {/* Do & Do Not Section */}
        <div className=" mt-[40px] w-full text-left">
          {/* ✅ Do Section */}
          <div className="mb-[40px]">
            <p className="text-[20px] font-[600] text-[#27355D] flex items-center leading-[1.2]">
              ✅ Do:
            </p>
            <p className="mt-[10px] text-[16px] text-[#1C1C1C] font-[400] leading-[1.2] tracking-[-0.02em] md:tracking-normal">
            {result.ai_output.text.do_suggestion}
            </p>
          </div>

          {/* ❎ Do Not Section */}
          <div>
            <p className="text-[20px] font-[600] text-[#27355D] flex items-center leading-[1.2]">
              ❎ Do not:
            </p>
            <p className="mt-[10px] text-[16px] text-[#1C1C1C] font-[400] leading-[1.2] tracking-[-0.02em] md:tracking-normal">
            {result.ai_output.text.do_not_suggestion}
            </p>
          </div>
        </div>
      </div>

       {/* 🔹 按钮区域 */}
     <div className="flex flex-row justify-between w-full max-w-[320px] md:max-w-[540px] mt-[165px] md:mt-[40px]">
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white" onClick={handlePreviousClick}>
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
               <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
               </svg>
          <span className="hidden md:flex">Previous</span>
        </button>

        <button className=" w-[205px] h-[44px] bg-white rounded-[22px] border-[1px] border-[#C3C3C3] text-[16px] font-[600] text-black"
        onClick={generateDownload}>
          Screenshot & Share
        </button>
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[166px] h-[44px] bg-[#D1D7EF] rounded-[22px] text-[16px] font-[600] text-white" onClick={handleExploreMoreClick}>
              <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
          <span className="hidden md:flex">Explore More</span>
        </button>
      </div>

      {/* 🔹 Logo */}
      <div className="hidden md:flex w-full flex justify-center mt-[317px]">
        <p className="text-[#000] opacity-[0.5] flex items-center gap-[10px]">
         Powered by 
         <img src="/fursphere-bottom-logo.svg" alt="FurSphere Logo" className="w-[199px]" />
       </p>
      </div>
    </div>
  </>
  );
};

export default Result3;
