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
  isPlaying: boolean
}

const index: React.FC<playDivProps> = ({ currentTheme, data, handlePlay }) => {

  const [imageSrc, setImageSrc] = useState<string>('/icon-play.svg');



  return (
    <div className='w-[100%] h-[68px] mb-[28px] tablet:mb-[40px] flex flex-row justify-between items-center gap-[130px]'>
      <div className='flex flex-col gap-[2px]'>
        <h1 className={`${currentTheme.word} text-[32px] tablet:text-[50px] font-bold`}>{data[0]?.word || 'Word'}</h1>
        <h2 className='text-(--lighter-purple) text-[22px]'>{data[0]?.phonetic || data[0]?.phonetics[0]?.text || 'phonetic'}</h2>
      </div>
      <button
        onClick={handlePlay}
        onMouseEnter={() => {setImageSrc('/icon-white-play.svg')}}
        onMouseLeave={() => {setImageSrc('/icon-play.svg')}}
        className='w-[50px] h-[50px] tablet:w-[75px] tablet:h-[75px] rounded-[50%] flex justify-center items-center cursor-pointer'>
        <img
          src={imageSrc}
          alt="a play symbol, just like in audio devices"
        />
      </button>
    </div>
  )
}

export default index