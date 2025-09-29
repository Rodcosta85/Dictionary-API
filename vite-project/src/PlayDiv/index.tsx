import { useState } from 'react'

interface playDivProps {

  data: [
    {
      word: string,
      phonetic: string,
      phonetics: Array<{
        text: string,
        audio: string
      }>
    }
  ]
  currentTheme: { word: string, }
  handlePlay: () => void,
  isPlaying: boolean,
}

const index: React.FC<playDivProps> = ({ currentTheme, data, handlePlay, isPlaying }) => {

  const [imageSrc, setImageSrc] = useState<string>('/icon-play.svg');

  return (
    <div className='flex flex-col w-full gap-4 mb-[28px] tablet:mb-[40px] '>
      <div className='w-full h-[68px] flex flex-row items-center justify-between gap-'>
        <div className='flex flex-col gap-[2px]'>
          <h1 className={`${currentTheme.word} text-[32px] tablet:text-[50px] font-bold`}>{data[0]?.word}</h1>
          <h2 className='text-(--lighter-purple) text-[22px]'>{data[0]?.phonetic || data[0]?.phonetics[0]?.text}</h2>
        </div>
        <button
          onClick={handlePlay}
          onMouseEnter={() => { setImageSrc('/icon-white-play.svg') }}
          onMouseLeave={() => { setImageSrc('/icon-play.svg') }}
          className='w-[50px] h-[50px] tablet:w-[75px] tablet:h-[75px] rounded-[50%] flex justify-center items-center cursor-pointer'>
          <img
            src={imageSrc}
            alt="a play symbol, just like in audio devices"
          />
        </button>
      </div>
      <p className='text-red-500 text-[10px] text-right'>{isPlaying ? 'There is no audio for this word, please try another one' : ''}</p>
    </div>
  )
}

export default index