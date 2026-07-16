import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiGithub,
  FiLinkedin,
  FiSearch,
  FiDownload,
} from "react-icons/fi";
import "./styles.css";

const siteUrl = "https://hasnainabbas.dev";
const projects = [
  {
    slug: "forge-lab-fitness",
    title: "Forge Lab Fitness",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "clay",
    thumbnail: "/projects/forgelab-fitness.png",
    description:
      "A bold and high-energy fitness website designed to showcase personal training services, programs, and a strong performance-driven brand identity.",
    live: "https://forgelabfitness.netlify.app/",
    github: "https://github.com/",
    problem:
      "The fitness brand needed a modern digital presence that could communicate strength, energy, and professionalism while making its services easy to explore.",
    solution:
      "A responsive, visually immersive fitness experience with bold typography, engaging interactions, smooth animations, and clear conversion-focused sections.",
    results: [
      "Fully responsive across devices",
      "Immersive fitness-focused visual experience",
      "Smooth animations and modern interactions",
    ],
  },
  {
    slug: "nocturne-motors",
    title: "Nocturne Motors",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "blue",
    thumbnail: "/projects/nocturne-motors.png",
    description:
      "A premium automotive website crafted around luxury, performance, and cinematic visual storytelling for a high-end motors brand.",
    live: "https://nocturnemotors.netlify.app/",
    github: "https://github.com/",
    problem:
      "The automotive concept required a digital experience that could capture the exclusivity and performance associated with premium vehicles.",
    solution:
      "A cinematic, motion-led interface combining dramatic imagery, refined typography, smooth transitions, and an immersive browsing experience.",
    results: [
      "Premium automotive brand experience",
      "Responsive and immersive interface",
      "Motion-focused visual storytelling",
    ],
  },
  {
    slug: "nova-smartwatch",
    title: "Nova Smartwatch",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "blue",
    thumbnail: "/projects/nova-smartwatch.png",
    description:
      "A sleek product landing page designed to showcase a next-generation smartwatch through modern visuals and interactive product storytelling.",
    live: "https://novasmartwatch.netlify.app/",
    github: "https://github.com/",
    problem:
      "The smartwatch concept needed a premium landing experience that could communicate product features while maintaining a futuristic technology aesthetic.",
    solution:
      "A product-focused interface featuring strong visual hierarchy, interactive sections, smooth motion, and a responsive layout designed around product discovery.",
    results: [
      "Premium product presentation",
      "Responsive product-focused interface",
      "Modern and engaging visual experience",
    ],
  },
  {
    slug: "reliable-roofing",
    title: "Reliable Roofing",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "clay",
    thumbnail: "/projects/reliable-roofing.png",
    description:
      "A professional roofing company website designed to establish trust, showcase services, and turn local visitors into qualified customer enquiries.",
    live: "https://reliableroofing.netlify.app/",
    github: "https://github.com/",
    problem:
      "The roofing business needed a trustworthy and modern online presence that clearly communicated its services and encouraged potential customers to get in touch.",
    solution:
      "A conversion-focused business website with clear service presentation, strong calls to action, responsive layouts, and a professional visual identity.",
    results: [
      "Conversion-focused service presentation",
      "Fully responsive business website",
      "Clear customer enquiry journey",
    ],
  },
  {
    slug: "flyboy-clothing",
    title: "Flyboy Clothing",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "lime",
    thumbnail: "/projects/flyboy-clothing.png",
    description:
      "A contemporary streetwear ecommerce experience combining bold fashion aesthetics with a clean and engaging product discovery journey.",
    live: "https://flyboyclothing.netlify.app/",
    github: "https://github.com/",
    problem:
      "The clothing brand needed a distinctive digital storefront that could express its streetwear identity while keeping the shopping experience intuitive.",
    solution:
      "A visually bold ecommerce interface with editorial-inspired layouts, responsive product presentation, engaging interactions, and streamlined navigation.",
    results: [
      "Distinctive streetwear brand experience",
      "Responsive ecommerce interface",
      "Engaging product discovery journey",
    ],
  },
  {
    slug: "axion-rc",
    title: "Axion RC",
    category: "Website",
    year: "2026",
    stack: ["React", "JavaScript", "CSS"],
    color: "lime",
    thumbnail: "/projects/axion-rc.png",
    description:
      "A modern technology-focused website built to present Axion RC through a clean, professional, and engaging digital experience.",
    live: "https://axionrc.com/",
    github: "https://github.com/",
    problem:
      "The brand needed a polished online presence capable of clearly presenting its identity, products, and value to potential customers.",
    solution:
      "A structured and responsive web experience with clear content hierarchy, modern visuals, intuitive navigation, and performance-focused development.",
    results: [
      "Professional responsive experience",
      "Clear brand and content presentation",
      "Optimized cross-device usability",
    ],
  },
];
const posts = [
  {
    slug: "interfaces-that-age-well",
    title: "Building interfaces that age well",
    category: "Engineering",
    time: "6 min",
    excerpt:
      "The choices that keep a product comfortable to change six months after launch.",
    body: "Interfaces age best when their systems are clear. Choose predictable patterns, document decisions that matter, and treat performance as a feature rather than a final pass.",
  },
  {
    slug: "product-site-considered",
    title: "What makes a product site feel considered?",
    category: "Product",
    time: "4 min",
    excerpt:
      "A useful way to tell the difference between decoration and direction.",
    body: "Considered product sites reduce hesitation. They make the next action obvious, answer questions before they are asked, and use personality to clarify rather than distract.",
  },
  {
    slug: "slow-first-impression",
    title: "The cost of a slow first impression",
    category: "Performance",
    time: "5 min",
    excerpt:
      "Why speed is still one of the clearest forms of respect for a visitor.",
    body: "Performance affects trust long before users can describe it. A fast site feels prepared; a slow one asks the visitor to do extra work before seeing value.",
  },
];
function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Hasnain Abbas`
      : "Hasnain Abbas | Full Stack Web Developer";
    const set = (n, c) => {
      let e = document.querySelector(`meta[name="${n}"]`);
      if (!e) {
        e = document.createElement("meta");
        e.name = n;
        document.head.appendChild(e);
      }
      e.content = c;
    };
    set(
      "description",
      description ||
        "Hasnain Abbas is a Full Stack Web Developer building fast, thoughtful digital products.",
    );
    let c = document.querySelector('link[rel="canonical"]');
    if (!c) {
      c = document.createElement("link");
      c.rel = "canonical";
      document.head.appendChild(c);
    }
    c.href = siteUrl + location.pathname;
  }, [title, description]);
  return null;
}
function Cursor() {
  const c = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y,
      frame;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      c.current?.style.setProperty("--cursor-x", `${x}px`);
      c.current?.style.setProperty("--cursor-y", `${y}px`);
      frame = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="cursor" ref={c}>
      <i />
    </div>
  );
}
function Intro() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setD(true), 1350);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"intro " + (d ? "intro-out" : "")} aria-hidden="true">
      <b>HASNAIN</b>
      <b>ABBAS</b>
      <small>FULL STACK DEVELOPER</small>
    </div>
  );
}
function Shell({ children }) {
  const [o, setO] = useState(false),
    [scrolled, setScrolled] = useState(false),
    l = useLocation(),
    menu = useRef(null),
    isScrolled = useRef(false);
  const links = useMemo(
    () => [
      ["/", "Home"],
      ["/about", "About"],
      ["/projects", "Portfolio"],
      ["/services", "Services"],
      ["/contact", "Contact"],
    ],
    [],
  );
  const toggleMenu = useCallback(() => setO((value) => !value), []);
  useEffect(() => setO(false), [l]);
  useEffect(() => {
    const scroll = () => {
      const next = scrollY > 24;
      if (next !== isScrolled.current) {
        isScrolled.current = next;
        setScrolled(next);
      }
    };
    addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!o) return;
    const key = (e) => {
      if (e.key === "Escape") setO(false);
      if (e.key === "Tab") {
        const f = menu.current?.querySelectorAll("a,button");
        if (!f?.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("button")?.focus();
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [o]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro />
      <Cursor />
      <div className="grain" />
      <header className={"nav app-nav " + (scrolled ? "nav-scrolled" : "")}>
        <Link className="monogram" to="/" aria-label="Hasnain Abbas home">
          HA<span>R</span>
        </Link>
        <p className="nav-note">
          <b>Hasnain Abbas</b>
          <br />
          Full Stack Web Developer
        </p>
        <div className="nav-desktop" aria-label="Primary navigation">
          {links.map((x) => (
            <NavLink to={x[0]} key={x[0]}>
              {x[1]}
            </NavLink>
          ))}
          <a className="resume-button" href="/resume.pdf" download>
            Resume <FiDownload />
          </a>
        </div>
        <button
          className={"menu-button " + (o ? "is-open" : "")}
          onClick={toggleMenu}
          aria-expanded={o}
          aria-controls="site-menu"
          aria-label={o ? "Close navigation menu" : "Open navigation menu"}
        >
          <i />
          <i />
          <i />
        </button>
      </header>
      <AnimatePresence>
        {o && (
          <motion.nav
            ref={menu}
            id="site-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            onPointerDown={(e) => {
              if (e.target === e.currentTarget) setO(false);
            }}
            initial={{ clipPath: "circle(0% at calc(100% - 45px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 45px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 45px) 38px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-top">
              <span>Navigation</span>
              <span>Hasnain Abbas</span>
              <button
                className="mobile-close"
                onClick={toggleMenu}
                aria-label="Close navigation menu"
              >
                <i />
                <i />
              </button>
            </div>
            <div className="mobile-links">
              {links.map((x, i) => (
                <motion.div
                  key={x[0]}
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{
                    delay: 0.16 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NavLink to={x[0]}>
                    <em>0{i + 1}</em>
                    {x[1]}
                    <FiArrowUpRight />
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mobile-menu-bottom"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
              <a className="mobile-cta" href="/resume.pdf" download>
                Download resume
              </a>
              <Link className="mobile-contact" to="/contact">
                Start a project <FiArrowUpRight />
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
function Page({ children, className = "" }) {
  return (
    <motion.main
      id="main"
      className={"page " + className}
      tabIndex="-1"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
function Art({ color, thumbnail, title }) {
  return (
    <div
      className={"project-art " + color}
      role="img"
      aria-label={thumbnail ? `${title} website thumbnail` : "Abstract project visual"}
    >
      {thumbnail ? <img src={thumbnail} alt="" loading="lazy" /> : <div className="art-object"><b /></div>}
    </div>
  );
}
function IntroTitle({ eyebrow, title }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
    </section>
  );
}
function MagneticLink({ href, children }) {
  const ref = useRef(null);
  const move = (e) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box || matchMedia("(pointer: coarse)").matches) return;
    ref.current.style.setProperty(
      "--magnet-x",
      `${(e.clientX - box.left - box.width / 2) * 0.12}px`,
    );
    ref.current.style.setProperty(
      "--magnet-y",
      `${(e.clientY - box.top - box.height / 2) * 0.12}px`,
    );
  };
  const reset = () => {
    ref.current?.style.setProperty("--magnet-x", "0px");
    ref.current?.style.setProperty("--magnet-y", "0px");
  };
  return (
    <a
      ref={ref}
      className="project-live"
      href={href}
      target="_blank"
      rel="noreferrer"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </a>
  );
}
const Card = memo(function Card({ p }) {
  return (
    <article className="portfolio-card">
      <Art color={p.color} thumbnail={p.thumbnail} title={p.title} />
      <div className="card-copy">
        <span>
          {p.category} / {p.year}
        </span>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="card-actions">
          <MagneticLink href={p.live}>
            Open live project <FiArrowUpRight />
          </MagneticLink>
        </div>
      </div>
    </article>
  );
});
function Home() {
  return (
    <Page>
      <Seo />
      <section className="hero app-hero">
        <div className="hero-top">
          <span>Portfolio / 2026</span>
        </div>
        <div className="hero-title">
          <h1>
            <span>HASNAIN</span>
            <span className="indent">ABBAS</span>
            <span className="outline">FULL STACK</span>
          </h1>
          <div className="portrait">
            <img
              src="/portrait.png"
              alt="Portrait placeholder for Hasnain Abbas"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            I build high-performing digital products with a sharp visual point
            of view and dependable engineering underneath.
          </p>
          <Link to="/projects" className="round-link">
            Explore
            <br />
            work <FiArrowUpRight />
          </Link>
        </div>
      </section>
      <div className="logo-line">
        <div className="tech-slider">
          {[
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "PHP",
            "MySQL",
            "HTML5",
            "CSS3",
            "WordPress",
            "Shopify",
            "GSAP",
            "Framer Motion",
            "REST APIs",
          ].map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
          <div className="tech-slider-copy" aria-hidden="true">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "PHP",
              "MySQL",
              "HTML5",
              "CSS3",
              "WordPress",
              "Shopify",
              "GSAP",
              "Framer Motion",
              "REST APIs",
            ].map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </div>
      <section className="manifesto">
        <p className="eyebrow">01 / How I work</p>
        <div className="manifesto-copy">
          <p>
            Clear thinking, strong systems, and interfaces that give people a
            reason to stay.
          </p>
          <div className="stamp">
            H<br />A<br />
            <span>*</span>
          </div>
        </div>
        <div className="principles">
          <span>Product thinking</span>
          <span>Frontend systems</span>
          <span>Full stack delivery</span>
          <span>Performance first</span>
        </div>
      </section>
      <section className="work portfolio-home">
        <div className="section-head">
          <p className="eyebrow">02 / Portfolio</p>
          <h2>
            Built to be
            <br />
            <i>used, not admired.</i>
          </h2>
          <Link to="/projects">
            View all <FiArrowUpRight />
          </Link>
        </div>
        <div className="portfolio-cards">
          {projects.map((p) => (
            <Card p={p} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="skills">
        <p className="eyebrow">03 / Toolkit</p>
        <h2>
          Tools are only useful
          <br />
          when the <i>thinking</i> is sound.
        </h2>
        <div className="tech-orbit">
          {[
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "MongoDB",
            "Supabase",
            "GSAP",
            "Tailwind",
          ].map((x, i) => (
            <span key={x} style={{ "--angle": `${i * 45}deg` }}>
              {x}
            </span>
          ))}
        </div>
      </section>
      <section className="process">
        <p className="eyebrow">03 / Delivery</p>
        {["Discover", "Structure", "Design", "Build", "Refine", "Launch"].map(
          (x, i) => (
            <div className="process-row" key={x}>
              <em>0{i + 1}</em>
              <h3>{x}</h3>
              <span>
                {
                  [
                    "Scope the useful problem.",
                    "Map content and journeys.",
                    "Make direction tangible.",
                    "Build resilient interfaces.",
                    "Test the details that matter.",
                    "Release and keep improving.",
                  ][i]
                }
              </span>
            </div>
          ),
        )}
      </section>
      <section className="stats">
        {[
          ["04", "years shipping production products"],
          ["18", "launches across product, web and commerce"],
          ["100", "percent focus on work that earns attention"],
        ].map((x) => (
          <div key={x[0]}>
            <strong>{x[0]}</strong>
            <span>{x[1]}</span>
          </div>
        ))}
      </section>
      <ContactBand />
    </Page>
  );
}
function About() {
  const education = [
    {
      degree: "Bachelor of Computer Science (BSCS)",
      institution: "FAST-NUCES, Karachi",
      years: "Currently enrolled / 3rd semester",
      description:
        "Building a strong foundation in computer science alongside practical development work.",
    },
    {
      degree: "Advanced Diploma in Software Engineering (ADSE)",
      institution: "Aptech Computer Education",
      years: "3-year diploma",
      description:
        "Practical software engineering training across development fundamentals and web technologies.",
    },
    {
      degree: "Higher Secondary Education (CS)",
      institution: "Aga Khan Higher Secondary School",
      years: "86.9%",
      description: "Computer science academic foundation.",
    },
    {
      degree: "Matriculation — Computer Science",
      institution: "B.V.S. Parsi High School",
      years: "84.1%",
      description: "Computer science academic foundation.",
    },
  ];
  const experience = [
    {
      position: "Full Stack Web Developer",
      company: "Nestec Services",
      duration: "Present",
      responsibilities:
        "Develop and maintain responsive full-stack websites and web applications, working across frontend development, styling, and custom features.",
      technologies: "JavaScript, React, Node.js, WordPress, Shopify",
    },
    {
      position: "PHP Developer Intern",
      company: "Web development internship",
      duration: "1 month",
      responsibilities:
        "Gained practical exposure to PHP-based web development and backend system development in a professional environment.",
      technologies: "PHP, MySQL, HTML, CSS",
    },
  ];
  return (
    <Page className="inner">
      <Seo title="About" />
      <IntroTitle
        eyebrow="About Hasnain"
        title={
          <>
            A developer who cares about what happens <i>after</i> the first
            click.
          </>
        }
      />
      <section className="bio">
        <div className="about-portrait">
          <img src="/portrait.png" alt="" />
        </div>
        <div>
          <p className="big-copy">
            I am Hasnain Abbas, a Full Stack Web Developer with four years of
            continuous coding and project-building experience.
          </p>
          <p>
            I specialize in MERN stack development and modern responsive
            interfaces, with experience in WordPress, Shopify, JavaScript, and
            smooth animation-led web experiences. I combine practical
            full-stack functionality with polished frontend execution.
          </p>
          <Link className="text-link" to="/contact">
            Work with me <FiArrowUpRight />
          </Link>
        </div>
      </section>
      <section className="about-details" aria-label="Experience and education">
        <div className="about-section-head">
          <p className="eyebrow">Experience</p>
          <h2>Work that compounds.</h2>
        </div>
        <div className="experience-list">
          {experience.map((item, i) => (
            <article key={item.position}>
              <em>0{i + 1}</em>
              <div>
                <p className="timeline-meta">
                  {item.company} / {item.duration}
                </p>
                <h3>{item.position}</h3>
              </div>
              <div>
                <p>{item.responsibilities}</p>
                <span>{item.technologies}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="about-section-head education-head">
          <p className="eyebrow">Education</p>
          <h2>Foundation, kept current.</h2>
        </div>
        <div className="education-grid">
          {education.map((item, i) => (
            <article key={item.degree}>
              <em>0{i + 1}</em>
              <p className="timeline-meta">{item.years}</p>
              <h3>{item.degree}</h3>
              <strong>{item.institution}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
function Projects() {
  const [q, setQ] = useState(""),
    [sort, setSort] = useState("Newest");
  let shown = projects.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase()),
  );
  shown = [...shown].sort((a, b) =>
    sort === "Newest" ? b.year - a.year : a.title.localeCompare(b.title),
  );
  return (
    <Page className="inner">
      <Seo title="Projects" />
      <IntroTitle
        eyebrow="Project index"
        title={
          <>
            Work with a job
            <br />
            to <i>do.</i>
          </>
        }
      />
      <div className="project-controls">
        <label>
          <FiSearch />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects"
            aria-label="Search projects"
          />
        </label>
        <div>
          <button onClick={() => setSort(sort === "Newest" ? "A-Z" : "Newest")}>
            Sort: {sort}
          </button>
        </div>
      </div>
      <div className="all-projects">
        {shown.length ? (
          shown.map((p) => <Card p={p} key={p.slug} />)
        ) : (
          <p className="empty-state">No projects match that search.</p>
        )}
      </div>
    </Page>
  );
}
function CaseStudy() {
  const { slug } = useParams(),
    p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <Page className="case">
      <Seo title={p.title} description={p.description} />
      <Link className="back" to="/projects">
        <FiArrowLeft /> All projects
      </Link>
      <section className="case-hero">
        <p>
          {p.category} / {p.year}
        </p>
        <h1>{p.title}</h1>
        <p>{p.stack.join(" / ")}</p>
      </section>
      <Art color={p.color} thumbnail={p.thumbnail} title={p.title} />
      <section className="case-copy">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>{p.problem}</h2>
        </div>
        <div>
          <p>
            <b>Solution:</b> {p.solution}
          </p>
          <p>
            <b>Technology:</b> {p.stack.join(", ")}
          </p>
          <p>
            <b>Features:</b> Responsive interface, accessible interaction
            patterns, CMS-ready components, and performance-first delivery.
          </p>
          <div className="card-actions">
            <a href={p.live} target="_blank" rel="noreferrer">
              Live demo <FiArrowUpRight />
            </a>
            <a href={p.github} target="_blank" rel="noreferrer">
              GitHub <FiGithub />
            </a>
          </div>
        </div>
      </section>
      <section className="case-grid">
        {p.results.map((r, i) => (
          <div key={r}>
            Result 0{i + 1}
            <b>{r}</b>
          </div>
        ))}
      </section>
      <section className="work related">
        <div className="section-head">
          <p className="eyebrow">Related work</p>
          <h2>
            Continue
            <br />
            <i>exploring.</i>
          </h2>
        </div>
        <div className="portfolio-cards">
          {related.map((x) => (
            <Card p={x} key={x.slug} />
          ))}
        </div>
      </section>
    </Page>
  );
}
function Services() {
  const list = [
    "Website design",
    "Frontend development",
    "React development",
    "MERN stack builds",
    "SaaS and business websites",
    "Ecommerce",
    "Performance optimisation",
    "Ongoing support",
  ];
  return (
    <Page className="inner">
      <Seo title="Services" />
      <IntroTitle
        eyebrow="Services"
        title={
          <>
            What I can take
            <br />
            off your <i>plate.</i>
          </>
        }
      />
      <div className="services-list">
        {list.map((x, i) => (
          <article key={x}>
            <em>0{i + 1}</em>
            <h2>{x}</h2>
            <p>
              Focused delivery, clear communication, and a maintainable result.
            </p>
            <FiArrowUpRight />
          </article>
        ))}
      </div>
    </Page>
  );
}
function Blog() {
  const [q, setQ] = useState(""),
    [cat, setCat] = useState("All");
  const shown = posts.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      p.title.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <Page className="inner">
      <Seo title="Journal" />
      <IntroTitle
        eyebrow="Journal"
        title={
          <>
            Observations from
            <br />
            the <i>workbench.</i>
          </>
        }
      />
      <Link to={"/blog/" + posts[0].slug} className="featured-post">
        <span>Featured / {posts[0].time} read</span>
        <h2>{posts[0].title}</h2>
        <p>{posts[0].excerpt}</p>
      </Link>
      <div className="blog-tools">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles"
          aria-label="Search articles"
        />
        {["All", "Engineering", "Product", "Performance"].map((x) => (
          <button
            onClick={() => setCat(x)}
            className={cat === x ? "active" : ""}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {shown.map((x) => (
          <article key={x.slug}>
            <span>
              {x.category} / {x.time}
            </span>
            <h2>{x.title}</h2>
            <p>{x.excerpt}</p>
            <Link to={"/blog/" + x.slug}>
              Open <FiArrowUpRight />
            </Link>
          </article>
        ))}
      </div>
    </Page>
  );
}
function Article() {
  const { slug } = useParams(),
    p = posts.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  return (
    <Page className="inner article">
      <Seo title={p.title} description={p.excerpt} />
      <Link className="back" to="/blog">
        <FiArrowLeft /> Journal
      </Link>
      <IntroTitle eyebrow={`${p.category} / ${p.time} read`} title={p.title} />
      <p className="article-body">{p.body}</p>
      <section className="newsletter">
        <p className="eyebrow">Occasional notes</p>
        <h2>Useful thoughts about building for the web.</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter">
            Email address
          </label>
          <input
            id="newsletter"
            type="email"
            placeholder="you@email.com"
            required
          />
          <button>Subscribe</button>
        </form>
      </section>
    </Page>
  );
}
function Contact() {
  const [data, setData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    }),
    [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const change = (e) =>
    setData((current) => ({ ...current, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (
      data.name.trim().length < 2 ||
      !/^\S+@\S+\.\S+$/.test(data.email) ||
      data.subject.trim().length < 3 ||
      data.message.trim().length < 15
    ) {
      setStatus("error");
      setMessage(
        "Please complete every field with a valid email and a short project outline.",
      );
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(result.message || "Your message could not be sent.");
      setStatus("success");
      setMessage(
        "Thanks — your message is on its way. I’ll be in touch shortly.",
      );
      setData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Your message could not be sent. Please try again or email me directly.",
      );
    }
  };
  return (
    <Page className="contact-page">
      <Seo title="Contact" />
      <IntroTitle
        eyebrow="Contact"
        title={
          <>
            Have a project
            <br />
            in <i>mind?</i>
          </>
        }
      />
      <div className="contact-grid">
        <form onSubmit={submit} noValidate aria-busy={status === "sending"}>
          <label>
            Name
            <input
              name="name"
              value={data.name}
              onChange={change}
              autoComplete="name"
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={change}
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </label>
          <label>
            Subject
            <input
              name="subject"
              value={data.subject}
              onChange={change}
              placeholder="What can I help with?"
              required
            />
          </label>
          <label>
            Project details
            <textarea
              name="message"
              value={data.message}
              onChange={change}
              placeholder="A useful outline is plenty."
              required
            />
          </label>
          <label className="honeypot" aria-hidden="true">
            Website
            <input
              name="website"
              value={data.website}
              onChange={change}
              tabIndex="-1"
              autoComplete="off"
            />
          </label>
          <button className="send" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send enquiry"}{" "}
            <FiArrowUpRight />
          </button>
          <p
            className={"form-status " + status}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>
        <aside>
          <span>Available for selected work</span>
          <a href="mailto:hassnainlilani@gmail.com">hassnainlilani@gmail.com</a>
          <p>Pakistan - remote worldwide</p>
          <div>
            <FiLinkedin /> LinkedIn
            <br />
            <FiGithub /> GitHub
          </div>
        </aside>
      </div>
    </Page>
  );
}
function Legal({ terms = false }) {
  const label = terms ? "Terms and Conditions" : "Privacy Policy";
  return (
    <Page className="inner legal">
      <Seo title={label} />
      <IntroTitle eyebrow="Legal" title={label} />
      <p>Last updated: July 2026</p>
      <h2>{terms ? "Using this website" : "How information is handled"}</h2>
      <p>
        {terms
          ? "This portfolio is provided for professional information and project enquiries. Content may not be copied or republished without permission."
          : "Contact details submitted through the enquiry form are used only to respond to your project request. They are not sold or shared for marketing purposes."}
      </p>
      <h2>Contact</h2>
      <p>For questions, email hello@hasnainabbas.dev.</p>
    </Page>
  );
}
function ContactBand() {
  return (
    <section className="contact-band">
      <p className="eyebrow">Have a real problem to solve?</p>
      <Link to="/contact">
        LET'S TALK <FiArrowUpRight />
      </Link>
    </section>
  );
}
function FAQ() {
  const items = [
    {
      q: "What services do you provide?",
      a: "I design and build portfolio sites, product websites, full-stack applications, and focused frontend systems.",
    },
    {
      q: "What technologies do you specialize in?",
      a: "My core stack is React, Node.js, modern JavaScript, MongoDB, and motion-led interface tooling.",
    },
    {
      q: "How long does a project usually take?",
      a: "A focused website typically takes two to four weeks. Product work is planned around the scope, integration needs, and launch window.",
    },
    {
      q: "Do you build full-stack applications?",
      a: "Yes. I work across responsive interfaces, API integration, data models, authentication, and deployment-ready architecture.",
    },
    {
      q: "Can you redesign an existing website?",
      a: "Yes. I can refine an existing product or rebuild it around clearer content, better performance, and a stronger conversion path.",
    },
    {
      q: "Do you provide maintenance?",
      a: "Yes. Ongoing support can cover iterations, performance checks, content updates, and technical upkeep after launch.",
    },
    {
      q: "How can we start working together?",
      a: "Send a short outline through the contact page. I’ll reply with the best next step, expected scope, and a practical timeline.",
    },
    {
      q: "What is your development process?",
      a: "We align on the problem, structure the experience, build in focused milestones, then test and refine the details before launch.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq-heading">
        <p className="eyebrow">03 / Common questions</p>
        <h2 id="faq-title">
          Clear answers,
          <br />
          <i>before we start.</i>
        </h2>
      </div>
      <div className="faq-list">
        {items.map((item, index) => (
          <article className={open === index ? "open" : ""} key={item.q}>
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
              aria-controls={"faq-" + index}
            >
              <em>{String(index + 1).padStart(2, "0")}</em>
              <span>{item.q}</span>
              <i aria-hidden="true" />
            </button>
            <motion.div
              id={"faq-" + index}
              initial={false}
              animate={{
                height: open === index ? "auto" : 0,
                opacity: open === index ? 1 : 0,
              }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="faq-answer"
            >
              <p>{item.a}</p>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Footer() {
  const isHome = useLocation().pathname === "/";
  return (
    <>
      {isHome && <FAQ />}
      <footer className="tech-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-mark">HA</span>
            <p>
              Full Stack Web Developer.
              <br />
              Building focused, fast digital products.
            </p>
          </div>
          <div>
            <p className="footer-label">Navigate</p>
            <Link to="/about">About</Link>
            <Link to="/projects">Portfolio</Link>
            <Link to="/services">Services</Link>
          </div>
          <div>
            <p className="footer-label">Connect</p>
            <a href="mailto:hassnainlilani@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/hasnain---abbas/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <div>
            <p className="footer-label">Availability</p>
            <p className="status">
              <i /> Available for selected projects
            </p>
            <Link className="footer-cta" to="/contact">
              Start a project <FiArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright Hasnain Abbas</span>
          <span>
            <Link to="/privacy">Privacy</Link> / <Link to="/terms">Terms</Link>
          </span>
          <span>2026</span>
        </div>
      </footer>
    </>
  );
}
function NotFound() {
  return (
    <Page className="not-found">
      <Seo title="Page not found" />
      <p className="eyebrow">404 / Not found</p>
      <h1>
        This page took
        <br />a wrong <i>turn.</i>
      </h1>
      <Link className="round-link" to="/">
        Back home
      </Link>
    </Page>
  );
}
function App() {
  useEffect(() => {
    const l = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });
    let r;
    const f = (t) => {
      l.raf(t);
      r = requestAnimationFrame(f);
    };
    r = requestAnimationFrame(f);
    return () => {
      cancelAnimationFrame(r);
      l.destroy();
    };
  }, []);
  const l = useLocation();
  return (
    <Shell>
      <AnimatePresence mode="wait">
        <Routes location={l} key={l.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Shell>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
