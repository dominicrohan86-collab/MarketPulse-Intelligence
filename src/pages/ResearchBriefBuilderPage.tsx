import { FileText, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../components/design-system/Badge';
import { Button } from '../components/design-system/Button';
import { Card, CardHeader } from '../components/design-system/Card';
import { SelectControl } from '../components/design-system/Controls';
import { RiskDisclosure } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { earningsCalendar } from '../data/market';
import { researchArticles } from '../data/research';
import { stockTickers } from '../data/tickers';
import { formatCurrency, signalTone } from '../lib/format';

type Audience = 'Individual Investor' | 'Financial Advisor' | 'Portfolio Manager' | 'Investment Committee' | 'Student / Learner';
type ResearchStyle = 'Conservative' | 'Balanced' | 'Growth-oriented' | 'Income-focused' | 'Tactical' | 'Long-term quality';
type BriefTimeframe = '1 Week' | '1 Month' | '3 Months' | '6 Months' | '1 Year';
type MarketFocus =
  | 'Broad Market'
  | 'Technology'
  | 'Financials'
  | 'Healthcare'
  | 'Energy'
  | 'Industrials'
  | 'Defensive Sectors'
  | 'Small Caps';

const audiences: Audience[] = ['Individual Investor', 'Financial Advisor', 'Portfolio Manager', 'Investment Committee', 'Student / Learner'];
const styles: ResearchStyle[] = ['Conservative', 'Balanced', 'Growth-oriented', 'Income-focused', 'Tactical', 'Long-term quality'];
const timeframes: BriefTimeframe[] = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
const focuses: MarketFocus[] = ['Broad Market', 'Technology', 'Financials', 'Healthcare', 'Energy', 'Industrials', 'Defensive Sectors', 'Small Caps'];
const sections = [
  'Market regime summary',
  'Sector leadership',
  'Ticker research candidates',
  'Risk overview',
  'Valuation context',
  'Earnings calendar',
  'Watchlist actions',
  'Article/research summaries',
  'Chart snapshots',
  'Educational disclaimer',
];

export function ResearchBriefBuilderPage() {
  const [audience, setAudience] = useState<Audience>('Portfolio Manager');
  const [style, setStyle] = useState<ResearchStyle>('Balanced');
  const [timeframe, setTimeframe] = useState<BriefTimeframe>('3 Months');
  const [focus, setFocus] = useState<MarketFocus>('Broad Market');
  const [includedSections, setIncludedSections] = useState<string[]>(sections);
  const [generated, setGenerated] = useState(false);

  const candidates = useMemo(() => {
    const focusMap: Partial<Record<MarketFocus, string[]>> = {
      Technology: ['Technology'],
      Financials: ['Financials'],
      Healthcare: ['Healthcare'],
      Energy: ['Energy'],
      Industrials: ['Industrials'],
      'Defensive Sectors': ['Healthcare', 'Consumer Staples'],
      'Small Caps': ['Small Caps'],
    };
    const allowed = focusMap[focus];
    return stockTickers
      .filter((ticker) => !allowed || allowed.includes(ticker.sector))
      .sort((a, b) => b.momentumScore + b.qualityScore - (a.momentumScore + a.qualityScore))
      .slice(0, 5);
  }, [focus]);

  const summary = getAudienceSummary(audience, style, timeframe, focus, generated);

  const toggleSection = (section: string) => {
    setIncludedSections((current) =>
      current.includes(section) ? current.filter((item) => item !== section) : [...current, section],
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Research Brief Builder"
        subtitle="Configure a live research brief preview for different audiences and market styles using fictionalized data and risk-aware language."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card>
          <CardHeader
            title="Report Configuration"
            description="Controls update the preview in real time. Generate adds a polished state for portfolio demonstration."
          />
          <div className="space-y-4">
            <SelectControl label="Audience" value={audience} options={audiences} onChange={(event) => setAudience(event.target.value as Audience)} />
            <SelectControl label="Research style" value={style} options={styles} onChange={(event) => setStyle(event.target.value as ResearchStyle)} />
            <SelectControl label="Timeframe" value={timeframe} options={timeframes} onChange={(event) => setTimeframe(event.target.value as BriefTimeframe)} />
            <SelectControl label="Market focus" value={focus} options={focuses} onChange={(event) => setFocus(event.target.value as MarketFocus)} />

            <fieldset className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
              <legend className="px-1 text-sm font-semibold text-white">Include sections</legend>
              <div className="mt-3 grid gap-2">
                {sections.map((section) => (
                  <label key={section} className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-slate-200 hover:bg-slate-800/50">
                    <input
                      type="checkbox"
                      checked={includedSections.includes(section)}
                      onChange={() => toggleSection(section)}
                      className="h-4 w-4 accent-analyst-500"
                    />
                    {section}
                  </label>
                ))}
              </div>
            </fieldset>

            <Button
              variant="primary"
              className="w-full"
              icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
              onClick={() => setGenerated(true)}
            >
              Generate Research Brief
            </Button>
          </div>
        </Card>

        <Card tone="light" className="p-0">
          <div className="border-b border-slate-300/70 bg-white/66 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Preview using mock data</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {focus} Research Brief for {audience}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Generated context: May 1, 2026, 9:30 AM ET / {timeframe} view / {style} style
                </p>
              </div>
              <Badge tone={generated ? 'positive' : 'caution'}>{generated ? 'Generated preview' : 'Live draft'}</Badge>
            </div>
          </div>

          <div className="space-y-6 p-5">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-950">Generated Summary</h3>
              </div>
              <p className="text-sm leading-7 text-slate-700">{summary}</p>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <PreviewBlock
                title="Included Sections"
                items={includedSections.length ? includedSections : ['No sections selected']}
              />
              <PreviewBlock
                title="Key Market Observations"
                items={[
                  'Technology leadership is strong, but valuation risk remains above the mock dashboard average.',
                  'Financials and industrials are improving, suggesting selective broadening beyond growth leaders.',
                  'Healthcare retains defensive strength with lower volatility characteristics.',
                  'Small caps need breadth and volume confirmation before the recovery signal improves.',
                ]}
              />
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-slate-950">Research Candidates</h3>
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <caption className="sr-only">Brief preview research candidate table</caption>
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500">
                      <th scope="col" className="pb-3">Ticker</th>
                      <th scope="col" className="pb-3">Mock price</th>
                      <th scope="col" className="pb-3">Momentum</th>
                      <th scope="col" className="pb-3">Valuation</th>
                      <th scope="col" className="pb-3">Risk</th>
                      <th scope="col" className="pb-3">Research question</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((ticker) => (
                      <tr key={ticker.ticker} className="border-b border-slate-100">
                        <th scope="row" className="py-3 pr-3 font-mono text-slate-950">{ticker.ticker}</th>
                        <td className="py-3 pr-3 font-mono text-slate-700">{formatCurrency(ticker.latestPrice)}</td>
                        <td className="py-3 pr-3 text-slate-700">{ticker.momentumScore} / 100</td>
                        <td className="py-3 pr-3 text-slate-700">{ticker.valuationSignal}</td>
                        <td className="py-3 pr-3 text-slate-700">{ticker.riskLevel}</td>
                        <td className="py-3 pr-3 text-slate-700">{ticker.suggestedResearchQuestion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <PreviewBlock
                title="Risk Notes"
                items={[
                  'This brief is a research aid and does not recommend buying, selling, or holding any security.',
                  'High-momentum candidates should be reviewed alongside valuation, event risk, and volume confirmation.',
                  'Earnings events can increase uncertainty even when the longer-term trend looks constructive.',
                ]}
              />
              <PreviewBlock
                title="Earnings Calendar"
                items={earningsCalendar.slice(0, 4).map((event) => `${event.ticker}: ${event.date} / ${event.focusArea}`)}
              />
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-slate-950">Article / Research Summaries</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {researchArticles.slice(0, 4).map((article) => (
                  <div key={article.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">{article.sourceType}</span>
                      <span className={`text-xs font-semibold ${signalTone(article.sentimentLabel) === 'positive' ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {article.sentimentLabel}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-950">{article.headline}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{article.whyItMatters}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              This preview uses fictionalized mock market data for portfolio demonstration purposes. It is not financial
              advice and should not be used to make investment decisions.
            </div>
          </div>
        </Card>
      </div>
      <RiskDisclosure />
    </div>
  );
}

function PreviewBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </section>
  );
}

function getAudienceSummary(
  audience: Audience,
  style: ResearchStyle,
  timeframe: BriefTimeframe,
  focus: MarketFocus,
  generated: boolean,
) {
  const prefix = generated
    ? 'This generated preview organizes the selected market context into a concise research narrative.'
    : 'This live draft updates as the configuration changes.';

  if (audience === 'Individual Investor') {
    return `${prefix} It explains the ${focus.toLowerCase()} setup in plain language over a ${timeframe.toLowerCase()} window, emphasizing what to monitor, why risk labels matter, and why no single signal should be treated as a decision.`;
  }
  if (audience === 'Financial Advisor') {
    return `${prefix} The brief frames ${focus.toLowerCase()} trends for client conversations, balancing diversification, volatility, and research follow-up without making personalized recommendations.`;
  }
  if (audience === 'Portfolio Manager') {
    return `${prefix} It summarizes ${focus.toLowerCase()} market structure, leadership breadth, valuation dispersion, and confirmation signals for a ${style.toLowerCase()} research workflow.`;
  }
  if (audience === 'Investment Committee') {
    return `${prefix} The preview emphasizes decision rationale, scenario risk, control points, and areas requiring further diligence before any investment process discussion.`;
  }
  return `${prefix} It defines financial terms, explains sector momentum, and shows how a ${style.toLowerCase()} lens changes interpretation of fictional market signals.`;
}
