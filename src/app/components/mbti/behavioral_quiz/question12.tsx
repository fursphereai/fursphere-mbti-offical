'use client';
import React, { useState, useEffect } from 'react';


interface SurveyData {
  personality_and_behavior: {
    Structure_Spontaneity: {
      follow_commands: string;
    };
  };
}

interface Question12Props {
  handleNext: () => void;
  handleBack: () => void;
  handleSkip: () => void;
  surveyData: SurveyData;
  updateAnswer: (
    category: keyof SurveyData,
    subCategory: string,
    field: string,
    value: string
  ) => void;
  showBanner2: boolean;
  setShowBanner2: (showBanner2: boolean) => void;
  step: number;
  setStep: (step: number) => void;
}

const reactionOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const getReactionText = (num: number): string => {
  const reactionOptions = ['100', '75', '50', '25', '0', '-25', '-50', '-75', '-100'];
  return reactionOptions[num - 1]; // subtract 1 because array is 0-based
};

const getReactionNumber = (text: string): number => {
  const reactionOptions = [
    '100', 
    '75', 
    '50', 
    '25', 
    '0',   
    '-25', 
    '-50', 
    '-75', 
    '-100'
  ];

  // Find the index and add 1 because we want numbers 1-9
  const index = reactionOptions.indexOf(text);
  return index === -1 ? 5 : index + 1; // Default to 5 if text not found
};

const bubbleSizes = [46, 40, 35, 30, 25, 30, 35, 40, 46]; // 中间最小，越往两边越大

const Question12: React.FC<Question12Props> = ({
  handleNext,
  handleBack,
  handleSkip,
  surveyData,
  updateAnswer,
  showBanner2,
  setShowBanner2,
  step,
  setStep
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(
    getReactionNumber(surveyData.personality_and_behavior.Structure_Spontaneity.follow_commands) || 5
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    updateAnswer('personality_and_behavior', 'Structure_Spontaneity', 'follow_commands', getReactionText(parseInt(option)));
  };

  const handleNextPage18 = () => {
    if (surveyData.personality_and_behavior.Structure_Spontaneity.follow_commands !== '5' && surveyData.personality_and_behavior.Structure_Spontaneity.follow_commands !== '') {
      handleNext(); 
    } 
  };

  const getNextButtonColor = () => {
    return surveyData.personality_and_behavior.Structure_Spontaneity.follow_commands !== '5' 
    && surveyData.personality_and_behavior.Structure_Spontaneity.follow_commands !== ''
      ? '#5777D0' // Blue when not 5
      : '#C3C3C3'; // Gray when 5
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCloseBanner = () => {
    setShowBanner2(false);
  }

  const handleFinalStep = () => {
    const nextStep = 18;
    // window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
    setStep(nextStep);
  }

  return (
    <div className='relative mx-auto w-full max-w-[1440px]  h-[calc(100svh-96px)] md:h-[calc(100vh-140px)] w-full flex flex-col justify-center'>
      {showBanner2 && (

<div className="mx-auto h-[100px] md:h-[80px] w-full bg-[#FEF0C7] flex items-center justify-center">
  
  <div className=" mx-auto w-[320px] md:w-[540px] flex flex-row items-center justify-between ">
    
    <div className="flex flex-col max-w-[289px] md:max-w-[450px] gap-[10px]">
      <span className="max-w-[289px] md:max-w-[450px] text-[14px] text-[#717680] leading-[16.94px]">
      More information can helps us generate a more accurate MBTI result for your pet. But if you are getting tired, here’s the
      </span>
      <a
        href="#sample" 
        className=" text-[14px] text-[#5777D0] underline hover:opacity-80 leading-[16.94px]"
        onClick={handleFinalStep}
      >
        Shortcut to final step
      </a>
    </div>

    <button
      onClick={handleCloseBanner}
      className="text-[#27355D] hover:opacity-80 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
)}
    <div className="quiz-container">
      {/* 问题文本 */}
      <div className="question-container h-[38px] md:h-[44px] leading-[19.36px] text-[#101828]">
        <h2>How does your pet‘s attitude to your commands?</h2>
      </div>

      {/* 桌面端: Bubble 选择 */}
      <div className="slider-container desktop" style={{ display: isMobile ? 'none' : 'block' }}>
        <div className="slider-options">
          {reactionOptions.map((option, index) => {
            const size = bubbleSizes[index];
            const optionValue = parseInt(option);
            const selectedValue = parseInt(selectedOption);
            const isLeft = optionValue < 5;
            const isMiddle = optionValue === 5; // 🔥 识别中间的 bubble
            const inSelectionRange = isLeft
              ? optionValue >= selectedValue && optionValue <= 5
              : optionValue <= selectedValue && optionValue >= 5;
    
          // 🔥 设定中间 bubble 颜色
          const isMiddleSelected = selectedValue < 5 ? "#FFC542" : "#5777D0";
    
          // 🔥 设定中间 bubble 的边框颜色
          const middleBorderColor = selectedValue < 5 ? "#FEF0C7" : "#D1D7EF";

          return (
            <div key={option} className="option-wrapper">
              <div
                className="option-circle"
                onClick={() => handleSelectOption(option)}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: isMiddle
                    ? isMiddleSelected // 🔥 确保中间 bubble 颜色正确
                    : inSelectionRange
                    ? isLeft
                      ? "#FFC542"
                      : "#5777D0"
                      : "#F5F5F5",
                  border: `${isMiddle || inSelectionRange ? "4px" : "1px"} solid ${
                    isMiddle
                      ? middleBorderColor // 🔥 中间 bubble 的边框颜色
                      : inSelectionRange
                        ? isLeft
                          ? "#FEF0C7"
                          : "#D1D7EF"
                        : "#C3C3C3"
                    }`,
                  }}
               />
              </div>
            );
         })}
        </div>
        
         {/* 标签行 */}
        <div className="label-row ">
          <span className="option-label text-[14px] text-[#717680]">☺️Obedience</span>
          <span className="option-label text-[14px] text-[#717680]">👻Rebelliousness</span>
        </div>
      </div>







      {/* 移动端: Slider 滑动条 */}
      <div className={`
            mt-[20px]
            w-[320px]
            ${isMobile ? 'block' : 'hidden'}
            flex flex-col items-center
            mx-auto
            mt-0
             `} >
        <div className="slider-wrapper">
         
         <div className="slider-guide-line"></div>
          <input
            type="range"
            min="1"
            max="9"
            value={selectedOption}
            onChange={(e) => handleSelectOption(e.target.value)}
            className="slider"
            style={{
              background:
                Number(selectedOption) === 5
                  ? "#F5F5F5"
                  : Number(selectedOption) < 5
                  ? (() => {
                      const thumbPercent = ((Number(selectedOption) - 1) / 8) * 100;
                      return `linear-gradient(
                        to right,
                        #F5F5F5 0%,
                        #F5F5F5 ${thumbPercent}%,
                        #FFC542 ${thumbPercent}%,
                        #FFC542 50%,
                        #F5F5F5 50%,
                        #F5F5F5 100%
                      )`;
                    })()
                  : (() => {
                      const thumbPercent = ((Number(selectedOption) - 1) / 8) * 100;
                      return `linear-gradient(
                        to right,
                        #F5F5F5 0%,
                        #F5F5F5 50%,
                        #5777D0 50%,
                        #5777D0 ${thumbPercent}%,
                        #F5F5F5 ${thumbPercent}%,
                        #F5F5F5 100%
                      )`;
                    })(),
            }}
          />
        </div>

        {/* 底部标签 */}
        <div className=" slider-labels text-[14px] text-[#717680]">
          <span>☺️Obedience</span>
          <span>👻Rebelliousness</span>
        </div>
      </div>

 
      {/* Desktop 端的按钮 */}
      <div className="button-container desktop absolute top-[393px] left-0 right-0 w-[540px] mx-auto flex justify-between">
        <button className="nav-button previous" onClick={handleBack}>Previous</button>
        <button className="nav-button skip" onClick={handleSkip}>Skip</button>
        <button className="nav-button next" onClick={handleNextPage18} style={{ background: getNextButtonColor() }}>Next</button>
      </div>

      {/* Mobile 端的按钮 */}
      <div className="button-container mobile absolute bottom-[48px] left-0 right-0 w-[320px] mx-auto flex justify-between">
        <button className="nav-button mobile previous" onClick={handleBack}>
          <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
          </svg>
        </button>
        <button className="nav-button mobile skip" onClick={handleSkip}>Skip</button>
        <button className="nav-button mobile next" onClick={handleNextPage18} style={{ background: getNextButtonColor() }}>
          <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
          </svg>
        </button>
      </div>

      


      <style jsx>{`
        /* === 基础样式 === */
        body {
          font-size: 18px;
        }

        @media (max-width: 768px) {
          body {
            font-size: 16px;
            text-align: left !important;
          }
        }

        .quiz-container {
          width: 540px;
          margin: auto;
          text-align:left;
          margin-top: 85px;
        }

        @media (max-width: 768px) {
          .quiz-container {
            margin: auto;
            width: 320px;
            text-align: left;
             margin-top: 40px;
          }

          .question-container.mobile h2 {
          text-align: left !important;
          width: 100%;
        }   
        }

        /* === 问题容器 === */
        .question-container.desktop {
          width: 540px; /* Fixed width */
          margin: auto; 
          text-align: center;
        }

        .question-container.desktop h2 {
          font-size: 18px;
          color: #101828;
        }

        .question-container.mobile {
          position: absolute;
          top: 40px;
          left: 0%;
          transform: none;
          width: 400px;
          text-align: left !important;
          padding: 0 20px;
        }

        .question-container.mobile h2 {
          text-align: left !important; /* 确保标题是左对齐 */
          margin-left: 0;
          font-size: 16px;
          color: #101828;
        }

        @media (max-width: 360px) {
          .question-container.mobile {
            width: calc(100% - 40px);
          }
        }

        /* === 选择滑块 === */
        .slider-container.desktop {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          text-align: center;
        
          

        }

      


        .slider {
          width: 100%;
          appearance: none;
          height: 12px;
          border-radius: 6px;
          outline: none;
          border: 1px solid #c3c3c3;
          transition: background 0.1s ease;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease, border 0.3s ease;
        }

        .slider-wrapper {
          position: relative;
          width: 100%;
          z-index: 1;
       
       
        }

        /* 中间辅助线 */
        .slider-guide-line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 36px;
          background-color: black;
          transform: translate(-50%, -50%);
          z-index: -1; /* 位于滑条背后 */
        }
          
        /* === 滑块动态颜色 === */
        .slider[value="5"]::-webkit-slider-thumb {
          background: #5777d0;
          border: 4px solid #d1d7ef;
        }

        .slider[value="1"]::-webkit-slider-thumb,
        .slider[value="2"]::-webkit-slider-thumb,
        .slider[value="3"]::-webkit-slider-thumb,
        .slider[value="4"]::-webkit-slider-thumb {
          background: #ffc542;
          border: 4px solid #fef0c7;
        }

        .slider[value="6"]::-webkit-slider-thumb,
        .slider[value="7"]::-webkit-slider-thumb,
        .slider[value="8"]::-webkit-slider-thumb,
        .slider[value="9"]::-webkit-slider-thumb {
          background: #5777d0;
          border: 4px solid #d1d7ef;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          margin-top: 0px;
          padding: 0 5px;
        }

        /* === 选项样式 === */
        .slider-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 46px;
          margin: auto;
        }

        .option-circle {
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 5px;
        }

        /* === 按钮样式（桌面端） === */
        .button-container.desktop {
      
        }

        .nav-button {
          font-size: 16px;
          cursor: pointer;
          border-radius: 22px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .previous {
          width: 132px;
          height: 44px;
          background: #d1d7ef;
          color: white;
          font-weight: bold !important;
        }

        .skip {
          width: 98px;
          height: 44px;
          background: transparent;
          border: 1px solid #c3c3c3;
          font-weight: bold !important;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .skip:hover {
          background: #f5f5f5;
        }

        .next {
          width: 101px;
          height: 44px;
          background: #5777d0;
          color: white;
          border: none;
          font-weight: bold !important;
        }

        /* === 按钮样式（移动端） === */
        .button-container.mobile {
         
        }

   

        .nav-button.mobile {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          border: none;
          background: #5777d0;
          color: white;
        }

        .previous.mobile {
          background: #d1d7ef;
        }

        .skip.mobile {
          width: 98px;
          border-radius: 22px;
          background: white;
          border: 1px solid #c3c3c3;
          color: black;
          font-size: 16px;
        }

        .skip.mobile:hover {
          background: #f5f5f5;
        }

        /* === 响应式设计 === */
        @media (max-width: 768px) {
          .button-container.desktop {
            display: none;
          }
          .button-container.mobile {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .button-container.mobile {
            display: none;
          }
          .button-container.desktop {
            display: flex;
          }
        }
      `}</style>
            </div>  
          </div>
          );
        };
export default Question12;   

