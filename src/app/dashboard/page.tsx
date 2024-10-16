'use server';

import styles from './page.module.scss';
import { AddWorkSpace } from '@/components/pages/Home/AddWorkSpace';
import { DashboardMyWorkspace } from '@/components/pages/Home/MyWorkspace';

export default async function DashboardHome() {
  return (
    <main className={styles.main}>
      <AddWorkSpace />
      <DashboardMyWorkspace />
    </main>
  );
}
