import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '../submit_result'; 
import { getResult } from '../get_result';
import html2canvas from 'html2canvas';
import { backgroundOrigin } from 'html2canvas/dist/types/css/property-descriptors/background-origin';
import { SurveyData } from '@/app/types/survey';
import domtoimage from 'dom-to-image';
import { useLoggin } from '@/app/context/LogginContext';



export const handleDownload6 = async (surveyData: SurveyData, mbti: string, isFromUserProfile: boolean) => {
  const elementToCapture = document.getElementById('download-6');
  if (!elementToCapture) {
    console.error('Element not found');
    return;
  }

  try {
    const dataUrl = await domtoimage.toPng(elementToCapture, {
      width: 1200,      
      height: 1500,     
      quality: 0.95,    
      style: {
        transform: 'scale(1.5)',
        transformOrigin: 'top left',
        '-webkit-font-smoothing': 'antialiased',
        'text-rendering': 'optimizeLegibility'
      },
      cacheBust: true
    });


    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // For iOS devices, we can use the share API if available
      if (navigator.share) {
        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        // Create a File from the Blob
        const file = new File([blob], `${surveyData.pet_info.PetName}-page1.png`, { type: 'image/png' });
        
        try {
          await navigator.share({
            files: [file],
            title: `${surveyData.pet_info.PetName}'s MBTI Result`,
            text: 'Check out my pet\'s personality type!'
          });
          return; // Exit after sharing
        } catch (error) {
          console.log('Sharing failed', error);
          // Fall back to regular download if sharing fails
        }
      }
      
      // For iOS Safari, we can try to open the image in a new tab
      // The user can then long-press to save it
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <html>
            <head>
              <title>${surveyData.pet_info.PetName}'s MBTI Result</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
                img { max-width: 100%; max-height: 100%; }
                p { position: fixed; bottom: 20px; width: 100%; text-align: center; font-family: Arial; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" alt="${surveyData.pet_info.PetName}'s MBTI Result">
              <p>Press and hold the image to save to your photos</p>
            </body>
          </html>
        `);
        newTab.document.close();
        return;
      }
    }

    const link = document.createElement('a');
    link.download = `${surveyData.pet_info.PetName}-page6.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('dom-to-image error:', error);
  }
  };





export default function DoNotDo({ aiResult, surveyData, isFromUserProfile }: { aiResult: string, surveyData: SurveyData, isFromUserProfile: boolean }) {

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
      <motion.div 
            id="download-6"  
            className="relative bg-[#FFFFFF] w-[800px] h-[1000px] flex flex-col z-0"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3
            }}
          >

    

        <div className="absolute  top-[112px] w-full px-[40px]">
            <h2 className="text-left text-[20px] font-[Inter] font-[600] text-[#27355D] leading-[1.2] tracking-[0.12px]">
            Do and Do not
            </h2>
        </div> 

        <div className="absolute flex flex-row items-center justify-center top-[131px]  left-[660px] w-[96px] h-[48px] rounded-[10px]"
        style={{ 
          backgroundColor: 
          (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
            : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
        }}
        >
           <h2 className=" text-[24px] font-[Inter] font-[600] text-[#FFFFFF] leading-[1.2] tracking-[0.12px]">
            {mbti}
            </h2>
        </div> 


        <div className="absolute top-[136px] w-full px-[40px]">
            <h2 className="text-left text-[36px] font-[Inter] font-[710] text-[#000000] leading-[1.2] ">
            {surveyData.pet_info.PetName}
            </h2>
        </div> 

        <div className="absolute top-[220px] w-[800px] px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[600] text-[#27355D] leading-[1.2] ">
            <span className="mr-[12px]">✅</span>Do:
            </h2>
        </div> 

        <div className="absolute top-[259px]  w-[800px] px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[400] text-[#27355D] leading-[1.2] ">
            {result.ai_output.text.do_suggestion}
            </h2>
        </div> 

        <div className="absolute top-[386px] w-[800px] px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[600] text-[#27355D] leading-[1.2]">
            <span className="mr-[12px]">✅</span>Do
            </h2>
        </div> 

        <div className="absolute top-[425px] w-[800px] px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[400] text-[#27355D] leading-[1.2] ">
            {result.ai_output.text.do_not_suggestion}
            </h2>
        </div> 
         
        <div className="absolute top-[630px] w-[193px] h-[193px]">
        {surveyData.pet_info.PetSpecies === "Dog" 
            ? <img src={`/mbti-dog/${mbti}.svg`} alt="mbti-result" className="w-full h-full object-cover"/> 
            : <img src={`/mbti-cat/${mbti}.svg`} alt="mbti-result" className="w-full h-full object-cover"/> 
        }
        </div> 

        <div className="absolute top-[843px] w-full px-[40px] ">
            <h2 className="text-left text-[16px] font-[Inter] font-[400] text-[#27355D] leading-[1.2] ">
            For more ways to care, connect, and discover — check fursphere.com
            </h2>
        </div> 
        
          <div className="absolute top-[924px] left-[40px] flex flex-row w-[720px] h-[48px] items-center justify-between">
            <img src="/input_box.svg" alt="input_box" className="w-[418px] h-[44px]"/>
                <div className="flex flex-row">
                <div className=" flex flex-row items-center justify-center text-[14px] font-[Ubuntu] font-[400] text-[#F5F5F5] leading-[1.2] tracking-[-0.1px]">
                Powered by
                </div>
                <img src="/logo-long.svg" alt="logo-long" className=" w-[157.5px] h-[48px]"/>
                </div>
          </div>
        

      </motion.div>
     
 );
}

 