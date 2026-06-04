import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Sparkles, AlertCircle, FileText, Download, Play, Check, CheckCircle2, History, TrendingUp, DollarSign, Clock, HelpCircle } from "lucide-react";
import { RoiCalculation } from "../types";

export default function RoiCalculator() {
  const [revenue, setRevenue] = useState(5000000);
  const [managers, setManagers] = useState(15);
  const [adSpend, setAdSpend] = useState(300000);
  const [routineHours, setRoutineHours] = useState(8);
  const [averageCheck, setAverageCheck] = useState(15000);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [calculationResult, setCalculationResult] = useState<RoiCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [emailForPdf, setEmailForPdf] = useState("");
  const [pdfSent, setPdfSent] = useState(false);

  const loadingSteps = [
    "Подключение к ядру ИИ-аналитики Manage Top...",
    "Оценка издержек на ручные операции и составление личного дела процессов...",
    "Идентификация скрытых финансовых утечек и превышения полномочий...",
    "Имитация окупаемости внедрения системы Двойного контроля...",
    "Формирование индивидуальной дорожной карты цифровой трансформации на 3 месяца..."
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCalculationResult(null);
    setPdfSent(false);

    // Dynamic loading screen intervals
    let currStep = 0;
    setLoadingStep(0);
    const interval = setInterval(() => {
      currStep++;
      if (currStep < loadingSteps.length) {
        setLoadingStep(currStep);
      }
    }, 1500);

    try {
      const response = await fetch("/api/roi-evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyRevenue: revenue,
          managersCount: managers,
          advertisingSpend: adSpend,
          manualTasksHours: routineHours,
          averageOrder: averageCheck,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error("Не удалось выполнить ИИ-расчет. Попробуйте еще раз.");
      }

      const data = await response.json();
      setCalculationResult(data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err?.message || "Что-то пошло не так...");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPdfSent(true);
  };

  // Helper formatting values
  const formatRub = (val: number) => {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 border-y border-slate-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-250 text-indigo-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Инновация • Калькулятор на базе ИИ</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl font-sans">
            ИИ-Калькулятор окупаемости ERP
          </h2>
          <p className="mt-4 text-base text-slate-505 font-sans">
            Оцифруйте личный экономический эффект за первые 3 месяца. Мы используем обученную модель для сопоставления ваших параметров с метриками эффективности в РФ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section (Left 5 Columns) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Calculator className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-sans">Параметры вашего бизнеса</h3>
            </div>

            <form onSubmit={handleEvaluate} className="space-y-6">
              
              {/* Revenue Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">Месячная выручка (₽)</label>
                  <span className="font-mono text-sm font-bold text-slate-900">{formatRub(revenue)}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="100000000"
                  step="500000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>500k ₽</span>
                  <span>100 млн ₽</span>
                </div>
              </div>

              {/* Marketing Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans">Бюджет на рекламу (₽/мес)</label>
                  <span className="font-mono text-sm font-bold text-slate-900">{formatRub(adSpend)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0 ₽</span>
                  <span>5 млн ₽</span>
                </div>
              </div>

              {/* Grid 2 slots */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Managers Count */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans mb-1.5">Команда (чел)</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={managers}
                    onChange={(e) => setManagers(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-950 font-mono font-medium focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Average Check */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans mb-1.5">Средний чек (₽)</label>
                  <input
                    type="number"
                    min="100"
                    value={averageCheck}
                    onChange={(e) => setAverageCheck(Math.max(100, Number(e.target.value)))}
                    className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-955 font-mono font-medium focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

              </div>

              {/* Routine Hours slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-sans flex items-center gap-1">
                    Рутина сотрудника (ч/нед)
                  </label>
                  <span className="font-mono text-sm font-bold text-indigo-700">{routineHours} ч / неделю</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={routineHours}
                  onChange={(e) => setRoutineHours(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 leading-normal mt-1.5 font-sans">
                  Отчеты, перепроверка таблиц, ручной контроль дедлайнов и чаты в мессенджерах.
                </p>
              </div>

              {/* Evaluate Button */}
              <button
                id="calculate-roi-btn"
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-150 hover:bg-indigo-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Sparkles className="h-4.5 w-4.5" />
                <span>Рассчитать окупаемость через ИИ</span>
              </button>

            </form>
          </div>

          {/* Outputs / Calculations Display (Right 7 Columns) */}
          <div className="lg:col-span-7 min-h-[500px] flex flex-col items-center justify-center">
            
            <AnimatePresence mode="wait">
              
              {/* Default Empty State */}
              {!loading && !calculationResult && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-6 rounded-2xl border border-dashed border-slate-350 w-full bg-slate-50 flex flex-col items-center justify-center"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-450 mb-4 animate-pulse">
                    <Calculator className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 font-sans">Ожидание ввода параметров</h4>
                  <p className="mt-1.5 text-xs text-slate-500 max-w-sm font-sans">
                    Задайте метрики вашей компании в блоке слева и активируйте расчет, чтобы сформировать ИИ-отчет и 3-месячную дорожную карту окупаемости.
                  </p>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm w-full font-sans text-center space-y-6 flex flex-col justify-center items-center py-16"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-indigo-100 opacity-75"></span>
                    <div className="relative rounded-full h-16 w-16 border-2 border-indigo-600 border-t-transparent animate-spin flex items-center justify-center bg-white shadow-sm">
                      <Sparkles className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="text-base font-bold text-slate-900 font-sans">ИИ-моделирование запущено</h4>
                    
                    {/* Animated Loading message */}
                    <p className="text-xs text-indigo-700 font-mono italic animate-pulse">
                      {loadingSteps[loadingStep]}
                    </p>
                    <div className="w-full bg-slate-100 rounded-full h-1 mt-4 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-1 rounded-full transition-all duration-1000" 
                        style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center w-full flex flex-col items-center justify-center"
                >
                  <AlertCircle className="h-8 w-8 text-rose-600 mb-2" />
                  <h4 className="text-sm font-bold text-rose-900 font-sans">Произошла ошибка при анализе</h4>
                  <p className="mt-1 text-xs text-rose-700 font-sans max-w-md">{error}</p>
                </motion.div>
              )}

              {/* Results State */}
              {!loading && calculationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 w-full text-left font-sans"
                >
                  {/* Performance stats boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start text-[10px] text-slate-400 font-bold tracking-wider uppercase font-sans">
                        <span>Сбережения в месяц</span>
                        <DollarSign className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="mt-2 text-xl font-bold font-mono text-indigo-600">
                        {formatRub(calculationResult.monthlySavings)}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">Ликвидация утечек и рутины</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start text-[10px] text-slate-400 font-bold tracking-wider uppercase font-sans">
                        <span>Выручка за 3 мес.</span>
                        <TrendingUp className="h-4 w-4 text-slate-900" />
                      </div>
                      <div className="mt-2 text-xl font-bold font-mono text-slate-900">
                        {formatRub(calculationResult.revenueIncreaseThreeMonths)}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">Благодаря росту конверсии ОП</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start text-[10px] text-slate-400 font-bold tracking-wider uppercase font-sans">
                        <span>Сэкономлено времени</span>
                        <Clock className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div className="mt-2 text-xl font-bold font-mono text-indigo-600">
                        {calculationResult.hoursSavedPerWeek} ч / нед
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">Высвобождение ручного труда</p>
                    </div>

                  </div>

                  {/* Executive summary block (from Gemini) */}
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 relative">
                    <div className="text-[10px] font-bold text-indigo-800 tracking-wider uppercase font-mono mb-1.5 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
                      <span>ИИ-Резюме бизнес Консультанта</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                      &ldquo;{calculationResult.executiveSummary}&rdquo;
                    </p>
                  </div>

                  {/* Savings Pie Chart Representation (SVG render) */}
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-4">Структура высвобождаемого бюджета в месяц</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                      
                      {/* Left SVG Custom Graphic */}
                      <div className="flex justify-center">
                        <svg width="200" height="130" viewBox="0 0 200 130">
                          {/* 3 custom Bars representing cost values */}
                          {/* Bar 1 - HR routine */}
                          <rect x="10" y="20" width="180" height="14" rx="4" fill="#f1f5f9" />
                          <rect x="10" y="20" width="140" height="14" rx="4" fill="#4f46e5" />
                          <text x="10" y="15" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">Временная рутина: {formatRub(calculationResult.savingsBreakdown.hrRoutine)}</text>

                          {/* Bar 2 - Task control */}
                          <rect x="10" y="60" width="180" height="14" rx="4" fill="#f1f5f9" />
                          <rect x="10" y="60" width="100" height="14" rx="4" fill="#0f172a" />
                          <text x="10" y="55" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">Контроль задач: {formatRub(calculationResult.savingsBreakdown.taskControl)}</text>

                          {/* Bar 3 - Finance leaks */}
                          <rect x="10" y="100" width="180" height="14" rx="4" fill="#f1f5f9" />
                          <rect x="10" y="100" width="60" height="14" rx="4" fill="#a5b4fc" />
                          <text x="10" y="95" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">Финансовый контроль: {formatRub(calculationResult.savingsBreakdown.financeLeaks)}</text>
                        </svg>
                      </div>

                      {/* Right Details Indicators */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="h-3 w-3 rounded bg-indigo-600 mt-0.5 shrink-0"></span>
                          <div>
                            <span className="font-semibold text-slate-900 block font-sans">Экономия времени сотрудников:</span>
                            Оцифровка табелей и авто-напоминания избавляют от 4-5 часов волокиты в неделю.
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="h-3 w-3 rounded bg-slate-900 mt-0.5 shrink-0"></span>
                          <div>
                            <span className="font-semibold text-slate-900 block font-sans">Оптимизация дедлайнов продаж:</span>
                            Автодедлайны повысят качество обслуживания и увеличат конверсию на <span className="font-bold text-slate-900">{calculationResult.conversionBoosterPercent}%</span>.
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 3 Action Levers */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Ключевые рычаги экономии в вашей ERP</h4>
                    {calculationResult.topThreeLevers.map((lever, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start bg-white border border-slate-200/80 p-3.5 rounded-xl shadow-xs">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-700 shrink-0 mt-0.5 font-mono">{idx + 1}</span>
                        <p className="text-xs text-slate-700 font-sans leading-normal">{lever}</p>
                      </div>
                    ))}
                  </div>

                  {/* 3-Month Transformational Roadmap */}
                  <div className="rounded-xl border border-slate-205 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Пошаговая дорожная карта внедрения ERP Manage Top</h4>
                      <span className="rounded bg-indigo-50 border border-indigo-150 px-2 py-0.5 text-[9px] font-bold text-indigo-805">3 МЕСЯЦА</span>
                    </div>

                    <div className="space-y-5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                      {calculationResult.rolloutRoadmap.map((item, idx) => (
                        <div key={idx} className="relative pl-7 group">
                          {/* dot indicator */}
                          <span className="absolute left-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300 bg-white group-hover:border-indigo-650 transition-colors">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                          </span>

                          <div className="text-xs font-bold text-slate-900 font-sans flex items-center gap-2">
                            <span className="text-indigo-700 font-mono text-[11px] bg-indigo-50 px-1.5 py-0.5 rounded leading-none">{item.month}</span>
                            <span>{item.focus}</span>
                          </div>

                          <ul className="mt-2 space-y-1 list-disc list-inside text-[11px] text-slate-650 pl-1 font-sans">
                            {item.actions.map((act, aIdx) => (
                              <li key={aIdx}>{act}</li>
                            ))}
                          </ul>

                          <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-sans italic">
                            <span className="font-semibold text-indigo-700">Ожидаемый результат:</span>
                            {item.expectedOutcome}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Claim strategy Capture Funnel */}
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-center">
                    <h4 className="text-sm font-bold text-slate-900 font-sans">Сохранить расчет и получить пробную версию на почту?</h4>
                    <p className="text-xs text-slate-500 mt-1 font-sans max-w-md mx-auto">
                      Мы вышлем детализированный PDF-анализ окупаемости и демо-доступ к системе Manage Top в течение 5 минут.
                    </p>

                    <form onSubmit={handlePdfSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="E-mail владельца"
                        required
                        value={emailForPdf}
                        onChange={(e) => setEmailForPdf(e.target.value)}
                        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        disabled={pdfSent}
                        className="shrink-0 flex items-center justify-center gap-1 rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-indigo-100"
                      >
                        {pdfSent ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                        <span>{pdfSent ? "Отправлено!" : "Скачать PDF отчет"}</span>
                      </button>
                    </form>
                    {pdfSent && (
                      <p className="mt-2.5 text-[11px] text-indigo-600 font-sans font-semibold">
                        ✓ Аналитический отчет отправлен на почту {emailForPdf}. Ожидайте звонка ИИ-ассистента для подтверждения.
                      </p>
                    )}
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
