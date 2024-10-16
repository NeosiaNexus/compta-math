'use server';

import { ActionError } from '@/utils/error';
import { checkPassStrength, createJWT, setAuthCookie } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { hashSync } from 'bcrypt-ts';

export const authRegisterAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const pseudo = formData.get('pseudo') as string;
  const password = formData.get('passwordHash') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!email) {
    throw new ActionError('Vous devez renseigner une adresse e-mail valide.');
  }

  if (!pseudo) {
    throw new ActionError('Vous devez renseigner un pseudonyme.');
  }

  if (!password) {
    throw new ActionError('Vous devez renseigner un mot de passe.');
  }

  if (!confirmPassword) {
    throw new ActionError('Vous devez confirmer votre mot de passe.');
  }

  if (password !== confirmPassword) {
    throw new ActionError('Les mots de passe ne correspondent pas.');
  }

  checkPassStrength(password);

  const existingUserByMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUserByMail) {
    throw new ActionError('Un utilisateur avec cette e-mail existe déjà.');
  }

  const existingUserByPseudo = await prisma.user.findUnique({
    where: {
      pseudo,
    },
  });

  if (existingUserByPseudo) {
    throw new ActionError('Un utilisateur avec ce pseudo existe déjà.');
  }

  const passwordHash = hashSync(password, 10);

  const data = {
    email,
    pseudo,
    passwordHash,
  };

  const user = await prisma.user.create({ data });

  const jwt = createJWT(user.id, '7d');

  setAuthCookie(jwt);

  return user;
};
