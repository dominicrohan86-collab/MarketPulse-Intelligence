import { Clock3 } from 'lucide-react';
import { signalTone } from '../../lib/format';
import type { ResearchArticle } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Card } from '../design-system/Card';

export function ResearchArticleCard({ article }: { article: ResearchArticle }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="research">{article.sourceType}</Badge>
          <span className="text-xs font-semibold text-slate-500">{article.date}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readingTime}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-6 text-white">{article.headline}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{article.summary}</p>
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap gap-2">
          {article.relatedTickers.map((ticker) => (
            <span key={ticker} className="rounded-md border border-slate-600/30 bg-slate-950/35 px-2 py-1 font-mono text-xs text-slate-200">
              {ticker}
            </span>
          ))}
        </div>
        <div className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Why it matters</span>
            <Badge tone={signalTone(article.sentimentLabel)}>{article.sentimentLabel}</Badge>
          </div>
          <p className="text-sm leading-6 text-slate-300">{article.whyItMatters}</p>
        </div>
      </div>
    </Card>
  );
}
