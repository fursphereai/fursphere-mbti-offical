"use client";

import { useProgress } from "../../context/ProgressContext";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  
  const progress = ((step ) / 17) * 100;
  return (
    <div className="
    mt-0 md:mt-[100px]
    h-[40px] md:h-[70px]
    bg-[#EEF1FA]">
      <div className="relative  flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px] ">
        <button className="
            inline max-[1056px]:hidden
            absolute
            left-1/2
            -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px]  
            text-[#C3C3C3]
            text-[14px]"
            >Exit
        </button>

        <p className="
        hidden md:inline
          text-[#27355D] 
          text-[14px]
        ">Progress</p>

        <div className="relative mx-[10px] md:mx-[24px] bg-[#D1D7EF] w-[740px] max-w-[740px] h-[10px] rounded-full">
            
            <div
                className=" ml-[0px] h-full bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out "
                style={{ width: `${progress}%` }}
            ></div>
 
       
            <div
                className="  absolute w-[10px] h-[10px] top-0 bg-[#27355D] rounded-full flex items-center justify-center"
                style={{ left: `calc(${(4/17 * 100)}% - 10px)` }}
            >
              <div
                className="w-[4px] h-[4px]  bg-white rounded-full "
               >
              </div> 
            </div> 

       
            <div
                className="  absolute  w-[10px] h-[10px] top-0  bg-[#FFC542] rounded-full flex items-center justify-center"
                style={{ left: `calc(${(8/17 * 100)}% - 10px)` }}
            >
              <div
                className="w-[4px] h-[4px]  bg-white rounded-full "
               >
              </div> 
            </div>
        
        </div>

         <p className=" 
           text-[#27355D] 
           text-[14px]
           font-[600px]">
           {step}/17
         </p> 
    </div>
    </div>
  );
};

export default ProgressBar;


