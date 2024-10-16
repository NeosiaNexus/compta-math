'use client';

import React, { useState } from 'react';

import {
  MdAlternateEmail,
  MdDriveFileRenameOutline,
  MdOutlinePassword,
} from 'react-icons/md';

import { ClassicInput } from '@/components/ui/Inputs/ClassicInput';

import styles from '../Auth.module.scss';

import Link from 'next/link';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div className={styles.head}>
        <h3>Connexion</h3>
        <p>C&apos;est un plaisir de te revoir</p>
      </div>
      <div className={styles.rows}>
        <ClassicInput
          displayName={'Adresse e-mail'}
          name={'email'}
          Icon={MdAlternateEmail}
          type={'email'}
          loading={loading}
          placeholder={'Ex: example@gmail.com'}
        />
        <ClassicInput
          displayName={'Mot de passe'}
          name={'password'}
          Icon={MdOutlinePassword}
          type={'password'}
          loading={loading}
          placeholder={'Ex: Kd58*!dD'}
        />
      </div>
      <Link href={'/auth/register'} className={styles.link}>
        Vous n&apos;avez pas de compte ? Inscrivez-vous.
      </Link>
      <button className={styles.submitBtn}>
        {loading ? 'Chargement...' : 'Connexion'}
      </button>
    </form>
  );
};
