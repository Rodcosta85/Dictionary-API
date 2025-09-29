// development imports
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// pages & components
import themes from './styles.ts';
import Header from './Header';
import InputBar from './InputBar';
import PlayDiv from './PlayDiv';
import Noun from './Noun';
import Verb from './Verb';
import Adjective from './Adjective';

// images
import Emoji from '/melting-face-emoji.svg';


function App() {

  const [currentTheme, setCurrentTheme] = useState<typeof themes[0]>(themes[0]);
  const [slider, setSlider] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isError404, setIsError404] = useState<boolean>(false);
  const [data, setData] = useState<any>('');
  const [audio, setAudio] = useState<string>('');
  // Initializing the state variable with "0" caused it to be rendered in the UI before the API data arrived, 
  // leading to the unexpected "0" appearing on the page. 
  // By changing the initial state to an empty string ("") or null, you've prevented this initial "0" from being displayed. 
  // This is a common pattern in web development, especially when dealing with asynchronous data fetching.



  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlider(parseInt(e.target.value));
  }

  const detectColorScheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 2; // Dark theme
    } else {
      return 1; // Light theme
    }
  };

  useEffect(() => {
    const initialTheme = detectColorScheme();
    setSlider(initialTheme);
    setCurrentTheme(themes[initialTheme - 1]);

    const colorSchemeListener = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 2 : 1;
      setSlider(newTheme);
      setCurrentTheme(themes[newTheme - 1]);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', colorSchemeListener);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', colorSchemeListener);
    };
  }, []);

  useEffect(() => {
    if (slider === 1) {
      setCurrentTheme(themes[0]);
      console.log('slider on position 0')
      // light
    } else if (slider === 2) {
      setCurrentTheme(themes[1]);
      console.log('slider on position 1')
      // dark
    }
  }, [slider])

  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to audio object

  const handlePlay = () => {
    if (audioRef.current) {
      // if (isPlaying) {
      audioRef.current.play();
      //   console.log('the audio has been played');
      // }
      // setIsPlaying(!isPlaying);
    } else {
      console.error("Audio file is not available.");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getDictionary(); // Trigger the dictionary API call
    }
  }

  const getDictionary = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      setAudio(response.data[0].phonetics[0].audio);
      setData(response.data[0]);
      setIsError404(false);
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 404) {
        setIsError404(true);
      } else {
        console.log('An unexpected error occurred:', error);
      }
    }
  }

  return (
    <div className={`${currentTheme.background} min-h-[100vh] pt-7 pb-3 flex justify-center`}>
      <div className='flex flex-col mobile:w-[80%] desktop:w-[60%] mobile:items-center tablet:items-center'>

        <Header
          slider={slider}
          handleSlider={handleSlider}
          currentTheme={currentTheme}
        />


        <InputBar
          handleInput={handleInput}
          handleEnterClick={handleEnterClick}
          input={input}
          setInput={setInput}
          currentTheme={currentTheme}
          getDictionary={getDictionary}
          isActive={isPlaying} // Add the isActive property
        />

        {data === '' && !isError404 ? (
          <p className={`${currentTheme.text} text-center desktop:text-[25px] tablet:text-[25px] mobile:text-[15px]`}>Enter a word above to get its definition 📜</p>
        ) : isError404 ? (
          <div className='flex flex-col justify-center items-center gap-4 w-[100%] desktop:mt-10'>
            <img
              src={Emoji}
              alt="a smiling, melting face emoji"
              className='w-[64px] h-[64px] mb-5'
            />
            <h1 className={`text-center text-[20px] ${currentTheme.noDefs} font-bold`}>
              No Definitions Found
            </h1>
            <p className='w-[75%] text-center text-(--medium-gray)'>
              Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.
            </p>
          </div>
        ) : (
          <>
            <audio ref={audioRef} src={audio}></audio>

            <PlayDiv
              currentTheme={currentTheme}
              data={data}
              handlePlay={handlePlay}
              isPlaying={isPlaying} // Add the isActive property
            />
            <Noun
              currentTheme={currentTheme}
              meanings={data?.meanings}
            />
            <Verb
              currentTheme={currentTheme}
              meanings={data?.meanings}
            />
            <Adjective
              currentTheme={currentTheme}
              data={data}
            />

            <div className={`${currentTheme.line} w-[98%] h-[1px] mt-5 mb-5`}></div>
            <div className='w-[98%] mobile:mb-6 tablet:mb-6 desktop:mb-7 desktop:flex desktop:flex-row desktop:justify-start desktop:items-center desktop:gap-7'>
              <p className='mb-1 text-(--medium-gray) text-[16px] tablet:text-[20px]'>Source</p>
              <a
                href={data[0]?.sourceUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={`${currentTheme.url} text-[16px] hover:underline hover:text-(--strong-purple) mobile:text-(--strong-purple)`}>
                  {data[0]?.sourceUrls[0] || 'Please type in a word to see the source url'}
                </p>
              </a>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default App
