// Glifos de interface (não configuráveis): menu, fechar, mais, redes e WhatsApp.
// Sempre decorativos e na cor do texto (currentColor).

interface Props {
  tamanho?: number;
}

const base = (tamanho: number) => ({
  width: tamanho,
  height: tamanho,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
});

const traco = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function GlifoMenu({ tamanho = 24 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <path {...traco} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function GlifoFechar({ tamanho = 24 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <path {...traco} d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function GlifoMais({ tamanho = 22 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <path {...traco} d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function GlifoWhatsapp({ tamanho = 22 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <path
        fill="currentColor"
        d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.3 20.8l4.6-1.2A8.7 8.7 0 1 0 12 3.2Zm0 1.6a7.1 7.1 0 1 1-3.9 13l-.3-.2-2.4.6.6-2.3-.2-.3A7.1 7.1 0 0 1 12 4.8Zm-2.6 3.1c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.200 0 1.300.9 2.500 1.100 2.700.1.200 1.900 3 4.600 4 2.200.800 2.600.700 3.100.600.500-.1 1.600-.7 1.800-1.300.2-.6.2-1.200.2-1.300-.1-.1-.3-.2-.6-.4-.3-.1-1.600-.8-1.800-.9-.2-.1-.4-.1-.6.1-.2.300-.7.900-.8 1-.2.200-.3.200-.6.100-.3-.1-1.100-.4-2.100-1.300-.8-.7-1.300-1.500-1.500-1.800-.2-.3 0-.4.1-.6l.4-.5c.1-.1.100-.3.200-.4 0-.2 0-.3-.1-.4-.1-.2-.6-1.600-.9-2.100Z"
      />
    </svg>
  );
}

export function GlifoInstagram({ tamanho = 22 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <rect {...traco} strokeWidth={1.8} x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle {...traco} strokeWidth={1.8} cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function GlifoFacebook({ tamanho = 22 }: Props) {
  return (
    <svg {...base(tamanho)}>
      <path
        fill="currentColor"
        d="M13.6 21v-7.8h2.6l.4-3.100h-3V8.200c0-.9.3-1.500 1.600-1.500h1.600V3.900c-.3 0-1.200-.1-2.300-.1-2.300 0-3.900 1.400-3.900 4v2.300H8v3.100h2.600V21h3Z"
      />
    </svg>
  );
}
