import React, { useState } from "react";
import { ArrowRight, Database, ShieldCheck, Mail, Sparkles, Filter, CheckCircle2, UserCheck, PhoneCall, AlertTriangle, Eye, HelpCircle } from "lucide-react";
import { Lead } from "../types";

interface AdminPanelProps {
  leads: Lead[];
  onClose: () => void;
  isOpen: boolean;
}

export default function AdminPanel({ leads, onClose, isOpen }: AdminPanelProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [filterQual, setFilterQual] = useState<string>("All");

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    if (filterQual === "All") return true;
    return lead.aiAnalysis?.qualification === filterQual;
  });

  // Calculate statistics of our business funnel
  const totalCaptured = leads.length;
  const hotCount = leads.filter((l) => l.aiAnalysis?.qualification === "Hot").length;
  const avgScore = leads.length 
    ? Math.round((leads.reduce((sum, l) => sum + (l.aiAnalysis?.leadScore || 0), 0) / leads.length) * 10) / 10 
    : 0;

  const getQualStyle = (qual?: string) => {
    switch (qual) {
      case "Hot":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Warm":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-250";
    }
  };

  return (
    <section className="bg-slate-100 border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all">
      <div className="mx-auto max-w-7xl">
        
        {/* Title container */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Database className="h-5 w-5 text-indigo-600 animate-pulse" />
              <span>ДЕМO ПАНЕЛЬ: Встроенная ИИ Сквозная CRM Лидогенерации</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Здесь вы видите, как Manage Top в фоновом режиме на базе ИИ принимает заявки, автоматически ранжирует лиды, пишет персонализированное предложение для первого прогрева по почте/телефону.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="mt-3 sm:mt-0 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
          >
            Свернуть CRM-Панель
          </button>
        </div>

        {/* Mini stats boards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Всего Лидов в воронке</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1.5 font-mono">{totalCaptured} чел.</div>
            <div className="text-[10px] text-indigo-600 mt-1 font-semibold">▲ 100% автозахват</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">ГОРЯЧИЕ «HOT» ЛИДЫ</div>
            <div className="text-2xl font-extrabold text-rose-650 mt-1.5 font-mono">{hotCount} чел.</div>
            <div className="text-[10px] text-slate-500 mt-1">Требуют звонка за 15 мин.</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Автоматический Квалификатор</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1.5 font-mono font-sans font-semibold">Активен</div>
            <div className="text-[10px] text-indigo-600 mt-1 font-semibold">Обучен под реалии СНГ</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Средний скор лида</div>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1.5 font-mono">{avgScore} / 10</div>
            <div className="text-[10px] text-slate-500 mt-1">Оценка конверсионного потенциала</div>
          </div>

        </div>

        {/* Table & detailed view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List leads table (Columns 1 & 2) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden text-left">
            
            <div className="flex justify-between items-center bg-slate-50 px-5 py-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Лента Входящих Лидов</span>
              
              {/* Filter */}
              <div className="flex gap-2.5 items-center">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={filterQual}
                  onChange={(e) => setFilterQual(e.target.value)}
                  className="text-xs bg-white border border-slate-300 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="All">Все категории</option>
                  <option value="Hot">Горячие (Hot)</option>
                  <option value="Warm">Теплые (Warm)</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
              {filteredLeads.map((item) => {
                const isSelected = selectedLeadId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedLeadId(isSelected ? null : item.id)}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex justify-between items-center ${
                      isSelected ? "bg-slate-50/80" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{item.companyName}</span>
                        <span className="text-xs text-slate-400">({item.role})</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex gap-3">
                        <span>{item.name}</span>
                        <span>•</span>
                        <span className="font-mono">{item.phone}</span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${getQualStyle(item.aiAnalysis?.qualification)} font-bold uppercase`}>
                        {item.aiAnalysis?.qualification || "Warm"}
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {item.aiAnalysis?.leadScore || 8}/10
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredLeads.length === 0 && (
                <div className="p-8 text-center text-slate-400 font-sans text-xs">
                  Нет лидов в данной категории. Оставьте тестовую заявку через форму, и она появится здесь мгновенно!
                </div>
              )}
            </div>

          </div>

          {/* Details Panel (Column 3) */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 text-left flex flex-col justify-between min-h-[300px]">
            {selectedLeadId ? (
              (() => {
                const activeLead = leads.find((l) => l.id === selectedLeadId);
                if (!activeLead) return <div className="text-xs text-slate-400 font-sans">Выберите лид для вывода аналитики</div>;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{activeLead.companyName}</span>
                        <p className="text-[10px] text-slate-400 shrink-0 font-mono">{activeLead.email}</p>
                      </div>
                      <div className="flex h-7 w-7 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-xs items-center justify-center font-bold">ИИ</div>
                    </div>

                    {/* Score detail */}
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-150">
                      <span className="text-[11px] font-bold text-slate-600">Квалификация скоринга</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${getQualStyle(activeLead.aiAnalysis?.qualification)} font-bold`}>
                        {activeLead.aiAnalysis?.qualification} ({activeLead.aiAnalysis?.leadScore}/10)
                      </span>
                    </div>

                    {/* Suggested modules */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Ключевые модули внедрения</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {activeLead.aiAnalysis?.suggestedModules.map((m, id) => (
                          <span key={id} className="text-[10px] text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Immediate Action */}
                    <div className="bg-amber-50/50 border border-amber-200 p-3 rounded-lg">
                      <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                        <PhoneCall className="h-3 w-3" />
                        <span>Регламент первого созвона</span>
                      </span>
                      <p className="text-xs text-amber-900 mt-1 lines-normal italic">
                        {activeLead.aiAnalysis?.immediateAction}
                      </p>
                    </div>

                    {/* Email copy draft */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>Шаблон первого СМС/EMail</span>
                      </span>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-1 leading-relaxed">
                        &ldquo;{activeLead.aiAnalysis?.draftIntroCopy}&rdquo;
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 italic">
                      💡 Лиды обрабатываются автоматически через REST-контур. Вы можете отправить форму снова, чтобы протестировать другие паттерны.
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 flex-1 h-full font-sans">
                <Sparkles className="h-8 w-8 text-slate-300 mb-2 animate-pulse" />
                <h4 className="text-xs font-bold text-slate-700">ИИ Консультант ожидает</h4>
                <p className="text-[10px] text-slate-400 max-w-[200px] mt-1">
                  Нажмите на любой лид из левого списка, чтобы развернуть глубокий оцифрованный анализ.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
