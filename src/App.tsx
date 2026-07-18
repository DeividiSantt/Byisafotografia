import {
  ArrowUp,
  Check,
  Instagram,
  MessageCircle,
  MoonStar,
  Sparkles,
  Sun,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { StarryBackground } from "./components/Decorative";
import { Header } from "./components/Header";
import { portfolioCategories, portfolioItems } from "./data/portfolio";

type SubmitState = "idle" | "loading" | "success" | "error";

const services = [
  {
    title: "Ensaios autorais",
    description: "Retratos conduzidos com direção delicada, luz natural e narrativa pessoal.",
    includes: ["Briefing visual", "Direção durante o ensaio", "Galeria digital editada"],
    image: "/images/portfolio/ensaio-autoral-flor-roxa.png",
  },
  {
    title: "Ensaios externos",
    description: "Fotografias em jardins, ruas e lugares que ajudam a contar a história.",
    includes: ["Escolha de locação", "Roteiro de poses", "Tratamento de cor"],
    image: "/images/portfolio/ensaio-externo-lago.png",
  },
  {
    title: "Momentos especiais",
    description: "Registros afetivos para aniversários, encontros e pequenos rituais.",
    includes: ["Cobertura leve", "Olhar documental", "Entrega organizada"],
    image: "/images/portfolio/momento-celebre-vida.png",
  },
];

const processSteps = [
  {
    icon: MessageCircle,
    title: "Conversa inicial",
    text: "Entendo a intenção do ensaio, o clima desejado e o que você quer guardar.",
  },
  {
    icon: Sun,
    title: "Planejamento",
    text: "Definimos referência, roupa, horário, locação e uma direção visual possível.",
  },
  {
    icon: Sparkles,
    title: "O dia do ensaio",
    text: "A sessão acontece com calma, direção presente e espaço para o acaso bonito.",
  },
  {
    icon: MoonStar,
    title: "Entrega das fotografias",
    text: "As imagens são selecionadas, editadas e entregues em uma galeria fácil de acessar.",
  },
];

export function App() {
  const [activeCategory, setActiveCategory] = useState<(typeof portfolioCategories)[number]>("Todos");
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formError, setFormError] = useState("");
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const filteredPortfolio = useMemo(() => {
    if (activeCategory === "Todos") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const hasFilteredPortfolio = filteredPortfolio.length > 0;
  useEffect(() => {
    setActivePortfolioIndex(0);
    galleryRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeCategory]);

  function scrollToArtwork(index: number) {
    const viewport = galleryRef.current;
    const card = viewport?.querySelectorAll<HTMLElement>(".gallery-artwork")[index];
    if (!viewport || !card) return;
    viewport.scrollTo({
      left: card.offsetLeft - viewport.clientWidth / 2 + card.clientWidth / 2,
      behavior: "smooth",
    });
    setActivePortfolioIndex(index);
  }

  function moveArtwork(direction: -1 | 1) {
    const nextIndex = Math.max(0, Math.min(filteredPortfolio.length - 1, activePortfolioIndex + direction));
    scrollToArtwork(nextIndex);
  }


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "contact", "sessionType", "message"];
    const missing = required.some((field) => !String(form.get(field) ?? "").trim());

    if (missing) {
      setSubmitState("error");
      setFormError("Preencha todos os campos para preparar sua mensagem.");
      return;
    }

    setSubmitState("loading");
    setFormError("");
    window.setTimeout(() => {
      setSubmitState("success");
      event.currentTarget.reset();
    }, 850);
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero-section" id="inicio">
          <img
            className="hero-background"
            src="/images/hero/isadora-van-gogh-hero.png"
            alt="Retrato artístico de Isadora em atmosfera azul inspirada em Van Gogh, com girassóis ao fundo."
          />
          <div className="hero-copy hero-quote-only reveal">
            <p className="hero-quote">
              A fotografia é uma breve cumplicidade entre a previsão e o acaso.
              <span>John Stuart Mill.</span>
            </p>
          </div>
        </section>
        <section className="about-section section-shell" id="sobre">
          <div className="section-number" aria-hidden="true">
            01
          </div>
          <div className="about-visual reveal">
            <div className="about-image">
              <img
                className="about-sunflower"
                src="/images/textures/vangogh-girassol.png"
                alt=""
                aria-hidden="true"
              />
              <img
                className="about-photo"
                src="/images/photographer/isadora-working-close.png"
                alt="Isadora segurando uma câmera durante um ensaio ao ar livre."
              />
            </div>
          </div>
          <div className="about-copy reveal delay-1">
            <p className="section-kicker">Por trás das lentes</p>
            <h2>Há beleza no que permanece. Há arte no que passa.</h2>
            <blockquote className="about-art-quote">Sem ar(te) sufoca.</blockquote>
            <p className="about-testimonial">
              Em meu trabalho, tento capturar um momento e transformá-lo em arte. Não apenas em uma
              foto ou em uma pose, mas em uma forma de tornar eterno aquilo que é tão belo.
            </p>
          </div>
        </section>

        <section className="portfolio-section section-shell" id="portfolio">
          <div className="section-heading">
            <p className="section-kicker">Portfólio</p>
            <h2>Uma galeria com ritmo de exposição e cuidado de ensaio.</h2>
            <p>
              Categorias configuráveis para organizar retratos, eventos e momentos especiais sem
              perder o respiro editorial das fotografias.
            </p>
          </div>

          <div className="filter-bar" aria-label="Filtrar portfólio por categoria">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "is-active" : ""}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="portfolio-gallery">
            <div className="gallery-ambient" aria-hidden="true" />
            <button
              className="gallery-nav gallery-nav-prev"
              type="button"
              aria-label="Fotografia anterior"
              disabled={!hasFilteredPortfolio}
              onClick={() => moveArtwork(-1)}
            >
              ‹
            </button>
            {hasFilteredPortfolio ? (
              <div
                className="gallery-viewport"
                ref={galleryRef}
              >
                <div className="gallery-track">
                  {filteredPortfolio.map((item, index) => (
                    <article
                      className={index === activePortfolioIndex ? "gallery-artwork is-active" : "gallery-artwork"}
                      key={item.src}
                    >
                      <img src={item.src} alt={item.alt} style={{ objectPosition: item.objectPosition }} />
                  </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="gallery-empty">Novas fotografias desta categoria entram aqui em breve.</div>
            )}
            <button
              className="gallery-nav gallery-nav-next"
              type="button"
              aria-label="Próxima fotografia"
              disabled={!hasFilteredPortfolio}
              onClick={() => moveArtwork(1)}
            >
              ›
            </button>
          </div>
        </section>

        <section className="process-section section-shell" id="experiencia">
          <div className="section-heading compact">
            <p className="section-kicker">Experiência do ensaio</p>
            <h2>Um processo simples, acolhedor e profissional.</h2>
          </div>
          <div className="process-list">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="process-item reveal">
                  <span className="process-index">{String(index + 1).padStart(2, "0")}</span>
                  {index === 0 ? (
                    <img
                      className="process-image-icon"
                      src="/images/icons/conversation-icon.jpg"
                      alt=""
                      aria-hidden="true"
                    />
                  ) : index === 1 ? (
                    <img
                      className="process-image-icon"
                      src="/images/icons/planning-icon.png"
                      alt=""
                      aria-hidden="true"
                    />
                  ) : index === 2 ? (
                    <img
                      className="process-image-icon"
                      src="/images/icons/session-day-icon.png"
                      alt=""
                      aria-hidden="true"
                    />
                  ) : index === 3 ? (
                    <img
                      className="process-image-icon"
                      src="/images/icons/delivery-icon.png"
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon size={24} aria-hidden="true" />
                  )}
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="quote-section">
          <StarryBackground />
          <p>The world without art is just eh.</p>
        </section>

        <section className="testimonials-section section-shell">
          <div className="testimonial-placeholder">
            <img
              className="testimonial-icon"
              src="/images/icons/testimonials-icon.png"
              alt=""
              aria-hidden="true"
            />
            <h2>Depoimentos preparados para receber novas histórias.</h2>
            <p>
              Depois do aniversário, esta área pode ganhar relatos reais de clientes, prints
              autorizados ou frases curtas sobre a experiência com a Isadora.
            </p>
          </div>
        </section>

        <section className="services-section section-shell">
          <div className="section-heading">
            <p className="section-kicker">Serviços</p>
            <h2>Formatos de ensaio pensados para pessoas, memória e luz.</h2>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <img src={service.image} alt="" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>
                        <Check size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contato">Consultar disponibilidade</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section-shell" id="contato">
          <div className="contact-copy">
            <p className="section-kicker">Contato</p>
            <h2>Vamos imaginar seu ensaio com calma?</h2>
            <p>
              Use os canais abaixo ou envie uma mensagem pelo formulário. A integração de envio
              pode ser conectada depois a um serviço como EmailJS, Formspree ou backend próprio.
            </p>
            <div className="contact-links">
              <a href="https://wa.me/556899335040" target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
              <a href="https://www.instagram.com/byisa_fotografia/" target="_blank" rel="noreferrer">
                <Instagram size={18} aria-hidden="true" />
                @byisa_fotografia
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              Nome
              <input name="name" type="text" autoComplete="name" />
            </label>
            <label>
              Contato
              <input name="contact" type="text" autoComplete="email tel" />
            </label>
            <label>
              Tipo de ensaio
              <select name="sessionType" defaultValue="">
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option>Retrato</option>
                <option>Casal</option>
                <option>Evento</option>
                <option>Ensaio externo</option>
              </select>
            </label>
            <label>
              Mensagem
              <textarea name="message" rows={5} />
            </label>
            {submitState === "error" && <p className="form-message error">{formError}</p>}
            {submitState === "success" && (
              <p className="form-message success">Mensagem preparada com sucesso. Conecte o envio real quando quiser.</p>
            )}
            <button className="button primary" type="submit" disabled={submitState === "loading"}>
              {submitState === "loading" ? "Preparando..." : "Enviar mensagem"}
            </button>
          </form>
        </section>

        <section className="birthday-section section-shell">
          <div className="birthday-card">
            <div>
              <p className="section-kicker">Homenagem</p>
              <h2>Uma mensagem para você</h2>
              <p>
                A área pessoal fica discreta no site e pode ser removida quando a página for usada
                oficialmente como portfólio profissional.
              </p>
            </div>
            <button className="button secondary" type="button" onClick={() => setLetterOpen(true)}>
              Abrir carta
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Isadora Fotografia</strong>
          <p>Criado com carinho para Isadora.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <a href="#sobre">Sobre</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#contato">Contato</a>
          <a href="#inicio" aria-label="Voltar ao topo">
            <ArrowUp size={18} />
          </a>
        </nav>
      </footer>

      {letterOpen && (
        <div className="letter-backdrop" role="presentation" onClick={() => setLetterOpen(false)}>
          <section
            className="letter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
            onClick={(event) => event.stopPropagation()}
          >
            <StarryBackground />
            <button className="letter-close" type="button" onClick={() => setLetterOpen(false)}>
              Fechar
            </button>
            <p className="section-kicker">Carta de aniversário</p>
            <h2 id="letter-title">Para Isadora</h2>
            <p>
              Esse foi um site criado com todo o meu carinho para você, Isadora. Inicialmente,
              pensei em fazer apenas um site de homenagem, mas depois percebi que seria muito mais
              especial criar algo que você pudesse usar sempre e que também ajudasse na sua carreira
              como fotógrafa.
            </p>
            <p>
              Escolhi o tema de Van Gogh e dos girassóis porque sei o quanto você ama essas
              pinturas, a cor azul e toda a sensibilidade que elas transmitem. Tentei me esforçar ao
              máximo para fazer um site que representasse um pouco do seu trabalho e da pessoa que
              você é.
            </p>
            <p>
              Ainda vamos configurar muita coisa por aqui e adicionar todas as suas fotos (porque,
              até o momento em que estou escrevendo isso, você ainda não teve o capricho sublime de
              me enviar todas elas 😒).
            </p>
            <p>
              Você é muito especial para mim, de uma forma que acho que, mesmo que tente imaginar,
              ainda vai imaginar menos do que realmente é. Minha parte favorita do dia é quando
              estou falando com você. Na maioria das vezes, meu primeiro pensamento também é você.
            </p>
            <p>
              Se Deus quiser (e tomara que Ele queira, meu Deus do céu), este ano vamos nos
              encontrar mais, viver mais momentos juntos e aprofundar ainda mais a nossa relação.
            </p>
            <p>Ass: Davi Santiago dos santos</p>
            <small>Essa parte vai ser removida quando o site for pro ar oficialmente.</small>
          </section>
        </div>
      )}
    </>
  );
}
