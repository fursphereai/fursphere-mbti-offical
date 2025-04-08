"use client";
import { toast } from "react-hot-toast";

interface MobileHeaderProps {
  step: number;
  setStep: (step: number) => void;
  setPart1: (part1: boolean) => void;
  result1: boolean;
  result2: boolean;
  result3: boolean;
  setResult1: (result1: boolean) => void;
  setResult2: (result2: boolean) => void;
  setResult3: (result3: boolean) => void;
  showEmail: boolean;
  showSignup: boolean;
  showLogin: boolean;
  loading: boolean;
  download: boolean;
  setShowEmail: (showEmail: boolean) => void;
  setShowSignup: (showSignup: boolean) => void;
  setShowLogin: (showLogin: boolean) => void;
  setLoading: (loading: boolean) => void;
  setDownload: (download: boolean) => void;
  setIsFromUserProfile: (isFromUserProfile: boolean) => void;
  isFromUserProfile: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ step, setStep, setPart1, result1, result2, result3, setResult1, setResult2, setResult3, showEmail, showSignup, showLogin, loading, download, setShowEmail, setShowSignup, setShowLogin, setLoading, setDownload, setIsFromUserProfile, isFromUserProfile }) => {
    const handleShare = async () => {
        try {
           console.log('copying link');
           await navigator.clipboard.writeText(window.location.href);
           console.log('link copied');
        toast.success('copied to clipboard!', {
            duration: 2000,
            position: 'bottom-center',
            style: {
            background: 'white',
            color: 'black',
            padding: '16px',
            borderRadius: '10px',
            },
        
          });
        } catch (err) {
          console.error('Failed to copy link:', err);
          toast.error('Failed to copy link', {
            duration: 2000,
            position: 'bottom-center',
            style: {
              background: '#f44336',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
            },
          });
        }
    };

  return (
    <div className="
      h-[56px]
      bg-white
      border-b-[0.8px] border-[#C9C9C9]
      flex items-center justify-between
      px-[20px]
    "> 
    <button className="w-[24px] h-[24px]"
    onClick={() => {
     console.log('resetting', showEmail);
      if (showEmail === true) {
        setShowEmail(false);
      }
      if (showSignup === true) {
        setShowSignup(false);
      }
      if (showLogin === true) {
        setShowLogin(false);
      } if (download === true) {
        setDownload(false);
      } if (loading === true) {
        setLoading(false);
      } if (!showEmail && !showSignup && !showLogin && !download && !loading) {
        setStep(0);
        setPart1(false);
        setResult1(false);
        setResult2(false);
        setResult3(false);
        setIsFromUserProfile(false);
      }
    }}
    >
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g opacity="0.7">
        <path d="M20 4L4 20M4 4L20 20" stroke="#27355D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
       </svg> 
       
    </button>
      <h1 className="text-[16px] font-[400]  text-[Inter] text-[#101828]">
      {download ? 'Result Poster' :
        (result1 || result2 || result3) ? 'Test Result' :
        (showEmail || showSignup || showLogin) ? 'Get Result' :
        loading ? 'Getting Result' :
        'Pet MBTI Test'}
      </h1>
       <button className="w-[24px] h-[24px]"
        onClick={handleShare}>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

        <g opacity="0.7">
        <path d="M8.7 10.7L15.3 7.3M8.7 13.3L15.3 16.7M3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79565 15 7.55871 14.6839 8.12132 14.1213C8.68393 13.5587 9 12.7956 9 12C9 11.2044 8.68393 10.4413 8.12132 9.87868C7.55871 9.31607 6.79565 9 6 9C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12ZM15 6C15 6.79565 15.3161 7.55871 15.8787 8.12132C16.4413 8.68393 17.2044 9 18 9C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6ZM15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18Z" stroke="#27355D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
       </svg>
      </button>
    </div>
  );
};

export default MobileHeader;


