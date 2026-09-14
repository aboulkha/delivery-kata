export default function LanguageSwitcher({ locale, onChangeLocale, languageLabel }) {
  return (
    <div className="language-switcher" aria-label={languageLabel}>
      <button
        className={locale === 'en' ? 'lang-btn active' : 'lang-btn'}
        onClick={() => onChangeLocale('en')}
        type="button"
      >
        EN
      </button>
      <button
        className={locale === 'fr' ? 'lang-btn active' : 'lang-btn'}
        onClick={() => onChangeLocale('fr')}
        type="button"
      >
        FR
      </button>
    </div>
  )
}
