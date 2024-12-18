import { useRouter } from 'next/router';

const Language: React.FC = () => {
    const router = useRouter();
    const {locale, pathname, asPath, query} = router;
    const handleLanguageChange = (event: { target: { value: string; }; }) => {
        const newLocale = event.target.value;
        router.push({pathname, query}, asPath, {locale: newLocale});
    }
    return(
        <div>
            <label htmlFor="language" className="white">
                Language:
            </label>
            <select
                name="language"
                id="language"
                value={locale}
                onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
            </select>
        </div>

    )
}