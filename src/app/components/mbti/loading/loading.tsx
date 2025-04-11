import { motion } from 'framer-motion';
import MobileHeader from '../mobile-header';

interface LoadingProps {
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
    setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
    isFromUserProfile: boolean;
    setPart2: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Loading({ step, setStep, setPart1, result1, result2, result3, setResult1, setResult2, setResult3, showEmail, showSignup, showLogin, loading, download, setShowEmail, setShowSignup, setShowLogin, setLoading, setDownload, setIsFromUserProfile, isFromUserProfile, setPart2 }: LoadingProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50 justify-center items-center"
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
      <div className="flex flex-col w-full md:w-[768px] h-full md:h-[563px]">
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
    <style>
    {`
        @keyframes colorChange {
          0%, 10% { background-color: #E5E7EB; }
          11%, 70% { background-color: #5777D0; }
          71%, 100% { background-color: #E5E7EB; }
        }

        @keyframes colorChange2 {
          0%, 25% { background-color: #E5E7EB; }
          26%, 70% { background-color: #5777D0; }
          71%, 100% { background-color: #E5E7EB; }
        }

        @keyframes colorChange3 {
          0%, 40% { background-color: #E5E7EB; }
          41%, 70% { background-color: #5777D0; }
          71%, 100% { background-color: #E5E7EB; }
        }

        .dot-1 {
          animation: colorChange 1.5s infinite;
        }

        .dot-2 {
          animation: colorChange2 1.5s infinite;
        }

        .dot-3 {
          animation: colorChange3 1.5s infinite;
        }
      `}
      </style>
     
        <motion.div 
          className="relative bg-white w-full md:w-[768px] h-full md:h-[563px] rounded-[0px] md:rounded-[22px] flex flex-col items-center justify-center"
        >

        
          <img
            src="/loading.gif" 
            alt="Loading animation"
            className="w-[196px] h-[196px]"
          />
          

        <div className="flex flex-col items-center gap-6">
          {/* Loading animation */}
          <div className="flex items-center gap-4">
            <div 
              className="w-[10px] h-[10px] rounded-full dot-1"
              style={{ backgroundColor: '#E5E7EB' }}
            ></div>
            <div 
              className="w-[10px] h-[10px] rounded-full dot-2"
              style={{ backgroundColor: '#E5E7EB' }}
            ></div>
            <div 
              className="w-[10px] h-[10px] rounded-full dot-3"
              style={{ backgroundColor: '#E5E7EB' }}
            ></div>
          </div>
        </div>
        </motion.div>
      </div>
    </motion.div>
)
};