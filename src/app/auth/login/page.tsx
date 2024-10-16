import { LoginForm } from '@/components/pages/Auth/Login/LoginForm';

import styles from '../page.module.scss';

export default function AuthLogin() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
