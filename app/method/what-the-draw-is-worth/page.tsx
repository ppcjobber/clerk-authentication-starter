import ArticleLayout from '../_components/ArticleLayout';

export const metadata = {
  title: 'What the draw is actually worth — PaceMap',
  description: 'How PaceMap measures draw bias controlled for horse quality, and what twelve months of data shows. Part Two of How PaceMap Reads a Race.',
};

export default function Article2() {
  return (
    <ArticleLayout part="PART TWO" title="What The Draw Is Actually Worth">
      <p>The draw is the easiest structural factor to see and the hardest to measure honestly.</p>

      <p>Easy to see, because everyone can read a result and notice that the winner came from stall two and the placed horses came from stalls one and four. Hard to measure, because that observation does not tell you what you think it does. The horses in the low stalls might have won because the low stalls were an advantage. They might also have won because the better horses happened to be drawn there. From the result alone, you cannot separate the two.</p>

      <p>This is the first deep dive in this series, and the draw is a good place to start, because it shows what the method from Part One looks like when it is pointed at one factor and made to produce a number.</p>

      <h2>Why the usual draw guides mislead</h2>

      <p>Most draw guides are built from strike rates. Take every race at a course over a trip, sort the runners into low, middle and high thirds of the stalls, and count how often each third wins or places. The third that wins most is declared favoured.</p>

      <p>The problem is the one above. A strike rate by stall is the draw plus the quality of the horses drawn there, added together and reported as a single figure. If a course tends to attract its shorter-priced horses into particular stalls — through the way fields are framed, or simply through variance over a season that never gets corrected — the strike rate will show a bias that is really just the better horses winning from wherever they happened to start. You cannot tell the honest signal from the artefact, because the method never separates them.</p>

      <p>To measure the draw, you have to hold the quality of the horse constant and ask whether the stall still made a difference.</p>

      <h2>How PaceMap measures it</h2>

      <p>The way through is the handicap.</p>

      <p>A handicap is the one race type where someone has already done the hard part. The handicapper's job is to give every horse a weight that, in theory, brings the whole field together on the line. The official rating each horse carries is a considered estimate of how good it is. The handicapper is, in effect, trying to engineer a dead heat.</p>

      <p>That makes the handicap a controlled test. If every horse is weighted to finish together, then a horse running to a level well above the mark it carried did something the weights did not predict — and if that keeps happening from one part of the draw, the draw is a plausible reason.</p>

      <p>So the measure PaceMap uses is the rating a horse actually ran to, set against the official rating it carried. Run to a figure above your mark and the race says you were better than the handicapper thought, on the day. Run below it and the reverse. Group those differences by where horses were drawn, and a draw that genuinely helps will show up as horses from that part of the stalls consistently running to more than their mark.</p>

      <p>One more correction matters. Some races are run faster, some slower; some are messier than others. A whole race can produce ratings that sit a little above or below par for reasons that have nothing to do with the draw. So each race is measured against its own average — every horse compared to the mean of its own race — before the draw groups are compared. That strips out the race-level noise and leaves the thing being asked: within this race, did the stall matter.</p>

      <p>The data is twelve months of handicaps across British and Irish flat racing. Where a course and distance had enough races to mean something, the draw groups were compared and tested for whether the gap was large enough to be real rather than chance.</p>

      <h2>What it found</h2>

      <p>The clearest results are not at the courses with the reputations.</p>

      <p>At Leicester, over a mile, low-drawn horses run materially above their handicap mark and high-drawn horses below it — a spread of nearly six pounds of rating across the stalls. That is a large effect, and it is consistent enough across twelve months of racing to be very unlikely to be chance. A mile handicap at Leicester is, on this evidence, not an even contest. Where a horse is drawn is worth pounds before the race is run.</p>

      <p>Catterick over the minimum trip tells the same story and nearly as loudly. Low draws there run well above their marks; the far side of the track is the wrong side to be. Yarmouth's sprint course shows the same shape again — an advantage to the low numbers, real and measurable.</p>

      <p>Kempton brings the all-weather into it. Over the sprint trip on the Polytrack, low-drawn horses hold a clear edge — which matters, because the all-weather is where the volume of racing sits, and a structural bias there applies night after night through the winter.</p>

      <p>Then Thirsk, which is the useful one, because it runs the other way. Over the sprint trip at Thirsk it is the high-drawn horses that run above their marks. The point of including it is not the direction. It is that the method does not have a thumb on the scale. It is not set up to find low-draw advantages and duly find them everywhere. It measures, and where the advantage sits high, it says so.</p>

      <h2>The courses that did not register</h2>

      <p>Here is the part that runs against the folklore.</p>

      <p>The famous draw-bias courses — the ones whose biases are discussed as settled fact — did not produce a statistically clear signal in this twelve months of data. The well-known low-draw sprint courses, the tracks every guide has an opinion about: measured this way, controlled for horse quality, over this window, the gap between the draw groups was not large enough to stand apart from chance.</p>

      <p>It is worth being careful about what that does and does not mean.</p>

      <p>It does not mean those biases are not real, or never were. Twelve months is one year. A single course over one trip may only run thirty or forty handicaps in that time, which is enough to detect a strong effect but not a subtle one. A bias that shows mostly at one meeting can be diluted across a full season. And tracks are managed now in ways they were not historically — rail movements, watering, ground staff actively working to even out wear — which can quietly reduce a bias that genuinely existed a decade ago.</p>

      <p>So the honest reading is narrow. It is not that the famous courses have no draw bias. It is that, in twelve months of quality-controlled data, their bias was not large or consistent enough to measure with confidence — while a quieter set of courses showed biases that were. That is a finding worth having. It says the reputations are not a reliable guide to where the measurable edges currently are, and that the edges are found by measuring, not by inheriting received opinion.</p>

      <h2>What PaceMap does with it</h2>

      <p>The biases that did reach significance are applied inside the ANCHOR ratings. A horse drawn in a favoured part of the stalls at one of those courses carries a small positive adjustment to its projected rating; a horse in the wrong part carries a small negative one. The adjustment is a few pounds, never more, and it is one input among many — it does not override the horse's quality, it corrects for one structural factor sitting on top of it.</p>

      <p>The non-significant courses get nothing. A suggestive-looking number that did not clear the bar is treated as noise and left out, because applying a bias that might just be a year's variance would add error, not remove it. Better to adjust only where the evidence is solid and leave the rest alone.</p>

      <p>That is the whole approach in one factor. Take something everyone can see, accept that seeing it is not the same as measuring it, find a way to hold quality constant, measure what is left, and use only the part that stands up. The next part of this series turns the same method onto pace — the shape of the race itself, and why a strong horse in the wrong part of a slowly run race is a strong horse that gets beaten.</p>

      <hr />

      <div className="findings-heading">The Highlighted Findings</div>

      <table>
        <thead>
          <tr>
            <th>Course &amp; trip</th>
            <th>Favoured draw</th>
            <th>Approx. spread</th>
            <th>Clear</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leicester, mile</td>
            <td>Low</td>
            <td>~6 lb</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Catterick, sprint</td>
            <td>Low</td>
            <td>~5 lb</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Yarmouth, sprint</td>
            <td>Low</td>
            <td>~5 lb</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Kempton, sprint (AW)</td>
            <td>Low</td>
            <td>~5 lb</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Thirsk, sprint</td>
            <td>High</td>
            <td>~5 lb</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <p className="findings-caption">Spread is the gap in rating-versus-mark between the favoured and unfavoured thirds of the draw, across twelve months of handicaps. Figures are rounded. PaceMap applies the measured biases inside its ratings; it does not publish per-race draw numbers.</p>
    </ArticleLayout>
  );
}
