import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLoggin } from '@/app/context/LogginContext';
import { usePathname } from 'next/navigation';


interface HeaderProps {
  showUserProfile: boolean;
  setShowUserProfile: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({  showUserProfile, setShowUserProfile }) => {
  const { userInfo, setUserInfo } = useLoggin();
  const { loggin, setLoggin } = useLoggin();
  const { userEmail, setUserEmail } = useLoggin();

  console.log("11" + JSON.stringify(userInfo));
  console.log("22" + JSON.stringify(loggin));
  console.log("33" + JSON.stringify(userEmail));

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();

  return (
    <header className="flex justify-center fixed top-0 bg-white border-b border-[#E8EBF6] z-10 w-full overflow-x-auto border-t-0">
      <div className="
      flex items-center justify-between 
      px-[40px] md:px-[100px] 
      w-full max-w-[1440px] 
      h-[56px] md:h-[100px]">
        
        <button 
          className="block lg:hidden w-[35px] h-[24px] border-none relative"
          onClick={toggleMenu}
        >
          <img src="/toggle.png" alt="Toggle Menu" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] top-[8px]" />
        </button>

        <div className="relative 
          w-[131px] lg:w-[210px] 
          h-[40px] lg:h-[64px]">
          <Image 
            src="/logo.svg" 
            alt="FurSphere Logo" 
            fill
          />
        </div>

        <div className="flex">
          <nav className="
            hidden lg:flex
            flex-row
            justify-between items-center
            w-[382.67px] 
            gap-y-[20px]
            mr-[54px]">
            <Link href="/" 
                  className={` text-[16px]  text-[#1A1D1F] font-[Inter] hover:text-[#5676CF] transition-colors ${pathname === '/' ? 'text-[#5676CF]' : ''}`}>
              Home
            </Link>
            <Link href="/" 
                  className={` text-[16px]  text-[#1A1D1F] font-[Inter] hover:text-[#5676CF] transition-colors ${pathname === '/product' ? 'text-[#5676CF]' : ''}`}>
              Product
            </Link>
            <Link href="/mbti" 
                  className={` text-[16px]  text-[#1A1D1F] font-[Inter] hover:text-[#5676CF] transition-colors ${pathname === '/mbti' ? 'text-[#5676CF]' : ''}`}>
              Quiz
            </Link>
            <Link href="/" 
                  className={` text-[16px]  text-[#1A1D1F] font-[Inter] hover:text-[#5676CF] transition-colors ${pathname === '/about' ? 'text-[#5676CF]' : ''}`}>
              About
            </Link>
          </nav>
          {!loggin ? (
            <button className="relative 
          hidden md:block
           md:w-[123px] 
           md:h-[44px] 
          bg-gradient-to-r from-[#5676CF] to-[#AFBFE9] text-white 
           md:text-[16px]
          font-bold rounded-[22px] border-none hover:brightness-75 transition-all">
            Sign up
          </button>
          ) : (
            <button className={`relative 
          hidden md:block
           md:w-[44px] 
           md:h-[44px] 
          transition-all
           ${showUserProfile ? 'brightness-75' : ''}`}
           onClick = {() => {
            setShowUserProfile(!showUserProfile);
          
          }}>
            <Image src="/loggin-logo.svg" alt="User" width={44} height={44} />
          </button>
          )}

        {loggin ?  
          (<button className={`relative 
          flex md:hidden
           w-[30px] 
           h-[30px] 
          transition-all
           ${showUserProfile ? 'brightness-75' : ''}`}
           onClick = {() => {
            setShowUserProfile(!showUserProfile);
          
          }}>
            <Image src="/loggin-logo.svg" alt="User" width={44} height={44} />
          </button>)
          : (
          <button className="">
          </button>
          )
          }   
        </div>
      </div>

      <nav className={`fixed top-0 left-[-250px] w-[200px] h-screen bg-[#5676CF] shadow-md z-[100] flex flex-col items-start pt-[5%] pl-[20px] transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-[250px]' : ''}`}>
        <button className="mb-[40px]" onClick={toggleMenu}>
          <img src="/close.png" alt="Close Menu" className="w-[24px] h-[24px] top-[8px]" />
        </button>
        <Link href="/" className={`text-[16px] py-[8px] text-white hover:text-opacity-75 transition-colors ${pathname === '/' ? 'text-[#C3C3C3]' : ''}`} onClick={closeMenu}>Home</Link>
        <Link href="/" className={`text-[16px] py-[8px] text-white hover:text-opacity-75 transition-colors ${pathname === '/product' ? 'text-[#C3C3C3]' : ''}`} onClick={closeMenu}>Product</Link>
        <Link href="/mbti" className={`text-[16px] py-[8px] text-white hover:text-opacity-75 transition-colors ${pathname === '/mbti' ? 'text-[#C3C3C3]' : ''}`} onClick={closeMenu}>Quiz</Link>
        <Link href="/" className={`text-[16px] py-[8px] text-white hover:text-opacity-75 transition-colors ${pathname === '/about' ? 'text-[#C3C3C3]' : ''}`} onClick={closeMenu}>About</Link>
      </nav>
    </header>
  );
};

export default Header;
