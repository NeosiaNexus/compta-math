'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <p>Erreur globale</p>
      </body>
    </html>
  );
}
