'use server';

import { ActionError } from '@/utils/error';
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';
import { RoleType } from '@prisma/client';

export const workspaceAddAction = async (formData: FormData) => {
  // TODO : Vérifier le user et ses droits et l'insérer dans la création du workspaceUser

  const name = formData.get('name') as string;

  if (!name) {
    throw new ActionError(
      'Pour créer un workspace, vous devez au moins fournir un nom',
    );
  }

  if (name.length < 3) {
    throw new ActionError(
      'Le nom du workspace doit contenir au moins 3 caractères',
    );
  }

  if (name.length > 30) {
    throw new ActionError(
      'Le nom du workspace ne doit pas dépasser 30 caractères',
    );
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const data = {
        name,
      };

      const workspace = await prisma.workspace.create({ data });

      const workspaceUser = await prisma.workspaceUser.create({
        data: {
          role: RoleType.FOUNDER,
          workspace: {
            connect: { id: workspace.id },
          },
          user: {
            connect: { id: 'cm2c2q549008m0ckx9zhzbwxs' },
          },
        },
      });

      return {
        workspace,
        workspaceUser,
      };
    });

    revalidatePath('/');

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    throw new ActionError(
      'Une erreur est survenue lors de la création du workspace.',
    );
  }
};
