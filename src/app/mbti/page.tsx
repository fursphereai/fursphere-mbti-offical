"use client";

import ProgressBar from '../components/mbti/ProgressBar';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import StartScreen from '../components/mbti/basic_info/startscreen'
import Part1 from '../components/mbti/basic_info/part1';
import SpecieBreed from '../components/mbti/basic_info/specie_breed'
import Gender from '../components/mbti/basic_info/gender';
import Age from '../components/mbti/basic_info/age';
import NamePhoto from '../components/mbti/basic_info/name_photo';
import Part2 from '../components/mbti/behavioral_quiz/part2';
import Result1 from '../components/mbti/result/result1';
import Result2 from '../components/mbti/result/result2';
import Result3 from '../components/mbti/result/result3';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveyData } from '../types/survey';
import {useLoggin} from '../context/LogginContext'
import DownloadPage1 from '../components/mbti/downloads/downloadpage1';
import Breakdown from '../components/mbti/downloads/breakdown-m';
import Loading from '../components/mbti/loading/loading';
import MobileHeader from '../components/mbti/mobile-header';
import Download from '../components/mbti/downloads/download';
import UserProfile from '../components/user-profile';


const PetMBTIFlow = () => {

  const { loggin, setLoggin } = useLoggin();
  const initialStep = 0; 
  const [step, setStep] = useState(initialStep);

  useEffect(() => {


    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step !== undefined) {
        setStep(event.state.step);
      } else {
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // step 改变时，更新 URL 和 localStorage
    window.history.replaceState({ step }, '', `?step=${step}`);
    localStorage.setItem('currentStep', step.toString());
  }, [step]);




  const [surveyData, setSurveyData] = useState<SurveyData>({
    user_info: {
      name: '',
      email: '',
      ip: '',
      mbti: '',
      test_times: 0,
      test_date: '',
      signup: false,
      email_signup_time: ''
    },
    pet_info: {
      PetSpecies: '',
      PetBreed: '',
      PetBreedCustom: '',
      PetGender: '',
      PetAge: '',
      PetName: '',
      PetPhoto: '',
      PetPublicUrl: '',
    },
    personality_and_behavior: {
      Energy_Socialization: {
        seek_attention: '',
        friend_visit_behaviors: '',
        react_new_friend: '',
      },
      Routin_Curiosity: {
        interact_with_toys: '',
        fur_care_7days: '',
        react_new_environment: '',   
      },
      Decision_Making: {
        stranger_enter_territory: '',
        react_when_sad: '',
        respond_to_scold: '',   
      },
      Structure_Spontaneity: {
        prefer_routine: '',
        toy_out_of_reach: '',
        follow_commands: '',
      },
    }
  });


  const updateAnswer = <
  T extends keyof typeof surveyData,
  K extends keyof typeof surveyData[T]
    >(
      category: T,
      subCategory: K | null,
      field: keyof typeof surveyData[T] | string,
      value: string | File
    ) => {
      setSurveyData(prev => ({
        ...prev,
        [category]: subCategory
          ? {
              ...prev[category],
              [subCategory]: {
                ...prev[category][subCategory as keyof typeof surveyData[T]],
                [field]: value
              }
            }
          : {
              ...prev[category],
              [field]: value
            }
      }));
      console.log(surveyData);
};

const handleNext = () => {
  const nextStep = step + 1;
  window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
  setStep(nextStep);
};
const handleSkip = () => {
  const nextStep = step + 1;
  window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
  setStep(nextStep);
};

const handleBack = () => {
  const lastStep = step - 1;
  window.history.pushState({ step: lastStep }, '', `?step=${lastStep}`);
  setStep(lastStep);
};



const [part1, setPart1] = useState(false);
const [part2, setPart2] = useState(false) ;
const [result1, setResult1] = useState(false);
const [result2, setResult2] = useState(false);
const [result3, setResult3] = useState(false);

const [downloadPage1, setDownloadPage1] = useState(false);
const [downloadPage2, setDownloadPage2] = useState(false);
const [downloadPage3, setDownloadPage3] = useState(false);
const [downloadPage4, setDownloadPage4] = useState(false);
const [downloadPage5, setDownloadPage5] = useState(false);

// const [isLoading, setIsLoading] = useState(false);
const [aiResult, setAiResult] = useState('');
const [showBanner2, setShowBanner2] = useState(false);

const [showEmail, setShowEmail] = useState(false);
const [showSignup, setShowSignup] = useState(false);
const [showLogin, setShowLogin] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const [download, setDownload] = useState(false);

const [showUserProfile, setShowUserProfile] = useState(false);

const { userInfo, setUserInfo } = useLoggin();

const [isFromUserProfile, setIsFromUserProfile] = useState(false);

const basicInfoPages = [
  {
    step: 0,
    key: "startScreen",
    Component: StartScreen,

  },
  {
    step: 1,
    key: "specieBreed",
    Component: SpecieBreed
  },
  {
    step: 2,
    key: "gender",
    Component: Gender
  },
  {
    step: 3,
    key: "age",
    Component: Age
  },
  {
    step: 4,
    key: "namePhoto",
    Component: NamePhoto
  }
];

useEffect(() => {
  console.log('Parent isLoading changed:', isLoading);
}, [isLoading]);
  
return (
    <div className="w-full min-h-screen flex flex-col">
    {/* mobile header */}
    <div className="md:hidden">
      {(showUserProfile === false) && (
      <MobileHeader 
      step={step} 
      setStep={setStep} 
      setPart1={setPart1}
      setResult1={setResult1}
      setResult2={setResult2}
      setResult3={setResult3}
      result1={result1}
      result2={result2}
      result3={result3}
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
      isFromUserProfile={isFromUserProfile}
      />
      )}
 
    </div>
    {/* desktop header */}
    <div className={`${(step === 0 && part1 === false) && (result1 === false && result2 === false && result3 === false) || (showUserProfile === true) ? 'block' : 'hidden md:flex'}`}>
      <Header setShowUserProfile={setShowUserProfile} showUserProfile={showUserProfile}/>
    </div>

    {showUserProfile && 
    <motion.div
    className="fixed  z-[5] bg-white  mt-[56px] md:mt-[100px] h-[calc(100svh)] md:h-[calc(100vh)] mx-auto w-full "
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    >
    <UserProfile 
    setResult1={setResult1}
    setShowPetProfile={setShowUserProfile} 
    handleNext={handleNext} 
    handleBack={handleBack} 
    step={step} 
    setStep={setStep} 
    surveyData={surveyData} 
    updateAnswer={updateAnswer}
    setIsFromUserProfile={setIsFromUserProfile}
    isFromUserProfile={isFromUserProfile}
    />
    </motion.div>
    }
    {/* progress bar */}
    {(part1 === false && part2 === false && step !== 0 && result1 === false && result2 === false && result3 === false && showUserProfile === false) && <ProgressBar step={step}/>}

      {basicInfoPages.map(({ step: pageStep, key, Component }) => (
        (part1 === false && part2 === false && step === pageStep && result1 === false && result2 === false && result3 === false && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Component
              handleNext={handleNext}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
              surveyData={surveyData}
              updateAnswer={updateAnswer}
              setPart1={setPart1}
              setPart2={setPart2}
              part1={part1}
            />
          </motion.div>
        )
       )))}
       
      {part1 && 
      <motion.div
        key="part1" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Part1 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer} setPart1={setPart1}/>
      </motion.div>
      } 

      {part2 && 
      <motion.div
        key="part2" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Part2 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer} setPart2={setPart2}/>
      </motion.div>
      } 

      {[5,6,7,8,9,10,11,12,13,14,15,16,17].map((pageStep) => 
        (part1 === false && part2 === false && result1 === false && result2 === false && result3 === false && showUserProfile === false && step === pageStep && (
          <motion.div
            key={`page${pageStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const PageComponent = require(`../components/mbti/behavioral_quiz/question${pageStep - 4}`).default;
              return <PageComponent 
                handleNext={handleNext} 
                handleBack={handleBack} 
                handleSkip={handleSkip}
                step={step} 
                setStep={setStep} 
                surveyData={surveyData} 
                updateAnswer={updateAnswer}
                aiResult = {aiResult}
                setAiResult = {setAiResult}
                setResult1 = {setResult1}
                setResult2 = {setResult2}
                setResult3 = {setResult3}
                isLoading={isLoading}
                setIsLoading={(value: boolean) => {
                    console.log('Setting isLoading to:', value);
                    setIsLoading(value);
                }}
                showBanner2 = {showBanner2}
                setShowBanner2 = {setShowBanner2}
                showEmail={showEmail}
                showSignup={showSignup}
                showLogin={showLogin}
                setShowEmail={setShowEmail}
                setShowSignup={setShowSignup}
                setShowLogin={setShowLogin}
          
              />;
            })()}
          </motion.div>
        )
      ))}


    
      
        
        <AnimatePresence mode="wait">
        {result1 && (
        <motion.div
          key="result1" 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result1 
            handleNext={handleNext}
            handleBack={handleBack}
            step={step}
            setStep={setStep}
            updateAnswer={updateAnswer}
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
            surveyData={surveyData}
            setDownload={setDownload}
            setDownloadPage1={setDownloadPage1}
            isFromUserProfile={isFromUserProfile}
            setIsFromUserProfile={setIsFromUserProfile}
          />
        </motion.div>
  
      )}
     
       {result2 && (
     
        <motion.div
          key="result2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result2 
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
            surveyData={surveyData}
            setDownload={setDownload}
            isFromUserProfile={isFromUserProfile}
            setIsFromUserProfile={setIsFromUserProfile}
          />
        </motion.div>

      )}
     
      {result3 && (
       
        <motion.div
          key="result3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result3 
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
            surveyData={surveyData}
            setDownload={setDownload}
            isFromUserProfile={isFromUserProfile}
            setIsFromUserProfile={setIsFromUserProfile}
          />
        </motion.div>
        
      )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
      {download && (
        <Download
          step={step}
          setStep={setStep}
          setDownload={setDownload}
          download={download}
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
          setShowEmail={setShowEmail}
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          setLoading={setIsLoading}
          aiResult={aiResult}
          setAiResult={setAiResult}
          surveyData={surveyData}
          isFromUserProfile={isFromUserProfile}
          setIsFromUserProfile={setIsFromUserProfile}
        />
      )}
      </AnimatePresence>

      
      


      
    </div>

  );
};

export default PetMBTIFlow;
