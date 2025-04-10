import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SurveyData } from '@/app/types/survey';

interface StartScreenProps {
  handleNext: () => void; 
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPart1: React.Dispatch<React.SetStateAction<boolean>>;
  part1: boolean;
  surveyData: SurveyData;
  updateAnswer: (category: keyof SurveyData, subCategory: any | null, field: string, value: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ handleNext, step, setStep, setPart1, part1, surveyData, updateAnswer }) => {
 
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const faqData = [
    {
      question: "What is MBTI?",
      answer: "MBTI (Myers-Briggs Type Indicator) is a personality assessment that identifies 16 personality types based on four key dichotomies: Extraversion (E) vs. Introversion (I), Sensing (S) vs. Intuition (N), Thinking (T) vs. Feeling (F), and Judging (J) vs. Perceiving (P). It helps individuals understand their strengths, decision-making styles, and interactions with others."
    },
    {
      question: "How does the MBTI Petsonality Test work?",
      answer: "The test consists of a series of behavioral questions that assess how your pet interacts with people, environments, and routines. Based on your answers, your pet is classified into one of 16 personality types, providing insights into their social tendencies, problem-solving style, and daily habits."
    },
    {
      question: "Can pets really have personality types like humans?",
      answer: "While pets don't think the way humans do, they show distinct patterns in how they interact, learn, and react to their surroundings. Some are naturally curious and eager to explore, while others prefer familiarity and routine. This test doesn't assign deep psychology to pets but instead helps identify their behavioral tendencies in a way that makes sense to owners."
    },
    {
      question: "How can this test help me as a pet owner?",
      answer: "This test is a fun way to see the world through your pet's eyes. Maybe your dog is a social butterfly, always ready to greet new friends, or your cat is an independent observer, happiest in their own space. Some pets thrive on routine, while others embrace spontaneity.\nUnderstanding their personality can make training easier, playtime more enjoyable, and your bond even stronger. It's a simple way to appreciate what makes your fluffy angle unique and create a life that suits them perfectly."
    }
  ];

  useEffect(() => {
    console.log("loggin test" + expandedIndexes);
   }, [expandedIndexes]);

   const handleNext1 = async () => {
    console.log('part1',part1);
    setPart1(true);
    
  }
  return (
  
    <>
      <div className="hidden md:flex mt-[100px] bg-[#FFFFFF] w-full  py-[80px] "
      style={{
        height: `${1459 + (expandedIndexes.length * 98.5)}px`
      }}>
        <div className=" mx-auto  w-[1106px] h-[1299px] flex flex-col items-center ">
          {/* Top Section with Text and Image */}

          <div className=" w-full flex flex-row items-center h-[406px]">
            <div className=" w-[507px] flex flex-col items-start justify-between h-full">

              <div className=" w-[432px] text-[32px] font-[400] text-[#27355D] leading-[1.2]">
                Did you know that your pet has a unique "
                <span className="font-[600] text-[#5777D0]">Petsonality</span>", just like humans?
              </div>

              <div className=" w-full text-[16px] text-[Inter] font-[400] text-[#27355D] leading-[1.2]">
                <p>Some pets are naturally outgoing, love socializing, and always stay by your side, while others are more independent and prefer their own space.</p>
                <p className="mt-4">The <span className="font-[600] text-[#5777D0]">FurSphere</span> Team—a group of young pet lovers driven by curiosity and deep affection for their furry family members—has developed a series of AI-powered, engaging tests to help pet owners bridge the language gap, gain deeper insights into their pets' unique traits, and strengthen the bond between them and their furry companions, making this cherished relationship even more meaningful.</p>
              </div>
            </div>
            <div className="flex justify-left items-center">
              <Image
                src="/quizpage_dog_cat.png"
                alt="Pet illustration"
                width={507}
                height={397}
                className="object-cover w-[507px] h-[397px]  ml-[40px]"
              />
            </div>
          </div>

          {/* Test Cards Section */}
          <div className="mt-[80px] w-full  flex flex-row items-center justify-left">
            {/* MBTI Petsonality Card */}
            <div className="w-full max-w-[500px] relative rounded-[22px] border border-[#717680] h-[285px] flex flex-col items-center">

              <div className="absolute top-[32px] flex flex-col items-center gap-[20px]">

                <div className="rounded-[8px] bg-[#D1D7EF] h-[32px] w-[121px] flex items-center justify-center">
                  <span className="font-[600] text-[#27355D] text-[14px] text-[Inter]">🎉 100% Free</span>
                </div>

                <div className=" h-[39px] w-[320px] flex items-center justify-center">
                  <span className="font-[600] text-[#27355D] text-[32px] text-[Inter]">MBTI Petsonality</span>
                </div>
                 <div className=" h-[39px] w-[320px] flex items-center justify-center">
                  <span className="font-[400] text-[#27355D] text-[14px] text-[Inter] text-center">Only 3 minutes to learn what Petsonality they are and why they do things the way they do.</span>
                </div>
              </div>

              <button 
                className="absolute bottom-[32px] rounded-[22px] bg-[#5777D0] h-[44px] w-[140px]  text-white flex items-center justify-center"
                onClick={handleNext1}
              >
                Start now
              </button>
            </div>

           {/* Pawfect Match Card */}
            <div className="w-full ml-[40px] bg-[#F5F5F5] max-w-[500px] relative rounded-[22px] border border-[#717680] h-[285px] flex flex-col items-center">

            <div className="absolute top-[32px] flex flex-col items-center gap-[20px]">

              <div className="rounded-[8px] bg-[#D1D7EF] h-[32px] w-[56px] flex items-center justify-center">
              <Image 
                    src="lock.svg"
                    alt="Lock icon"
                    width={24}
                    height={24}
                    className="opacity-70 "
                  />
              </div>

              <div className=" h-[39px] w-[320px] flex items-center justify-center">
                <span className="font-[600] text-[#27355D] text-[32px] text-[Inter]">Pawfect Match Test</span>
              </div>
              <div className=" h-[39px] w-[320px] flex items-center justify-center">
                <span className="font-[400] text-[#27355D] text-[14px] text-[Inter] text-center">In just 1 minute, discover how well you and your pet get along, or how they bond with other pets!</span>
              </div>
            </div>

            <button 
              className="absolute bottom-[32px] rounded-[22px] bg-[#5777D0] h-[44px] w-[183px]  text-white flex items-center justify-center"
              // onClick={handleNext}
            >
             Login to unlock
            </button>
            </div>
            
          </div>

        

         <div className="w-full flex flex-col items-left">
          <div className="mt-[80px] w-full  max-w-[1060px]">
            {faqData.map((item, index) => (
              <div key={index} className="w-full border-t border-[#717680] py-8">
                <div 
                  className="md:px-8 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    if (expandedIndexes.includes(index)) {
                      setExpandedIndexes(expandedIndexes.filter(i => i !== index));
                    } else {
                      setExpandedIndexes([...expandedIndexes, index]);
                    }
                  }}
                >
                  <div className="w-[840px] text-[32px] font-[400] text-[#27355D] font-[Inter]">
                    {item.question}
                  </div>
                  <div className={`transform transition-all ease-in-out duration-500 ${expandedIndexes.includes(index) ? 'rotate-180' : ''}`}>
                    {expandedIndexes.includes(index) ? (
                      <Image 
                        src="/minusign.svg"
                        alt="Collapse icon"
                        width={24}
                        height={24}
                        className="w-[48px] h-[48px] opacity-70"
                      />
                    ) : (
                      <Image 
                        src="/icon.svg"
                        alt="Expand icon"
                        width={24}
                        height={24}
                        className="w-[48px] h-[48px] opacity-70"
                      />
                    )}
                  </div>
                </div>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndexes.includes(index) ? ' max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-[36.5px] font-[Inter] font-[400] text-[16px] w-[976px] text-[#27355D] leading-[1.2]">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
      </div>
      



      {/* mobile */}
      <div className="mt-[56px] md:hidden w-full overflow-visible py-[40px]"
      style={{
        height: `${1600 + (expandedIndexes.length * 166)}px`
      }}>
        <div className="mx-auto w-full w-[360px] h-[1520px] flex flex-col items-center  ">
          {/* Top Section with Text and Image */}

          <div className=" w-full flex flex-col items-center ">
           

              <div className="  w-[320px] text-[20px] font-[400] text-[#27355D] leading-[1.2]">
                Did you know that your pet has a unique "
                <span className="font-[600] text-[#5777D0]">Petsonality</span>", just like humans?
              </div>
            
            <div className=" mt-[20px] flex items-center">
              <Image
                src="/quizpage_dog_cat.png"
                alt="Pet illustration"
                width={266}
                height={208}
                className="object-cover w-[266px] h-[208px]"
              />
            </div>
          </div>

          {/* Test Cards Section */}
          <div className="mt-[40px] w-full flex flex-col items-center justify-center">
            {/* MBTI Petsonality Card */}
            <div className="w-full max-w-[320px] relative rounded-[22px] border border-[#717680] h-[285px] flex flex-col items-center">

              <div className="absolute top-[30px] flex flex-col items-center gap-[20px]">

                <div className="rounded-[8px] bg-[#D1D7EF] h-[32px] w-[121px] flex items-center justify-center">
                  <span className="font-[600] text-[#27355D] text-[14px] text-[Inter] leading-[1.1]">🎉 100% Free</span>
                </div>

                <div className=" h-[39px] w-[320px] flex items-center justify-center">
                  <span className="font-[600] text-[#27355D] text-[20px] text-[Inter] leading-[1.1]">MBTI Petsonality</span>
                </div>
                 <div className=" h-[39px] w-[260px] flex items-center justify-center">
                  <span className="font-[400] text-[#27355D] text-[14px] text-[Inter] text-center leading-[1.1]">Only 3 minutes to learn what Petsonality they are and why they do things the way they do.</span>
                </div>
              </div>

              <button 
                className="absolute bottom-[32px] rounded-[22px] bg-[#5777D0] h-[44px] w-[140px]  text-[16px] font-[600] text-white flex items-center justify-center"
                onClick={handleNext1}
              >
                Start now
              </button>
            </div>

           {/* Pawfect Match Card */}
            <div className="w-full mt-[20px] bg-[#F5F5F5] max-w-[320px] relative rounded-[22px] border border-[#717680] h-[285px] flex flex-col items-center">

            <div className="absolute top-[30px] flex flex-col items-center gap-[20px]">

              <div className="rounded-[8px] bg-[#D1D7EF] h-[32px] w-[56px] flex items-center justify-center">
              <Image 
                    src="lock.svg"
                    alt="Lock icon"
                    width={24}
                    height={24}
                    className="opacity-70 "
                  />
              </div>

              <div className=" h-[39px] w-[320px] flex items-center justify-center">
                <span className="font-[600] text-[#27355D] text-[20px] text-[Inter] leading-[1.1]">Pawfect Match Test</span>
              </div>
              <div className=" h-[39px] w-[260px] flex items-center justify-center">
                <span className="font-[400] text-[#27355D] text-[14px] text-[Inter] text-center leading-[1.1]">In just 1 minute, discover how well you and your pet get along, or how they bond with other pets!</span>
              </div>
            </div>

            <button 
              className="absolute bottom-[32px] rounded-[22px] bg-[#5777D0] h-[44px] w-[183px]  text-[16px] font-[600] text-white flex items-center justify-center"
              // onClick={handleNext}
            >
             Login to unlock
            </button>
            </div>
            
          </div>

          <div className=" mt-[40px] w-[320px] text-[14px] font-[400] text-[#27355D] leading-[1.2]">
            <p>Some pets are naturally outgoing, love socializing, and always stay by your side, while others are more independent and prefer their own space.</p>
            <p className="mt-4">The <span className="font-[600] text-[#5777D0]">FurSphere</span> Team—a group of young pet lovers driven by curiosity and deep affection for their furry family members—has developed a series of AI-powered, engaging tests to help pet owners bridge the language gap, gain deeper insights into their pets' unique traits, and strengthen the bond between them and their furry companions, making this cherished relationship even more meaningful.</p>
          </div>

         <div className="w-full flex flex-col items-center">
          <div className="mt-[40px] w-full  max-w-[320px]">
            {faqData.map((item, index) => (
              <div key={index} className="w-full border-t border-[#717680] py-[10px]">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    if (expandedIndexes.includes(index)) {
                      setExpandedIndexes(expandedIndexes.filter(i => i !== index));
                    } else {
                      setExpandedIndexes([...expandedIndexes, index]);
                    }
                  }}
                >
                  <div className="w-[240px] text-[16px] font-[400] text-[#27355D] font-[Inter]">
                    {item.question}
                  </div>
                  <div className={`transform transition-all ease-in-out duration-500 ${expandedIndexes.includes(index) ? 'rotate-180' : ''}`}>
                    {expandedIndexes.includes(index) ? (
                      <Image 
                        src="/minusign.svg"
                        alt="Collapse icon"
                        width={24}
                        height={24}
                        className="w-[48px] h-[48px] opacity-70"
                      />
                    ) : (
                      <Image 
                        src="/icon.svg"
                        alt="Expand icon"
                        width={24}
                        height={24}
                        className="w-[48px] h-[48px] opacity-70"
                      />
                    )}
                  </div>
                </div>
                <div 
                  className={` flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedIndexes.includes(index) ? ' max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-[20.5px]  font-[Inter] font-[400] text-[14px] w-[300px] text-[#27355D] leading-[1.2]">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
      </div>
      
      {/* Footer section */}
     
    </>
  );
};
  
export default StartScreen;
  