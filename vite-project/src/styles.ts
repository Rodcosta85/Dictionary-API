import GrayMoon from '/icon-moon.svg';
import PurpleMoon from '/icon-purple-moon.svg';
import LogoGray from '/logo.svg';
import LogoPurple from '/logo-purple.svg';


const themes = [
    // como as propriedades do obj "themes" serão interpoladas e interpretadas como 
    // propriedades do tailwind, elas precisam seguir as regras de nomenclatura do tailwind.
    {
        inputBG: 'bg-(--medium-gray)',
        imgSrc: GrayMoon,
        logo: LogoGray,
        background: "bg-white",
        input: "bg-(--off-white)",
        placeholder: "placeholder:text-slate-900/30",
        text: "text-(--different-gray)",
        word: "text-(--different-gray)",
        type: "text-(--different-gray)",
        url: "text-(--different-gray)",
        line: "bg-(--off-white)",
        meanSyn: "text-(--medium-gray)",
        noDefs: "text-(--almost-black)"
    },
    {
        inputBG: 'bg-(--lighter-purple)',
        imgSrc: PurpleMoon,
        logo: LogoPurple,
        background: "bg-(--almost-black)",
        input: "bg-(--very-dark-gray)",
        placeholder: "placeholder:text-slate-200/30",
        text: "text-white",
        word: "text-white",
        type: "text-white",
        url: "text-white",
        line: "bg-(--dark-gray)",
        meanSyn: "text-(--medium-gray)",
        noDefs: "text-white"
    }
]

export default themes;