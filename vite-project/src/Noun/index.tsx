interface nounProps {
    currentTheme: {
        type: string;
        line: string;
        meanSyn: string;
        text: string;
    };
    meanings: Array<{
        partOfSpeech: string;
        definitions: Array<{
            definition: string;
        }>;
        synonyms?: string[];
    }>;
}




const index: React.FC<nounProps> = ({ currentTheme, meanings }) => {

    const hasNoun = meanings?.some(item => item.partOfSpeech === "noun");
    console.log(hasNoun)
    const data = meanings?.find(item => hasNoun ? item.partOfSpeech === "noun" : item.partOfSpeech === "verb");
    console.log(data);


    return (
        <>
            <div className='w-[100%] desktop:w-[98%] h-[71px] mb-1 flex flex-row justify-between items-center gap-[2px] tablet:gap-2'>
                <p className={`${currentTheme.type} mb-1 text-[18px] tablet:text-[24px] font-bold`}><i>noun</i></p>
                <div className={`${currentTheme.line} mobile:w-[78%] tablet:w-[90%] desktop:w-[95%] h-[1px]`}></div>
            </div>
            <p className={`${currentTheme.meanSyn} w-[95%] mb-5 desktop:mb-[25px] text-[16px] tablet:text-[20px] font-extralight`}>Meaning</p>
            <ul className={`${currentTheme.text} w-[95%] min-h mb-6 desktop:mb-[30px] flex flex-col justify-start list-disc marker:(--strong-purple)`}>
                {data?.definitions.map((definition: any, index: number) => (
                    <li
                        key={index}
                        className='ml-5 mobile:mb-[6px] tablet:ml-[35px] desktop:ml-[35px] desktop:mb-2'
                    >
                        {definition.definition || "No definition available"}
                    </li>
                ))}
            </ul>
            <div className='w-[100%] desktop:mb-[20px] flex flex-row justify-start tablet:items-center desktop:items-center gap-8'>
                <p className={`${currentTheme.meanSyn} text-[16px] tablet:text-[20px] font-extralight`}>Synonyms</p>
                <p className='tablet:w-[500px] text-(--lighter-purple) text-[16px] font-bold'>
                    {(data?.synonyms?.length ?? 0) > 0 ? data?.synonyms?.join(', ') : 'No results'}
                </p>
            </div>
        </>

    )
}

export default index