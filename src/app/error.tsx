'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <p>Erreur normale</p>;
}
