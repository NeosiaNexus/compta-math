'use server';

import styles from './page.module.scss';
import { AddWorkSpace } from '@/components/pages/Dashboard/AddWorkSpace';
import { DashboardMyWorkspace } from '@/components/pages/Dashboard/MyWorkspace';

export default async function DashboardHome() {
  return (
    <main className={styles.main}>
      <AddWorkSpace />
      <DashboardMyWorkspace />
    </main>
  );
}
