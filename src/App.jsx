import { useEffect, useMemo, useState } from "react";
import { InlineWidget } from "react-calendly";
import "./App.css";

const ZELLE_EMAIL = "hudsonchess@yahoo.com"; // <- replace
const DEFAULT_SUBJECT = "FREE 30-minute online lesson request";

const SLIDES = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg"];

const LESSONS = [
  {
    key: "online-beginner",
    title: "Online — Beginner (60 minutes)",
    price: "$85",
    calendlyUrl: "https://calendly.com/chriszcodes/online-beginner-60-minutes",
    bullets: [
      "Opening principles + development habits",
      "Tactics patterns + simple training plan",
      "Basic endgames + practice roadmap",
    ],
  },
  {
    key: "online-tournament",
    title: "Online — Tournament (60 minutes)",
    price: "$135",
    calendlyUrl: "https://calendly.com/chriszcodes/online-tournament-60-minutes",
    bullets: [
      "Opening strategies + repertoire direction",
      "Middlegame planning + calculation process",
      "Endgame prep + annotated game review",
    ],
  },
  {
    key: "inperson-beginner",
    title: "In-person — Beginner (60 minutes)",
    price: "$105 total (includes $5 travel fee)",
    calendlyUrl: "https://calendly.com/chriszcodes/in-person-beginner-60-minutes",
    bullets: [
      "Hands-on fundamentals + board vision",
      "Tactics habits + confidence building",
      "Clear at-home practice plan",
    ],
  },
  {
    key: "inperson-tournament",
    title: "In-person — Tournament (60 minutes)",
    price: "$170 total (includes $5 travel fee)",
    calendlyUrl: "https://calendly.com/chriszcodes/in-person-tournament-60-minutes",
    bullets: [
      "Tournament prep: openings, middlegame, endgames",
      "Candidate moves + calculation training",
      "Performance habits + post-game review",
    ],
  },
];

function buildMailto({ firstName, lastName, email, message }) {
  const to = ZELLE_EMAIL;
  const body = [
    `Name: ${(firstName || "").trim()} ${(lastName || "").trim()}`.trim(),
    `Email: ${(email || "").trim()}`.trim(),
    "",
    message || "",
    "",
    "—",
    "Requested via website form",
  ].join("\n");

  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    DEFAULT_SUBJECT
  )}&body=${encodeURIComponent(body)}`;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(LESSONS[0].key);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const selectedLesson = useMemo(
    () => LESSONS.find((l) => l.key === selectedKey) ?? LESSONS[0],
    [selectedKey]
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  return (
    <div className="page">
      <header className="header">
        <div className="headerInner">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">
              {/* Put braind-icon.webp in /public and it will load from here */}
              <img className="brandIcon" src="/braind-icon.webp" alt="" />
            </div>

            <div className="brandName">Hudson Chess Academy</div>
          </div>

          <nav className="nav">
            <a
              href="#rates"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("rates");
              }}
            >
              Rates
            </a>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("booking");
              }}
            >
              Book a Class
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("faq");
              }}
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="heroLeft">
            <div className="slideshow">
              <img className="slideImg" src={SLIDES[slideIdx]} alt="Chess coaching" />
              <div className="slideOverlay">
                <h1>Online & In-Person Chess Coaching</h1>
                <p>
                  Structured improvement for beginners and tournament players — clear plans,
                  game review, and training habits that stick.
                </p>
                <div className="slideCtas">
                  <a
                    className="btnPrimary"
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("booking");
                    }}
                  >
                    Book a Lesson
                  </a>
                  <a
                    className="btnGhost"
                    href="#rates"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("rates");
                    }}
                  >
                    View Rates
                  </a>
                </div>
              </div>

              <div className="slideDots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={i === slideIdx ? "dot dotActive" : "dot"}
                    onClick={() => setSlideIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="heroRight" id="contact">
            <div className="formCard formCardBlend">
              <h2>Claim a FREE online lesson</h2>
              <p className="muted">
                Get your first online lesson free (30 minutes). 
              </p>

              <div className="formStack">
                <div className="grid2">
                  <label>
                    First Name
                    <input
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="First name"
                    />
                  </label>
                  <label>
                    Last Name
                    <input
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Last name"
                    />
                  </label>
                </div>

                <label>
                  Email *
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="msgLabel">
                  Message
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your rating/level, goals, and any openings you play. (Example: '700, want tactics + better openings')"
                  />
                </label>
              </div>

              <button
                className="btnSubmit"
                onClick={() => {
                  if (!form.email.trim()) {
                    alert("Please enter your email.");
                    return;
                  }
                  window.location.href = buildMailto(form);
                }}
              >
                Submit
              </button>

              <div className="finePrint">
                Prefer to book immediately? Scroll down and pick a lesson type.
              </div>
            </div>
          </div>
        </section>

        <section id="rates" className="ratesSection">
          <div className="sectionHeader">
            <h2>Booking Rates</h2>
            <p className="muted">
              All lessons are 60 minutes. In-person totals already include the $5 travel fee.
            </p>
          </div>

          <div className="cards">
            {LESSONS.map((l) => (
              <div key={l.key} className="card">
                <div className="cardTop">
                  <div className="cardTitle">{l.title}</div>
                  <div className="cardPrice">{l.price}</div>
                </div>

                <ul className="cardList">
                  {l.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <button
                  className={selectedKey === l.key ? "cardBtn cardBtnActive" : "cardBtn"}
                  onClick={() => {
                    setSelectedKey(l.key);
                    scrollToId("booking");
                  }}
                >
                  Book this option
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="bookingSection">
          <div className="sectionHeader">
            <h2>Book a Lesson</h2>
            <p className="muted">
              Selected: <b>{selectedLesson.title}</b> — <b>{selectedLesson.price}</b>
              <br />
              Book first, then pay via Zelle to <b>{ZELLE_EMAIL}</b>. (Memo:{" "}
              <code>Chess lesson – Type – Name – Date/Time</code>)<br />
              Confirmed when paid within <b>12 hours</b>.
            </p>
          </div>

          <div className="embedWrap">
            <InlineWidget url={selectedLesson.calendlyUrl} styles={{ height: "920px" }} />
          </div>
        </section>

        <section id="faq" className="faq">
          <h2>FAQ</h2>
          <div className="faqGrid">
            <div className="faqItem">
              <h3>Lesson length</h3>
              <p>All lessons are 60 minutes.</p>
            </div>
            <div className="faqItem">
              <h3>In-person travel fee</h3>
              <p>$5 per lesson (already included in the in-person totals).</p>
            </div>
            <div className="faqItem">
              <h3>Cancellation</h3>
              <p>Free reschedule with 12+ hours notice. Late cancellations/no-shows may be charged.</p>
            </div>
            <div className="faqItem">
              <h3>Payment</h3>
              <p>
                Zelle to <b>{ZELLE_EMAIL}</b>. Bookings are confirmed once paid (within 12 hours).
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footerInner">
            <span>© {new Date().getFullYear()} Hudson Chess Academy</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
