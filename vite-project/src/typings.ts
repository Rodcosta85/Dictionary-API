export interface phoneticsArr {
    phonetics: [
        {
            text: string,
            audio: string 
        },
        {
           text: string,
           audio: string 
        }
    ]
}

export interface MeaningsArr {
    meanings: [
        {
            antonyms: [string],
            definitions: [string],
            partOfSpeech: string,
            synonyms: [string]
        }
    ]
}

export interface Sources {
    sources: [string]
}

export interface apiProps {
    word: string,
    phonetic: string,
    phonetics: [],
    meanings: []
    sourceUrls: []
}