import { ActionError } from '@/utils/error';
import { cookies } from 'next/headers';
import env from '@/utils/env';
import { User } from '@prisma/client';
import { prisma } from '@/utils/prisma';
import { jwtVerify, SignJWT } from 'jose';

/**
 * Récupère l'utilisateur à partir du JWT stocké dans les cookies.
 */
export const getUserFromJWT = async (): Promise<User | null> => {
  const authToken = cookies().get('auth-token')?.value;

  if (!authToken) {
    return null;
  }

  const decodedToken = await verifyJWT(authToken);

  if (!decodedToken || !decodedToken.userId) {
    return null;
  }

  console.log('Type of decodedToken.userId:', typeof decodedToken.userId);
  console.log('Decoded userId:', decodedToken.userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: 'cm2cgcwgd00008ocvmuhdxbjg',
      },
    });

    if (!user) {
      throw new Error('Aucun utilisateur trouvé pour ce token.');
    }

    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};

/**
 * Vérifie le JWT et renvoie le payload décodé ou `null` en cas d'erreur
 * @param token Le token JWT à vérifier
 * @returns Le payload décodé ou `null` en cas d'erreur
 */
export const verifyJWT = async (token: string): Promise<never | null> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET),
    );
    return payload;
  } catch (e) {
    if (env.NODE_ENV === 'development') {
      console.error('Erreur lors de la vérification du JWT:', e);
    }
    return null;
  }
};

/**
 * Permet de créer un JWT avec un userId en payload et une expiration de 7 jours (par défaut)
 * @param userId L'id de l'utilisateur
 * @param expiration La date d'expiration du token (par défaut 7 jours)
 */
export const createJWT = async (userId: string, expiration?: string) => {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiration || '7d')
    .sign(new TextEncoder().encode(env.JWT_SECRET));
};

/**
 * Définit un cookie d'authentification avec le JWT.
 * @param token Le token JWT à définir dans les cookies
 */
export const setAuthCookie = (token: string) => {
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
  });
};

/**
 * Permet de vérifier que le mot de passe fourni respecte les critères de sécurité suivants :
 * - Au moins 8 caractères
 * - Au moins une lettre minuscule
 * - Au moins une lettre majuscule
 * - Au moins un chiffre
 * - Au moins un caractère spécial
 * @param password Le mot de passe à vérifier
 * @throws Error avec un message expliquant ce qui manque
 */
export const checkPassStrength = (password: string) => {
  if (password.length < 8) {
    throw new ActionError(
      'Le mot de passe doit contenir au moins 8 caractères.',
    );
  }

  if (!/[a-z]/.test(password)) {
    throw new ActionError(
      'Le mot de passe doit contenir au moins une lettre minuscule.',
    );
  }

  if (!/[A-Z]/.test(password)) {
    throw new ActionError(
      'Le mot de passe doit contenir au moins une lettre majuscule.',
    );
  }

  if (!/\d/.test(password)) {
    throw new ActionError('Le mot de passe doit contenir au moins un chiffre.');
  }

  if (!/[@$!%*?&]/.test(password)) {
    throw new ActionError(
      'Le mot de passe doit contenir au moins un caractère spécial suivant : @$!%*?&',
    );
  }

  return true; // Si tous les critères sont remplis
};
