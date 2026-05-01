import { AlertTriangle, ArrowUpRight, BarChart3, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '../components/design-system/Badge';
import { Button } from '../components/design-system/Button';
import { Card, CardHeader } from '../components/design-system/Card';
import { SelectControl } from '../components/design-system/Controls';
import { EmptyState, RiskDisclosure, Skeleton } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/market/MetricCard';
import { ResearchArticleCard } from '../components/research/ResearchArticleCard';
import { dashboardMetrics } from '../data/market';
import { researchArticles } from '../data/research';
import type { DesignToken } from '../types/market';

const colorTokens: DesignToken[] = [
  { name: 'Ink 950', value: '#071018', usage: 'App shell and deep background' },
  { name: 'Ink 850', value: '#101b2a', usage: 'Elevated navigation and dark card surfaces' },
  { name: 'Analyst Blue', value: '#3f8cff', usage: 'Primary actions, active states, chart emphasis' },
  { name: 'Market Green', value: '#2fc38a', usage: 'Positive momentum with supporting text labels' },
  { name: 'Caution Amber', value: '#f0b84a', usage: 'Mixed or watch states' },
  { name: 'Risk Rose', value: '#e36d79', usage: 'Elevated risk and negative trend states' },
  { name: 'Research Violet', value: '#9b8cff', usage: 'Research insight and AI-style accents' },
];

const spacingTokens = [
  ['4px', 'Tiny gaps inside compact labels'],
  ['8px', 'Default radius and tight control grouping'],
  ['12px', 'Filter and table cell padding'],
  ['16px', 'Card interior rhythm'],
  ['24px', 'Section spacing'],
  ['32px', 'Page-level separation'],
];

export function DesignSystemPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Design System"
        subtitle="Internal documentation for the MarketPulse Intelligence visual language, interaction states, data visualization grammar, and research-safe UX patterns."
        showDisclosure
      />

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.slice(0, 4).map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader
            title="Color Tokens"
            description="The palette uses calm financial neutrals with restrained signal colors. Every status has a text label in addition to color."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {colorTokens.map((token) => (
              <div key={token.name} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
                <div className="mb-3 h-12 rounded-md border border-white/10" style={{ backgroundColor: token.value }} />
                <p className="font-semibold text-white">{token.name}</p>
                <p className="font-mono text-xs text-slate-400">{token.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-300">{token.usage}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Typography and Spacing"
            description="Numbers use a system mono stack for scanability. Content type sizes stay compact inside dashboard surfaces."
          />
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-analyst-200">Display title</p>
              <p className="mt-2 text-3xl font-semibold text-white">Market Trends Overview</p>
              <p className="mt-2 text-base leading-7 text-slate-300">Section copy uses comfortable line height for research scanning.</p>
              <p className="mt-3 font-mono text-2xl font-semibold text-white">84 / 100</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {spacingTokens.map(([token, usage]) => (
                <div key={token} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
                  <p className="font-mono text-sm font-semibold text-white">{token}</p>
                  <p className="mt-1 text-sm text-slate-300">{usage}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Status, Filters, and Controls"
          description="Badges, filter chips, buttons, and form controls use explicit labels so users never have to infer meaning from color alone."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Pattern title="Market status badges">
            <div className="flex flex-wrap gap-2">
              <Badge tone="positive">Positive trend</Badge>
              <Badge tone="caution">Mixed breadth</Badge>
              <Badge tone="risk">Elevated risk</Badge>
              <Badge tone="research">Research note</Badge>
            </div>
          </Pattern>
          <Pattern title="Trend indicators">
            <div className="flex flex-wrap gap-2">
              <Badge tone="positive"><ArrowUpRight className="mr-1 h-3.5 w-3.5" aria-hidden="true" />Trend up</Badge>
              <Badge tone="caution"><AlertTriangle className="mr-1 h-3.5 w-3.5" aria-hidden="true" />Needs confirmation</Badge>
            </div>
          </Pattern>
          <Pattern title="Buttons">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Pattern>
          <Pattern title="Form controls">
            <SelectControl label="Risk level" options={['All', 'Low', 'Moderate', 'Elevated', 'High']} defaultValue="All" />
          </Pattern>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader
            title="Loading Skeleton"
            description="Skeletons appear briefly when major market filters change so the dashboard feels intentional."
          />
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Alert / Notice Pattern"
            description="Risk and disclosure language is visible, plain-spoken, and repeated near research-heavy workflows."
          />
          <RiskDisclosure compact />
        </Card>
        <Card>
          <CardHeader
            title="Screener Filter Pattern"
            description="Filters combine quantitative and qualitative signals without implying an automated decision."
          />
          <div className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Quality Momentum
            </div>
            <p className="text-sm leading-6 text-slate-300">High momentum, reasonable risk, and constructive sentiment.</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ResearchArticleCard article={researchArticles[0]} />
        <Card>
          <CardHeader
            title="Watchlist Table Pattern"
            description="Tables prioritize ticker identity, status labels, risk labels, and next review action before deeper notes."
          />
          <div className="overflow-x-auto scrollbar-soft">
            <table className="min-w-[620px] w-full text-left text-sm">
              <caption className="sr-only">Watchlist table pattern sample</caption>
              <thead>
                <tr className="border-b border-slate-700/60 text-xs uppercase tracking-[0.12em] text-slate-500">
                  <th scope="col" className="pb-3">Ticker</th>
                  <th scope="col" className="pb-3">Status</th>
                  <th scope="col" className="pb-3">Risk</th>
                  <th scope="col" className="pb-3">Next review</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/35">
                  <th scope="row" className="py-3 font-mono text-white">NVDA</th>
                  <td className="py-3 text-slate-300">High risk / high momentum</td>
                  <td className="py-3"><Badge tone="caution">Elevated</Badge></td>
                  <td className="py-3 text-slate-300">Check volume confirmation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <EmptyState
        title="Empty state pattern"
        description="Empty states explain what changed, why the result is valid, and how users can broaden a research workflow."
      />

      <Card>
        <CardHeader
          title="Design System Notes"
          description="The product tone is calm, serious, and appropriate for financial research because it separates discovery from action."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Reducing overwhelm', 'Information is grouped by market state, sector leadership, ticker detail, and follow-up action.'],
            ['Visual hierarchy', 'KPI cards summarize state, charts reveal structure, and tables hold dense follow-up details.'],
            ['Chart choices', 'Lines show direction, bars compare sectors, heatmaps compare timeframes, and composed charts pair price with volume.'],
            ['Risk language', 'Signals are described as research prompts and include explicit risk, valuation, and confirmation labels.'],
            ['No advice posture', 'The app avoids personalized recommendations, trade actions, guaranteed language, and brokerage-style execution.'],
            ['Accessibility', 'Controls are keyboard reachable, focus states are visible, charts include summaries, and statuses use text labels.'],
            ['Responsive behavior', 'Desktop uses dense side-by-side analysis; tablet stacks complex panels; mobile shifts tables into cards.'],
            ['Financial tone', 'Deep neutrals, restrained accents, and editorial microcopy avoid hype while keeping the product premium.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Chart Color Usage"
          description="Blue anchors primary comparisons, green marks constructive participation, amber marks caution, rose marks risk, and violet marks research insight."
          action={<Badge tone="info"><BarChart3 className="mr-1 h-3.5 w-3.5" aria-hidden="true" />Chart grammar</Badge>}
        />
      </Card>
    </div>
  );
}

function Pattern({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</h3>
      {children}
    </div>
  );
}
