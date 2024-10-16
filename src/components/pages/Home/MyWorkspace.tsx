import styles from './MyWorkspace.module.scss';
import { PiSealWarningFill } from 'react-icons/pi';
import Link from 'next/link';

export async function DashboardMyWorkspace() {
  return (
    <div className={styles.main}>
      <h4>
        Mes espaces
        <div className={styles.separator} />
      </h4>
      <div className={styles.noWorkspace}>
        <div className={styles.content}>
          <PiSealWarningFill />
          <p>Vous n&apos;avez aucun espace de travail.</p>
        </div>
        <div className={styles.button}>
          <Link href={'/dashboard/workspace/add'}>Créer un espace</Link>
        </div>
      </div>
    </div>
  );
}
