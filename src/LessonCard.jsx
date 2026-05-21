export default function LessonCard({ lesson }) {
  const bookingUrl = lesson.koalendarUrl;

  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 14, padding: 16 }}>
      <h3 style={{ margin: 0 }}>{lesson.title}</h3>
      <div style={{ opacity: 0.8, marginTop: 4 }}>{lesson.duration}</div>
      <div style={{ fontWeight: 800, fontSize: 18, marginTop: 10 }}>{lesson.price}</div>

      <ul style={{ marginTop: 12, paddingLeft: 18 }}>
        {lesson.includes.map((x) => (
          <li key={x} style={{ marginBottom: 6 }}>{x}</li>
        ))}
      </ul>

      <a
        href={bookingUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: 12,
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #111",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        Book this lesson
      </a>
    </div>
  );
}
