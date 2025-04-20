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

export const getDownloadImageUrl3 = async (surveyData: SurveyData, mbti: string, isFromUserProfile: boolean) => {
  const elementToCapture = document.getElementById('download-3');
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
          if (src.startsWith('blob:') || 
              (src.startsWith('http') && !src.includes(window.location.hostname))) {
            // Replace with a placeholder or skip
            return false;
          }
        }
        return true;
      }

    });


    


    console.log('length of dataUrl:', dataUrl.length);
    return dataUrl;
  } catch (error) {
    console.error('dom-to-image error:', error);
    return null;
  }
};




// export const handleDownload3 = async (surveyData: SurveyData, mbti: string, isFromUserProfile: boolean) => {
//   const elementToCapture = document.getElementById('download-3');
//   if (!elementToCapture) {
//     console.error('Element not found');
//     return;
//   }

//   try {
//     const dataUrl = await domtoimage.toPng(elementToCapture, {
//       width: 1200,      
//       height: 1500,     
//       quality: 0.95,    
//       style: {
//         transform: 'scale(1.5)',
//         transformOrigin: 'top left',
//         '-webkit-font-smoothing': 'antialiased',
//         'text-rendering': 'optimizeLegibility'
//       },
//       cacheBust: true
//     });


//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     if (isMobile) {
//       // For iOS devices, we can use the share API if available
//       if (navigator.share) {
//         // Convert data URL to Blob
//         const response = await fetch(dataUrl);
//         const blob = await response.blob();
        
//         // Create a File from the Blob
//         const file = new File([blob], `${surveyData.pet_info.PetName}-page3.jpeg`, { type: 'image/jpeg' });
        
//         try {
//           await navigator.share({
//             files: [file],
//             title: `${surveyData.pet_info.PetName}'s MBTI Result`,
//             text: 'Check out my pet\'s personality type!'
//           });
//           return; // Exit after sharing
//         } catch (error) {
//           console.log('Sharing failed', error);
//           // Fall back to regular download if sharing fails
//         }
//       }
      

      
//     }

//     const link = document.createElement('a');
//     link.download = `${surveyData.pet_info.PetName}-page3.jpeg`;
//     link.href = dataUrl;
//     link.click();
//   } catch (error) {
//     console.error('dom-to-image error:', error);
//   }
//   };






export default function BreakdownB({ aiResult, surveyData, isFromUserProfile }: { aiResult: string, surveyData: SurveyData, isFromUserProfile: boolean }) {

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
            id="download-3"  
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3
            }}
            className="relative w-[800px] h-[1000px] flex flex-col  z-0"
          style={{ backgroundColor:  (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
            : mbti === 'ISTP' ? '#4B367B' : '#4B367B' ) }}
          >

    

        <div className="absolute top-[112px]  w-full px-[40px]">
            <h2 className="text-left text-[240px] font-[Inter] font-[710] text-[#FFFFFF] leading-[1.2] tracking-[0.12px]">
            {result.ai_output.text.b_label === "Sensing" ? result.ai_output.text.b_label.charAt(0).toUpperCase() : result.ai_output.text.b_label.charAt(1).toUpperCase()} 
            </h2>
        </div> 
         
         
        <div className="absolute top-[624px]  w-full px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[710] text-white leading-[1.2] tracking-[0.12px]">
            [ {result.ai_output.text.b_label}: {Math.round(Math.abs(result.ai_output.text.b_score) / 2 + 50)}% ]
            </h2>
        </div> 
        
        <div className="absolute bg-[#F5F5F5] top-[674px] left-[40px] w-[300px] h-[20px] rounded-[32px]">
        
        </div>

        <div className="absolute  w-[300px] top-[674px] left-[40px] h-[20px] rounded-[32px] "
          style={{ 
          width: `${Math.round(Math.abs(result.ai_output.text.b_score) / 2 + 50) * 3}px`,
          backgroundColor: 
          (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#7F61C4' 
            : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#75E67A' 
            : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#88B0FF' 
            : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFDF95' 
            :  '#7F61C4' ) 
            }}>
        </div>
       


        <div className="absolute top-[726px]  w-[800px] px-[40px]">
            <h2 className="text-left text-[24px] font-[Inter] font-[400] text-white leading-[1.2] tracking-[0.12px]">
            {result.ai_output.text.b_explanation}
            </h2>
        </div>
    

          

          <div className="absolute top-[924px] left-[40px] flex flex-row w-[720px] h-[48px] items-center justify-between">
            <img src="/input_box_white.svg" alt="input_box" className="w-[418px] h-[44px]"/>
                <div className="flex flex-row">
                <div className=" flex flex-row items-center justify-center text-[14px] font-[Ubuntu] font-[400] text-[#F5F5F5] leading-[1.2] tracking-[-0.1px]">
                Powered by
                </div>
                <img 
                src="/long-logo.png" 
                alt="logo-long" 
                className="w-[157.5px] h-[48px]" 
                />
                </div>
          </div>
        

      </motion.div>
     
 );
}

 