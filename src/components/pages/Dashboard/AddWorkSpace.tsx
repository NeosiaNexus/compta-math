import { TbLayoutGridAdd } from 'react-icons/tb';

import styles from './AddWorkSpace.module.scss';
import Link from 'next/link';

export const AddWorkSpace = () => {
  return (
    <div className={styles.container}>
      <Link href={'/dashboard/workspace/add'} className={styles.main}>
        <div>
          <h4>Ajouter un espace de travail</h4>
        </div>
        <TbLayoutGridAdd />
      </Link>
    </div>
  );
};
