import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import MobileHeader from '../mobile-header';
import { getResult } from '../get_result';
import { handleSubmit } from '../submit_result';
import { SurveyData } from '@/app/types/survey';
import { checkingSignup } from '../checking_signup';

interface SignupProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDownload: React.Dispatch<React.SetStateAction<boolean>>;
  setAiResult: React.Dispatch<React.SetStateAction<string>>;
  aiResult: string;
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isFromUserProfile: boolean;
  updateAnswer: (
    category: keyof SurveyData, 
    subCategory: any, 
    field: string, 
    value: string | File
  ) => void;
  setPart2: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ handleNext, setStep, setShowSignup, setShowLogin, setShowEmail, step, setPart1, result1, result2, result3, setResult1, setResult2, setResult3, showEmail, showSignup, showLogin, loading, download, setLoading, setDownload, setAiResult, aiResult, surveyData, setSurveyData, updateAnswer, setIsFromUserProfile, isFromUserProfile, setPart2 }: SignupProps): JSX.Element {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupEmailValid, setSignupEmailValid] = useState(false);
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [showBlankEmail, setShowBlankEmail] = useState(false);
  const [showEmailAssociated, setShowEmailAssociated] = useState(false);
  const [showIncorrectCode, setShowIncorrectCode] = useState(false);
  
  const [signupSendingCode, setSignupSendingCode] = useState(false);
  const [signupChecking, setSignupChecking] = useState(false);
  const [signupEmailAvailable, setSignupEmailAvailable] = useState(false);
  const [signupError, setSignupError] = useState<string>('');
  const [signupIsValidated, setSignupIsValidated] = useState(false);
  const [signupIsValidating, setSignupIsValidating] = useState(false);

  const [signupInputCode, setSignupInputCode] = useState('');
  const [signupVerificationCode, setSignupVerificationCode] = useState('');

  const [signupCodeSent, setSignupCodeSent] = useState(false);

  const [signupIsSubmitting, setSignupIsSubmitting] = useState(false);

 
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //empty the codesending / submitting state
    setShowInvalidEmail(false);
    setShowBlankEmail(false);
    setSignupIsSubmitting(false);
    setSignupSendingCode(false);
    setShowEmailAssociated(false);
    //
    const newEmail = e.target.value;
    setSignupEmail(newEmail);
    setSignupEmailValid(validateEmail(newEmail));
  
    if (validateEmail(newEmail) && newEmail !== '') {
      console.log("newEmail" + newEmail);
      checkEmailAvailability(newEmail);
      // setIsEmailAvailable(true);
    } 
  };

        const validateEmail = (email: string) => {
            if (!email) return true; // Return true for empty input
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email.trim());
        };

        const checkEmailAvailability = async (email: string) => {
            try {
              console.log("airai email" + email);
              const response = await checkingSignup(email);
              
              console.log("airai" + JSON.stringify(response));
            if (JSON.stringify(response).includes('true')) {
                setShowEmailAssociated(true);
                setSignupChecking(true);
                setSignupEmailAvailable(true);
            } else {
                setSignupChecking(true);

            
                setSignupEmailAvailable(false);
       
            }
            } catch (error) {
            console.error('Error checking email:', error);
            } finally {
            setSignupChecking(false);
            console.log("isChecking" + signupChecking);
            }
        };

// send code button
const handleSendCode = async () => {
    setSignupSendingCode(true);
    if (!signupCanResend) return;

    if (signupCanResend && signupEmail && !signupEmailValid) {
        setShowInvalidEmail(true);
        return;
        } else if (signupCanResend && !signupEmail) {
        setShowBlankEmail(true);
        return;
        }
    
    
    try {
   
        setSignupCanResend(false);
        sendVerificationCode();
        setSignupCountdown(60);
         
    } catch (error) {
        console.error('Error:', error);
        setSignupCanResend(true);
        setSignupCountdown(60);
        setSignupSendingCode(false);
    }
};

        


        const sendVerificationCode = async () => {
            console.log("signupEmail" + signupEmail);

            try {
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                setSignupVerificationCode(code);

                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'send_verification',
                        email:signupEmail,
                        code,
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

                setSignupCodeSent(true);
            } catch (error: any) {
                console.error('Error sending code:', error);
            
                setSignupCodeSent(false);
            } finally {
            
            }
        };



        //count down 60s
        const [signupCountdown, setSignupCountdown] = useState(60);
        const [signupCanResend, setSignupCanResend] = useState(true);

        // Handle countdown
        useEffect(() => {
            let timer: NodeJS.Timeout;
            
            if (signupCountdown > 0) {
                console.log(`Countdown: ${signupCountdown}`);
                timer = setInterval(() => {
                    setSignupCountdown((prevCount) => {
                        if (prevCount <= 1) {
                            setSignupCanResend(true);
                            return 0;
                        }
                        return prevCount - 1;
                    });
                }, 1000);
            }

            return () => {
                if (timer) clearInterval(timer);
            };
        }, [signupCountdown]);


  const GetAiResult = async (surveyData: SurveyData) => {

    try {
  
      const response = await handleSubmit(surveyData);
    
      
      if (response) {
    
        const resultData = await getResult(response.submission_id);
        setAiResult(JSON.stringify(resultData));
        console.log("resultData" + JSON.stringify(resultData));
        setResult1(true);
        
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } 
  };
        


const validateAndSubmit = async () => {
    // ... existing validation code ...

    console.log("surveyData" + JSON.stringify(surveyData));
    setSignupIsSubmitting(true);

    if (signupEmail && !signupEmailValid) {
        console.log('testing' + signupIsSubmitting)
        setShowInvalidEmail(true);

        return;
      } else if (!signupEmail) {
        setShowBlankEmail(true);
        return;
      };
    
    try {
    
      if (signupInputCode === signupVerificationCode && signupInputCode.length == 6) {

      const updatedSurveyData = {
          ...surveyData,
          user_info: {
              ...surveyData.user_info,
              email: signupEmail,
              email_signup_time: new Date().toISOString(),
              signup: true,
              test_times: 1
          }
      };
      
      updateAnswer('user_info', null, 'email', signupEmail);
      updateAnswer('user_info', null, 'signup', 'true');
      setLoading(true);
      setShowSignup(false);
      await GetAiResult(updatedSurveyData);
      updateAnswer('user_info', null, 'test_times', '1');
      updateAnswer('user_info', null, 'test_date', String(new Date().toLocaleString()));
      setLoading(false); 
      console.log("surveyData" + JSON.stringify(surveyData));
      console.log('Validation successful');

      } else {
        setShowIncorrectCode(true);
        setSignupIsValidated(false);
        setSignupError('Incorrect verification code.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSignupError('Failed to validate. Please try again.');
    } finally {
      setSignupIsValidating(true);
    }
  };

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
      <motion.div className= {`relative bg-white rounded-[0px] md:rounded-[22px] w-full md:w-[768px] h-full  transition-[height] duration-300 ease-in-out ${
        ((showInvalidEmail || showBlankEmail || showEmailAssociated) && showIncorrectCode)
        ? 'md:h-[673px]' 
        : (showInvalidEmail || showBlankEmail || showEmailAssociated || showIncorrectCode)
          ? 'md:h-[658px]' 
          : 'md:h-[633px]'
      }`}

      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.3
          }}>

          {/* <div className="md:hidden">
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
          </div> */}

           <div className="absolute hidden md:flex top-[40px] right-[40px]">
            <img 
            src="/exit-icon.svg" 
            alt="email_bg" 
            className="w-[24px] h-[24px] object-cover"
            onClick={() => {
              setShowSignup(false);
            }}
             />
          </div>

        <div className="flex flex-col items-center justify-center w-auto h-auto mt-[80px]">
          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[500] text-[#505D90] leading-[38.4px] md:leading-[48px]">
            <h2>🐾</h2>
          </div>
          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[600] text-[#505D90] leading-[38.4px] md:leading-[57.6px] line-height-[38.4px] md:line-height-[57.6px] tracking-[-1.28px] md:tracking-[-1.92px]">
            <h2>Sign up & get result!</h2>
          </div>

          <div className="text-center mt-[20px] max-w-[320px] md:max-w-none  text-[16px] font-[Inter] font-[400] text-[#101828] leading-[19.2px]">
            <h2>Register in just 60 seconds and unlock all following benefits! 🥰</h2>
          </div>

          <div className="relative max-w-[467px] w-full flex flex-row items-center justify-center gap-[12px]">
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
                ${!signupEmailValid && signupEmail !== '' && showInvalidEmail && 
                    (signupSendingCode ||  signupIsSubmitting) 
                  ? 'border-[#E35C5C]' 
                  : signupEmail == '' && showBlankEmail && (signupSendingCode ||  signupIsSubmitting) 
                    ? 'border-[#E35C5C]'
                    : 'border-[#717680]'}
                `}
              value={signupEmail}
              onChange={handleEmailChange}
              onBlur={() => setSignupEmailValid(validateEmail(signupEmail) || signupEmail === '')}
              required
            />

            <button className= {`hidden md:flex mt-[20px] w-[149px] h-[44px] rounded-[22px] 
              ${!signupCanResend ? 'bg-[#C3C3C3]' : 'bg-[#5777D0]'} 
              flex items-center justify-center 
              text-[16px] font-[Inter] font-[600] text-white
              `}
              onClick={handleSendCode}
            >
              {!signupCanResend 
            ?  `${signupCountdown}`  
            : 
                'Send Code'}
            </button>
{/* 
            {signupChecking && (
                    <div className="mt-2 text-gray-500 text-sm font-[Inter] flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Checking email availability...
                    </div>
            )} */}

          </div>



          {showInvalidEmail && (
              <div className=" mt-[8px] ml-[0px] md:ml-[300px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
                *Invalid email. Please enter a valid email address
              </div>
            )}

          {showBlankEmail && (
              <div className=" mt-[8px] ml-[0px] md:ml-[300px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
                *Please enter a valid email address
              </div>
            )}



          { showEmailAssociated && (
            <div className="hidden md:flex flex-col mt-[8px] items-center justify-center max-w-[467px] w-full text-[#5777D0] text-[14px] font-[Inter] leading-[14px]">
                    <div className=" w-full flex flex-row justify-start items-center">
                    Oops, this email is already associated with an account. You can keep 
                    </div>

                    <div className="w-full flex flex-row justify-start items-center gap-1">
                    request a verification code to 
                    <span 
                        className=" "
                        onClick={() =>
                            {}
                        }
                        > 
                        Log in
                        </span>
                        here or try a different one.
                    </div>
            </div>  ) 
            
        }

          {showEmailAssociated && (
            <div className="flex md:hidden flex-col mt-[8px] items-center justify-center max-w-[320px] w-full text-[#5777D0] text-[14px] font-[Inter] leading-[14px]">
                    <div className=" w-full flex flex-row justify-start items-center">
                    Oops, this email is already associated with an account. You can keep request a verification 
                    </div>

                    <div className="w-full flex flex-row justify-start items-center gap-1">
                    code to 
                    <span 
                        className=""
                        onClick={() =>
                            {}
                        }
                        > 
                        Log in
                        </span>
                        here or try a different one.
                    </div>
            </div>  ) 
            
          }


          <div className = "flex flex-col w-[320px] md:w-[467px]  items-start justify-center">
            <div className="flex flex-row  w-[320px] md:w-[467px] items-center justify-between">
              <button className= {`md:hidden mt-[20px] w-[116px] h-[44px] rounded-[22px] 
                ${!signupCanResend ? 'bg-[#C3C3C3]' : 'bg-[#5777D0]'} 
                flex items-center justify-center 
                text-[16px] font-[Inter] font-[600] text-white
                `}
                onClick={handleSendCode}
              >
                {!signupCanResend 
              ?  `${signupCountdown}`  
              : 
                  'Send Code'}
              </button>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                className= {`
                  w-[194px] md:w-[467px] 
                  h-[44px]
                  mt-[20px]
                  py-[12px] pl-[12px] 
                  border border-[1px] 
                  rounded-[22px]
                  bg-white
                  font-[Inter]
                  text-[16px] text-[#27355D] font-[400]
                  focus:outline-none
                  placeholder:[#C3C3C3] 
                  placeholder:text-[16px] 
                  ${signupError ? 'border-red-500' : 'border-[#717680]'}
                  `}
                  value={signupInputCode}
                  onChange={(e) => {
                      setShowIncorrectCode(false);
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 6) {
                          setSignupIsValidating(false);
                          setSignupInputCode(value);
                          setSignupError('');
                      }
                  }}
                  maxLength={6}
              />

           
           </div>
           {showIncorrectCode && (
              <div className="mt-[8px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
                *Incorrect verification code.
              </div>
           )}

            <div className="mt-[40px] text-[16px] font-[Inter] font-[400] text-[#717680] leading-[19.2px] line-height-[16px] w-[284px] flex flex-col items-start gap-[10px]">
              <h2>• Test result with exclusive insights</h2>
              <h2>• Unlimited tests</h2>
              <h2>• Tests history save to your account</h2>
              <h2>• Unlock Pawfect Match test</h2>
            </div>

          </div>
         
          <button className="absolute md:static bottom-[48px] md:bottom-auto mt-[40px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center"
          onClick={validateAndSubmit}
        //   disabled={signupIsValidating || !signupEmail || !signupEmailValid || !signupCodeSent || !signupInputCode}
          >
            <h2 className="text-[16px] font-[Inter] font-[600] text-white">
             Get Result
            </h2>
          </button>
         
         
        </div>
      </motion.div>
    </motion.div>
  );
}
  