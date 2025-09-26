interface Definition {
    definition: string;
    example?: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

interface VerbProps {
    meanings: Meaning[];
    currentTheme: {
        type: string;
        text: string;
        line: string;
        meanSyn: string;
    };
}


const index: React.FC<VerbProps> = ({ currentTheme, meanings }) => {

    const hasVerb = meanings.some(item => item.partOfSpeech === "verb");
    const data = meanings.find(item => hasVerb ? item.partOfSpeech === "verb" : item.partOfSpeech === "noun");

    return (
        <>
            <div className='w-[100%] desktop:w-[98%] h-[71px] mb-1 flex flex-row justify-between items-center gap-[2px] tablet:gap-2'>
                <p className={`${currentTheme.type} mb-1 text-[18px] tablet:text-[24px] font-bold`}><i>verb</i></p>
                <div className={`${currentTheme.line} mobile:w-[78%] tablet:w-[90%] desktop:w-[95%] h-[1px]`}></div>
            </div>
            {hasVerb ?
                (
                    <>
                        <p className={`${currentTheme.meanSyn} w-[95%] mb-5 desktop:mb-[25px] text-[16px] tablet:text-[20px] font-extralight`}>Meaning</p>
                        <ul className={`${currentTheme.text} w-[95%] min-h mb-6 desktop:mb-[30px] flex flex-col justify-start list-disc marker:(--strong-purple)`}>
                            {data?.definitions.map((definition: Definition, index: number) => (
                                <li
                                    key={index}
                                    className='ml-5 mobile:mb-[6px] tablet:ml-[35px] desktop:ml-[35px] desktop:mb-2'
                                >
                                    {definition.definition || "No definition available"}
                                </li>
                            ))}
                        </ul>
                        <div className='w-[98%] desktop:mb-[40px] min-h-[30px] mb-10 flex flex-col gap-3'>
                            <p className='text-(--medium-gray) text-[16px]'>
                                "{meanings[0]?.definitions[0]?.example || meanings[1]?.definitions[0]?.example}"
                            </p>
                            <p className='text-(--medium-gray) text-[16px]'>
                                "{meanings[0]?.definitions[1]?.example || meanings[1]?.definitions[1]?.example}"
                            </p>
                        </div>
                    </>
                ) : (
                    <p className={`${currentTheme.text} mobile:w-[327px] tablet:w-[600px] desktop:w-[730px] mb-5`}>
                        Sorry, there is no verb definition available for this word. Please try another one.
                    </p>
                )
            }
        </>
    )
}

export default index