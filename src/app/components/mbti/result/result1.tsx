'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SurveyData } from '@/app/types/survey';
import { useLoggin } from '@/app/context/LogginContext';
import DownloadPage1, { getDownloadImageUrl1 } from '../downloads/downloadpage1';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import BreakdownM, { getDownloadImageUrl2 } from '../downloads/breakdown-m';
import BreakdownB, { getDownloadImageUrl3 } from '../downloads/breakdown-b';
import BreakdownT, { getDownloadImageUrl4 } from '../downloads/breakdown-t';
import BreakdownI, { getDownloadImageUrl5 } from '../downloads/breakdown-i';
import DoNotDo, { getDownloadImageUrl6 } from '../downloads/do_not_do';





interface Result1Props {
  handleNext: () => void;
  handleBack: () => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  surveyData: SurveyData;
  updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string) => void;
  setResult1: (result: boolean) => void;
  setResult2: (result: boolean) => void;
  setResult3: (result: boolean) => void;
  aiResult: any;
  setDownload: (result: boolean) => void;
  setDownloadPage1: (result: boolean) => void;
  isFromUserProfile: boolean;
  setIsFromUserProfile: (result: boolean) => void;
}

interface AiResult {
  ai_output: {
    output: string;
    status: string;
  }
}






const Result1: React.FC<Result1Props> = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, setResult1, setResult2, setResult3,  aiResult, setDownload, setDownloadPage1, isFromUserProfile, setIsFromUserProfile}) => {

  const generateDownload = () => {
    
    // setDownload(true);
    // setDownloadPage1(true);

  }
  const handleNextClick = () => {
    // setResult1(false);
    // setResult2(true);


    setDownload(true);
    setResult1(false);
   
  };

  const { userInfo, setUserInfo } = useLoggin();

  let result;
  if (isFromUserProfile) {
    result = userInfo ;
  } else {
    result = JSON.parse(aiResult) ;
  }
  console.log('nihao', result.ai_output.text);

  
  const mbti = result.ai_output.text.m_label.charAt(0).toUpperCase() + 
              (result.ai_output.text.b_label === "Sensing" ? result.ai_output.text.b_label.charAt(0).toUpperCase() : result.ai_output.text.b_label.charAt(1).toUpperCase()) + 
              result.ai_output.text.t_label.charAt(0).toUpperCase() + 
              result.ai_output.text.i_label.charAt(0).toUpperCase();

  console.log('mbti',mbti);

  console.log('surveyDataPGOTO', surveyData);

  const emailSentRef = useRef(false);

  useEffect(() => {
    // Only run if it hasn't been executed before
    if (!emailSentRef.current) {
      mbtiEmail();
      // Mark as executed
      emailSentRef.current = true;
    }
  }, []);
  



  const mbtiEmail = async () => {
    try {
      
      
    const email = surveyData.user_info.email;
    console.log('Waiting for content to render...');

    await new Promise(resolve => setTimeout(resolve, 5000));

    const imageDataUrl1 = await getDownloadImageUrl1(surveyData, mbti, isFromUserProfile);
    const imageDataUrl2 = await getDownloadImageUrl2(surveyData, mbti, isFromUserProfile);
    const imageDataUrl3 = await getDownloadImageUrl3(surveyData, mbti, isFromUserProfile);
    const imageDataUrl4 = await getDownloadImageUrl4(surveyData, mbti, isFromUserProfile);
    const imageDataUrl5 = await getDownloadImageUrl5(surveyData, mbti, isFromUserProfile);
    const imageDataUrl6 = await getDownloadImageUrl6(surveyData, mbti, isFromUserProfile);
  
    if (!imageDataUrl1 || !imageDataUrl2 || !imageDataUrl3 || !imageDataUrl4 || !imageDataUrl5 || !imageDataUrl6) {
      throw new Error('Failed to generate image');
    }

   
    const blob1 = imageDataUrl1.split(',')[1];
    const blob2 = imageDataUrl2.split(',')[1];
    const blob3 = imageDataUrl3.split(',')[1];
    const blob4 = imageDataUrl4.split(',')[1];
    const blob5 = imageDataUrl5.split(',')[1];
    const blob6 = imageDataUrl6.split(',')[1];


    const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'send_mbti_email',
              attachment1: blob1,
              attachment2: blob2,
              attachment3: blob3,
              attachment4: blob4,
              attachment5: blob5,
              attachment6: blob6,
              surveyData: surveyData,
              contentType: 'image/jpeg', // Explicitly set content type
              filename: `${surveyData.pet_info.PetName}-MBTI-Result.jpeg`, // Use .png extension
              email: email,
              isTestImage: true
            }),
    });

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Invalid email address');
                case 429:
                    throw new Error('Too many attempts. Please try again later');
                case 500:
                    throw new Error('Server error. Please try again later');
                default:
                    throw new Error(data.message || 'Failed to send code');
            }
        }

  
    } catch (error: any) {
        console.error('Error:', error);
    
      
    } finally {
        
    }
};


  return (
    <>
    <div className="hidden">  
      <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
      <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
      <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
      <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
      <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
      <DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
    </div>
    <div className="relative w-full mx-auto  mt-0 md:mt-[100px] h-auto md:h-[993px] bg-[#FFFFFF] flex flex-col items-center bg-white">
      {/* 🔹 进度条部分（顶部 80px 间距） */}

      <div className=" mt-0 h-[40px] md:h-[70px] bg-[#EEF1FA] w-full">

        <div className="relative flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px]">
          <button className="inline max-[1056px]:hidden absolute left-1/2 -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px] text-[#C3C3C3] text-[14px]">
            Exit
          </button>
          {/* <p className=" hidden md:flex text-[#27355D] text-[14px]">Result</p> */}

          <div className=" flex flex-row justify-between bg-[#EEF1FA] mx-[20px] md:mx-[24px] w-full max-w-[290px] md:max-w-[740px] h-[10px] rounded-[8px]"> 
            <div className="w-[140px] md:w-[365px] ml-[0px] h-full bg-[#5777D0] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
            <div className="w-[140px] md:w-[365px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
          </div>

          {/* <p className="text-[#27355D] text-[14px] font-[600]">1/3</p> */}
        </div>

      </div>

      {/* 🔹 主要内容容器（80px 间距，540px 宽） */}
      <div className="relative   w-[320px] md:w-[540px] h-auto md:h-[600px] mt-[30px] md:mt-[80px] flex flex-col items-center">
        {/* Name 标题 */}
        
       <h1 className=" text-[14px] md:text-[20px] text-[#27355D] font-[400] md:font-[610] font-Inter w-full text-left leading-[1.2] ">Name</h1>
        <h1 className=" text-[20px] md:text-[36px] text-[#000] font-[600] md:font-[710] font-Inter w-full text-left leading-[1.2] ">
          {surveyData.pet_info.PetName}
        </h1>

        {/* MBTI 结果卡片 */}
        <div className="relative flex items-center text-white rounded-[20px] md:rounded-[40px] mt-[11.74px] md:mt-[20px] w-full h-[100px] md:h-[167px]"
             style={{ backgroundColor: 
              (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
              : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
              : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
              : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
              : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
            }}>
          <div>
            <h3 className=" ml-[17.78px] md:ml-[30px] text-[56px] md:text-[96px] font-[710] font-Inter leading-none uppercase">
            {mbti}
            </h3>
            <p className=" ml-[17.78px] md:ml-[30px] text-[12px] md:text-[20px] font-[710] font-Inter">
              {mbti === 'INTJ' ? 'The Mastermind' 
              : mbti === 'INTP' ? 'The Thinker' 
              : mbti === 'ENTJ' ? 'The Boss' 
              : mbti === 'ENTP' ? 'The Trickster' 
              : mbti === 'INFJ' ? 'The Angel' 
              : mbti === 'INFP' ? 'The Daydreamer' 
              : mbti === 'ENFJ' ? 'The Caregiver' 
              : mbti === 'ENFP' ? 'The Sunshine' 
              : mbti === 'ISTJ' ? 'The Rule Keeper' 
              : mbti === 'ISFJ' ? 'The Giver' 
              : mbti === 'ESTJ' ? 'The Monitor' 

              : mbti === 'ESTP' ? 'The Daredevil😈' 
              : mbti === 'ISFP' ? 'The Wanderer' 
              : mbti === 'ESFP' ? 'The Star' 
              : mbti === 'ISTP' ? 'The Fixer' 

              :  'The Sweetheart' }
            </p>
          </div>
          {/* 预留 MBTI 右侧插图（顶部溢出紫色框） */}
          <div className="absolute bottom-[0px] right-[0px] w-[150px] md:w-[260px] h-[150px] md:h-[260px]">

          {surveyData.pet_info.PetPublicUrl ? (
            surveyData.pet_info.PetSpecies === "Dog" ? (
              <img src={`/mbti-dog/${mbti}.svg`} alt="mbti-result" loading="eager" className="w-full h-full object-contain"/> 
            ) : (
              <img src={`/mbti-cat/${mbti}.svg`} alt="mbti-result" loading="eager" className="w-full h-full object-contain"/>
            )
          ) : (
            <div className="md:hidden"> 
            </div>
          )}
          </div>
        </div>


        <div className="flex flex-row 
        mt-[40px] md:mt-[36px] 
        text-left text-[#000] 
        font-Inter font-[400] text-[20px] leading-[1.2] 
        w-full">
          
          {surveyData.pet_info.PetPublicUrl ? (
          <div className="md:hidden  w-[100px] h-[100px] border-[2px] border-[#4B367B] rounded-[20px] flex items-center justify-center mr-[10px]">
            <img src={surveyData.pet_info.PetPublicUrl} alt="Mingming" className="w-full h-full rounded-[18px] object-cover" />
          </div>
          ) : (
            <div className="md:hidden  w-[100px] h-[100px]  flex items-center justify-center mr-[10px]">
              <img src={surveyData.pet_info.PetSpecies === "Dog" 
                  ? `/mbti-dog/${mbti}.svg`
                  : `/mbti-cat/${mbti}.svg`
                } alt="mbti-result" className="w-full h-full object-cover"/> 
            </div>
          )}

          <p className = "w-[210px] md:w-full  ">
          {result.ai_output.text.personal_speech}
          </p>
        </div>

        {/* 宠物照片 & 结论 */}
        <div className=" flex flex-row items-center gap-[20px] mt-[40px] md:mt-[20px] w-full">
        {surveyData.pet_info.PetPublicUrl ? (
          <div className="hidden md:flex w-[232px] h-[232px] border-[4px] border-[#4B367B] rounded-[40px] flex items-center justify-center">
            <img src={surveyData.pet_info.PetPublicUrl} alt="Mingming" className="w-full h-full rounded-[40px] object-cover" />
          </div>
          ) : (
            <div className="hidden md:flex w-[232px] h-[232px] flex items-center justify-center">
              <img src={surveyData.pet_info.PetSpecies === "Dog" 
                  ? `/mbti-dog/${mbti}.svg`
                  : `/mbti-cat/${mbti}.svg`
                } alt="mbti-result" className="w-full h-full object-cover"/> 
            </div>
          )}

          {/* 右侧结论部分 */}
          <div className="flex flex-col w-[320px] md:w-[288px] mt-[0] md:mt-[30px]">
            <h3 className="font-[600] text-[20px] text-[#27355D] font-Inter leading-[1.2] tracking-[0%]">Conclusion</h3>
            <p className=" w-[320px] md:w-[288px] text-[16px] text-[#1C1C1C] font-[400] font-Inter leading-[1.2] mt-[20px] md:mt-[10px] tracking-[0%]">
            {result.ai_output.text.third_person_diagnosis}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 按钮区域 */}
      <div className="flex flex-row  justify-between w-full max-w-[320px] md:max-w-[540px] mt-[34px] md:mt-[40px]">
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#D1D7EF] rounded-[22px] text-[16px] font-[600] text-white">
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
               <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
               </svg>
          <span className="hidden md:flex">Previous</span>
        </button>

        {/* <button className=" w-[205px] h-[44px] bg-white rounded-[22px] border-[1px] border-[#C3C3C3] text-[16px] font-[600] text-black"
         onClick={generateDownload}>
          Screenshot & Share
        </button> */}
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[101px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white" onClick={handleNextClick}>
              <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
          <span className="hidden md:flex">Next</span>
        </button>
      </div>


      {/* 🔹 Logo */}
      <div className="hidden md:flex w-full flex justify-center mt-[70px]">
        <p className="text-[#000] opacity-[0.5] flex items-center gap-[10px]">
         Powered by 
         <img src="/fursphere-bottom-logo.svg" alt="FurSphere Logo" className="w-[199px]" />
       </p>
      </div>
    </div>
    </>
  );
};

export default Result1;