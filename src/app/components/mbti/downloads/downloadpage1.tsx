import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '../submit_result'; 
import { getResult } from '../get_result';
import html2canvas from 'html2canvas';
import { SurveyData } from '@/app/types/survey';
import domtoimage from 'dom-to-image';
import { useLoggin } from '@/app/context/LogginContext';
import Image from 'next/image';
import * as htmlToImage from 'html-to-image';





export const getDownloadImageUrl1 = async (surveyData: SurveyData, mbti: string, isFromUserProfile: boolean) => {
  const elementToCapture = document.getElementById('download-1');
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

   
      filter: (node: HTMLElement) => {
        // Skip external images that might cause CORS issues
        if (node.tagName === 'IMG') {
          const imgElement = node as HTMLImageElement;
          const src = imgElement.getAttribute('src') || '';
            
          // Only include images from your own domain or data URLs
          if (src.startsWith('blob:')) {
            return true;
          }
          if (src.startsWith('http') && !src.includes(window.location.hostname)) {
            return true;
          }
        }
        return true;
      }

    });

    return dataUrl;
  } catch (error) {
    console.error('dom-to-image error:', error);
    return null;
  }
};

export const handleDownload1 = async (surveyData: SurveyData, mbti: string, isFromUserProfile: boolean) => {
  const elementToCapture = document.getElementById('download-1');
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

   
      filter: (node: HTMLElement) => {
        // Skip external images that might cause CORS issues
        if (node.tagName === 'IMG') {
          const imgElement = node as HTMLImageElement;
          const src = imgElement.getAttribute('src') || '';
            
          // Only include images from your own domain or data URLs
          console.log("src testing",src);

          if (src.startsWith('blob:')) {
            return true;
          }

          if (src.startsWith('http') && !src.includes(window.location.hostname)) {
            return false;
          }
          
        }
        return true;
      }

    });
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // For iOS devices, we can use the share API if available
      if (navigator.share) {
        // Convert data URL to Blob

        console.log("dataUrl testing",dataUrl);
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        // Create a File from the Blob
        const file = new File([blob], `${surveyData.pet_info.PetName}-page1.jpeg`, { type: 'image/jpeg' });
        
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
      
      
     
    }

   
    const link = document.createElement('a');
    link.download = `${surveyData.pet_info.PetName}-page1.jpeg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('dom-to-image error:', error);
  } 
};



export default function DownloadPage1({ aiResult, surveyData, isFromUserProfile }: { aiResult: string, surveyData: SurveyData, isFromUserProfile: boolean }) {
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
  

  console.log("surveyData.pet_info.PetPhoto",surveyData.pet_info.PetPhoto);
  console.log("surveyData.pet_info.PetPublicUrl",surveyData.pet_info.PetPublicUrl);
  return (
      <motion.div id="download-1"  className="relative bg-white w-[800px] h-[1000px] flex flex-col  z-0"
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



          <img src={
            mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '/bg-NT.svg'
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '/bg-NF.svg'
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '/bg-ST.svg'
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '/bg-SF.svg'
            : '/bg-NT.svg'
          }
          alt="NT" className="absolute top-[0] left-[0] w-[800px] h-[1000px] -z-10"/>
          <div className="flex flex-row absolute top-[20px] left-[528px] w-[232px] h-[48px]">
            <div className=" flex flex-row items-center justify-center text-[14px] font-[Ubuntu] font-[400] text-[#101828] leading-[1.2] tracking-[-0.1px]">
              Powered by
            </div>
            <img src="/logo-long.svg" alt="logo-long" className=" w-[157.5px] h-[48px]"/>
          </div>

          <div className="w-[540px] mt-[149px] ml-[40px] text-[128px] font-[Ubuntu] font-[700] leading-[1.2] tracking-[0.9px]"
           style={{ 
            color: 
            mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#FFFFFF'
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#FFFFFF'
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#FFFFFF'
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFC542'
            : '#FFFFFF'
          }}
          >
            <h2>
              {mbti}
            </h2>
          </div>

          <div className="w-[540px] mt-[20px] ml-[40px] text-[32px] font-[Ubuntu] font-[500] uppercase  leading-[1.2] tracking-[0.12px]"
          style={{ 
            color: 
            mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#FFFFFF'
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#FFFFFF'
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#1C1C1C'
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#1C1C1C'
            : '#FFFFFF'
          }}
          
         >
            <h2>{result.ai_output.text.personal_speech}</h2>
          </div>

         
           
    
          <div className=" absolute top-[500px] left-[40px] flex flex-row">
            
          {surveyData.pet_info.PetPhoto ? (
            <div className="w-[346px] h-[346px] bg-white border-[4px]  rounded-[40px]"
            style={{ 
              borderColor: 
              mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B'
              : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#43BD48'
              : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0'
              : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFC542'
              : '#4B367B'
            }}
            >
              <div className=" w-full h-full  rounded-[36px] z-10">
              <img
                src={surveyData.pet_info.PetPhoto} 
                alt="download" 
                className="w-full h-full  object-cover rounded-[36px] "
             
              />
              </div>
            </div>
            ) : (
              <div className="w-[346px] h-[346px]">
                <img src={surveyData.pet_info.PetSpecies === "Dog" 
                  ? `/mbti-dog/${mbti}.svg`
                  : `/mbti-cat/${mbti}.svg`
                } alt="download" className="w-[346px] h-[346px]"/>
              </div>
            )}

            <div className="w-[350px] mt-[50px] ml-[24px] flex flex-col  ">
              <h2 className="text-right text-[24px] font-[Inter] font-[710] text-[#000000] leading-[1.2]">
                 [ {surveyData.pet_info.PetName} ] 
              </h2>
              <h2 className="text-right mt-[12px] text-[16px] font-[Inter] font-[710] text-[#4B367B] leading-[1.2] tracking-[0.12px]">
              {mbti === 'INTJ' ? 'The Architect' 
              : mbti === 'INTP' ? 'The Logician' 
              : mbti === 'ENTJ' ? 'The Commander' 
              : mbti === 'ENTP' ? 'The Debater' 
              : mbti === 'INFJ' ? 'The Advocate' 
              : mbti === 'INFP' ? 'The Mediator' 
              : mbti === 'ENFJ' ? 'The Protagonist' 
              : mbti === 'ENFP' ? 'The Campaigner' 
              : mbti === 'ISTJ' ? 'The Logistician' 
              : mbti === 'ISFJ' ? 'The Defender' 
              : mbti === 'ESTJ' ? 'The Executive' 
              : mbti === 'ESTP' ? 'The Entrepreneur' 
              : mbti === 'ISFP' ? 'The Adventurer' 
              : mbti === 'ESFP' ? 'The Entertainer' 
              : mbti === 'ISTP' ? 'The Virtuoso' 

              :  'The Consul' }
              </h2>
              <h2 className="text-left w-[380px] mt-[32px] text-[24px] font-[Inter] font-[400] text-[#1C1C1C] leading-[1.2] tracking-[0.12px]">
              {result.ai_output.text.third_person_diagnosis}
              </h2>
            </div>   
          
          </div>
 
          <div className="absolute   flex top-[926px] left-[191px]">
            <img src="/input_box.svg" alt="input_box" className="w-[418px] h-[44px]"/>
          </div>
        

      </motion.div>
     
 );
}

 