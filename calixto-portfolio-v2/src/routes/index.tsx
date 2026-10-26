import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/calixto-logo.png";
import mark from "@/assets/ian-about.png";
import hero from "@/assets/hero.jpg";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import { X } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";
import { GradientMeshBackground } from "@/components/ui/gradient-mesh-background";
import { CursorHalo } from "@/components/ui/cursor-halo";
import { LensZoomCarousel } from "@/components/ui/lens-zoom-carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ian Calixto — Fotógrafo e Videomaker" },
      {
        name: "description",
        content: "Um instante para sempre. Fotografia e produção audiovisual por Ian Calixto.",
      },
      { property: "og:title", content: "Ian Calixto — Fotógrafo e Videomaker" },
      {
        property: "og:description",
        content: "Um instante para sempre. Fotografia e produção audiovisual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const works = [
  {
    img: w1,
    title: "Casamento nas dunas",
    cat: "Foto",
    cls: "md:row-span-2",
    images: [w1, w2, w3, hero], // Múltiplas imagens do evento
  },
  {
    img: w2,
    title: "Festival ao vivo",
    cat: "Vídeo",
    cls: "md:col-span-2",
    images: [w2, w1, hero, w3], // Múltiplas imagens do evento
  },
  {
    img: w3,
    title: "Retrato editorial",
    cat: "Foto",
    cls: "",
    images: [w3, hero, w1, w2], // Múltiplas imagens do evento
  },
  {
    img: hero,
    title: "Bastidores",
    cat: "Vídeo",
    cls: "",
    images: [hero, w3, w2, w1], // Múltiplas imagens do evento
  },
];

const services = [
  ["01", "Fotografia", "Ensaios, retratos, eventos e casamentos com olhar documental."],
  ["02", "Vídeo", "Filmes de eventos, clipes e conteúdo para marcas."],
  ["03", "Social", "Reels e cobertura dinâmica para redes sociais."],
];

function Index() {
  const [filter, setFilter] = useState("Todos");
  const [selectedWork, setSelectedWork] = useState<(typeof works)[0] | null>(null);
  const shown = works.filter((w) => filter === "Todos" || w.cat === filter);

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      {/* Gradient Mesh Background */}
      <GradientMeshBackground />

      {/* Cursor Halo Effect */}
      <CursorHalo />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#topo">
            <img src={logo} alt="Calixto" className="h-8 w-auto mix-blend-lighten" />
          </a>
          <nav className="hidden gap-8 text-sm uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#trabalhos" className="hover:text-brand">
              Trabalhos
            </a>
            <a href="#servicos" className="hover:text-brand">
              Serviços
            </a>
            <a href="#sobre" className="hover:text-brand">
              Sobre
            </a>
            <a href="#contato" className="hover:text-brand">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="topo"
        className="relative flex min-h-screen items-end overflow-hidden pt-24 md:pt-28"
      >
        <img
          src={hero}
          alt="Videomaker filmando"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-brand">
            Fotógrafo & Videomaker
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.9] md:text-[9rem]">
            UM INSTANTE
            <br />
            <span className="text-outline">PARA SEMPRE</span>
          </h1>
          <a
            href="#trabalhos"
            className="mt-10 inline-block bg-brand px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-paper hover:text-ink"
          >
            Ver trabalhos
          </a>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-brand py-5">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-4xl font-extrabold text-primary-foreground">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            ["HISTÓRIAS REAIS", "✦", "FOTOGRAFIA", "✦", "AUDIOVISUAL", "✦", "CALIXTO", "✦"].map(
              (t, j) => <span key={`${i}-${j}`}>{t}</span>,
            ),
          )}
        </div>
      </div>

      {/* Works */}
      <section id="trabalhos" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">Trabalhos</h2>
          <div className="flex gap-2">
            {["Todos", "Foto", "Vídeo"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-5 py-2 text-xs uppercase tracking-widest transition ${filter === f ? "border-brand bg-brand text-primary-foreground" : "border-border text-muted-foreground hover:border-brand"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid auto-rows-[300px] gap-4 md:grid-cols-3">
          {shown.map((w) => (
            <figure
              key={w.title}
              className={`group relative overflow-hidden border border-brand/40 cursor-pointer ${filter === "Todos" ? w.cls : ""}`}
              onClick={() => setSelectedWork(w)}
            >
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background to-transparent p-5">
                <span className="font-display text-lg font-semibold">{w.title}</span>
                <span className="bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">
                  {w.cat}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Lens Zoom Carousel */}
        {selectedWork && (
          <LensZoomCarousel
            images={selectedWork.images}
            title={selectedWork.title}
            category={selectedWork.cat}
            onClose={() => setSelectedWork(null)}
          />
        )}
      </section>

      {/* Services */}
      <section id="servicos" className="bg-paper py-28 text-ink">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 font-display text-4xl font-extrabold md:text-6xl">Serviços</h2>
          <div className="grid gap-px bg-ink/10 md:grid-cols-3">
            {services.map(([n, t, d]) => (
              <div
                key={n}
                className="group bg-paper p-10 transition hover:bg-brand hover:text-primary-foreground"
              >
                <span className="font-display text-sm text-brand group-hover:text-primary-foreground">
                  {n}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{t}</h3>
                <p className="mt-4 opacity-70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="sobre"
        className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-2"
      >
        <div className="relative mx-auto aspect-square w-full max-w-sm bg-brand">
          <img
            src={mark}
            alt="Ian Calixto"
            width={2000}
            height={2000}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-brand">Sobre</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Ian Calixto</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Enquadramento, presença e assinatura. Transformo momentos em imagens que permanecem — o
            instante ganha forma através do olhar de quem cria.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="relative overflow-hidden py-28 text-primary-foreground">
        {/* Background gradient effect - purple/blue style */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 via-blue-800/50 to-background" />

        {/* Top radial glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-blue-400/20 blur-[80px]" />

        <span
          aria-hidden
          className="text-outline-light pointer-events-none absolute -bottom-10 -right-10 font-display text-[14rem] font-extrabold leading-none opacity-20 z-0"
        >
          XTO
        </span>
        <div className="relative mx-auto max-w-7xl px-6 z-10">
          <h2 className="font-display text-5xl font-extrabold md:text-7xl">
            Vamos criar
            <br />
            juntos?
          </h2>

          <div className="mt-12 max-w-2xl relative">
            {/* Animated shine border effect */}
            <ShineBorder shineColor={["#FF6B35", "#F7931E", "#FDC830"]} />

            {/* Traveling light beam effect on edges */}
            <div className="absolute -inset-[1px] rounded-lg overflow-hidden pointer-events-none">
              {/* Top light beam */}
              <div
                className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-[beam-top_3s_ease-in-out_infinite]"
                style={{
                  animation: "beam-top 3s ease-in-out infinite",
                }}
              />

              {/* Right light beam */}
              <div
                className="absolute top-0 right-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-60"
                style={{
                  animation: "beam-right 3s ease-in-out infinite 0.75s",
                }}
              />

              {/* Bottom light beam */}
              <div
                className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                style={{
                  animation: "beam-bottom 3s ease-in-out infinite 1.5s",
                }}
              />

              {/* Left light beam */}
              <div
                className="absolute bottom-0 left-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-60"
                style={{
                  animation: "beam-left 3s ease-in-out infinite 2.25s",
                }}
              />
            </div>

            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const message = [
                  `Olá, Ian! Meu nome é ${formData.get("nome")}.`,
                  `Meu e-mail: ${formData.get("email")}.`,
                  `Sobre o projeto: ${formData.get("mensagem")}`,
                ].join("\n");
                window.open(
                  `https://wa.me/5584999669974?text=${encodeURIComponent(message)}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className="relative space-y-6 rounded-lg bg-background/40 backdrop-blur-xl p-8 border border-white/[0.05] shadow-2xl overflow-hidden"
            >
              {/* Subtle inner patterns */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative z-10 space-y-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-bold uppercase tracking-widest mb-2 text-primary-foreground"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="w-full border-2 border-transparent bg-white/5 px-4 py-3 text-primary-foreground placeholder:text-white/30 focus:border-white/20 focus:bg-white/10 focus:outline-none rounded-lg transition-all duration-300 hover:bg-white/10"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold uppercase tracking-widest mb-2 text-primary-foreground"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border-2 border-transparent bg-white/5 px-4 py-3 text-primary-foreground placeholder:text-white/30 focus:border-white/20 focus:bg-white/10 focus:outline-none rounded-lg transition-all duration-300 hover:bg-white/10"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-bold uppercase tracking-widest mb-2 text-primary-foreground"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    className="w-full border-2 border-transparent bg-white/5 px-4 py-3 text-primary-foreground placeholder:text-white/30 focus:border-white/20 focus:bg-white/10 focus:outline-none resize-none rounded-lg transition-all duration-300 hover:bg-white/10"
                    placeholder="Conte mais sobre seu projeto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full relative group/button overflow-hidden bg-white text-background font-medium h-12 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 text-sm font-bold uppercase tracking-widest">
                    Enviar via WhatsApp
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 flex flex-col gap-4 text-xl font-bold md:flex-row md:gap-12">
            <a
              href="https://wa.me/5584999669974"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-8 hover:underline"
            >
              (84) 9 9966-9974
            </a>
            <a
              href="https://instagram.com/calixto.rec"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-8 hover:underline"
            >
              @calixto.rec
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Calixto · Produção audiovisual
      </footer>
    </main>
  );
}
