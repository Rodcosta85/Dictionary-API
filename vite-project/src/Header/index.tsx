import { useState, useEffect } from 'react';
import Arrow from '/icon-arrow-down.svg';

interface currentTheme {
  text: string,
  input: string,
  imgSrc: any,
  logo: any,
  inputBG: string
}


interface headerProps {
  slider: number,
  handleSlider: (e: React.ChangeEvent<HTMLInputElement>) => void,
  currentTheme: currentTheme
}


const index: React.FC<headerProps> = ({ slider, handleSlider, currentTheme }) => {

  const [dropdown, setDropdown] = useState<boolean>(true);
  const [fontFamily, setFontFamily] = useState<string>('Inter');

  const openDiv = () => {
    setDropdown(prevState => !prevState)
  };

  // Handle font-family change
  const handleFontChange = (newFont: string) => {
    setFontFamily(newFont);
    // Apply the font to the entire document

  };

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily])

  return (
    <div className="mobile:w-[100%] h-[32px] mb-[50px] flex flex-row justify-between items-center
    tablet:w-[100%] tablet:h-[36px]
    desktop:w-[100%] desktop:h-[36.5px] desktop:mt-3
    ">
      <img src={`${currentTheme.logo}`} alt="a book symbol wth a gray stroke" />
      <div className='min-h flex flex-row justify-center items-center gap-4
      '>
        <div className='flex flex-col justify-start'>
          <button
            onClick={() => { openDiv(); }}
            className={`${currentTheme.text} ${fontFamily} min-w-[80px] flex flex-row items-center justify-between gap-4 cursor-pointer`}
          >
            {`${fontFamily}`}
            <img
              src={Arrow}
              alt="an arrow pointing down or up"
              className={dropdown ? 'transition duration-300 ease-in-out' : 'rotate-180 transition duration-300 ease-in-out'}
            />
          </button>
          <div className={dropdown ? 'hidden' : `${currentTheme.input} w-[135px] min-h p-2 rounded-[10px] flex flex-row justify-center gap-3 absolute top-[8.5%] desktop:top-[10.5%] mobile:right-[30%] tablet:right-[25%] desktop:right-[18%]`}>
          {fontFamily !== "Serif" && (
              <button 
                onClick={() => { handleFontChange("Serif"); openDiv(); }}
                className={`${currentTheme.text} min-w cursor-pointer font-serif font-semibold hover:text-(--lighter-purple)`}>Serif</button>
            )}
            {fontFamily !== "Space Mono" && (
              <button 
              onClick={() => { handleFontChange("Space Mono"); openDiv(); }}
              className={`${currentTheme.text} min-w cursor-pointer font-mono font-semibold hover:text-(--lighter-purple)`}>Mono</button>
            )}
            {fontFamily !== "Inter" && (
              <button 
              onClick={() => { handleFontChange("Inter"); openDiv(); }}
              className={`${currentTheme.text} min-w cursor-pointer font-mono font-semibold hover:text-(--lighter-purple)`}>Inter</button>
            )}
          </div>
        </div>

        <div className="w-[2px] h-[32px] bg-(--off-white)"></div>
        <div className='flex flex-row items-center gap-3'>
          <input
            type="range"
            min="1"
            max="2"
            value={slider}
            onChange={handleSlider}
            className={`input-ball w-[40px] h-[20px] pl-[3.5px] pr-[3.5px] rounded-full appearance-none focus:outline-none ${currentTheme.inputBG}`}
          />
          <img
            src={`${currentTheme.imgSrc}`}
            alt="A crescent moon symbol in either gray or purple depending on the chosen theme" />
        </div>
      </div>
    </div>
  )
}

export default index