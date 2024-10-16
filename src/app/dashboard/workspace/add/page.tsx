'use client';

import React from 'react';

import { workspaceAddAction } from '@/action/workspace/workspace-add-action';
import { toast } from 'sonner';

import { MdDriveFileRenameOutline } from 'react-icons/md';

import { LoadSpinner } from '@/components/ui/LoaderSpinner/LoadSpinner';
import { ClassicInput } from '@/components/ui/Inputs/ClassicInput';

import styles from './page.module.scss';

export default function DashboardWorkspaceAdd() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    workspaceAddAction(formData)
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            'Une erreur est survenue lors de la création du workspace',
          );
        }
        if (error.message) {
          toast.error(error.message);
          return;
        }
        toast.error('Une erreur est survenue lors de la création du workspace');
      })
      .then((result) => {
        if (result?.workspace.name) {
          toast.success(
            `Le workspace "${result.workspace.name}" a bien été créé`,
          );
          return;
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.main}>
        <div className={styles.head}>
          <h3>Créer un Workspace</h3>
          <p>Restez à jour sur vos comptes et dépenses</p>
        </div>
        <ClassicInput
          displayName={'Nom du workspace 2'}
          type={'text'}
          Icon={MdDriveFileRenameOutline}
          placeholder={'Ex: Vacances à Milan'}
          name={'name'}
          loading={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? <LoadSpinner /> : 'Créer'}
        </button>
      </form>
    </div>
  );
}
