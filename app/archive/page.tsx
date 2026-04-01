import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";

type Meeting = {
  slug: string;
  date: string;
  label: string;
  going: string;
  races: number;
  courseSlug: string;
  latest?: boolean;
};

const MEETINGS: any[] = [
  {
    slug:       "chelmsford_aw_2-april-2026",
    date:       "2 April 2026",
    label:      "Chelmsford (AW) — 2 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "chelmsford-aw",
    latest:     true,
  },
  {
    slug:       "wincanton_1-april-2026",
    date:       "1 April 2026",
    label:      "Wincanton — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wincanton",
    latest:     false,
  },
  {
    slug:       "southwell_1-april-2026",
    date:       "1 April 2026",
    label:      "Southwell — 1 April 2026",
    going:      "Good",
    races:      6,
    courseSlug: "southwell",
    latest:     false,
  },
  {
    slug:       "sedgefield_1-april-2026",
    date:       "1 April 2026",
    label:      "Sedgefield — 1 April 2026",
    going:      "Soft",
    races:      6,
    courseSlug: "sedgefield",
    latest:     false,
  },
  {
    slug:       "kempton_aw_1-april-2026",
    date:       "1 April 2026",
    label:      "Kempton (AW) — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_1-april-2026",
    date:       "1 April 2026",
    label:      "Dundalk (AW) — 1 April 2026",
    going:      "Good",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_31-march-2026",
    date:       "31 March 2026",
    label:      "Wolverhampton (AW) — 31 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "newcastle_31-march-2026",
    date:       "31 March 2026",
    label:      "Newcastle — 31 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "newcastle",
    latest:     false,
  },
  {
    slug:       "limerick_31-march-2026",
    date:       "31 March 2026",
    label:      "Limerick — 31 March 2026",
    going:      "Heavy",
    races:      7,
    courseSlug: "limerick",
    latest:     false,
  },
  {
    slug:       "bangor-on-dee_31-march-2026",
    date:       "31 March 2026",
    label:      "Bangor-on-Dee — 31 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "bangor-on-dee",
    latest:     false,
  },
  {
    slug:       "wolverhampton_aw_30-march-2026",
    date:       "30 March 2026",
    label:      "Wolverhampton (AW) — 30 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wolverhampton-aw",
    latest:     false,
  },
  {
    slug:       "navan_30-march-2026",
    date:       "30 March 2026",
    label:      "Navan — 30 March 2026",
    going:      "Heavy",
    races:      7,
    courseSlug: "navan",
    latest:     false,
  },
  {
    slug:       "ludlow_30-march-2026",
    date:       "30 March 2026",
    label:      "Ludlow — 30 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "ludlow",
    latest:     false,
  },
  {
    slug:       "kempton_aw_30-march-2026",
    date:       "30 March 2026",
    label:      "Kempton (AW) — 30 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "downpatrick_29-march-2026",
    date:       "29 March 2026",
    label:      "Downpatrick — 29 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "downpatrick",
    latest:     false,
  },
  {
    slug:       "doncaster_29-march-2026",
    date:       "29 March 2026",
    label:      "Doncaster — 29 March 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "ascot_29-march-2026",
    date:       "29 March 2026",
    label:      "Ascot — 29 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "ascot",
    latest:     false,
  },
  {
    slug:       "kempton_aw_28-march-2026",
    date:       "28 March 2026",
    label:      "Kempton (AW) — 28 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "kempton-aw",
    latest:     false,
  },
  {
    slug:       "uttoxeter_28-march-2026",
    date:       "28 March 2026",
    label:      "Uttoxeter — 28 March 2026",
    going:      "Soft",
    races:      7,
    courseSlug: "uttoxeter",
    latest:     false,
  },
  {
    slug:       "stratford_28-march-2026",
    date:       "28 March 2026",
    label:      "Stratford — 28 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "stratford",
    latest:     false,
  },
  {
    slug:       "southwell_aw_28-march-2026",
    date:       "28 March 2026",
    label:      "Southwell (AW) — 28 March 2026",
    going:      "Good",
    races:      8,
    courseSlug: "southwell-aw",
    latest:     false,
  },
  {
    slug:       "doncaster_28-march-2026",
    date:       "28 March 2026",
    label:      "Doncaster — 28 March 2026",
    going:      "Soft",
    races:      8,
    courseSlug: "doncaster",
    latest:     false,
  },
  {
    slug:       "curragh_28-march-2026",
    date:       "28 March 2026",
    label:      "Curragh — 28 March 2026",
    going:      "Heavy",
    races:      8,
    courseSlug: "curragh",
    latest:     false,
  },
  {
    slug:       "wetherby_27-march-2026",
    date:       "27 March 2026",
    label:      "Wetherby — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "wetherby",
    latest:     false,
  },
  {
    slug:       "newcastle_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Newcastle (AW) — 27 March 2026",
    going:      "Good",
    races:      9,
    courseSlug: "newcastle-aw",
    latest:     false,
  },
  {
    slug:       "lingfield_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Lingfield (AW) — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "lingfield-aw",
    latest:     false,
  },
  {
    slug:       "fontwell_27-march-2026",
    date:       "27 March 2026",
    label:      "Fontwell — 27 March 2026",
    going:      "Good",
    races:      6,
    courseSlug: "fontwell",
    latest:     false,
  },
  {
    slug:       "dundalk_aw_27-march-2026",
    date:       "27 March 2026",
    label:      "Dundalk (AW) — 27 March 2026",
    going:      "Good",
    races:      7,
    courseSlug: "dundalk-aw",
    latest:     false,
  },
];

function groupByDate(meetings: Meeting[]) {
  const now = new Date();
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const today     = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const yd        = new Date(now); yd.setDate(now.getDate() - 1);
  const yesterday = `${yd.getDate()} ${months[yd.getMonth()]} ${yd.getFullYear()}`;
  const tm        = new Date(now); tm.setDate(now.getDate() + 1);
  const tomorrow  = `${tm.getDate()} ${months[tm.getMonth()]} ${tm.getFullYear()}`;

  const groups: Record<string, Meeting[]> = {};
  for (const m of meetings) {
    const key = m.date === tomorrow
      ? "__tomorrow__"
      : m.date === today
      ? "__today__"
      : m.date === yesterday
      ? "__yesterday__"
      : m.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }

  const order = Object.keys(groups).sort((a, b) => {
    if (a === "__tomorrow__") return -1;
    if (b === "__tomorrow__") return 1;
    if (a === "__today__")    return -1;
    if (b === "__today__")    return 1;
    if (a === "__yesterday__") return -1;
    if (b === "__yesterday__") return 1;
    const da = new Date(a.split(" ").reverse().join(" "));
    const db = new Date(b.split(" ").reverse().join(" "));
    return db.getTime() - da.getTime();
  });

  return order.map(key => ({
    label: key === "__tomorrow__" ? "Tomorrow"
         : key === "__today__"    ? "Today"
         : key === "__yesterday__" ? "Yesterday"
         : key,
    meetings: groups[key],
  }));
}

export default function ArchivePage() {
  const grouped = groupByDate(MEETINGS);

  return (
    <>
      <Nav />
      <div className="wrap">

        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Meeting Archive
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            All Pace Maps
          </h1>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)",
            lineHeight: "1.7", maxWidth: "480px" }}>
            Every meeting published on PaceMap — permanently accessible for reference and research.
          </p>
          {MEETINGS.length > 0 && (
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
              color: "rgba(245,240,232,0.25)", marginTop: "10px" }}>
              {MEETINGS.length} meeting{MEETINGS.length !== 1 ? "s" : ""} published
            </p>
          )}
        </div>

        {grouped.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
              color: "rgba(245,240,232,0.3)" }}>
              No meetings published yet — check back on a race day.
            </p>
          </div>
        )}

        {grouped.map(group => (
          <div key={group.label} style={{ marginBottom: "36px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
                letterSpacing: "0.06em",
                color: group.label === "Today" || group.label === "Tomorrow"
                  ? "var(--gold)"
                  : "rgba(245,240,232,0.55)",
              }}>
                {group.label}
              </span>
              <div style={{ flex: 1, height: "1px",
                background: group.label === "Today" || group.label === "Tomorrow"
                  ? "rgba(201,168,76,0.2)"
                  : "rgba(255,255,255,0.06)" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
                color: "rgba(245,240,232,0.25)" }}>
                {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {group.meetings.map(m => {
                const course = m.label.split(" \u2014 ")[0];
                return (
                  <div key={m.slug} style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 18px",
                    background: m.latest
                      ? "rgba(201,168,76,0.055)"
                      : "rgba(255,255,255,0.025)",
                    border: m.latest
                      ? "1px solid rgba(201,168,76,0.2)"
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "7px",
                    flexWrap: "wrap", gap: "8px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center",
                      gap: "14px", flexWrap: "wrap", flex: 1 }}>
                      {m.courseSlug ? (
                        <Link href={`/courses/${m.courseSlug}`}
                          style={{ fontWeight: 600, fontSize: "0.88rem",
                            color: "var(--gold)", textDecoration: "none" }}>
                          {course}
                        </Link>
                      ) : (
                        <span style={{ fontWeight: 600, fontSize: "0.88rem",
                          color: "var(--cream)" }}>
                          {course}
                        </span>
                      )}
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
                        color: "rgba(245,240,232,0.35)" }}>
                        {m.going}
                      </span>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
                        color: "rgba(245,240,232,0.35)" }}>
                        {m.races} races
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {m.latest && (
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem",
                          padding: "2px 7px", borderRadius: "3px",
                          background: "rgba(201,168,76,0.15)", color: "var(--gold)",
                          border: "0.5px solid rgba(201,168,76,0.3)" }}>
                          Latest
                        </span>
                      )}
                      <Link href={`/meetings/${m.slug}`}
                        style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
                          letterSpacing: "0.07em", textTransform: "uppercase",
                          padding: "3px 9px", borderRadius: "3px",
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(245,240,232,0.45)",
                          textDecoration: "none" }}>
                        View →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>
      <Footer />
    </>
  );
}
