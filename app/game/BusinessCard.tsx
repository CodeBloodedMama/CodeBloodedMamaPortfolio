'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
  onClose: () => void;
  copy: (t: string) => void;
  pdfHref?: string;
  cvHref?: string;
 
};

export default function BusinessCard({
  onClose,
  copy,
  pdfHref = '/Elisabeth_Lennert_BusinessCard.pdf',
  cvHref = '/Elisabeth_Lennert_CV.pdf',

}: Props) {
  // Data (du kan flytte til props hvis du vil)
  const name = 'Elisabeth Lennert';
  const title = 'B.Eng Software Technology — Full-stack / Frontend';

  const lines = useMemo(
    () => [
      {
        label: 'Email',
        value: 'ElisabethBinzerLennert@gmail.com',
        href: 'mailto:ElisabethBinzerLennert@gmail.com',
        icon: '✉️',
      },
      {
        label: 'Telefon',
        value: '+45 5252 4602',
        // klik ringer direkte på mobil
        href: 'tel:+4552524602',
        icon: '📞',
      },
      {
        label: 'GitHub',
        value: 'github.com/CodeBloodedMama',
        href: 'https://github.com/CodeBloodedMama',
        icon: '💻',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/E-Lennert',
        href: 'https://linkedin.com/in/E-Lennert',
        icon: '🔗',
      },
      {
        label: 'Website',
        value: 'e-lennert.vercel.app',
        href: 'https://e-lennert.vercel.app',
        icon: '🌐',
      },
      {
        label: 'Lokation',
        value: 'Aarhus, DK',
        icon: '📍',
      },
    ],
    []
  );



  return (
    <div
      // Kort-container: responsiv bredde + ægte visitkort-forhold 86x54 (mm)
      className="relative w-[min(92vw,720px)]"
      style={{ aspectRatio: '86 / 54' }}
    >
      {/* Luk-knap */}
      <button
        onClick={onClose}
        aria-label="Luk"
        className="absolute right-2 top-2 z-10 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20"
      >
        ✕
      </button>

      {/* Selve kortet */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white text-slate-900 shadow-2xl">
        {/* Subtilt mønster / brand-stribe i højre side */}
        <div
          className="absolute inset-y-0 right-0 w-[36%] md:w-[32%]"
          style={{
            background:
              'linear-gradient(160deg, rgba(109,53,255,0.12) 0%, rgba(255,60,172,0.12) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-60 w-60 -translate-y-1/2 rounded-full md:block"
          style={{
            background:
              'radial-gradient(closest-side, rgba(109,53,255,0.22), transparent 70%)',
            filter: 'blur(12px)',
          }}
        />

        {/* Indhold: venstre (tekst) + højre (branding/QR) */}
        <div className="relative grid h-full grid-cols-[1fr,0.9fr] gap-3 p-4 md:grid-cols-[1fr,0.8fr] md:gap-6 md:p-6">
          {/* Venstre kolonne */}
          <div className="flex min-w-0 flex-col justify-between">
            <div className="min-w-0">
              {/* Top: avatar + navn */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-black/10 md:h-12 md:w-12">
                  {/* Hvis du ikke har /avatar.jpg, kan du skifte til monogram-badge nedenfor */}
                  <Image
                    src="/avatar.jpg"
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold md:text-xl">
                    {name}
                  </h2>
                  <p className="truncate text-xs text-slate-600 md:text-sm">
                    {title}
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="my-3 h-px w-full bg-slate-200 md:my-4" />

              {/* Kontaktlinjer */}
              <ul className="grid grid-cols-1 gap-1.5 text-[13px] md:gap-2 md:text-sm">
                {lines.map((l) => (
                  <li
                    key={l.label}
                    className="group grid grid-cols-[20px,98px,1fr,auto] items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50 md:rounded-xl md:px-2"
                  >
                    <span className="select-none text-base leading-none md:text-lg">
                      {l.icon}
                    </span>
                    <span className="truncate font-medium text-slate-700">
                      {l.label}
                    </span>
                    <span className="truncate text-slate-700/90">
                      {l.href ? (
                        <Link
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="underline decoration-slate-300 underline-offset-[3px] hover:decoration-slate-800"
                        >
                          {l.value}
                        </Link>
                      ) : (
                        l.value
                      )}
                    </span>
                    <button
                      onClick={() => copy(l.value)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      aria-label={`Kopiér ${l.label}`}
                    >
                      Kopiér
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Knapper (download) */}
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href={pdfHref}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                ⬇ Download Business Card (PDF)
              </a>
              <a
                href={cvHref}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                ⬇ Download CV (PDF)
              </a>
            </div>
          </div>

      

          </div>
        </div>
      </div>
  );
}

