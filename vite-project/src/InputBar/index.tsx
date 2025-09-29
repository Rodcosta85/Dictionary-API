import { useState } from 'react'

import Search from '/icon-search.svg';

interface currentTheme {
  input: string,
  placeholder: string,
  text: string,
}

interface inputBarProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEnterClick: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  getDictionary: () => void,
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
  input: string,
  currentTheme: currentTheme,
}



const index: React.FC<inputBarProps> = ({ handleInput, handleEnterClick, input, currentTheme, getDictionary }) => {

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isTouched, setIsTouched] = useState<boolean>(true);

  const handleFocus = () => {
    setIsActive(false);
  };

  const handleBlur = () => {
    setIsActive(true);
  };

  const handleValidation = () => {
    if (!input.trim()) {
      setIsEmpty(false); // Mark as empty if input is blank
    } else {
      setIsTouched(true);
      setIsEmpty(true); // Clear the error
      getDictionary(); // Call the provided prop function
    }
  };



  const main = `w-[100%] h-[48px] tablet:h-[52px] desktop:h-[64px] pl-5 pr-5 flex flex-row justify-between items-center rounded-[16px]`


  return (
    <div className='w-[100%] mb-[40px] desktop:mb-[60px]'>
      <div className={`
        ${currentTheme.input} 
        ${main} 
        ${isActive ? 'border-none' : isEmpty && isTouched ? 'border-[1px] border-(--lighter-purple)' : 'border-[1px] border-(--mistake-red)'}
        `}>
        <input
          type="text"
          placeholder="Search for any word..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInput}
          onKeyDown={handleEnterClick}
          value={input}
          className={`
            ${currentTheme.input} 
            ${currentTheme.placeholder} 
            ${currentTheme.text} 
            mt-[2px] bg-none text-[16px] font-bold focus:outline-none w-[80%]  
            h-[25px] desktop:h-[40px] desktop:text-[20px] 
            `}
        />
        <button
          onClick={handleValidation}
          className='cursor-pointer'>
          <img
            src={Search}
            alt="a small, purple magnfying glass symbol"
            className="w-[15.55px] h-[15.55px] desktop:w-5 desktop:h-5"
          />
        </button>
      </div>
      <p className={`ml-1 ${isEmpty ? 'hidden' : 'mt-1 block text-[16px] text-(--mistake-red)'}`}>
        Whoops, can't be empty...
      </p>
    </div>
  )
}

export default index