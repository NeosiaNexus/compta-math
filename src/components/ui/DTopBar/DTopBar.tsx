import { IoIosMenu } from 'react-icons/io';

import Image from 'next/image';
import Link from 'next/link';

import styles from './DTopBar.module.scss';

export default function DTopBar() {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <IoIosMenu />
      </div>
      <div className={styles.center}>
        <Link href={'/dashboard'}>
          <h3>ComptaMath</h3>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.imgContainer}>
          <Image
            src={'/images/no-avatar.png'}
            alt={"Avatar de l'utilisateur"}
            width={2048}
            height={2048}
          />
        </div>
      </div>
    </div>
  );
}
