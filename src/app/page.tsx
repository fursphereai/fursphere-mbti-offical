"use client";

import React,{ useEffect, useRef, useState } from 'react';
import Header from './components/header';

import {useLoggin} from './context/LogginContext'
import { useRouter } from 'next/navigation';
import Footer from './components/footer';
import  {Section1_2, Section2, Section3, Section4}  from './components/sections/Sections';
import Section1 from './components/sections/Section1';
import Section5 from './components/sections/Section5';
import { motion } from 'framer-motion';

const Home = () => {

  const { loggin, setLoggin } = useLoggin();
  const [avatarUrl, setAvatarUrl] = useState(''); 
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    const avatarPath = 'widget-avatars/rJ5W3JR1ALahUS4QSt7MhVatf89Vn9LSSY1dUzaRQQ8/lURE0N8GGwPSIoS_wZ4AwK99qHJFsa7PVsTTJ6TUkgmhwVn7d5HLVbC3yw8Ts-xHjwWkUelmtOzVvqWJbw0';
    setAvatarUrl(`/api/proxy/${encodeURIComponent(avatarPath)}`);
  }, []);




  const router = useRouter();

  // useEffect(() => {
  //   router.replace('/mbti');
  // }, []);


  return (
    <motion.div className="w-full flex bg-white flex-col "
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}>
      <Header 
        showUserProfile={showUserProfile}
        setShowUserProfile={setShowUserProfile}
      />
      <div className="mt-[56px] md:mt-[100px] flex flex-col w-full  ">
        <Section1 />
        <Section1_2 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
      <Footer />
    </motion.div>
  );
};

export default Home;
