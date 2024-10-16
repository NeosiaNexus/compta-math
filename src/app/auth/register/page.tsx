import { RegisterForm } from '@/components/pages/Auth/Register/RegisterForm';

import styles from '../page.module.scss';

export default function AuthRegister() {
  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}
