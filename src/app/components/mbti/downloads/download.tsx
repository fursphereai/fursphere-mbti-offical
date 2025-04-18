import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import DownloadPage1 from './downloadpage1';
import { useState } from 'react';
import Breakdown from './breakdown-m';
import DoNotDo from './do_not_do';
import MobileHeader from '../mobile-header';
import { SurveyData } from '@/app/types/survey';
import BreakdownM from './breakdown-m';
import BreakdownB from './breakdown-b';
import BreakdownI from './breakdown-i';
import BreakdownT from './breakdown-t';
// import { handleDownload1 } from './downloadpage1';
// import { handleDownload2 } from './breakdown-m';
// import { handleDownload3 } from './breakdown-b';
// import { handleDownload4 } from './breakdown-t';
// import { handleDownload5 } from './breakdown-i';
// import { handleDownload6 } from './do_not_do';
import { useLoggin } from '@/app/context/LogginContext';

interface DownloadProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPart1: React.Dispatch<React.SetStateAction<boolean>>;
  result1: boolean;
  result2: boolean;
  result3: boolean;
  setResult1: React.Dispatch<React.SetStateAction<boolean>>;
  setResult2: React.Dispatch<React.SetStateAction<boolean>>;
  setResult3: React.Dispatch<React.SetStateAction<boolean>>;
  showEmail: boolean;
  showSignup: boolean;
  showLogin: boolean;
  loading: boolean;
  download: boolean;
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDownload: React.Dispatch<React.SetStateAction<boolean>>;
  aiResult: string;
  surveyData: SurveyData;
  isFromUserProfile: boolean;
  setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setAiResult: React.Dispatch<React.SetStateAction<string>>;
  setPart2: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Download({ step, setStep, setPart1, result1, result2, result3, setResult1, setResult2, setResult3, showEmail, showSignup, showLogin, loading, download, setShowEmail, setShowSignup, setShowLogin, setLoading, setDownload, aiResult, surveyData, isFromUserProfile, setIsFromUserProfile, setAiResult, setPart2 }: DownloadProps) {
  console.log('download', download);
  console.log('result1', result1);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6; 
  const handleSwipe = (direction: number) => {
   

  setCurrentPage((prev) => {
      const next = prev + direction;
      if (next < 0) return totalPages - 1;
      if (next >= totalPages) return 0;
      return next;
    });

   console.log('currentPage', currentPage);
  };

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


  const handlePreviousClick = () => {
    console.log('handlePreviousClick');
    setResult1(true);
    setDownload(false);
  };


  // const handleDownload = () => {
  //    if (currentPage === 0) {
  //     handleDownload1(surveyData, mbti, isFromUserProfile);
  //    } else if (currentPage === 1) {
  //     handleDownload2(surveyData, mbti, isFromUserProfile);
  //    } else if (currentPage === 2) {
  //     handleDownload3(surveyData, mbti, isFromUserProfile);
  //    } else if (currentPage === 3) {
  //     handleDownload4(surveyData, mbti, isFromUserProfile);
  //    } else if (currentPage === 4) {
  //     handleDownload5(surveyData, mbti, isFromUserProfile);
  //    } else if (currentPage === 5) {
  //     handleDownload6(surveyData, mbti, isFromUserProfile);
  //    }
  // };
  
  return (
    
<>     
       {/* <div className="hidden">
        <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        <DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />
        </div> */}


<div className=" mt-0 md:mt-[100px] h-[40px] md:h-[70px] bg-[#EEF1FA] w-full">

<div className="relative flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px]">
  <button className="inline max-[1056px]:hidden absolute left-1/2 -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px] text-[#C3C3C3] text-[14px]">
    Exit
  </button>
  {/* <p className=" hidden md:flex text-[#27355D] text-[14px]">Result</p> */}

  <div className=" flex flex-row justify-between bg-[#EEF1FA] mx-[20px] md:mx-[24px] w-full max-w-[290px] md:max-w-[740px] h-[10px] rounded-[8px]"> 
    <div className="w-[140px] md:w-[365px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
    <div className="w-[140px] md:w-[365px] ml-[0px] h-full bg-[#5777D0] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
  </div>

  {/* <p className="text-[#27355D] text-[14px] font-[600]">1/3</p> */}
</div>

</div>
    
  
        <motion.div 
          className="relative hidden md:flex  bg-white  w-full h-full md:h-[993px]  flex flex-col items-center justify-center"
         
        >
          
         
          <div className="relative w-full h-full  flex flex-col items-center justify-center">
{/* 
          <div className="absolute hidden md:flex top-[40px] right-[40px]">
            <img 
            src="/exit-icon.svg" 
            alt="email_bg" 
            className="w-[24px] h-[24px] object-cover"
            onClick={() => {
              console.log('download', download);
              setDownload(false);
            }}
             />
          </div> */}
            
            <div className=" absolute top-[20px] left-1/2 transform -translate-x-1/2 text-[20px] font-[Ubuntu] font-[500] text-[#505D90]">
              <h2>Screenshot & Share it with friends!</h2>
            </div>

            <div className=" absolute top-[180px] transform scale-[0.6] left-1/2 -translate-x-1/2 -translate-y-[32%]">
                {currentPage === 0 && <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 1 && <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 2 && <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 3 && <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 4 && <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 5 && < DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
            </div>
            
            <div className="absolute top-[350px] w-[650px] flex flex-row items-center justify-between  z-10">
            <button 
              onClick={() => handleSwipe(-1)}
              className=" rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
            >
              <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
              </svg>

            </button>

            <button 
              onClick={() => handleSwipe(1)}
              className=" right-1/4 rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
            >
              <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>

            </button>
            </div>

          <div className="absolute top-[700px] left-1/2 transform -translate-x-1/2 flex gap-[15px]">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-[7.5px] h-[7.5px] rounded-full ${
                  currentPage === index ? 'bg-[#5777D0]' : 'bg-[#D1D7EF]'
                }`}
              />
            ))}
          </div>


          <div className="absolute top-[750px] left-1/2 transform -translate-x-1/2 flex h-[44px]  flex-row items-center justify-center">
              

              <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white" onClick={handlePreviousClick}>
                  <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
                  </svg>
              <span className="hidden md:flex">Previous</span>
              </button>


             <div className = "w-[82px] h-[17px]  flex items-center justify-center mx-[10px]">
             <p className="text-[14px] font-[Inter] font-[400] text-[#C3C3C3] tracking-[-0.2px]">Follow us on</p>
             </div>

             <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
              <img src="/icon-discord.svg" alt="discord" className="w-[24px] h-[24px]"/>
            </button>

            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center mx-[20px] border-[1px] border-[#C3C3C3]">
            <img src="/icon-ins.svg" alt="instagram" className="w-[24px] h-[24px]"/>
            </button>

            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
            <img src="/icon-facebook.svg" alt="facebook" className="w-[24px] h-[24px]"/>
            </button>
          </div>


        
        </div>

            <div className="hidden md:flex w-full flex justify-center absolute top-[860px]">
            <p className="text-[#000] opacity-[0.5] flex items-center gap-[10px]">
            Powered by 
            <img src="/fursphere-bottom-logo.svg" alt="FurSphere Logo" className="w-[199px]" />
          </p>
            </div>
        </motion.div>
      


{/* mobile */}



<motion.div 
    className="md:hidden mt-0  relative w-full mx-auto h-auto    bg-[#FFFFFF] flex flex-col items-center"
>
  



       
         
         
          <div className="relative  w-full h-full flex flex-col items-center ">
   
            <div className=" mt-[25px] text-[24px] font-[Ubuntu] font-[600] text-[#505D90]">
              <h2>Screenshot & Share it with friends!</h2>
            </div>

         
              <motion.div
                className="w-[800px] h-[1000px] absolute top-[-220px] z-[1] "
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                style={{ scale: 0.4 }}  // Move scale to style prop
                whileDrag={{ scale: 0.38 }}
                onDragEnd={(event, info: PanInfo) => {
                const swipeThreshold = 50;
                const velocity = Math.abs(info.velocity.x);
                const isSwipe = velocity > 200 || Math.abs(info.offset.x) > swipeThreshold;
                
                if (isSwipe) {
                  if (info.offset.x > 0) {
                    handleSwipe(-1);
                  } else {
                    handleSwipe(1);
                  }
                }
              }}
            >
       
              <motion.div>
              {currentPage === 0 && <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 1 && <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 2 && <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 3 && <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 4 && <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 5 && < DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              </motion.div>
         
            </motion.div>
      

         

          <div className="absolute top-[500px] flex gap-[20px]">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-full ${
                  currentPage === index ? 'bg-[#5777D0]' : 'bg-[#D1D7EF]'
                }`}
              />
            ))}
          </div>


     


          <div className="absolute top-[550px] flex flex-row items-center justify-center z-[2]">
            {/* <div className="flex flex-row bg-red-300 items-center justify-center gap-[20px]"> */}
                <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white " onClick={handlePreviousClick}>
                  <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
                  </svg>
                  <span className="hidden md:flex">Previous</span>
                </button>
{/* 
                <button className=" w-[205px] h-[44px]  bg-[#F5F5F5] rounded-[22px] border-[1px] border-[#C3C3C3] text-[16px] font-[600] text-black"
                // onClick={handleDownload}
                  >
                  Screenshot & Share
                </button> */}
            {/* </div> */}
             <div className = " w-[82px] h-[17px] flex items-center justify-center mx-[10px]">
             <p className="text-[14px] font-[Inter] font-[400] text-[#C3C3C3] tracking-[-0.2px]">Follow us on</p>
             </div>
            
            <div className=" flex flex-row items-center justify-center gap-[20px]">
            <a href="https://discord.com/invite/fursphere" target="_blank" rel="noopener noreferrer">
             <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
              <img src="/icon-discord.svg" alt="discord" className="w-[24px] h-[24px]"/>
            </button>
            </a>

            <a href="https://www.instagram.com/fur.sphere?igsh=MWowbXNjdHcxcmU5Mw==" target="_blank" rel="noopener noreferrer">
            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
             <img src="/icon-ins.svg" alt="instagram" className="w-[24px] h-[24px]"/>
            </button>
            </a>


            <a href="https://www.facebook.com/profile.php?id=61573039379213" target="_blank" rel="noopener noreferrer">
            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
            <img src="/icon-facebook.svg" alt="facebook" className="w-[24px] h-[24px]"/>
            </button>
            </a>

            </div>
          </div>
          </div>


        
        {/* </div> */}
       
      
    </motion.div>

</>
)
};