export type PortfolioCategory =
  | "Retratos"
  | "Casais"
  | "Eventos"
  | "Ensaios externos"
  | "Momentos especiais";

export type PortfolioItem = {
  src: string;
  alt: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  width: number;
  height: number;
  objectPosition: string;
  featured?: boolean;
};

export const portfolioCategories: Array<"Todos" | PortfolioCategory> = [
  "Todos",
  "Retratos",
  "Casais",
  "Eventos",
  "Ensaios externos",
  "Momentos especiais",
];

export const portfolioItems: PortfolioItem[] = [
  {
    src: "/images/portfolio/retrato-pintura-rosto.png",
    alt: "Retrato artístico de uma jovem com pequenas pinturas coloridas no rosto.",
    category: "Retratos",
    title: "Cor em silêncio",
    description: "Retrato autoral com direção sensível e presença pictórica.",
    width: 371,
    height: 497,
    objectPosition: "center center",
    featured: true,
  },
  {
    src: "/images/portfolio/ensaio-externo-lago.png",
    alt: "Fotógrafa registrando uma mulher próxima a um lago arborizado.",
    category: "Ensaios externos",
    title: "Jardim em movimento",
    description: "Ensaio externo com luz natural e composição documental.",
    width: 310,
    height: 471,
    objectPosition: "center center",
  },
  {
    src: "/images/portfolio/momento-celebre-vida.png",
    alt: "Mulher sorrindo ao lado de um bolo e balões em uma decoração de aniversário.",
    category: "Momentos especiais",
    title: "Celebre a vida",
    description: "Uma cena de celebração com carinho, presença e luz delicada.",
    width: 490,
    height: 626,
    objectPosition: "center center",
    featured: true,
  },
  {
    src: "/images/portfolio/edicao-lightroom.png",
    alt: "Tela de edição fotográfica mostrando um retrato em ambiente externo.",
    category: "Eventos",
    title: "Depois da luz",
    description: "Tratamento de cor com cuidado para preservar pele e atmosfera.",
    width: 797,
    height: 457,
    objectPosition: "center center",
  },
  {
    src: "/images/portfolio/camera-autorretrato.png",
    alt: "Tela de uma câmera Canon mostrando um autorretrato com a câmera.",
    category: "Retratos",
    title: "Olhar de volta",
    description: "A câmera também registra quem escolhe ver o mundo com atenção.",
    width: 363,
    height: 497,
    objectPosition: "center center",
  },
  {
    src: "/images/birthday/pintura-ceu.png",
    alt: "Pessoa segurando pincel e paleta diante de um céu claro ao entardecer.",
    category: "Momentos especiais",
    title: "Antes do céu abrir",
    description: "Uma cena íntima onde arte, gesto e luz se encontram.",
    width: 371,
    height: 497,
    objectPosition: "center center",
  },
];
