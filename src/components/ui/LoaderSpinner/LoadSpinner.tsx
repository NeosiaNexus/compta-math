'use client';

import { FaSpinner } from 'react-icons/fa';

import styles from './LoadSpinner.module.scss';

export const LoadSpinner = () => {
  return (
    <span className={styles.main}>
      <FaSpinner />
    </span>
  );
};
