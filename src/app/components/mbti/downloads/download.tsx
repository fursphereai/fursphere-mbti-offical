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
import { handleDownload2 } from './breakdown-m';
import { handleDownload3 } from './breakdown-b';
import { handleDownload4 } from './breakdown-t';
import { handleDownload5 } from './breakdown-i';
import { handleDownload6 } from './do_not_do';
import { useLoggin } from '@/app/context/LogginContext';
import domtoimage from 'dom-to-image';

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

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let uploadTimeout: NodeJS.Timeout | null = null;
    
    // 设置上传超时（30秒）
    uploadTimeout = setTimeout(() => {
      if (uploadTimeout) {
        clearTimeout(uploadTimeout);
      }
      reject(new Error('Upload timeout: Image upload took too long'));
    }, 30000);

    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      if (uploadTimeout) {
        clearTimeout(uploadTimeout);
      }
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Compression failed: Could not create blob'));
          }
        }, file.type, 0.8);
      };
      
      img.onerror = () => {
        if (uploadTimeout) {
          clearTimeout(uploadTimeout);
        }
        reject(new Error('Image loading failed: Could not load image data'));
      };
    };
    
    reader.onerror = () => {
      if (uploadTimeout) {
        clearTimeout(uploadTimeout);
      }
      reject(new Error('File reading failed: Could not read file data'));
    };
  });
};

const waitForImages = (element: HTMLElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    const images = element.getElementsByTagName('img');
    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;
    let hasError = false;
    let loadTimeout: NodeJS.Timeout | null = null;

    // 设置加载超时（60秒）
    loadTimeout = setTimeout(() => {
      if (!hasError) {
        if (loadTimeout) {
          clearTimeout(loadTimeout);
        }
        reject(new Error('Image loading timeout: Some images took too long to load'));
      }
    }, 60000);

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        if (loadTimeout) {
          clearTimeout(loadTimeout);
        }
        resolve();
      }
    };

    Array.from(images).forEach(img => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.onload = () => {
          checkAllLoaded();
        };
        img.onerror = (error) => {
          hasError = true;
          if (loadTimeout) {
            clearTimeout(loadTimeout);
          }
          console.error('Image loading failed:', {
            src: img.src,
            error: error,
            currentLoaded: loadedCount,
            totalImages: totalImages
          });
          reject(new Error(`Image loading failed: ${img.src}`));
        };
      }
    });
  });
};

export const handleDownload1 = async (
  surveyData: SurveyData, 
  mbti: string, 
  isFromUserProfile: boolean,
  setCurrentPage: (page: number) => void
) => {
  const elementToCapture = document.getElementById('download-1');
  if (!elementToCapture) {
    console.error('Element not found');
    return;
  }

  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      // Set 60 seconds timeout for image loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Image loading timeout')), 60000);
      });

      // Wait for images to load
      const loadPromise = waitForImages(elementToCapture);

      // Use Promise.race to wait for either image loading or timeout
      await Promise.race([loadPromise, timeoutPromise]);
      
      // Add a small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dataUrl = await domtoimage.toPng(elementToCapture, {
        width: 400,
        height: 400,
        quality: 0.8,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          '-webkit-font-smoothing': 'antialiased',
          'text-rendering': 'optimizeLegibility'
        },
        filter: (node: HTMLElement) => {
          if (node.tagName === 'IMG') {
            const img = node as HTMLImageElement;
            if (!img.complete) {
              console.error('Image not loaded:', img.src);
              return false;
            }
          }
          return true;
        }
      });

      const link = document.createElement('a');
      link.download = `${surveyData.pet_info.PetName}-page1.png`;
      link.href = dataUrl;
      link.click();
      return;
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      
      if (retryCount === maxRetries) {
        console.error('All download attempts failed');
        alert('Download failed after multiple attempts. Please try again later.');
        return;
      }
      
      // Wait before retrying (increased to 5 seconds)
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

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




  const handleDownload = () => {
     if (currentPage === 0) {
      handleDownload1(surveyData, mbti, isFromUserProfile, setCurrentPage);
     } else if (currentPage === 1) {
      handleDownload2(surveyData, mbti, isFromUserProfile);
     } else if (currentPage === 2) {
      handleDownload3(surveyData, mbti, isFromUserProfile);
     } else if (currentPage === 3) {
      handleDownload4(surveyData, mbti, isFromUserProfile);
     } else if (currentPage === 4) {
      handleDownload5(surveyData, mbti, isFromUserProfile);
     } else if (currentPage === 5) {
      handleDownload6(surveyData, mbti, isFromUserProfile);
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
            isFromUserProfile={isFromUserProfile}
            setPart2={setPart2}
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
        </motion.div>
      
    </motion.div>

</>
)
};