import { useTranslation } from 'react-i18next';
import notFound from '../images/notFound.png';

const Notfound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center bg-light flex-grow-1">
      <img src={notFound} alt={t('notFound.title')} className="h-100" />
      <h1 className="h-4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.feedback')}
        {' '}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default Notfound;
