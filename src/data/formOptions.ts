export interface Niche {
  id: string;
  name: string;
  subniches: string[];
}

export const NICHES: Niche[] = [
  {
    id: "tecnologia",
    name: "Tecnologia & Inovação",
    subniches: ["SaaS (Software as a Service)", "E-commerce", "Aplicativo Mobile", "Serviços de TI / Suporte", "Inteligência Artificial & Dados"]
  },
  {
    id: "saude",
    name: "Saúde & Bem-estar",
    subniches: ["Clínica / Médico", "Academia / Personal Trainer", "Nutricionista", "Psicologia / Terapia", "Fisioterapia / Pilates"]
  },
  {
    id: "servicos",
    name: "Serviços Profissionais",
    subniches: ["Advocacia / Jurídico", "Consultoria de Negócios", "Contabilidade", "Marketing Digital / Agência", "Arquitetura / Design de Interiores"]
  },
  {
    id: "locais",
    name: "Negócios Locais & Varejo",
    subniches: ["Restaurante / Café", "Salão de Beleza / Estética", "Construção / Reformas", "Imobiliária / Corretor", "Loja Física / Boutique"]
  },
  {
    id: "educacao",
    name: "Educação & Conteúdo",
    subniches: ["Cursos Online / Infoprodutos", "Escolas / Cursos Livres", "Produtor de Conteúdo / Blog / Podcast", "Mentoria / Coaching"]
  }
];

export interface GoogleFont {
  id: string;
  name: string;
  fontFamily: string;
  type: "serif" | "sans-serif" | "display" | "monospace" | "handwriting";
  description: string;
}

export const TITLE_FONTS: GoogleFont[] = [
  { id: "bricolage", name: "Bricolage Grotesque", fontFamily: "'Bricolage Grotesque', sans-serif", type: "display", description: "Moderna, orgânica e com personalidade forte." },
  { id: "playfair", name: "Playfair Display", fontFamily: "'Playfair Display', serif", type: "serif", description: "Clássica, elegante e sofisticada." },
  { id: "montserrat", name: "Montserrat", fontFamily: "'Montserrat', sans-serif", type: "sans-serif", description: "Geométrica, limpa e de grande impacto." },
  { id: "syne", name: "Syne", fontFamily: "'Syne', sans-serif", type: "display", description: "Artística, futurista e muito expressiva." },
  { id: "outfit", name: "Outfit", fontFamily: "'Outfit', sans-serif", type: "sans-serif", description: "Minimalista, suave e extremamente moderna." },
  { id: "cinzel", name: "Cinzel", fontFamily: "'Cinzel', serif", type: "serif", description: "Inspirada na antiguidade, transmite luxo e autoridade." },
  { id: "unbounded", name: "Unbounded", fontFamily: "'Unbounded', sans-serif", type: "display", description: "Negrito marcante, ideal para marcas de tecnologia." }
];

export const BODY_FONTS: GoogleFont[] = [
  { id: "dm-sans", name: "DM Sans", fontFamily: "'DM Sans', sans-serif", type: "sans-serif", description: "Neutro, altamente legível e equilibrado." },
  { id: "inter", name: "Inter", fontFamily: "'Inter', sans-serif", type: "sans-serif", description: "Super limpa, focada em legibilidade e interfaces digitais." },
  { id: "roboto", name: "Roboto", fontFamily: "'Roboto', sans-serif", type: "sans-serif", description: "A fonte clássica do Android: limpa e universal." },
  { id: "plus-jakarta", name: "Plus Jakarta Sans", fontFamily: "'Plus Jakarta Sans', sans-serif", type: "sans-serif", description: "Moderna, com curvas geométricas elegantes." },
  { id: "lora", name: "Lora", fontFamily: "'Lora', serif", type: "serif", description: "Serifada contemporânea, perfeita para leitura longa." },
  { id: "merriweather", name: "Merriweather", fontFamily: "'Merriweather', serif", type: "serif", description: "Robusta e com alta legibilidade em qualquer tamanho de tela." }
];

export interface ColorPalettePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  isDark: boolean;
}

// Paletas para sites com fundo escuro (Dark Theme) - Todos com fundo Preto ou Cinza Escuro
export const DARK_PALETTES: ColorPalettePreset[] = [
  { id: "obsidian-minimal", name: "Obsidian Minimal", primary: "#FFFFFF", secondary: "#A1A1AA", background: "#09090B", text: "#FAFAFA", isDark: true },
  { id: "onyx-gold", name: "Onyx Gold", primary: "#D4AF37", secondary: "#B89930", background: "#121212", text: "#F3F4F6", isDark: true },
  { id: "midnight-sapphire", name: "Midnight Sapphire", primary: "#3B82F6", secondary: "#93C5FD", background: "#0B1120", text: "#F8FAFC", isDark: true },
  { id: "deep-emerald", name: "Deep Emerald", primary: "#10B981", secondary: "#6EE7B7", background: "#064E3B", text: "#F1F5F9", isDark: true },
  { id: "royal-amethyst", name: "Royal Amethyst", primary: "#A855F7", secondary: "#D8B4FE", background: "#1E1B4B", text: "#F8FAFC", isDark: true },
  { id: "crimson-noir", name: "Crimson Noir", primary: "#E11D48", secondary: "#FDA4AF", background: "#1C1917", text: "#F5F5F4", isDark: true },
  { id: "carbon-slate", name: "Carbon Slate", primary: "#38BDF8", secondary: "#7DD3FC", background: "#0F172A", text: "#F8FAFC", isDark: true },
  { id: "cocoa-dark", name: "Cocoa Dark", primary: "#D97706", secondary: "#FCD34D", background: "#292524", text: "#FAFAF9", isDark: true },
  { id: "forest-shadow", name: "Forest Shadow", primary: "#34D399", secondary: "#A7F3D0", background: "#18181B", text: "#F4F4F5", isDark: true },
  { id: "oceanic-deep", name: "Oceanic Deep", primary: "#0284C7", secondary: "#7DD3FC", background: "#0C4A6E", text: "#F0F9FF", isDark: true },
  { id: "rust-dark", name: "Rust Dark", primary: "#EA580C", secondary: "#FDBA74", background: "#1C1917", text: "#F5F5F4", isDark: true },
  { id: "orchid-night", name: "Orchid Night", primary: "#C026D3", secondary: "#F0ABFC", background: "#2E1065", text: "#FAF5FF", isDark: true },
  { id: "steel-blue", name: "Steel Blue", primary: "#64748B", secondary: "#CBD5E1", background: "#0F172A", text: "#F8FAFC", isDark: true },
  { id: "bronze-dark", name: "Bronze Dark", primary: "#B45309", secondary: "#FCD34D", background: "#27272A", text: "#FAFAF9", isDark: true },
  { id: "monotone-dark", name: "Monotone Dark", primary: "#D4D4D8", secondary: "#71717A", background: "#000000", text: "#FFFFFF", isDark: true }
];

// Paletas para sites com fundo claro (Light Theme)
export const LIGHT_PALETTES: ColorPalettePreset[] = [
  { id: "snow-minimal", name: "Snow Minimal", primary: "#09090B", secondary: "#71717A", background: "#FFFFFF", text: "#18181B", isDark: false },
  { id: "ivory-gold", name: "Ivory Gold", primary: "#B45309", secondary: "#D4AF37", background: "#FAFAF9", text: "#292524", isDark: false },
  { id: "sky-corporate", name: "Sky Corporate", primary: "#0284C7", secondary: "#0EA5E9", background: "#F0F9FF", text: "#0C4A6E", isDark: false },
  { id: "mint-fresh", name: "Mint Fresh", primary: "#059669", secondary: "#34D399", background: "#ECFDF5", text: "#064E3B", isDark: false },
  { id: "lavender-soft", name: "Lavender Soft", primary: "#7C3AED", secondary: "#A855F7", background: "#F5F3FF", text: "#2E1065", isDark: false },
  { id: "rose-blush", name: "Rose Blush", primary: "#E11D48", secondary: "#FB7185", background: "#FFF1F2", text: "#4C0519", isDark: false },
  { id: "slate-corporate", name: "Slate Corporate", primary: "#334155", secondary: "#64748B", background: "#F8FAFC", text: "#0F172A", isDark: false },
  { id: "sandstone-warm", name: "Sandstone Warm", primary: "#D97706", secondary: "#FBBF24", background: "#FEF3C7", text: "#78350F", isDark: false },
  { id: "azure-clean", name: "Azure Clean", primary: "#0369A1", secondary: "#38BDF8", background: "#F0F9FF", text: "#0C4A6E", isDark: false },
  { id: "sage-organic", name: "Sage Organic", primary: "#4D7C0F", secondary: "#84CC16", background: "#F7FEE7", text: "#14532D", isDark: false },
  { id: "ocean-breeze", name: "Ocean Breeze", primary: "#0891B2", secondary: "#22D3EE", background: "#ECFEFF", text: "#164E63", isDark: false },
  { id: "coral-light", name: "Coral Light", primary: "#EA580C", secondary: "#FB923C", background: "#FFF7ED", text: "#7C2D12", isDark: false },
  { id: "lilac-dream", name: "Lilac Dream", primary: "#C026D3", secondary: "#E879F9", background: "#FDF4FF", text: "#4A044E", isDark: false },
  { id: "silver-corporate", name: "Silver Corporate", primary: "#475569", secondary: "#94A3B8", background: "#F8FAFC", text: "#0F172A", isDark: false },
  { id: "camel-classic", name: "Camel Classic", primary: "#B45309", secondary: "#F59E0B", background: "#FFFBEB", text: "#451A03", isDark: false }
];

export interface SiteSection {
  id: string;
  name: string;
  description: string;
  category: "apresentacao" | "conteudo" | "conversao" | "institucional";
}

// Seções para escolha do cliente (sem Banner Principal/Hero e sem Cabeçalho/Rodapé, que são nativos)
export const SITE_SECTIONS: SiteSection[] = [
  { id: "sobre-nos", name: "Sobre Nós / História", description: "Quem somos, missão, fundação e história da empresa.", category: "institucional" },
  { id: "servicos-lista", name: "Listagem de Serviços", description: "Exibição em cards ou grade de todos os serviços que você presta.", category: "conteudo" },
  { id: "portfolio-galeria", name: "Portfólio / Galeria", description: "Fotos de trabalhos concluídos ou instalações físicas da empresa.", category: "conteudo" },
  { id: "depoimentos-clientes", name: "Depoimentos de Clientes", description: "Avaliações escritas de clientes satisfeitos (prova social).", category: "conversao" },
  { id: "faq", name: "Perguntas Frequentes (FAQ)", description: "Dúvidas comuns respondidas em formato de abas sanfonadas (accordion).", category: "conteudo" },
  { id: "formulario-contato", name: "Formulário de Contato", description: "Campos de texto para o visitante enviar mensagem direta por e-mail.", category: "conversao" },
  { id: "diferenciais", name: "Diferenciais da Empresa", description: "Grade com ícones destacando por que seu negócio é a melhor escolha.", category: "apresentacao" },
  { id: "beneficios-features", name: "Benefícios & Recursos", description: "Lista detalhada com imagens das vantagens dos seus serviços/produtos.", category: "conteudo" },
  { id: "precos-planos", name: "Preços e Planos", description: "Tabela comparativa de planos mensais ou pacotes de serviço.", category: "conversao" },
  { id: "nossa-equipe", name: "Nossa Equipe", description: "Fotos, cargos e links sociais dos profissionais-chave.", category: "institucional" },
  { id: "logotipos-parceiros", name: "Logotipos de Clientes/Parceiros", description: "Carrossel ou grade com logos de marcas que confiam em você.", category: "conversao" },
  { id: "cta-intermediaria", name: "Dobra de Conversão (CTA)", description: "Banner horizontal chamando o usuário para o WhatsApp.", category: "conversao" },
  { id: "blog-recentes", name: "Blog / Últimos Artigos", description: "Chamada para ler os posts e notícias mais recentes no site.", category: "conteudo" },
  { id: "estatisticas-numeros", name: "Números & Estatísticas", description: "Contadores animados (Ex: +500 clientes, 10 anos de mercado).", category: "institucional" },
  { id: "localizacao-mapa", name: "Mapa de Localização", description: "Integração com o Google Maps exibindo o endereço da loja física.", category: "institucional" },
  { id: "newsletter-form", name: "Captura de Newsletter", description: "Input simples para o cliente cadastrar e-mail e receber novidades.", category: "conversao" },
  { id: "depoimentos-video", name: "Depoimentos em Vídeo", description: "Vídeos embutidos (YouTube/Vimeo) com relatos de clientes.", category: "conversao" },
  { id: "video-institucional", name: "Vídeo Institucional", description: "Seção em destaque com vídeo de apresentação do negócio.", category: "conteudo" },
  { id: "processo-passos", name: "Como Funciona (Passo a Passo)", description: "Infográfico ou linha de etapas explicando o fluxo de entrega do serviço.", category: "conteudo" },
  { id: "linha-do-tempo", name: "Linha do Tempo Cronológica", description: "Histórico cronológico de marcos importantes na jornada da empresa.", category: "institucional" },
  { id: "trabalhe-conosco", name: "Trabalhe Conosco / Vagas", description: "Seção para listar vagas disponíveis e receber currículos de candidatos.", category: "institucional" },
  { id: "download-app-ebook", name: "Download de Recursos / App", description: "Dobra com links para baixar app na Apple Store/Google Play ou E-book.", category: "conversao" },
  { id: "valores-pilares", name: "Nossos Pilares / Valores", description: "Destaque visual dos princípios éticos fundamentais da empresa.", category: "institucional" },
  { id: "redes-integradas", name: "Feed do Instagram Integrado", description: "Exibição em grade das fotos mais recentes postadas no Instagram.", category: "conteudo" }
];

export interface WebsiteModel {
  id: string;
  name: string;
  folderName: string;
  description: string;
  imagePath: string;
  liveUrl: string;
  category: string;
}

export const WEBSITE_MODELS: WebsiteModel[] = [
  {
    id: "flowze",
    name: "Flowze SaaS",
    folderName: "Flowze",
    description: "Ideal para Startups, empresas de SaaS e soluções de tecnologia moderna. Visual dinâmico com acentos futuristas.",
    imagePath: "/portfolio/01.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/Flowze/",
    category: "Tecnologia & SaaS"
  },
  {
    id: "arquitetura",
    name: "Arquitetura & Design",
    folderName: "arquitetura",
    description: "Design minimalista e elegante de alto luxo, com espaços generosos para imagens marcantes e obras autorais.",
    imagePath: "/portfolio/02.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/arquitetura/",
    category: "Estética & Luxo"
  },
  {
    id: "construtex",
    name: "Construtex Engenharia",
    folderName: "construtex",
    description: "Estilo robusto, confiável e corporativo. Perfeito para construtoras, indústrias e prestadores de serviços de engenharia.",
    imagePath: "/portfolio/03.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/construtex/",
    category: "Corporativo & Engenharia"
  },
  {
    id: "little",
    name: "Little Kids / Infantil",
    folderName: "little",
    description: "Acolhedor, lúdico e muito amigável. Recomendado para berçários, escolas infantis, pediatras ou produtos para crianças.",
    imagePath: "/portfolio/04.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/little/",
    category: "Educação & Infantil"
  },
  {
    id: "nexus",
    name: "Nexus Hub Finanças",
    folderName: "nexus",
    description: "Corporativo premium com foco em finanças, consultoria e negócios. Ideal para demonstrar máxima autoridade e credibilidade.",
    imagePath: "/portfolio/05.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/nexus/",
    category: "Finanças & Negócios"
  },
  {
    id: "saude",
    name: "Saúde & Estética",
    folderName: "saude",
    description: "Clean, fresco e moderno. Ideal para clínicas médicas, consultórios, dentistas, psicólogos e profissionais de bem-estar.",
    imagePath: "/portfolio/06.webp",
    liveUrl: "https://arteli.net.br/portfólio/profissional/saude/",
    category: "Saúde & Clínicas"
  }
];
