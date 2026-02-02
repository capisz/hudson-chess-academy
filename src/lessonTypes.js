import LessonCard from "./LessonCard";
import { lessonTypes, ZELLE_EMAIL } from "./lessonTypes";

export default function App() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Hudson Chess Academy</h1>
        <nav style={{ display: "flex", gap: 14 }}>
          <a href="#rates">Rates</a>
          <a href="#book">Book</a>
          <a href="#gallery">Gallery</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section style={{ marginTop: 26 }}>
        <h2>Private chess lessons</h2>
        <p>
          All lessons are <b>60 minutes</b>. In-person lessons include a <b>$5 travel fee</b>.
        </p>
      </section>

      <section id="rates" style={{ marginTop: 26 }}>
        <h2>Programs & Rates</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {lessonTypes.map((l) => (
            <LessonCard key={l.key} lesson={l} />
          ))}
        </div>
      </section>

      <section id="book" style={{ marginTop: 26 }}>
        <h2>Book a lesson</h2>
        <p style={{ lineHeight: 1.5 }}>
          <b>Book first</b>, then pay via Zelle to <b><link>{ZELLE_EMAIL}</link></b>.<br />
          Memo: <code>Chess lesson – [Type] – [Student Name] – [Date/Time]</code><br />
          Lessons are confirmed once payment is received (please pay within <b>12 hours</b>). Unpaid bookings may be canceled.
        </p>
      </section>

      <section id="gallery" style={{ marginTop: 26 }}>
        <h2>Gallery</h2>
        <p>Photos posted with permission. Student names are never shared publicly.</p>
        {/* Add your images here */}
      </section>

      <section id="faq" style={{ marginTop: 26 }}>
        <h2>FAQ</h2>
        <p><b>Cancellation:</b> Free reschedule with 12+ hours notice. Late cancellations/no-shows may be charged.</p>
        <p><b>In-person travel:</b> $5 per lesson (included in the in-person totals).</p>
      </section>
    </div>
  );
}
