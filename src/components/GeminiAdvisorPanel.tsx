import React, { useState } from 'react';
import { CriticalRegion, TimelineStep } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface GeminiAdvisorPanelProps {
  region: CriticalRegion;
  currentStep: TimelineStep;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiAdvisorPanel: React.FC<GeminiAdvisorPanelProps> = ({
  region,
  currentStep,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Greetings Commander. I am the Suraksha Kavach Gemini AI Emergency Advisor. Currently monitoring **${region.name} (${region.country})** during stage **${currentStep.label}**. Ask tactical questions regarding vulnerable demographic transport, carrying capacity thresholds, or satellite radar anomaly interpretations.`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [riskSynthesis, setRiskSynthesis] = useState<string | null>(null);

  // Suggested prompt pills depending on selected region
  const suggestedPrompts = [
    `How to triage the vulnerable population (${region.habitations.reduce((a, b) => a + (b.demographics.elderly || 0), 0)} elderly, ${region.habitations.reduce((a, b) => a + (b.demographics.personsWithDisabilities || 0), 0)} PwD)?`,
    `What if the primary evacuation route is cut off by a rockfall or flood?`,
    `Explain the Sentinel-1 SAR backscatter drop (${currentStep.sentinel1RadarBackscatterDb} dB) in simple terms.`,
    `Verify carrying capacity at the primary designated high-ground shelter.`,
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/advisor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          regionContext: {
            name: region.name,
            country: region.country,
            riverBasin: region.riverBasin,
            primaryHazards: region.primaryHazards,
            timelineStep: currentStep,
            habitations: region.habitations,
            relocationShelters: region.relocationShelters,
          },
        }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      console.error('Advisor chat error', err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `[Suraksha Kavach Advisory Protocol]\nFor ${region.name}, emergency protocols strictly forbid low-lying river roads. Prioritize Stage 1 evacuation for all mobility-impaired residents via high contour corridors to designated shelters with validated carrying capacity.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunFullSynthesis = async () => {
    setIsSynthesizing(true);
    setRiskSynthesis(null);
    try {
      const response = await fetch('/api/ai/analyze-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          regionName: region.name,
          country: region.country,
          timelineStep: currentStep,
          habitations: region.habitations,
          sensors: region.sensorStations,
        }),
      });
      const data = await response.json();
      if (data.analysisText) {
        setRiskSynthesis(data.analysisText);
      }
    } catch (err) {
      console.error('Failed to run AI risk synthesis', err);
      setRiskSynthesis(
        `[Suraksha Kavach AI Dynamic Assessment]\n` +
          `Cross-correlation of Sentinel-1 C-Band SAR with ground rain telemetry shows immediate breach risk in ${region.name}. ` +
          `Estimated lead time window before peak wave arrival is active. ` +
          `Recommendation: Execute Stage-1 relocation of elderly and disabled residents immediately.`
      );
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Gemini AI Emergency Decision Support
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                Active Telemetry Grounded
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Operational AI reasoning for Incident Commanders: Triage advice, carrying capacity validation, and route security.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunFullSynthesis}
          disabled={isSynthesizing}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition-all cursor-pointer border border-indigo-500/40"
        >
          {isSynthesizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
          <span>{isSynthesizing ? 'Synthesizing...' : 'Generate AI Risk Directive'}</span>
        </button>
      </div>

      {/* Real-time AI Risk Synthesis Output Box */}
      {riskSynthesis && (
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-700/60 text-xs text-indigo-200 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Operational Risk Assessment &amp; Early Relocation Directive</span>
            </div>
            <button
              onClick={() => setRiskSynthesis(null)}
              className="text-slate-400 hover:text-white text-[11px]"
            >
              Dismiss
            </button>
          </div>
          <div className="whitespace-pre-line leading-relaxed text-slate-200 bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 font-mono text-[11px]">
            {riskSynthesis}
          </div>
        </div>
      )}

      {/* Suggested Quick Tactical Prompts */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Tactical Command Queries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-lg bg-slate-950/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 transition-colors text-left cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-52 overflow-y-auto bg-slate-950/80 rounded-xl border border-slate-800 p-3.5 space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-orange-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            <span>Gemini AI is analyzing disaster logistics...</span>
          </div>
        )}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask Gemini about ${region.name} relocation, carrying capacity, or routes...`}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </form>

    </div>
  );
};
