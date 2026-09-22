"use client";

import React, { useState, useEffect } from "react";
import { 
  NICHES, 
  TITLE_FONTS, 
  BODY_FONTS, 
  DARK_PALETTES,
  LIGHT_PALETTES,
  SITE_SECTIONS,
  WEBSITE_MODELS,
  GoogleFont,
  ColorPalettePreset,
  SiteSection,
  WebsiteModel
} from "@/data/formOptions";

// Interface para o estado do formulário localmente
interface OnboardingState {
  companyName: string;
  nicheId: string;
  subniche: string;
  
  phone: string;
  address: string;
  slogan: string;
  email: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  socialTwitter: string;

  foundationDate: string;
  mission: string;
  goals: string;

  // Seleção de seções do site
  selectedSections: string[];
  autoSelectSections: boolean;

  // Seleção do modelo do site
  selectedModelId: string;

  titleFontId: string;
  bodyFontId: string;

  // Cores & Tema
  colorThemePreference: "dark" | "light" | "";
  paletteId: string;
  customPrimary: string;
  customSecondary: string;
  customBg: string;
  customText: string;
}

const initialFormState: OnboardingState = {
  companyName: "",
  nicheId: "",
  subniche: "",
  
  phone: "",
  address: "",
  slogan: "",
  email: "",
  socialInstagram: "",
  socialFacebook: "",
  socialLinkedIn: "",
  socialTwitter: "",

  foundationDate: "",
  mission: "",
  goals: "",

  selectedSections: [],
  autoSelectSections: true,

  selectedModelId: "arteli-choice", // Padrão "Deixar com a Arteli"

  titleFontId: "bricolage",
  bodyFontId: "dm-sans",

  colorThemePreference: "", // Vazio inicialmente para forçar a escolha
  paletteId: "obsidian-minimal",
  customPrimary: "#B8D900",
  customSecondary: "#C8924A",
  customBg: "#080808",
  customText: "#F5F2EC",
};

const LOCAL_STORAGE_KEY = "arteli_onboarding_form_data";
const LOCAL_STORAGE_STEP_KEY = "arteli_onboarding_form_step";

// Mapeamento de progresso visual enganoso (Curva de 18 etapas)
const PROGRESS_STEPS_MAP = [25, 40, 50, 60, 68, 75, 80, 84, 88, 91, 93, 95, 96, 97, 98, 98, 99, 100];

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [formState, setFormState] = useState<OnboardingState>(initialFormState);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [activePreviewModel, setActivePreviewModel] = useState<WebsiteModel | null>(null);
  const [previewMode, setPreviewMode] = useState<"interactive" | "image">("interactive");
  const [showMorePalettes, setShowMorePalettes] = useState<boolean>(false);

  // Garantir renderização apenas no client side para evitar erros de hidratação
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormState(prev => ({
          ...initialFormState,
          ...parsed
        }));
      } catch (e) {
        console.error("Erro ao carregar dados do localStorage", e);
      }
    }
    
    if (savedStep) {
      const stepNum = parseInt(savedStep, 10);
      if (stepNum >= 1 && stepNum <= 18) {
        setStep(stepNum);
      }
    }
  }, []);

  // Salvar no localStorage quando o estado ou passo mudar
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
  }, [formState, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(LOCAL_STORAGE_STEP_KEY, step.toString());
  }, [step, isMounted]);

  if (!isMounted) {
    return (
      <div className="quiz-wrapper" style={{ minHeight: "100vh" }}>
        <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Carregando briefing...</div>
      </div>
    );
  }

  // Helpers de mudança de campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const numbers = rawVal.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) `;
      if (numbers.length > 7) {
        formatted += `${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      } else {
        formatted += numbers.slice(2);
      }
    }
    
    setFormState(prev => ({
      ...prev,
      phone: formatted
    }));
  };

  const handleNicheSelect = (nicheId: string) => {
    setFormState(prev => ({
      ...prev,
      nicheId: nicheId,
      subniche: "" 
    }));
  };

  const handleSectionToggle = (sectionId: string) => {
    setFormState(prev => {
      const isSelected = prev.selectedSections.includes(sectionId);
      let newSections = prev.selectedSections;
      
      if (isSelected) {
        newSections = prev.selectedSections.filter(id => id !== sectionId);
      } else {
        if (prev.selectedSections.length < 12) {
          newSections = [...prev.selectedSections, sectionId];
        }
      }
      
      return {
        ...prev,
        selectedSections: newSections
      };
    });
  };

  const handleAutoSelectToggle = () => {
    setFormState(prev => ({
      ...prev,
      autoSelectSections: !prev.autoSelectSections,
      selectedSections: !prev.autoSelectSections ? [] : prev.selectedSections 
    }));
  };

  const handleModelSelect = (modelId: string) => {
    setFormState(prev => ({
      ...prev,
      selectedModelId: modelId
    }));
  };

  const handleFontSelect = (type: "title" | "body", fontId: string) => {
    setFormState(prev => ({
      ...prev,
      [type === "title" ? "titleFontId" : "bodyFontId"]: fontId
    }));
  };

  const handleThemePreferenceSelect = (theme: "dark" | "light") => {
    setFormState(prev => {
      const presetList = theme === "dark" ? DARK_PALETTES : LIGHT_PALETTES;
      const preset = presetList[0];
      const defaultPalette = preset.id;
      
      return {
        ...prev,
        colorThemePreference: theme,
        paletteId: defaultPalette,
        customPrimary: preset.primary,
        customSecondary: preset.secondary,
        customBg: preset.background,
        customText: preset.text
      };
    });
  };

  const handlePaletteSelect = (paletteId: string) => {
    setFormState(prev => {
      const newState = { ...prev, paletteId };
      if (paletteId !== "custom") {
        const allPresets = [...DARK_PALETTES, ...LIGHT_PALETTES];
        const preset = allPresets.find(p => p.id === paletteId);
        if (preset) {
          newState.customPrimary = preset.primary;
          newState.customSecondary = preset.secondary;
          newState.customBg = preset.background;
          newState.customText = preset.text;
        }
      }
      return newState;
    });
  };

  const handleCustomColorChange = (colorField: "customPrimary" | "customSecondary" | "customBg" | "customText", value: string) => {
    setFormState(prev => ({
      ...prev,
      [colorField]: value
    }));
  };

  const handleNext = () => {
    if (step < 18) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja reiniciar o formulário? Todas as informações serão perdidas.")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
      setFormState(initialFormState);
      setStep(1);
      setIsSuccess(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formState, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `briefing-${formState.companyName.toLowerCase().replace(/\s+/g, "-") || "projeto"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
    }, 2000);
  };

  // Fontes selecionadas para preview
  const currentTitleFont = TITLE_FONTS.find(f => f.id === formState.titleFontId) || TITLE_FONTS[0];
  const currentBodyFont = BODY_FONTS.find(f => f.id === formState.bodyFontId) || BODY_FONTS[0];

  // Cores dinâmicas para o mockup
  const getMockupColors = () => {
    if (formState.paletteId === "custom") {
      return {
        primary: formState.customPrimary,
        secondary: formState.customSecondary,
        background: formState.customBg,
        text: formState.customText
      };
    }
    const allPresets = [...DARK_PALETTES, ...LIGHT_PALETTES];
    const preset = allPresets.find(p => p.id === formState.paletteId) || allPresets[0];
    return {
      primary: preset.primary,
      secondary: preset.secondary,
      background: preset.background,
      text: preset.text
    };
  };

  const mockupColors = getMockupColors();

  // Validação simples por etapa
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formState.companyName.trim() !== "";
      case 2:
        return formState.nicheId !== "";
      case 3:
        return formState.subniche !== "";
      case 4:
        return formState.phone.trim() !== "";
      case 5:
        return formState.email.trim() !== "";
      case 6:
        return true; // Slogan opcional
      case 7:
        return true; // Endereço opcional
      case 8:
        return true; // Redes sociais opcionais
      case 9:
        return true; // Fundação opcional
      case 10:
        return formState.mission.trim() !== "";
      case 11:
        return formState.goals.trim() !== "";
      case 12:
        // Válido se escolheu Automático OU se escolheu pelo menos 1 seção
        return formState.autoSelectSections || formState.selectedSections.length > 0;
      case 13:
        // Modelo do site
        return formState.selectedModelId !== "";
      case 14:
        // Fonte do Título
        return formState.titleFontId !== "";
      case 15:
        // Fonte do Corpo
        return formState.bodyFontId !== "";
      case 16:
        // Tema Escuro ou Claro
        return formState.colorThemePreference !== "";
      case 17:
        // Paleta de Cores
        return formState.paletteId !== "";
      default:
        return true;
    }
  };

  const activeNiche = NICHES.find(n => n.id === formState.nicheId);
  const activePalettes = formState.colorThemePreference === "dark" ? DARK_PALETTES : LIGHT_PALETTES;

  return (
    <div className="quiz-wrapper">
      {/* Orbitais de fundo Arteli */}
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />
      <div className="hgrid" />

      {/* Header */}
      <header className="quiz-header">
        <a href="#" className="quiz-logo" onClick={(e) => { e.preventDefault(); }}>
          Arte<em>li</em> <span>Briefing SaaS</span>
        </a>
      </header>

      {/* Card principal flutuante integrado ao background */}
      <div className="glass-card">
        {!isSuccess ? (
          <>
            {/* Barra de Progresso */}
            <div className="progress-container">
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${PROGRESS_STEPS_MAP[step - 1]}%` }}
                />
              </div>
            </div>

            {/* Telas */}
            {step === 1 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o nome da sua <em>empresa</em>?</h2>
                  <p className="step-desc">Digite o nome comercial ou a marca que dará título ao seu site.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="companyName" className="input-label">Nome da Empresa</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formState.companyName}
                    onChange={handleInputChange}
                    placeholder="Ex: Arteli Design"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o seu <em>nicho principal</em>?</h2>
                  <p className="step-desc">Selecione o setor de atuação do seu negócio para adequarmos o design e a estrutura.</p>
                </div>
                <div className="input-group">
                  <div className="niche-grid">
                    {NICHES.map((niche) => (
                      <button
                        key={niche.id}
                        type="button"
                        className={`niche-card ${formState.nicheId === niche.id ? "selected" : ""}`}
                        onClick={() => handleNicheSelect(niche.id)}
                      >
                        <span className="niche-card-title">
                          <span className="pdot" style={{ display: formState.nicheId === niche.id ? "block" : "none" }} />
                          {niche.name}
                        </span>
                        <span className="niche-card-desc">
                          Exemplos: {niche.subniches.slice(0, 3).join(", ")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha o seu <em>subnicho</em></h2>
                  <p className="step-desc">Selecione a especialidade do seu negócio para refinar as sugestões de layout.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="subniche" className="input-label">
                    Subnicho de Atuação
                    <span>(Escolha primeiro um nicho principal)</span>
                  </label>
                  <select
                    id="subniche"
                    name="subniche"
                    value={formState.subniche}
                    onChange={handleInputChange}
                    disabled={!formState.nicheId}
                    className="form-select"
                  >
                    <option value="">Selecione o subnicho específico...</option>
                    {activeNiche?.subniches.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o seu <em>telefone de contato</em>?</h2>
                  <p className="step-desc">Digite o número de WhatsApp ou telefone corporativo.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="phone" className="input-label">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handlePhoneChange}
                    placeholder="(00) 90000-0000"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o seu <em>e-mail comercial</em>?</h2>
                  <p className="step-desc">Digite o e-mail de atendimento que ficará público.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="input-label">E-mail Corporativo</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="seuemail@empresa.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Adicione um <em>slogan</em> ou frase <span>(Opcional)</span></h2>
                  <p className="step-desc">Frase curta de impacto para a dobra de abertura do site.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="slogan" className="input-label">Slogan da Empresa</label>
                  <input
                    type="text"
                    id="slogan"
                    name="slogan"
                    value={formState.slogan}
                    onChange={handleInputChange}
                    placeholder="Ex: Transformando ideias em sistemas digitais premium."
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o <em>endereço comercial</em>? <span>(Opcional)</span></h2>
                  <p className="step-desc">Digite a localização física (Cidade - UF ou endereço completo).</p>
                </div>
                <div className="input-group">
                  <label htmlFor="address" className="input-label">Endereço Comercial</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                    placeholder="Cidade - UF, ou Endereço Completo"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Adicione as <em>redes sociais</em> <span>(Opcional)</span></h2>
                  <p className="step-desc">Links de referência dos canais sociais da empresa.</p>
                </div>
                <div className="input-group">
                  <div className="social-grid-inputs">
                    <input
                      type="text"
                      name="socialInstagram"
                      value={formState.socialInstagram}
                      onChange={handleInputChange}
                      placeholder="Instagram (Ex: @suaempresa)"
                      className="form-input"
                    />
                    <input
                      type="text"
                      name="socialLinkedIn"
                      value={formState.socialLinkedIn}
                      onChange={handleInputChange}
                      placeholder="LinkedIn (Link do Perfil/Empresa)"
                      className="form-input"
                    />
                    <input
                      type="text"
                      name="socialFacebook"
                      value={formState.socialFacebook}
                      onChange={handleInputChange}
                      placeholder="Facebook (Link da Página)"
                      className="form-input"
                    />
                    <input
                      type="text"
                      name="socialTwitter"
                      value={formState.socialTwitter}
                      onChange={handleInputChange}
                      placeholder="Twitter / X (Ex: @suaempresa)"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Qual o <em>ano de fundação</em>? <span>(Opcional)</span></h2>
                  <p className="step-desc">O ano ou data em que o negócio foi estabelecido.</p>
                </div>
                <div className="input-group">
                  <label htmlFor="foundationDate" className="input-label">Ano / Data de Fundação</label>
                  <input
                    type="text"
                    id="foundationDate"
                    name="foundationDate"
                    value={formState.foundationDate}
                    onChange={handleInputChange}
                    placeholder="Ex: Fundada em 2019 ou 10/11/2015"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Conte-nos a <em>missão da empresa</em></h2>
                  <p className="step-desc">O que sua empresa faz no mercado? Qual o seu propósito e diferencial principal?</p>
                </div>
                <div className="input-group">
                  <label htmlFor="mission" className="input-label">Missão & Atuação da Empresa <span>(Mínimo 10 caracteres)</span></label>
                  <textarea
                    id="mission"
                    name="mission"
                    value={formState.mission}
                    onChange={handleInputChange}
                    placeholder="Escreva brevemente o propósito do seu negócio..."
                    className="form-textarea"
                    required
                  />
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Quais os <em>objetivos do site</em>?</h2>
                  <p className="step-desc">Qual o principal objetivo que deseja alcançar com a publicação do novo website?</p>
                </div>
                <div className="input-group">
                  <label htmlFor="goals" className="input-label">Metas e Objetivos do Site <span>(Mínimo 10 caracteres)</span></label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formState.goals}
                    onChange={handleInputChange}
                    placeholder="Ex: Captar contatos no WhatsApp, posicionar a marca como premium, vender infoprodutos..."
                    className="form-textarea"
                    required
                  />
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Defina as <em>seções</em> do seu site</h2>
                  <p className="step-desc">Selecione se deseja escolher as seções individualmente ou deixar que nossos especialistas façam isso.</p>
                </div>

                {/* Dois Cards de Opção lado a lado */}
                <div className="sections-choice-grid">
                  <button
                    type="button"
                    className={`choice-option-card ${formState.autoSelectSections ? "selected" : ""}`}
                    onClick={() => {
                      setFormState(prev => ({
                        ...prev,
                        autoSelectSections: true,
                        selectedSections: []
                      }));
                    }}
                  >
                    <div className="choice-option-header">
                      <span className="pdot" style={{ display: formState.autoSelectSections ? "block" : "none" }} />
                      <span className="choice-option-icon">✨</span>
                    </div>
                    <h3 className="choice-option-title">Não quero escolher</h3>
                    <p className="choice-option-desc">Deixo por conta de vocês. Nossos especialistas definem a estrutura ideal para o seu nicho.</p>
                  </button>

                  <button
                    type="button"
                    className={`choice-option-card ${!formState.autoSelectSections ? "selected" : ""}`}
                    onClick={() => {
                      setFormState(prev => ({
                        ...prev,
                        autoSelectSections: false
                      }));
                    }}
                  >
                    <div className="choice-option-header">
                      <span className="pdot" style={{ display: !formState.autoSelectSections ? "block" : "none" }} />
                      <span className="choice-option-icon">🛠️</span>
                    </div>
                    <h3 className="choice-option-title">Quero escolher as seções</h3>
                    <p className="choice-option-desc">Eu mesmo quero selecionar quais dobras estruturais farão parte da minha página.</p>
                  </button>
                </div>

                {/* Grid de Seções (Exposta apenas se o usuário escolher manual) */}
                {!formState.autoSelectSections && (
                  <div className="input-group animate-fade-in" style={{ marginTop: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      <span>Opções de seções de página</span>
                      <span>Selecionadas: <strong>{formState.selectedSections.length}</strong> de 12</span>
                    </div>
                    <div className="sections-grid">
                      {SITE_SECTIONS.map((section) => {
                        const isSelected = formState.selectedSections.includes(section.id);
                        const isLimitReached = formState.selectedSections.length >= 12 && !isSelected;
                        
                        return (
                          <button
                            key={section.id}
                            type="button"
                            disabled={isLimitReached}
                            className={`section-card ${isSelected ? "selected" : ""} ${isLimitReached ? "disabled" : ""}`}
                            onClick={() => handleSectionToggle(section.id)}
                          >
                            <div className="section-checkbox">
                              {isSelected && "✓"}
                            </div>
                            <div className="section-info">
                              <span className="section-name">{section.name}</span>
                              <span className="section-desc">{section.description}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 13 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha o <em>modelo</em> do seu site</h2>
                  <p className="step-desc">Selecione o design base do seu site profissional. Você pode visualizar os detalhes de cada modelo ou optar por deixar sob nossa responsabilidade.</p>
                </div>

                <div className="input-group">
                  <div className="models-grid">
                    {/* Opção Deixar com a Arteli */}
                    <div 
                      className={`model-card special-card ${formState.selectedModelId === "arteli-choice" ? "selected" : ""}`}
                      onClick={() => handleModelSelect("arteli-choice")}
                    >
                      <div className="model-badge">Recomendado</div>
                      <div className="model-card-content">
                        <div className="model-title-row">
                          <span className="pdot" style={{ display: formState.selectedModelId === "arteli-choice" ? "block" : "none" }} />
                          <h3 className="model-name">Deixar com a Arteli</h3>
                        </div>
                        <p className="model-desc">Nossa equipe de especialistas escolherá o modelo mais adequado com base nos objetivos de negócio e nicho de atuação.</p>
                        <span className="model-action-btn select-only">Selecionado</span>
                      </div>
                    </div>

                    {/* Modelos cadastrados */}
                    {WEBSITE_MODELS.map((model) => {
                      const isSelected = formState.selectedModelId === model.id;
                      return (
                        <div 
                          key={model.id}
                          className={`model-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleModelSelect(model.id)}
                        >
                          <div className="model-image-container" style={{ position: "relative", overflow: "hidden", background: "#f8f9fa" }}>
                            <iframe
                              src={`/portfólio/${model.folderName}/index.html`}
                              title={`Preview of ${model.name}`}
                              style={{
                                width: "400%",
                                height: "400%",
                                transform: "scale(0.25)",
                                transformOrigin: "top left",
                                border: "none",
                                pointerEvents: "none",
                                position: "absolute",
                                top: 0,
                                left: 0
                              }}
                              tabIndex={-1}
                              scrolling="no"
                            />
                            <div className="model-overlay-hover">
                              <button
                                type="button"
                                className="btn-preview-modal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePreviewModel(model);
                                }}
                              >
                                👁 Visualizar Modelo
                              </button>
                            </div>
                          </div>
                          <div className="model-card-content">
                            <span className="model-category">{model.category}</span>
                            <div className="model-title-row">
                              <span className="pdot" style={{ display: isSelected ? "block" : "none" }} />
                              <h3 className="model-name">{model.name}</h3>
                            </div>
                            <p className="model-desc">{model.description}</p>
                            <div className="model-card-actions">
                              <button
                                type="button"
                                className="btn-visualize-text"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePreviewModel(model);
                                }}
                              >
                                Ver Detalhes
                              </button>
                              <span className="model-select-status">
                                {isSelected ? "Selecionado ✓" : "Selecionar"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 14 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha a <em>fonte dos títulos</em></h2>
                  <p className="step-desc">A tipografia dos títulos dita o tom e a personalidade da sua marca no site. Escolha o estilo ideal.</p>
                </div>

                <div className="font-selector-container">
                  <div className="input-group">
                    <label className="input-label">Fontes para Título (Headings)</label>
                    <div className="font-select-box">
                      {TITLE_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          className={`font-option-card ${formState.titleFontId === font.id ? "selected" : ""}`}
                          onClick={() => handleFontSelect("title", font.id)}
                        >
                          <div className="font-option-name" style={{ fontFamily: font.fontFamily, fontSize: "14px" }}>{font.name}</div>
                          <div 
                            style={{ 
                              fontFamily: font.fontFamily, 
                              fontSize: "22px", 
                              margin: "6px 0 8px", 
                              color: "var(--text-primary)",
                              fontWeight: "600",
                              letterSpacing: "-0.02em",
                              lineHeight: "1.2"
                            }}
                          >
                            {formState.companyName || "Nome da Empresa"}
                          </div>
                          <div className="font-option-desc">{font.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pré-visualização gigante do título comercial */}
                  <div className="input-group">
                    <span className="preview-label">Visualização do Título Comercial</span>
                    <div className="preview-box title-gigante-box">
                      <span className="preview-box-badge">Visualização H1</span>
                      <h1 
                        className="preview-title-giant" 
                        style={{ fontFamily: currentTitleFont.fontFamily }}
                      >
                        {formState.companyName || "Sua Marca Comercial"}
                      </h1>
                      <div className="font-info-footer">
                        Exibindo fonte <strong>{currentTitleFont.name}</strong> · Estilo {currentTitleFont.type}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 15 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha a <em>fonte do corpo de texto</em></h2>
                  <p className="step-desc">Selecione a fonte para os parágrafos, descrições e leitura geral. Ela deve ser altamente legível.</p>
                </div>

                <div className="font-selector-container">
                  <div className="input-group">
                    <label className="input-label">Fontes para Corpo (Paragraphs)</label>
                    <div className="font-select-box">
                      {BODY_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          className={`font-option-card ${formState.bodyFontId === font.id ? "selected" : ""}`}
                          onClick={() => handleFontSelect("body", font.id)}
                        >
                          <div className="font-option-name" style={{ fontFamily: font.fontFamily, fontSize: "14px" }}>{font.name}</div>
                          <div 
                            style={{ 
                              fontFamily: font.fontFamily, 
                              fontSize: "12px", 
                              margin: "6px 0 8px", 
                              color: "var(--text-secondary)",
                              lineHeight: "1.4"
                            }}
                          >
                            Nossos sistemas digitais elevam o seu posicionamento no mercado.
                          </div>
                          <div className="font-option-desc">{font.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pré-visualização avançada de pareamento em mockup */}
                  <div className="input-group">
                    <span className="preview-label">Pareamento Tipográfico (Título + Corpo)</span>
                    <div className="preview-box pareamento-box">
                      <span className="preview-box-badge">Mockup de Seção</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--lime)" }} />
                          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--lime)", fontFamily: currentBodyFont.fontFamily }}>Apresentação</span>
                        </div>
                        <h3 
                          className="preview-title" 
                          style={{ 
                            fontFamily: currentTitleFont.fontFamily,
                            fontSize: "26px",
                            fontWeight: "600",
                            lineHeight: "1.2",
                            letterSpacing: "-0.02em",
                            color: "var(--text-primary)",
                            margin: "0 0 4px"
                          }}
                        >
                          Construindo Soluções de Alto Impacto
                        </h3>
                        <p 
                          className="preview-body" 
                          style={{ 
                            fontFamily: currentBodyFont.fontFamily,
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: "var(--text-secondary)",
                            margin: 0
                          }}
                        >
                          A harmonia entre <strong>{currentTitleFont.name}</strong> para títulos e <strong>{currentBodyFont.name}</strong> para o corpo de texto foi otimizada pela nossa equipe de design. Juntas, elas garantem sofisticação visual e uma experiência de leitura extremamente agradável para os clientes da <strong>{formState.companyName || "sua empresa"}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 16 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha o <em>tema do site</em></h2>
                  <p className="step-desc">Selecione a preferência de fundo para o seu site.</p>
                </div>

                {/* Pergunta de site escuro/claro */}
                <div className="input-group">
                  <label className="input-label">Como deve ser o fundo do seu site?</label>
                  <div className="theme-selector-grid">
                    <button
                      type="button"
                      className={`theme-card dark ${formState.colorThemePreference === "dark" ? "selected" : ""}`}
                      onClick={() => handleThemePreferenceSelect("dark")}
                    >
                      <span className="theme-icon">🌙</span>
                      <span className="theme-title">Tema Escuro (Dark Mode)</span>
                      <span className="theme-desc">Moderno, focado em tecnologia, luxo e alto impacto visual.</span>
                    </button>
                    <button
                      type="button"
                      className={`theme-card light ${formState.colorThemePreference === "light" ? "selected" : ""}`}
                      onClick={() => handleThemePreferenceSelect("light")}
                    >
                      <span className="theme-icon">☀️</span>
                      <span className="theme-title">Tema Claro (Light Mode)</span>
                      <span className="theme-desc">Luminoso, corporativo, institucional e com alta legibilidade.</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 17 && (
              <div className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Escolha a <em>paleta de cores</em></h2>
                  <p className="step-desc">Selecione as combinações ideais de cores para a sua marca no tema escolhido.</p>
                </div>

                {formState.colorThemePreference !== "" && (
                  <>
                    <div className="input-group">
                      <label className="input-label">Sugestões de Paleta ({formState.colorThemePreference === "dark" ? "Tema Escuro" : "Tema Claro"})</label>
                      <div className="palette-grid">
                        {activePalettes.slice(0, showMorePalettes ? activePalettes.length : 7).map((palette) => (
                          <button
                            key={palette.id}
                            type="button"
                            className={`palette-card ${formState.paletteId === palette.id ? "selected" : ""}`}
                            onClick={() => handlePaletteSelect(palette.id)}
                          >
                            <span className="palette-name">{palette.name}</span>
                            <div className="palette-colors-row">
                              <div className="color-bar" style={{ backgroundColor: palette.background }} title="Fundo" />
                              <div className="color-bar" style={{ backgroundColor: palette.text }} title="Texto" />
                              <div className="color-bar" style={{ backgroundColor: palette.primary }} title="Primária" />
                              <div className="color-bar" style={{ backgroundColor: palette.secondary }} title="Secundária" />
                            </div>
                          </button>
                        ))}
                        
                        <button
                          type="button"
                          className={`palette-card ${formState.paletteId === "custom" ? "selected" : ""}`}
                          onClick={() => handlePaletteSelect("custom")}
                        >
                          <span className="palette-name">Paleta Personalizada</span>
                          <div className="palette-colors-row">
                            <div className="color-bar" style={{ backgroundColor: formState.customBg }} title="Fundo" />
                            <div className="color-bar" style={{ backgroundColor: formState.customText }} title="Texto" />
                            <div className="color-bar" style={{ backgroundColor: formState.customPrimary }} title="Primária" />
                            <div className="color-bar" style={{ backgroundColor: formState.customSecondary }} title="Secundária" />
                          </div>
                        </button>
                      </div>

                      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                        <button
                          type="button"
                          onClick={() => setShowMorePalettes(!showMorePalettes)}
                          style={{
                            background: "transparent",
                            border: "1px dashed var(--border-color)",
                            color: "var(--text-secondary)",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "13px",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                        >
                          {showMorePalettes ? "Ocultar opções" : `+ Mostrar mais ${activePalettes.length - 7} opções`}
                        </button>
                      </div>
                    </div>

                    {/* Seletores customizados se o usuário escolheu custom */}
                    {formState.paletteId === "custom" && (
                      <div className="custom-picker-container">
                        <span className="preview-label" style={{ marginBottom: "5px" }}>Configurar Cores Personalizadas</span>
                        <div className="picker-grid">
                          <div className="picker-item">
                            <span className="picker-label">Fundo</span>
                            <div className="color-input-wrapper" style={{ backgroundColor: formState.customBg }}>
                              <input
                                type="color"
                                value={formState.customBg}
                                onChange={(e) => handleCustomColorChange("customBg", e.target.value)}
                                className="color-picker-native"
                              />
                            </div>
                          </div>
                          <div className="picker-item">
                            <span className="picker-label">Texto</span>
                            <div className="color-input-wrapper" style={{ backgroundColor: formState.customText }}>
                              <input
                                type="color"
                                value={formState.customText}
                                onChange={(e) => handleCustomColorChange("customText", e.target.value)}
                                className="color-picker-native"
                              />
                            </div>
                          </div>
                          <div className="picker-item">
                            <span className="picker-label">Primária</span>
                            <div className="color-input-wrapper" style={{ backgroundColor: formState.customPrimary }}>
                              <input
                                type="color"
                                value={formState.customPrimary}
                                onChange={(e) => handleCustomColorChange("customPrimary", e.target.value)}
                                className="color-picker-native"
                              />
                            </div>
                          </div>
                          <div className="picker-item">
                            <span className="picker-label">Secundária</span>
                            <div className="color-input-wrapper" style={{ backgroundColor: formState.customSecondary }}>
                              <input
                                type="color"
                                value={formState.customSecondary}
                                onChange={(e) => handleCustomColorChange("customSecondary", e.target.value)}
                                className="color-picker-native"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Preview Mockup da Paleta Selecionada */}
                    <div className="input-group" style={{ marginTop: "24px" }}>
                      <span className="preview-label">Visualização da Paleta Aplicada</span>
                      <div 
                        className="preview-box pareamento-box" 
                        style={{ 
                          backgroundColor: mockupColors.background, 
                          border: `1px solid ${mockupColors.secondary}40`,
                          padding: "32px",
                          borderRadius: "12px",
                          position: "relative"
                        }}
                      >
                        <span className="preview-box-badge" style={{ backgroundColor: mockupColors.primary, color: mockupColors.background }}>
                          Mockup de Cores
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                          <h3 
                            style={{ 
                              color: mockupColors.primary, 
                              margin: "0 0 4px",
                              fontFamily: currentTitleFont.fontFamily,
                              fontSize: "24px",
                              fontWeight: "600"
                            }}
                          >
                            Títulos com Cor Primária
                          </h3>
                          <p 
                            style={{ 
                              color: mockupColors.text, 
                              margin: 0,
                              fontFamily: currentBodyFont.fontFamily,
                              lineHeight: "1.6"
                            }}
                          >
                            Este é um exemplo de como o texto do corpo aparecerá sobre o fundo escolhido. A combinação entre o <strong>Fundo ({mockupColors.background})</strong> e o <strong>Texto ({mockupColors.text})</strong> é fundamental para a leitura.
                          </p>
                          <button 
                            type="button" 
                            style={{
                              backgroundColor: mockupColors.secondary,
                              color: mockupColors.background,
                              border: "none",
                              padding: "10px 24px",
                              borderRadius: "6px",
                              fontWeight: "600",
                              alignSelf: "flex-start",
                              marginTop: "8px",
                              cursor: "default"
                            }}
                          >
                            Botão com Cor Secundária
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 18 && (
              <form onSubmit={handleSubmitForm} className="form-step-content animate-fade-in">
                <div className="step-header">
                  <h2 className="step-title">Revise seu <em>briefing</em> de site</h2>
                  <p className="step-desc">Tudo pronto! Revise todas as informações fornecidas abaixo antes de exportar ou finalizar.</p>
                </div>

                <div className="summary-container">
                  {/* Seção 1 */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Dados Gerais do Negócio</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">Nome da Empresa</span>
                        <span className="summary-value">{formState.companyName}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Nicho & Subnicho</span>
                        <span className="summary-value">{activeNiche?.name} / {formState.subniche}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seção 2 */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Informações de Contato</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">E-mail Comercial</span>
                        <span className="summary-value">{formState.email}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Telefone / WhatsApp</span>
                        <span className="summary-value">{formState.phone}</span>
                      </div>
                      {formState.slogan && (
                        <div className="summary-item">
                          <span className="summary-label">Slogan</span>
                          <span className="summary-value">{formState.slogan}</span>
                        </div>
                      )}
                      {formState.address && (
                        <div className="summary-item">
                          <span className="summary-label">Endereço</span>
                          <span className="summary-value">{formState.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seção 3 */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Redes Sociais</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">Instagram</span>
                        <span className="summary-value">{formState.socialInstagram || "Não informado"}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">LinkedIn</span>
                        <span className="summary-value">{formState.socialLinkedIn || "Não informado"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seção 4 */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Propósito & Metas</h3>
                    <div className="summary-grid" style={{ gridTemplateColumns: "1fr" }}>
                      {formState.foundationDate && (
                        <div className="summary-item">
                          <span className="summary-label">Ano / Data de Fundação</span>
                          <span className="summary-value">{formState.foundationDate}</span>
                        </div>
                      )}
                      <div className="summary-item">
                        <span className="summary-label">Missão da Empresa</span>
                        <span className="summary-value" style={{ whiteSpace: "pre-line" }}>{formState.mission}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Metas do Site</span>
                        <span className="summary-value" style={{ whiteSpace: "pre-line" }}>{formState.goals}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seção Seções do Site */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Estrutura de Seções</h3>
                    <div className="summary-grid" style={{ gridTemplateColumns: "1fr" }}>
                      <div className="summary-item">
                        <span className="summary-label">Seleção de Seções</span>
                        <span className="summary-value">
                          {formState.autoSelectSections ? (
                            <em style={{ color: "var(--lime)" }}>Definição automática pela equipe da Arteli</em>
                          ) : (
                            formState.selectedSections
                              .map(id => SITE_SECTIONS.find(s => s.id === id)?.name || id)
                              .join(", ")
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Seção Modelo Selecionado */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Modelo de Design Selecionado</h3>
                    <div className="summary-grid" style={{ gridTemplateColumns: "1fr" }}>
                      <div className="summary-item">
                        <span className="summary-label">Modelo Profissional</span>
                        <span className="summary-value">
                          {formState.selectedModelId === "arteli-choice" ? (
                            <em style={{ color: "var(--lime)" }}>Deixar a escolha do modelo a critério da Arteli</em>
                          ) : (
                            WEBSITE_MODELS.find(m => m.id === formState.selectedModelId)?.name || formState.selectedModelId
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Seção 5 */}
                  <div className="summary-section">
                    <h3 className="summary-section-title">Identidade Visual & Tipografia</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">Fonte de Títulos</span>
                        <span className="summary-value" style={{ fontFamily: currentTitleFont.fontFamily }}>
                          {currentTitleFont.name}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Fonte do Corpo</span>
                        <span className="summary-value" style={{ fontFamily: currentBodyFont.fontFamily }}>
                          {currentBodyFont.name}
                        </span>
                      </div>
                      <div className="summary-item" style={{ gridColumn: "span 2" }}>
                        <span className="summary-label">
                          Estilo de Cores (Tema: {formState.colorThemePreference === "dark" ? "Escuro" : "Claro"} · Paleta: {formState.paletteId === "custom" ? "Customizada" : (formState.colorThemePreference === "dark" ? DARK_PALETTES : LIGHT_PALETTES).find(p=>p.id===formState.paletteId)?.name})
                        </span>
                        <div className="summary-colors-display" style={{ marginTop: "6px" }}>
                          <div className="summary-color-box">
                            <div className="summary-color-circle" style={{ backgroundColor: mockupColors.background }} />
                            <span>Fundo ({mockupColors.background})</span>
                          </div>
                          <div className="summary-color-box">
                            <div className="summary-color-circle" style={{ backgroundColor: mockupColors.text }} />
                            <span>Texto ({mockupColors.text})</span>
                          </div>
                          <div className="summary-color-box">
                            <div className="summary-color-circle" style={{ backgroundColor: mockupColors.primary }} />
                            <span>Primária ({mockupColors.primary})</span>
                          </div>
                          <div className="summary-color-box">
                            <div className="summary-color-circle" style={{ backgroundColor: mockupColors.secondary }} />
                            <span>Secundária ({mockupColors.secondary})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações Finais do Resumo */}
                <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "20px", flexWrap: "wrap" }}>
                  <button 
                    type="button" 
                    onClick={handleBack}
                    className="btn-back"
                    style={{ flex: "1 1 100px", justifyContent: "center" }}
                  >
                    ← Voltar
                  </button>
                  <button 
                    type="button" 
                    onClick={handleExportJSON}
                    className="btn-back"
                    style={{ flex: "1 1 180px", justifyContent: "center" }}
                  >
                    Exportar Briefing (JSON)
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-next"
                    style={{ flex: "1 1 180px", margin: 0, justifyContent: "center" }}
                  >
                    {isSubmitting ? "Enviando Briefing..." : "Finalizar & Enviar →"}
                  </button>
                </div>
              </form>
            )}

            {/* Container de Botões (passos 1 a 17) */}
            {step < 18 && (
              <div className="btn-container">
                {step > 1 ? (
                  <button 
                    type="button" 
                    className="btn-back"
                    onClick={handleBack}
                  >
                    ← Voltar
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-back"
                    onClick={handleReset}
                    style={{ border: "1px solid rgba(231, 76, 60, 0.2)", color: "rgba(231, 76, 60, 0.8)" }}
                  >
                    Limpar Progresso
                  </button>
                )}
                
                <button 
                  type="button" 
                  className="btn-next"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  Continuar →
                </button>
              </div>
            )}
          </>
        ) : (
          /* Sucesso */
          <div className="success-card">
            <div className="success-icon-wrapper">
              ✓
            </div>
            
            <h2 className="step-title" style={{ fontSize: "28px", marginTop: "10px" }}>
              Briefing enviado com <em>sucesso</em>!
            </h2>
            
            <p className="step-desc" style={{ maxWidth: "460px", margin: "0 auto 10px" }}>
              Parabéns! Todas as informações da <strong>{formState.companyName}</strong> foram registradas com sucesso.
              Nossa equipe entrará em contato em até 24h para apresentar a proposta e o mapa visual do seu novo site.
            </p>

            <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "24px" }}>
              <button 
                type="button" 
                onClick={handleExportJSON}
                className="btn-back"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Baixar Cópia do Briefing
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="btn-next"
                style={{ flex: 1, margin: 0, justifyContent: "center" }}
              >
                Criar Novo Briefing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup Simulador de Navegador para Preview de Modelo */}
      {activePreviewModel && (
        <div className="browser-modal-overlay" onClick={() => { setActivePreviewModel(null); setPreviewMode("interactive"); }}>
          <div className="browser-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="browser-modal-header">
              <div className="browser-window-controls">
                <button type="button" className="ctrl-btn close" onClick={() => { setActivePreviewModel(null); setPreviewMode("interactive"); }}></button>
                <button type="button" className="ctrl-btn minimize" onClick={() => { setActivePreviewModel(null); setPreviewMode("interactive"); }}></button>
                <button type="button" className="ctrl-btn maximize" onClick={() => { setActivePreviewModel(null); setPreviewMode("interactive"); }}></button>
              </div>

              {/* Seletor de abas premium */}
              <div className="browser-tab-selector">
                <button 
                  type="button" 
                  className={`btn-tab ${previewMode === "interactive" ? "active" : ""}`}
                  onClick={() => setPreviewMode("interactive")}
                >
                  Site Interativo 🌐
                </button>
                <button 
                  type="button" 
                  className={`btn-tab ${previewMode === "image" ? "active" : ""}`}
                  onClick={() => setPreviewMode("image")}
                >
                  Design Completo 🖼
                </button>
              </div>

              <div className="browser-address-bar">
                <span className="lock-icon">🔒</span>
                <span className="address-text">
                  {previewMode === "interactive" 
                    ? `http://localhost:3000/portfólio/${activePreviewModel.folderName}/` 
                    : activePreviewModel.liveUrl
                  }
                </span>
              </div>
              <a 
                href={activePreviewModel.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="browser-open-link"
              >
                Visitar Demo Real ↗
              </a>
            </div>
            
            <div className="browser-modal-body">
              {previewMode === "interactive" ? (
                <iframe 
                  src={`/portfólio/${activePreviewModel.folderName}/index.html`}
                  title={`Demonstração de ${activePreviewModel.name}`}
                  style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
                />
              ) : (
                <img 
                  src={activePreviewModel.imagePath} 
                  alt={`Preview do site ${activePreviewModel.name}`} 
                  className="browser-long-image"
                />
              )}
            </div>
            
            <div className="browser-modal-footer">
              <span className="browser-model-info">
                Modelo: <strong>{activePreviewModel.name}</strong> · Categoria: {activePreviewModel.category}
              </span>
              <div className="browser-modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-secondary" 
                  onClick={() => { setActivePreviewModel(null); setPreviewMode("interactive"); }}
                >
                  Fechar
                </button>
                <button 
                  type="button" 
                  className="btn-modal-primary" 
                  onClick={() => {
                    handleModelSelect(activePreviewModel.id);
                    setActivePreviewModel(null);
                    setPreviewMode("interactive");
                  }}
                >
                  Escolher este Modelo ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
