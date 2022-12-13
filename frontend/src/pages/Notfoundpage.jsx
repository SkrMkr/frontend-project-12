import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Notfound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-container">
      {t('notFound.title')}
      <Link to="/">{t('notFound.link')}</Link>
    </div>
  );
};

export default Notfound;
