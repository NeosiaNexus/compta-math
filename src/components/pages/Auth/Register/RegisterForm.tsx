'use client';

import React, { useState } from 'react';

import {
  MdAlternateEmail,
  MdDriveFileRenameOutline,
  MdOutlinePassword,
} from 'react-icons/md';

import { ClassicInput } from '@/components/ui/Inputs/ClassicInput';

import Link from 'next/link';

import styles from '../Auth.module.scss';
import { authRegisterAction } from '@/action/auth/auth-register-action';
import { toast } from 'sonner';
import { User } from '@prisma/client';

export const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    authRegisterAction(formData)
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            'Une erreur est survenue lors de la création du compte',
          );
        }
        if (error.message) {
          toast.error(error.message);
          return;
        }
        toast.error('Une erreur est survenue lors de la création du compte');
        return;
      })
      .then((result) => {
        if (result?.email) {
          toast.success(
            'Votre compte a bien été créé, vous allez être redirigé',
          );
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div className={styles.head}>
        <h3>Inscription</h3>
        <p>Créez votre compte en quelques secondes</p>
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
          displayName={'Pseudonyme'}
          name={'pseudo'}
          Icon={MdDriveFileRenameOutline}
          type={'text'}
          loading={loading}
          placeholder={'Ex: BigMaath'}
        />
        <ClassicInput
          displayName={'Mot de passe'}
          name={'passwordHash'}
          Icon={MdOutlinePassword}
          type={'password'}
          loading={loading}
          placeholder={'Ex: Kd58*!dD'}
        />
        <ClassicInput
          displayName={'Confirmer le mot de passe'}
          name={'confirmPassword'}
          Icon={MdOutlinePassword}
          type={'password'}
          loading={loading}
          placeholder={'Ex: Kd58*!dD'}
        />
      </div>
      <Link href={'/auth/login'} className={styles.link}>
        Vous avez déjà un compte ? Connectez-vous.
      </Link>
      <button className={styles.submitBtn}>
        {loading ? 'Chargement...' : "S'inscrire"}
      </button>
    </form>
  );
};
