"use client";

import React,{ useEffect, useRef, useState } from 'react';
import Header from './components/header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import {useLoggin} from './context/LogginContext'

const Home = () => {

  const { loggin, setLoggin } = useLoggin();
  const [avatarUrl, setAvatarUrl] = useState(''); 

  useEffect(() => {
    const avatarPath = 'widget-avatars/rJ5W3JR1ALahUS4QSt7MhVatf89Vn9LSSY1dUzaRQQ8/lURE0N8GGwPSIoS_wZ4AwK99qHJFsa7PVsTTJ6TUkgmhwVn7d5HLVbC3yw8Ts-xHjwWkUelmtOzVvqWJbw0';
    setAvatarUrl(`/api/proxy/${encodeURIComponent(avatarPath)}`);
  }, []);



  // const hasPlayed = useRef([false, false, false]); 


  // useEffect(() => {
  //   const observers = videoRefs.map((videoRef, index) => {
  //     const video = videoRef.current;

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         console.log(`Video ${index + 1} intersection ratio:`, entry.intersectionRatio);
  //         if (entry.isIntersecting && entry.intersectionRatio >= 0.99 && !hasPlayed.current[index]) {
  //           console.log(`Playing video ${index + 1} due to scroll...`);
  //           video?.play();
  //           hasPlayed.current[index] = true; 
  //         }
  //       },
  //       { threshold: 0.99 } 
  //     );

  //     if (video) {
  //       observer.observe(video);
  //     }

  //     return observer;
  //   });


  //   return () => {
  //     observers.forEach((observer, index) => {
  //       const video = videoRefs[index].current;
  //       if (video) {
  //         observer.unobserve(video);
  //       }
  //     });
  //   };
  // }, []);


  return (
    <div className = "relative aspect-[1440/3742] bg-[#FFFFFF] ">
      <Header showUserProfile={false} setShowUserProfile={() => {}}/>
      <main className = 'bg-[#FFFFFF]'> 
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      </main>
    </div>
  );
};

export default Home;
