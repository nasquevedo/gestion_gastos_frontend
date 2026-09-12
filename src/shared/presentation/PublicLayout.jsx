import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../features/auth/presentation/useAuth.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useTheme } from '../theme/ThemeProvider.jsx';
import { Button } from './Button.jsx';

export function PublicLayout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">◈</span> {t('appName')}
        </Link>
        <nav className="topbar__nav" aria-label="Principal">
          <NavLink to="/">{t('nav.home')}</NavLink>
          {isAuthenticated ? <NavLink to={`/app/users/${user?.id ?? 'me'}/dashboard`}>{t('nav.dashboardClean')}</NavLink> : null}          
          {isAuthenticated ? <NavLink to={`/app/users/${user?.id ?? 'me'}/goals`}>{t('nav.goals')}</NavLink> : null}          
          {isAuthenticated ? <NavLink to={`/app/users/${user?.id ?? 'me'}/budgets`}>{t('nav.budgets')}</NavLink> : null}
          {isAuthenticated ? <NavLink to={`/app/users/${user?.id ?? 'me'}/invoices`}>{t('nav.invoices')}</NavLink> : null}
          {!isAuthenticated ? <NavLink to="/login">{t('nav.login')}</NavLink> : null}
          {!isAuthenticated ? <NavLink to="/registro">{t('nav.register')}</NavLink> : null}
        </nav>
        <div className="topbar__actions">
          <select className="locale-select" aria-label="Idioma" value={locale} onChange={(event) => setLocale(event.target.value)}>
            <option value="es">{t('language.es')}</option>
            <option value="en">{t('language.en')}</option>
          </select>
          <Button type="button" variant="ghost" aria-label="Cambiar tema" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          {isAuthenticated ? (
            <Button type="button" variant="secondary" onClick={logout}>
              {t('nav.logout')}
            </Button>
          ) : null}
        </div>
      </header>
      {children}
    </div>
  );
}
