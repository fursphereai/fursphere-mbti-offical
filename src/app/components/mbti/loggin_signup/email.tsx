import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '../submit_result'; 
import { getResult } from '../get_result';
import { truncate } from 'fs';
import MobileHeader from '../mobile-header';
import { SurveyData } from '@/app/types/survey';
import Loading from '../loading/loading';
import download from '../downloads/download';
import { getUserInfo } from '../get_user_info';
import { checkingTestTimes } from '../checking_test_times';
import { checkingSignup } from '../checking_signup';



interface EmailProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
  surveyData: SurveyData;
  aiResult: any;
  setAiResult: React.Dispatch<React.SetStateAction<any>>;
  setResult1: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  step: number;
  setPart1: React.Dispatch<React.SetStateAction<boolean>>;
  result1: boolean;
  result2: boolean;
  result3: boolean;
  setResult2: React.Dispatch<React.SetStateAction<boolean>>;
  setResult3: React.Dispatch<React.SetStateAction<boolean>>;
  showEmail: boolean;
  showSignup: boolean;
  showLogin: boolean;
  download: boolean;
  setDownload: React.Dispatch<React.SetStateAction<boolean>>;
  updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string | File) => void;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isFromUserProfile: boolean;
}


 export default function Email({ handleNext, setStep, setShowSignup, setShowLogin, setShowEmail, surveyData, aiResult, setAiResult, setResult1, setResult2, setResult3, step, setPart1, result1, result2, result3, showEmail, showSignup, showLogin, setIsLoading, isLoading, download, setDownload, updateAnswer, setUserInfo, setIsFromUserProfile, isFromUserProfile }: EmailProps) {

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [showInvalidEmail, setShowInvalidEmail] = useState(false);
    const [showBlankEmail, setShowBlankEmail] = useState(false);
    const [showEmailUsed, setShowEmailUsed] = useState(false);
    const [showEmailRegistered, setShowEmailRegistered] = useState(false);
    

    const [sendingCode, setSendingCode] = useState(false);
    const [checking, setChecking] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [error, setError] = useState<string>('');
    const [isValidated, setIsValidated] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const [inputCode, setInputCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);


    const [localLoading, setLocalLoading] = useState(false);
   


    useEffect(() => {
      console.log("surveyData changed:", surveyData);
  }, [surveyData]);

    const validateEmail = (email: string) => {
        if (!email) return true; // Return true for empty input
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setShowInvalidEmail(false);
       setShowBlankEmail(false);
       setShowEmailUsed(false);
       setShowEmailRegistered(false);
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
      
    
        if (validateEmail(newEmail) && newEmail !== '') {
          console.log("newEmail" + newEmail);
          checkEmailAvailability(newEmail);
          // setIsEmailAvailable(true);
    
      } 
      };


      const checkEmailAvailability = async (email: string) => {
        try {
            const response = await checkingTestTimes(email);
            const response2 = await checkingSignup(email);
            console.log("airai" + JSON.stringify(response));
            console.log("checkingTestTimes" + JSON.stringify(response));

          if (JSON.stringify(response).includes('1') ) {
      
            setChecking(true);
            setShowEmailUsed(true);
            console.log("surveyData" + JSON.stringify(surveyData));
          } else if (JSON.stringify(response2).includes('true')) {
            setChecking(true);
            setShowEmailRegistered(true);
         
     
          } else  {
            setChecking(true);
            
            setEmailAvailable(false);
          }
        } catch (error) {
            console.error('Error checking email:', error);
        } finally {
            setChecking(false);
            console.log("isChecking" + checking);
        }
      };




const GetAiResult = async (surveyData: SurveyData) => {
  
  try {

    const response = await handleSubmit(surveyData);
    console.log('response', response);
  
    
    if (response) {
  
      const resultData = await getResult(response.submission_id);
      setAiResult(JSON.stringify(resultData));
      console.log("resultData" + JSON.stringify(resultData));
  
      
    } else {
      console.error('Submission failed');
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
  } 
};




    const validateAndSubmit = async () => {
        // ... existing validation code ...
        if (email && !emailValid) {
          setShowInvalidEmail(true);
          return;
        } else if (!email) {
          setShowBlankEmail(true);
          return;
        };
   
        try {
            
            const updatedSurveyData = {
                ...surveyData,
                user_info: {
                    ...surveyData.user_info,
                    email: email,
                    test_times: (surveyData.user_info.test_times || 0) + 1
                }
            };

            updateAnswer('user_info', null, 'email', email);
            console.log('email', email);
            setIsLoading(true);
            setShowEmail(false);
            await GetAiResult(updatedSurveyData);
            setResult1(true);
            setIsLoading(false); 
            updateAnswer('user_info', null, 'test_times', String((surveyData.user_info.test_times || 0) + 1));
            console.log('surveyData 12121211', surveyData);
            console.log("surveyData" + JSON.stringify(surveyData));
            console.log('Validation successful');
        } catch (error) {
            setError('Failed to validate. Please try again.');
        } finally {
            setIsValidating(false);
          
        }
    };






  

return (
<>   
  

   
    <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
    >
     


      <motion.div  className="relative bg-white w-full md:w-[768px] h-full md:h-[563px] rounded-[0px] md:rounded-[22px] flex flex-col"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.3
          }}>

          <div className="md:hidden">
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
            loading={isLoading}
            download={download}
            setShowEmail={setShowEmail}
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setLoading={setIsLoading}
            setDownload={setDownload}
            setIsFromUserProfile={setIsFromUserProfile}
            isFromUserProfile = {isFromUserProfile}
            />
          </div>

          <div className="absolute hidden md:flex top-[40px] right-[40px]">
            <img 
            src="/exit-icon.svg" 
            alt="email_bg" 
            className="w-[24px] h-[24px] object-cover"
            onClick={() => {
              setShowEmail(false);
            }}
             />
          </div>

        <div className="flex flex-col items-center justify-center w-auto h-auto mt-[40px] md:mt-[80px]">

          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[500] text-[#505D90] leading-[38.4px] md:leading-[57.6px]">
            <h2>🐾</h2>
          </div>
          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[600] text-[#505D90] leading-[38.4px] md:leading-[57.6px] line-height-[38.4px] md:line-height-[57.6px] tracking-[-1.28px] md:tracking-[-1.92px]">
            <h2>One step away!</h2>
          </div>
          <div className="mt-[20px] text-center max-w-[320px] md:max-w-none text-[16px] font-[Inter] font-[400] text-[#101828] leading-[19px]">
            <h2>Uncover your pet's secret personality by entering your email! 🥰</h2>
          </div>
          <div className="relative w-full flex flex-col items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className= {`
              w-[320px] md:w-[306px] 
              h-[44px]
              mt-[40px] md:mt-[20px]
              py-[12px] pl-[12px] 
              border border-[1px] 
              rounded-[22px]
              bg-white
              font-[Inter]
              text-[16px] text-[#27355D] font-[400]
              focus:outline-none
              placeholder:[#C3C3C3] 
              placeholder:text-[16px] 
              ${showInvalidEmail || showBlankEmail
                ? 'border-[#E35C5C]'
                : 'border-[#717680]'}
              `}
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setEmailValid(validateEmail(email) || email === '')}
            required
          />

     

         {showEmailUsed && (
                <div className="absolute top-[92px] md:top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                      *Used email. Please try a new one or 
                      <span 
                        className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up.
                      </span>
                </div>
          )}


          {showEmailRegistered && (
                <div className="absolute top-[92px] md:top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                      *Email is already registered. Please
                      <span 
                        className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in.
                      </span>
                </div>
          )}


          {showInvalidEmail && (
            <div className="absolute top-[92px] md:top-[72px] flex items-center justify-center w-full text-[#E35C5C] text-[14px] font-[Inter]">
              *Invalid email. Please enter a valid email address.
            </div>
          )}

          {showBlankEmail && (
            <div className="absolute top-[92px] md:top-[72px] flex items-center justify-center w-full text-[#E35C5C] text-[14px] font-[Inter]">
              *Please enter a valid email address.
            </div>
          )}

          </div>

          <div className="mt-[40px] text-[16px] font-[Inter] font-[400] text-[#717680] leading-[19.2px] line-height-[19.2px] w-[306px] flex flex-row items-start gap-2">
            <span>•</span>
            <h2>A copy of test result will be sent to your email</h2>
          </div>
          
          <div className=" absolute  bottom-[48px] w-[145px] h-[44px] "
          onClick={validateAndSubmit}>
            <button className="md:bottom-none w-full h-full rounded-[22px] bg-[#5777D0] flex items-center justify-center">
              <h2 className="text-[16px] font-[Inter] font-[600] text-white">Get Result</h2>
            </button>
          </div>
          
          {/* destop version */}
          <div className="hidden md:flex text-center mt-[20px] max-w-[468px] w-full text-[14px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[22.4px] flex flex-col items-center">
            *Each email address can access the test result only once. 
            <div className="flex flex-row items-start gap-1">
            Want deeper insights and unlimited tests? 
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up
            </span>
            or
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in
            </span>
            now.
            </div>
          </div>

          {/* mobile version */}
          <div className="md:hidden absolute bottom-[124px] max-w-[242px] text-center w-full text-[14px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[16.8px] flex flex-col items-center">
            *Each email address can access the<br />
            test result only once. 
            <br />
            Want deeper insights and unlimited  
            <div className="flex flex-row items-start gap-1">
            tests? 
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up
            </span>
            or
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in
            </span>
            now.
            </div>
          </div>
          </div>

      </motion.div>
    </motion.div>
  </>
);
}