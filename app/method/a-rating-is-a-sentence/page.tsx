import ArticleLayout from '../_components/ArticleLayout';

export const metadata = {
  title: "How PaceMap Rates Horses — The ANCHOR Engine Explained",
  description: "Official Ratings compress a chain of judgements into a single number. PaceMap rebuilds the rating run by run, keeps the structure, and shows where the engine diverges from the OR.",
  openGraph: {
    title: "A Rating Is A Sentence — How PaceMap Builds Its Ratings",
    description: "The Official Rating is a sentence pretending to be a word. PaceMap's anchored private rating keeps the structure — and that is what lets the other layers correct it.",
  },
};

export default function Article6() {
  return (
    <ArticleLayout part="PART SIX" title="A Rating Is A Sentence">
      <p>A horse's Official Rating is a number. Eighty-three, ninety, a hundred and twelve. One figure, assigned by the handicapper, printed in the racecard, written into every conversation about the horse. The number is convenient. It fits in a column. It compares easily. It is the rating.</p>

      <p>It is also a compression so heavy that almost everything that built it has been thrown away.</p>

      <p>The eighty-three did not come from nothing. It came from a chain of judgements — from particular runs, particular margins, particular horses the runner has met, particular conditions those races were run in, particular weights of evidence assigned by a particular person trying to do a particular job. The handicapper's job is to equalise the field for the next race. The eighty-three is their best estimate of how to do that, given everything they know. By the time you read it on the racecard, the estimate has been shrunk to a number with no working shown.</p>

      <p>That number is useful. It is also a sentence pretending to be a word.</p>

      <h2>The number that gets quoted</h2>

      <p>The standard form read takes the Official Rating at face value. It is the headline number, the one used to find well-handicapped horses, the one used to compare runners across races and meetings. Tools build it in. Analysts cite it. A horse rated three pounds higher than its rival is, by this read, three pounds better.</p>

      <p>But the three pounds is doing several things at once that the figure does not let you separate. Part of it is the handicapper's read of the horse's most recent strong form. Part of it is a hangover from older form that the handicapper has not yet revised. Part of it is an adjustment for trip or going that the handicapper has made by hand. Part of it is the handicapper's caution about whether the horse can run to that mark today. All of these are packed into eighty-three. None of them are visible.</p>

      <p>When you compare two horses on their Official Ratings, you are comparing two sentences that have been compressed to single words. Sometimes the compression holds. Often it does not.</p>

      <h2>What ANCHOR keeps</h2>

      <p>The engine's approach to rating is structurally different. It does not assign a single number and discard the working. It rebuilds the rating from the runs that produced it, run by run, and keeps the structure.</p>

      <p>A horse's rating, as the engine produces it, is not eighty-three. It is something more like: <em>eighty-three, built from seven qualifying runs, the strongest of which scored against a known opponent's official mark, with the highest-weighted run a recent strong performance on similar conditions and the lowest-weighted a long-ago weak performance on a sharp track that no longer applies; band of plus-or-minus four pounds because two of the qualifying runs are at chain depth two and one is long-ago.</em></p>

      <p>That sentence is not for the reader. It is the internal structure of the rating. The reader sees the projected number with its confidence band. But the engine carries the working all the way through. The rating is a sentence that has not been compressed.</p>

      <p>This is what makes the divergences from the Official Rating possible. Without the structure, the engine could only mirror the OR, with some adjustments stapled on. With the structure, the engine can — and routinely does — produce a different rating from the OR for the same horse, on the same day, and for reasons that can be named.</p>

      <h2>Where the engine and the OR part company</h2>

      <p>Four cases recur often enough to be worth describing.</p>

      <p>The first is the lightly raced horse. A horse with two or three career runs has an Official Rating, often a confident-looking one, built on a thin evidence base. The handicapper has had to choose a number from limited information and has done so. The engine does not. With only a handful of qualifying runs, the engine's confidence band widens — the rating gets pulled back toward the field average, not because the figures suggest a worse horse, but because the figures do not yet support a confident read in either direction. The OR is more decisive than the evidence. The engine is honest about it.</p>

      <p>The second is the improving or declining horse. The OR responds to recent runs, but it responds with a lag — the handicapper holds back from large revisions until a trajectory is confirmed, and even then the revisions arrive race by race. ANCHOR's recency weighting is steeper. A horse whose last three runs are visibly stronger than its previous five gets that trajectory reflected in the engine's rating immediately, with the older runs weighted down. The OR catches up later. In the interval, the engine and the OR diverge in a direction the engine has reason to be right about.</p>

      <p>The third is form built in conditions that do not apply. The OR is, by design, surface-blind in its headline number. It captures how good the horse is on average. The engine's preference layer, the subject of Part Four, adjusts for whether the form being averaged is the form <em>for today's conditions</em> or the form <em>for something else</em>. A horse whose figures are mostly on soft ground, running on quick ground today, gets the same OR as it would on its preferred surface — but the engine's projected rating reflects the surface mismatch, sometimes by several pounds. The OR is rating the horse in the abstract. The engine is rating the horse for today.</p>

      <p>The fourth is the chain horse. ANCHOR's rating is built by anchoring each past run to the proven quality of the horses the runner met. Where a horse has met opponents of known quality directly, the anchor is short and the rating is firm. Where the chain is long — this horse beat that one, who was beaten by a third, whose own rating was inferred from a fourth — the engine applies a chain discount that the OR does not. The deeper the inference goes, the less the rating leans on it. This is why a horse with strong-looking figures whose entire form is built through a long chain of indirect comparisons will often carry a more cautious engine rating than the OR suggests. The figures look the same. The evidence underneath them does not.</p>

      <h2>Why the structure matters</h2>

      <p>The reason for keeping the working is not transparency for its own sake. It is that the working is what lets the engine respond when the simple read would mislead.</p>

      <p>A single-number rating cannot tell you that it is held more loosely on a lightly-raced horse than on a settled one. It cannot tell you that the trajectory implied by its last three runs is steeper than the trajectory the handicapper has yet acknowledged. It cannot tell you that the figure was built on ground that does not apply today. It cannot tell you that the chain of inference behind the number is three deep, and the discount it should carry. The number does not say any of those things, because the number does not have the structure to say them.</p>

      <p>The engine's rating has the structure. That is what the projected rating and the confidence band, together, represent. The projected rating is the best read of the horse's level for today. The band is the engine telling you how much of the evidence underneath that read actually applies, how recent and how strong it is, how deeply inferred and how directly observed. A narrow band is a rating that earns its number. A wide band is a rating that has been honest about what it does not know.</p>

      <p>A reader who reads the band as well as the number is reading the engine's full sentence. A reader who reads only the projected rating is doing the same thing they would have done with the OR — compressing a sentence to a word, and then betting on the word.</p>

      <h2>Closing</h2>

      <p>That is the foundation, and that is the series.</p>

      <p>Six articles, in order: the formal version of the shrug, the draw measured against quality, the prose the figures do not carry, the form that is information about today and the form that is not, the race shape that moves the rating before the runners leave the stalls, and the rating itself — a sentence kept from compression so that the rest of the layers can correct it. Each layer is one piece of a single method, and the method is what the PaceMap output expresses, race by race, every evening.</p>

      <p>More layers will be added as the analysis behind them is done to the same standard. The series is a growing library. This is what is in it so far.</p>
    </ArticleLayout>
  );
}
