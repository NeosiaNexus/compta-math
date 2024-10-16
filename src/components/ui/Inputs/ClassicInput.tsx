import React, { useState } from 'react';

import styles from './ClassicInput.module.scss';
import { FaEye, FaEyeSlash, FaQuestion } from 'react-icons/fa';

interface ClassicInputProps {
  displayName: string;
  name: string;
  loading?: boolean;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  Icon?: React.ComponentType;
}

export const ClassicInput = ({
  displayName,
  name,
  loading = false,
  type = 'text',
  placeholder,
  Icon,
}: ClassicInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={styles.main}>
      <div className={styles.inputContainer}>
        <div className={styles.head}>
          <span className={styles.icon}>
            {Icon ? <Icon /> : <FaQuestion />}
          </span>
          <span className={styles.name}>{displayName}</span>
        </div>
        <div className={styles.inputSpace}>
          <input
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            name={name}
            placeholder={placeholder}
            disabled={loading}
          />
          {type === 'password' && (
            <button
              type="button"
              className={styles.passwordVisibility}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
