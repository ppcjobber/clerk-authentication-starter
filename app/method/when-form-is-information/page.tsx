import ArticleLayout from '../_components/ArticleLayout';

export const metadata = {
  title: 'When form is information — PaceMap',
  description: 'How PaceMap handles going, trip and course preference — and the difference between evidence against conditions and absence of evidence. Part Four of How PaceMap Reads a Race.',
};

export default function Article4() {
  return (
    <ArticleLayout part="PART FOUR" title="When Form Is Information">
      <p>A horse runs five times. Three of those runs are on soft ground, at a sharp left-handed track in the north, over a mile and a quarter. The horse wins one, places in another, finishes fourth in the third. The form figures look respectable.</p>

      <p>Today the horse is entered at a galloping right-handed course in the south, on good to firm ground, over seven furlongs.</p>

      <p>The form is the form. The horse has won and placed in its career. But almost everything about today's race is unlike almost everything about the runs that built that form. The form is not wrong. It is just answering a question — <em>how does this horse perform on soft ground, on a sharp left-handed northern track, over a mile and a quarter?</em> — that has very little to do with the question being asked today.</p>

      <p>This is the preference problem, and it is the layer of the read that gets handled most loosely.</p>

      <h2>The binary read</h2>

      <p>Most form reading collapses preference into yes/no statements. The horse handles soft ground. The horse needs further. The horse goes well at the track. These are the statements that get written, repeated, built into ratings and tipping notes.</p>

      <p>The problem is that they are not how horses work. A horse does not handle soft ground in the abstract. A horse has a record on soft ground — a record built from however many runs that happened to be on soft, against whatever horses happened to be in those races, at whatever tracks, over whatever trips. The record is the evidence. The yes/no statement is a summary of the evidence, and a summary thrown away after one word loses almost everything the evidence contained.</p>

      <p>The same is true of trip and of course. <em>Wants a mile and a quarter</em> is a sentence. <em>Has run nine times, six over a mile and a quarter, three over a mile, and the trip-specific record looks like this</em> is information. The first sentence is the second compressed to nothing. You can act on the compression. You will sometimes act badly on it, because the compression hides the cases where it does not hold.</p>

      <h2>What gets lost in the compression</h2>

      <p>The thing that gets lost is the distinction between two situations that look the same from the outside and are not the same at all.</p>

      <p>The first situation is a horse with evidence against today's conditions. The horse has run on quick ground before, several times, and has not run well on it. That is information. It says something specific about how the horse responds to a fast surface, and it should pull the rating down for a quick-ground race today.</p>

      <p>The second situation is a horse with no evidence about today's conditions. The horse has never run on quick ground, because every race it has had happens to have been on soft. There is nothing to say about the horse on a fast surface, because nothing has been observed. That is also information — but it is information of a different kind. It is the absence of evidence, not evidence of absence.</p>

      <p>These two situations get collapsed in casual form reading. Both produce the same shorthand: <em>not on this ground</em>. But they should be treated very differently. The first is a warning. The second is an uncertainty. A model that adjusts equally for both is making a mistake in opposite directions on each case.</p>

      <p>The same distinction matters for trip. A horse beaten out of sight every time it has run beyond a mile is a horse with evidence against the trip extension. A horse that has only ever run at a mile, now stepping up to ten furlongs, is a horse with no evidence either way. The first horse's rating should drop. The second horse's rating should stay where it is, but be held with less confidence — because the read is built on runs that may not apply.</p>

      <p>And the same for course. A horse with two unplaced runs at a sharp track has evidence about sharp tracks. A horse that has only ever run at galloping tracks, now running at a sharp one, is doing something its form does not describe. The form is silent on the question being asked.</p>

      <h2>What the engine does</h2>

      <p>ANCHOR groups each horse's runs along three preference axes — going band, distance band, and a measure of course shape that compares the physical character of past tracks to today's. For each axis, it asks whether the horse has enough runs <em>like</em> today's conditions to say something specific.</p>

      <p>Where there are enough matching runs, the engine compares the horse's performance on those runs to the horse's performance overall. If the matching runs are stronger, the rating gets a small positive adjustment. If they are weaker, a small negative one. The adjustment is modest — these are not the layers that swing ratings by tens of pounds — but it is built from evidence rather than category.</p>

      <p>Where there are not enough matching runs, the engine does not invent a number. The preference adjustment goes to zero, and the dampening layer — the one from Part One — does its work instead. The rating gets a wider band around it, because the read is built on runs that may or may not transfer. A confident-looking number from circumstantial evidence is the kind of number that loses you money.</p>

      <p>The same applies in combination. A horse running today on soft ground, at a galloping track, over a mile and a half, who has form mostly on quick ground at sharp tracks over shorter trips, is not being run with the support of its form. Its form is mostly silent on today. The engine's projected rating reflects that — not by saying the horse cannot win, but by saying the read of its ability today is held more loosely than a horse whose form was built on the conditions it now meets.</p>

      <h2>What this changes in the read</h2>

      <p>The practical effect is a different way of thinking about which horses are well in today and which are not.</p>

      <p>The standard read separates the field into those that suit and those that do not. The preference-aware read separates the field into three: those whose form is evidence <em>for</em> today's conditions, those whose form is evidence <em>against</em> today's conditions, and those whose form is largely silent about today's conditions.</p>

      <p>The third group is the one that gets handled worst by hand. Casual reading either backs them on the figures — which were built on conditions that do not apply — or dismisses them as unproven, which is also too strong. The right answer is the middle one: the figures are real, the rating they imply is real, but the confidence in that rating is lower because the underlying evidence is not about today. That horse is not unsuited. It is unproven on the day's setup. A small mistake on a horse like that is recoverable. A big mistake is not.</p>

      <p>The first job of preference is not to find the horse that suits. It is to know how much of a horse's form is actually about today, and how much of it is information about something else. The next part of this series turns to pace — the shape of the race itself — and to the question of how much that shape can move a horse's rating before the race is even run.</p>
    </ArticleLayout>
  );
}
