'use client'; 
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { SurveyData } from '../types/survey';
import { useLoggin } from '../context/LogginContext';
import { getUserInfo } from './mbti/get_user_info';

interface UserProfileProps {
  handleNext: () => void;
  handleBack: () => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  surveyData: SurveyData;
  updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string) => void;
  setShowPetProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setResult1: React.Dispatch<React.SetStateAction<boolean>>;
  isFromUserProfile: boolean;
  setIsFromUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  
}




const UserProfile: React.FC<UserProfileProps> = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, setShowPetProfile, setResult1, isFromUserProfile, setIsFromUserProfile}) => {



 
    const { loggin, setLoggin } = useLoggin();
    const { userInfo, setUserInfo } = useLoggin();
    const { userEmail, setUserEmail } = useLoggin();

    useEffect(() => {
        
      
      console.log("1" + JSON.stringify(loggin));
      console.log("2" + JSON.stringify(userInfo));
      console.log("3" + JSON.stringify(userEmail));

    }, []);
   




  
  const mbti = userInfo.ai_output.text.m_label.charAt(0).toUpperCase() + 
              (userInfo.ai_output.text.b_label === "Sensing" ? userInfo.ai_output.text.b_label.charAt(0).toUpperCase() : userInfo.ai_output.text.b_label.charAt(1).toUpperCase()) + 
              userInfo.ai_output.text.t_label.charAt(0).toUpperCase() + 
              userInfo.ai_output.text.i_label.charAt(0).toUpperCase();







  return (
<>
    <div className=" hidden md:flex mt-[0px] md:mt-[0px]  h-[calc(100svh-96px)] md:h-[calc(100vh)] mx-auto w-full flex flex-col  items-center">
     <div className="mt-[140px] w-[540px] h-[144px] flex  flex-row">
      
      <div className="w-[120px] h-[120px]"> 
        <Image src="/loggin-logo.svg" alt="User Profile" width={120} height={120} />
      </div>

      <div className="ml-[20px] w-[344px] h-full flex flex-col gap-[10px]">
        <h1 className="mt-[35px] text-[20px] font-[600] text-[#27355D] leading-[1.2]">
          Welcome, {userInfo.user_info.email}
        </h1>
        <h1 className="text-[16px] font-[400] text-[#27355D] leading-[1.2]">
        {userInfo.user_info.email}
        </h1>
        <h1 className="text-[16px] font-[400] text-[#909090] leading-[1.2]">
          Joined: {userInfo.user_info.email_signup_time}
        </h1>

      </div>
      

     </div>

      <div className=" mt-[0px] w-[540px] border-t-[1px] border-[#C3C3C3] flex flex-col h-[560px]"> 
        <div className="w-[112px] h-[44px] border-b-[2px] border-[#5777D0] bg-[#F5F5F5] flex items-center justify-center">
            <h1 className="text-[16px] font-[600] text-[#5777D0] leading-[1.2]">
                Pet(s)
            </h1>
        </div>
        <div className="mt-[22px] bg-yellow-300 w-[540px] h-[120px] rounded-[22px] border-[1px] border-[#C3C3C3] bg-white flex flex-row items-center "
        onClick={() => {
          setShowPetProfile(false)
          setIsFromUserProfile(true);
          setResult1(true);
        
          console.log("clicked");
        }}
        >
            
            <div className="ml-[20px] w-[80px] h-[80px] border-[4px] flex items-center justify-center rounded-[20px]"
            style={{ borderColor: 
                (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
            }}
            >
                {userInfo.pet_info.pet_photo ? (
                    <div className="w-[76px] h-[76px] overflow-hidden rounded-[18px]">
                        <Image src={userInfo.pet_info.pet_photo} alt="Pet Profile" width={80} height={80} />
                    </div>
                ) : (
                    <Image src="/pet-profile.svg" alt="Pet Profile" width={80} height={80} />
                )}
            </div>

            <div className="w-[166px] ml-[20px]  h-[80px] flex flex-col  ">
                
                <div className = "flex flex-row  h-[20px] ">
                
                <h1 className=" h-[20px] text-[20px] font-[600] text-[#27355D] leading-[1.2]">
                {userInfo.pet_info.pet_name}
                </h1>

                <div className="ml-[10px] w-[60px] h-[20px] flex items-center justify-center rounded-[6px] "
                style={{ backgroundColor: 
                    (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                        : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                        : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                        : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                        : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
                 }}
                >
                    <h1 className="text-[14px] font-[710] text-[#FFFFFF] leading-[1.2]">
                        {mbti}
                    </h1>
                </div>

                </div>

                <div className="mt-[4px] w-[166px] h-[17px] text-[14px] font-[710] leading-[1.2]"
                style={{ color: 
                    (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                        : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                        : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                        : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                        : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
                }}
                >
                {mbti === 'INTJ' ? 'The Architect' 
              : mbti === 'INTP' ? 'The Logician' 
              : mbti === 'ENTJ' ? 'The Commander' 
              : mbti === 'ENTP' ? 'The Debater' 
              : mbti === 'INFJ' ? 'The Advocate' 
              : mbti === 'INFP' ? 'The Mediator' 
              : mbti === 'ENFJ' ? 'The Protagonist' 
              : mbti === 'ENFP' ? 'The Campaigner' 
              : mbti === 'ISTJ' ? 'The Logistician' 
              : mbti === 'ISFJ' ? 'The Defender' 
              : mbti === 'ESTJ' ? 'The Executive' 

              : mbti === 'ESTP' ? 'The Entrepreneur' 
              : mbti === 'ISFP' ? 'The Adventurer' 
              : mbti === 'ESFP' ? 'The Entertainer' 
              : mbti === 'ISTP' ? 'The Virtuoso' 

              :  'The Consul' }
                </div>


            </div>


            <div className="ml-[75px] w-[159px] h-[80px] flex items-end justify-center">
                <h1 className="text-[14px] font-[400] text-[#27355D] leading-[1.2]">
                Test Date: {userInfo.user_info.test_date}
                </h1>
            </div>
            

           
        </div>
        <div className="mt-[22px] w-[540px] h-[120px] rounded-[22px] border-[1px] border-[#C3C3C3]">

        </div>
      </div>

       
       
    </div>

{/* mobile */}
<div className=" flex md:hidden  max-w-[1440px] h-[calc(100svh-56px)]  mx-auto w-full flex flex-col  items-center ">

<div className="mt-[34px] w-[320px] h-[95px] flex  flex-row">
 
 <div className="w-[71px] h-[71px]"> 
   <Image src="/loggin-logo.svg" alt="User Profile" width={120} height={120} />
 </div>

 <div className="ml-[11.85px] w-[203px] h-full flex flex-col gap-[5.93px]">
   
   <h1 className="mt-[10px] text-[16px] font-[710] text-[#27355D] leading-[1.2]">
     Welcome, {userInfo.user_info.email}
   </h1>
   <h1 className="text-[12px] font-[400] text-[#27355D] leading-[1.2]">
   {userInfo.user_info.email}
   </h1>
   <h1 className="text-[12px] font-[400] text-[#909090] leading-[1.2]">
      Joined: {userInfo.user_info.email_signup_time}
   </h1>

 </div>
 

</div>

 <div className=" mt-[0px] w-[320px] border-t-[1px] border-[#C3C3C3] flex flex-col h-[560px]"> 

   <div className="w-[75px] h-[37px] border-b-[2px] border-[#5777D0] bg-[#F5F5F5] flex items-center justify-center">
       <h1 className="text-[14px] font-[710] text-[#5777D0] leading-[1.2]">
           Pet(s)
       </h1>
   </div>

   <div className="mt-[20px] w-[320px] h-[120px] rounded-[22px] border-[1px] border-[#C3C3C3] bg-white flex flex-row items-center "
    onClick={() => {
      setShowPetProfile(false)
      setIsFromUserProfile(true);
      setResult1(true);
      console.log("clicked");
    }}
  
    >
       
       <div className="ml-[20px] w-[80px] h-[80px] border-[4px] flex items-center justify-center rounded-[20px]"
       style={{ borderColor: 
        (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
        : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
        : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
        : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
        : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
       }}
       >
           {userInfo.pet_info.pet_photo ? (
            <div className="w-[76px] h-[76px] overflow-hidden rounded-[18px]">
            <Image src={userInfo.pet_info.pet_photo} alt="Pet Profile" width={80} height={80} />
            </div>
           ) : (
            <Image src="/pet-profile.svg" alt="Pet Profile" width={80} height={80} />
           )}
       </div>

       <div className="w-[166px] ml-[20px]  h-[80px] flex flex-col  ">
           
           <div className = "flex flex-row   h-[20px] ">
           
           <h1 className=" h-[20px] text-[20px] font-[600] text-[#27355D] leading-[1.2]">
           {userInfo.pet_info.pet_name}
           </h1>

           <div className="ml-[10px] w-[60px] h-[20px] flex items-center justify-center rounded-[6px] "
           style={{ backgroundColor: 
            (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
           }}
           >
               <h1 className="text-[14px] font-[710] text-[#FFFFFF] leading-[1.2]">
               {mbti}
               </h1>
           </div>

           </div>

           <div className="mt-[4px] w-[166px] h-[17px] text-[14px] font-[710] leading-[1.2]"
           style={{ color: 
            (mbti === 'INTJ' || mbti === 'INTP' || mbti === 'ENTJ' || mbti === 'ENTP' ? '#4B367B' 
                : mbti === 'INFJ' || mbti === 'INFP' || mbti === 'ENFJ' || mbti === 'ENFP' ? '#438D46' 
                : mbti === 'ISTJ' || mbti === 'ISFJ' || mbti === 'ESTJ' || mbti === 'ESFJ' ? '#5777D0' 
                : mbti === 'ISTP' || mbti === 'ISFP' || mbti === 'ESTP' || mbti === 'ESFP' ? '#FFBA20' 
                : mbti === 'ISTP' ? '#4B367B' : '#4B367B' )
           }}
           >
           {mbti === 'INTJ' ? 'The Architect' 
              : mbti === 'INTP' ? 'The Logician' 
              : mbti === 'ENTJ' ? 'The Commander' 
              : mbti === 'ENTP' ? 'The Debater' 
              : mbti === 'INFJ' ? 'The Advocate' 
              : mbti === 'INFP' ? 'The Mediator' 
              : mbti === 'ENFJ' ? 'The Protagonist' 
              : mbti === 'ENFP' ? 'The Campaigner' 
              : mbti === 'ISTJ' ? 'The Logistician' 
              : mbti === 'ISFJ' ? 'The Defender' 
              : mbti === 'ESTJ' ? 'The Executive' 

              : mbti === 'ESTP' ? 'The Entrepreneur' 
              : mbti === 'ISFP' ? 'The Adventurer' 
              : mbti === 'ESFP' ? 'The Entertainer' 
              : mbti === 'ISTP' ? 'The Virtuoso' 

              :  'The Consul' }
           </div>

           <div className=" mt-[21px] ml-[8px] w-[159px] h-[17px]  flex items-start justify-start">
           <h1 className="text-[14px] font-[400] text-[#27355D] leading-[1.2]">
           Test Date: {surveyData.user_info.test_date}
           </h1>
           </div>

       </div>


       

      
   </div>
   
 </div>

  
  
</div>
</>

  );
};

export default UserProfile;