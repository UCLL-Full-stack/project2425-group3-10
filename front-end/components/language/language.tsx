import { useRouter } from 'next/router';

const Language: React.FC = () => {
    const router = useRouter();
    const {locale, pathname, asPath, query} = router;
    const handleLanguageChange = (event: { target: { value: string; }; }) => {
        const newLocale = event.target.value;
        router.push({ pathname, query}, asPath, {locale: newLocale});
    }
    return(
        <div>
            <label htmlFor="language" className="text-white">
                Language:
            </label>
            <select
                name="language"
                id="language"
                value={locale}
                onChange={handleLanguageChange}>
                className="bg-gray-800 text-black"
                <option className="text-black" value="en">English</option>
                <option className="text-black" value="nl">Nederlands</option>
            </select>
        </div>

    )
}
export default Language;