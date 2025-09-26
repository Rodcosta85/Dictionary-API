interface adjectiveProps {
    currentTheme: {
        type: string;
        line: string;
        meanSyn: string;
        text: string;
    };
    data: Array<{
        meanings: Array<{
            partOfSpeech: string;
            definitions: Array<{
                definition: string;
            }>;
            antonyms?: string[];
        }>;
    }>;
}

const index: React.FC<adjectiveProps> = ({ currentTheme, data }) => {
    return (
        <>
            <div className='w-[100%] desktop:w-[98%] h-[71px] mb-1 flex flex-row justify-between items-center gap-[2px] tablet:gap-2'>
                <p className={`${currentTheme.type} mb-1 text-[18px] tablet:text-[24px] font-bold`}><i>adjective</i></p>
                <div className={`${currentTheme.line} mobile:w-[78%] tablet:w-[90%] desktop:w-[95%] h-[1px]`}></div>
            </div>

            {data[0]?.meanings[0]?.partOfSpeech === 'adjective' || data[0]?.meanings[1]?.partOfSpeech === 'adjective' ?
                (
                    <>
                        <p className={`${currentTheme.meanSyn} w-[95%] mb-3 desktop:mb-[25px] text-[16px] tablet:text-[20px] font-extralight`}>Meaning</p>
                        <ul className={`${currentTheme.text} w-[95%] min-h mb-6 desktop:mb-[30px] flex flex-col justify-start list-disc marker:(--strong-purple)`}>
                            {data[0]?.meanings
                                ?.filter((meaning: any) => meaning.partOfSpeech === "adjective")
                                .map((meaning: any) => (
                                    meaning.definitions.map((definition: any, index: number) => (
                                        <li
                                            key={index}
                                            className='ml-5 mobile:mb-[6px] tablet:ml-[35px] desktop:ml-[35px] desktop:mb-2'
                                        >
                                            {definition.definition || "No definition available"}
                                        </li>
                                    ))
                                ))}
                        </ul>
                        <div className='mobile:w-[95%] mobile:mb-[30px] tablet:mb-[25px] desktop:mb-[20px] flex flex-row justify-start tablet:items-start desktop:items-start gap-8'>
                            <p className={`${currentTheme.meanSyn} text-[16px] tablet:text-[20px] font-extralight`}>Antonyms</p>
                            <p className='w-[100%] text-(--lighter-purple) text-[16px] font-bold'>
                                {((data[0]?.meanings[0]?.antonyms?.length || data[0]?.meanings[1]?.antonyms?.length) ?? 0) > 0 ? data[0]?.meanings[0]?.antonyms?.join(', ') || data[0]?.meanings[1]?.antonyms?.join(', ') : 'No results'}
                            </p>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <p className={`${currentTheme.text} w-[95%] mb-5`}>
                            Sorry, there is no adjective definition available for this word. Please try another one.
                        </p>
                    </>

                )
            }

        </>
    )
}

export default index