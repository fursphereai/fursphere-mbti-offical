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
import { handleDownload1 } from './downloadpage1';
import { handleDownload2 } from './breakdown-m';
import { handleDownload3 } from './breakdown-b';
import { handleDownload4 } from './breakdown-t';
import { handleDownload5 } from './breakdown-i';
import { handleDownload6 } from './do_not_do';
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
}

export default function Download({ step, setStep, setPart1, result1, result2, result3, setResult1, setResult2, setResult3, showEmail, showSignup, showLogin, loading, download, setShowEmail, setShowSignup, setShowLogin, setLoading, setDownload, aiResult, surveyData, isFromUserProfile, setIsFromUserProfile }: DownloadProps) {
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




  const handleDownload = () => {
    
      handleDownload1(surveyData, mbti, isFromUserProfile);
      handleDownload2(surveyData, mbti, isFromUserProfile);
      handleDownload3(surveyData, mbti, isFromUserProfile);
      handleDownload4(surveyData, mbti, isFromUserProfile);
      handleDownload5(surveyData, mbti, isFromUserProfile);
      handleDownload6(surveyData, mbti, isFromUserProfile);
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
    <motion.div 
      className="hidden md:flex fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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

   
        <motion.div 
          className="relative bg-white w-full md:w-[768px] h-full md:h-[563px] rounded-[0px] md:rounded-[22px] flex flex-col items-center justify-center"
         
        >
          
         
          <div className="relative w-full h-full  rounded-[22px] flex flex-col items-center justify-center">

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
          </div>
            
            <div className=" absolute top-[40px] left-1/2 transform -translate-x-1/2 text-[20px] font-[Ubuntu] font-[500] text-[#505D90]">
              <h2>Share it with friends!</h2>
            </div>

            <div className=" absolute top-[80px] transform scale-[0.35] left-1/2 -translate-x-1/2 -translate-y-[32%]">
                {currentPage === 0 && <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 1 && <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 2 && <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 3 && <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 4 && <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {currentPage === 5 && < DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {/* {currentPage === 1 && <DownloadPage2 />}
                {currentPage === 2 && <DownloadPage3 />}
                {currentPage === 3 && <DownloadPage4 />}
                {currentPage === 4 && <DownloadPage5 />}
                {currentPage === 5 && <DownloadPage6 />} */}
            </div>

          <button 
            onClick={() => handleSwipe(-1)}
            className="absolute left-[176px] top-11/25 rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
          >
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
            </svg>

          </button>

          <button 
            onClick={() => handleSwipe(1)}
            className="absolute right-[176px] top-11/25 rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
          >
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
            </svg>

          </button>

          <div className="absolute bottom-[103px] left-1/2 transform -translate-x-1/2 flex gap-[15px]">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-[7.5px] h-[7.5px] rounded-full ${
                  currentPage === index ? 'bg-[#5777D0]' : 'bg-[#D1D7EF]'
                }`}
              />
            ))}
          </div>


          <div className="absolute bottom-[39px] left-1/2 transform -translate-x-1/2 flex h-[44px]  flex-row items-center justify-center">
            <button className="w-[147px] h-[44px] bg-[#5777D0] rounded-[22px] flex items-center justify-center"
            onClick={handleDownload}
            >
              <p className="text-[17px] font-[Inter] font-[600] text-[#FFFFFF]">Download</p>
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
        </motion.div>
      
    </motion.div>

{/* mobile */}

<motion.div 
      className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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


        <motion.div 
          className="relative  bg-white w-full h-full rounded-[0px] flex flex-col"
        >

         <div className="md:hidden z-[2]">
            <MobileHeader
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
            loading={loading}
            download={download}
            setShowEmail={setShowEmail}
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setLoading={setLoading}
            setDownload={setDownload}
            setIsFromUserProfile={setIsFromUserProfile}
            />
          </div>  
         
         
          <div className="relative  w-full h-full flex flex-col items-center ">
   
            <div className=" mt-[20px] text-[24px] font-[Ubuntu] font-[600] text-[#505D90]">
              <h2>Share it with friends!</h2>
            </div>

            <motion.div 
             className=" absolute top-[91px] transform  left-1/2 -translate-x-1/2 -translate-y-[32%] z-[1] "
             style={{ touchAction: 'none' }} // Prevents default touch behaviors
            >
              <motion.div
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
              <AnimatePresence mode="wait">
              <motion.div>
              {currentPage === 0 && <DownloadPage1 aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 1 && <BreakdownM aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 2 && <BreakdownB aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 3 && <BreakdownT aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 4 && <BreakdownI aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
              {currentPage === 5 && < DoNotDo aiResult={aiResult} surveyData={surveyData} isFromUserProfile={isFromUserProfile} />}
                {/* {currentPage === 1 && <DownloadPage2 />}
                {currentPage === 2 && <DownloadPage3 />}
                {currentPage === 3 && <DownloadPage4 />}
                {currentPage === 4 && <DownloadPage5 />}
                {currentPage === 5 && <DownloadPage6 />} */}
              </motion.div>
              </AnimatePresence>
            </motion.div>
            </motion.div>

          {/* <button 
            onClick={() => handleSwipe(-1)}
            className="absolute left-[176px] top-1/2 rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
          >
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
            </svg>

          </button> */}

          {/* <button 
            onClick={() => handleSwipe(1)}
            className="absolute right-[176px] top-1/2 rounded-[22px] w-[44px] h-[44px] bg-[#5777D0] z-10"
          >
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
            </svg>

          </button> */}

          <div className="mt-[437px] flex gap-[20px]">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-full ${
                  currentPage === index ? 'bg-[#5777D0]' : 'bg-[#D1D7EF]'
                }`}
              />
            ))}
          </div>


          <div className="mt-[30px] flex flex-col  flex-row items-center justify-center z-[2]">
            <button className="w-[147px] h-[44px] bg-[#5777D0] rounded-[22px] flex items-center justify-center"
            onClick={handleDownload}
            >
              <p className="text-[17px] font-[Inter] font-[600] text-[#FFFFFF]">Download</p>
            </button>
             <div className = "mt-[10px] w-[82px] h-[17px] flex items-center justify-center mx-[10px]">
             <p className="text-[14px] font-[Inter] font-[400] text-[#C3C3C3] tracking-[-0.2px]">Follow us on</p>
             </div>
            
            <div className="mt-[10px] flex flex-row items-center justify-center gap-[20px]">
             <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
              <img src="/icon-discord.svg" alt="discord" className="w-[24px] h-[24px]"/>
            </button>

            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
            <img src="/icon-ins.svg" alt="instagram" className="w-[24px] h-[24px]"/>
            </button>

            <button className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[22px] flex items-center justify-center border-[1px] border-[#C3C3C3]">
            <img src="/icon-facebook.svg" alt="facebook" className="w-[24px] h-[24px]"/>
            </button>
            </div>
          </div>


        
        </div>
        </motion.div>
      
    </motion.div>

</>
)
};