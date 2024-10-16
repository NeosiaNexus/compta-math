'use client';

import React from 'react';

import { workspaceAddAction } from '@/action/workspace-add-action';
import { toast } from 'sonner';

import { MdDriveFileRenameOutline } from 'react-icons/md';

import styles from './page.module.scss';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;
import { LoadSpinner } from '@/components/ui/LoaderSpinner/LoadSpinner';

export default function DashboardWorkspaceAdd() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    workspaceAddAction(formData)
      .catch((error) => {
        if (error.message) {
          toast.error(error.message);
          return;
        }
        if (process.env.NODE_ENV === 'development') {
          console.error(
            'Une erreur est survenue lors de la création du workspace',
          );
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
          <h5>Restez à jour sur vos comptes et dépenses</h5>
        </div>
        <div className={styles.content}>
          <label className={styles.labelContainer}>
            <div className={styles.label}>
              <span className={styles.icon}>
                <MdDriveFileRenameOutline />
              </span>
              <span className={styles.name}>Nom du workspace</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder={'Ex: Vacances à Milan'}
              disabled={loading}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <LoadSpinner /> : 'Créer'}
        </button>
      </form>
    </div>
  );
}
