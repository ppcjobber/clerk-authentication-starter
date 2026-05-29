import ArticleLayout from '../_components/ArticleLayout';

export const metadata = {
  title: "What the figures don't say — PaceMap",
  description: 'How PaceMap reads in-running comments and folds them into the rating. Part Three of How PaceMap Reads a Race.',
};

export default function Article3() {
  return (
    <ArticleLayout part="PART THREE" title="What The Figures Don't Say">
      <p>A horse finishes third, beaten three lengths. That is the figure. Three lengths is what goes into the form book, what shows on the racecard, what shapes the next handicap mark.</p>

      <p>But three lengths is the answer to a question, not a description of a run. Two horses can be beaten three lengths in the same race and have run two entirely different races. One was held up at the back, ran into trouble at the two-furlong pole, came through late and was finishing strongly. The other was prominent throughout, hit the front a furlong out, and was just outpaced in the final yards. Same figure. Same beaten distance. Two profiles that mean different things about what the horse can do next.</p>

      <p>The figure does not carry that. The comment does.</p>

      <h2>The information in the prose</h2>

      <p>The in-running comments — the short notes written by analysts as the race is being run — are the part of the form that describes how it actually unfolded. A line of figures says the horse finished third. The comment says it stayed on well, or it hit the front and was outpaced, or it never travelled, or it was hampered turning in. None of that is on the figure side of the form.</p>

      <p>A good form student reads both. They read the figure and then they read the comment, and they hold the two together. A horse beaten three lengths having met trouble in running is not a horse that ran a three-length-beaten race. A horse beaten three lengths having had a clear run and every chance is. The figure looks the same. The conclusion is not.</p>

      <p>The trouble is volume. A meeting can have a hundred declared runners. Each horse has up to a dozen recent runs. That is a thousand comments to read for a single afternoon's racing, and the comments are short, telegraphic, dense with abbreviations and tactical shorthand. A form student who reads them properly for three races does not have time for the other four. So the comments tend to get skimmed, or read for the horses the punter already cares about, and ignored on the rest.</p>

      <p>What you lose when you skim them is the information that does the most work — the part of the form that distinguishes between horses the figures cannot tell apart.</p>

      <h2>What the engine reads</h2>

      <p>ANCHOR reads every comment on every recent run for every horse on the card. It does not just count words. It parses the prose for specific structured signal — what is the running style being described, what does the language say about stamina, what does it say about going, what does it say about how the horse jumped, what does it say about whether the run was an honest representation of the horse's ability or whether something interfered.</p>

      <p>The signals are recognisable to anyone who reads form. <em>Stayed on well</em> and <em>kept finding</em> point at a horse that wants further. <em>Weakened quickly</em> and <em>flattened out</em> point at a trip that was too far. <em>Hung right</em>, <em>jumped left</em>, <em>never travelled</em>, <em>met trouble</em>, <em>short of room</em> — all of these are structured information about the run that goes into the rating model as more than just a finishing position.</p>

      <p>The point is not that ANCHOR understands prose in some clever way. The point is that it reads all of it, on every horse, every day, and applies the same rules consistently. A form student reading by hand makes the same calls — these are not exotic interpretations, they are standard form reading. The engine just does the reading at the scale the cards require.</p>

      <h2>Why the rating changes</h2>

      <p>The signals are not decorative. They feed back into the rating.</p>

      <p>When ANCHOR builds a horse's private rating from its past runs, each run is weighted. Runs against stronger horses count for more than runs against weaker ones. Recent runs count for more than old ones. And runs whose comment indicates the figure was an honest read of the horse count for more than runs whose comment indicates something distorted the figure.</p>

      <p>A horse beaten three lengths having stayed on well from the back is given more weight on that run than the figure alone would justify. The comment says the figure understates what the horse did. A horse beaten three lengths having weakened quickly is given less weight, because the comment says the figure may even overstate it — the horse was being eased once the race was lost. The figures alone treat both as equivalent. The comment-adjusted rating does not.</p>

      <p>The same applies in the other direction. A horse that won by a long distance against a comment of <em>eased down</em> and <em>idling late</em> did not run a long-distance-winning race. It ran whatever-was-needed-and-no-more. The figure says the winning margin was eight lengths. The comment says the margin was as much as the rider chose. Crediting the horse with an eight-length-winner rating off that run is a mistake. The engine corrects for it. Most form-figure systems do not.</p>

      <h2>What this gives back to the reader</h2>

      <p>The output a reader sees on a PaceMap analysis is the projected rating, the running style classification, the pace map, the watch points. None of those are direct quotes from comments. The comment parsing sits behind the rating, modifying it.</p>

      <p>But the consequence is visible. When a horse appears in the analysis with a projected rating noticeably above what its recent figures alone would suggest, the comments are usually why — the engine has read prose that the figures left out, and it has acted on it. When a fashionable horse appears with a projected rating lower than its figures would imply, the same logic applies in reverse — the comments said something the figures did not.</p>

      <p>This is not a system designed to find hidden gems. It is a system designed not to mistake an easy win for a hard one, or a finishing position for a run. The first job of a rating is to be honest about what the horse actually did. Reading the prose, not just the digits, is the part of that job that takes the most labour by hand and the most code to automate. The reward for doing it is a rating that does not get fooled by a misleading figure.</p>

      <p>The next part of this series turns to preference — going, trip, the physical shape of the track — and to the question of when a horse's form is information about today and when it is not.</p>
    </ArticleLayout>
  );
}
