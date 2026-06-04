import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, CheckCircle, TrendingUp, Cpu, Calendar, ChevronRight } from "lucide-react";

interface HeroProps {
  onScrollToCalculator: () => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToCalculator, onOpenConsultation }: HeroProps) {
  const [quickEmail, setQuickEmail] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenConsultation();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24">
      {/* Absolute Decorative Grid Backdrops */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-7xl [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
        <svg
          className="absolute inset-0 h-full w-full stroke-slate-200/80 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-grid"
              width={40}
              height={40}
              patternUnits="userSpaceOnUse"
              x="50%"
              y={-1}
            >
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" strokeWidth={0} />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Text content (Left 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-800 w-fit mb-6">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-600" />
              <span>Регистрация в Минцифры РФ (Решение №30676 от 14.11.2025)</span>
            </div>

            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.08]">
              Единая ERP/BPM-система управления бизнесом <p className="h-2" />
              <span className="relative mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-805">
                «под ключ»
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-2xl font-sans">
              Создана предпринимателями для предпринимателей. Откажитесь от 10 разрозненных сервисов и бесконечных ручных таблиц. Закройте кадровый учет, финансы, задачи и мессенджер в едином контуре.
            </p>

            {/* Target metrics badges */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl">
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <TrendingUp className="h-5 w-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">+32%</div>
                  <div className="text-[11px] text-slate-500 font-sans leading-none">рост выручки за 3 мес.</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <Cpu className="h-5 w-5 text-slate-800 shrink-0" />
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">1 день</div>
                  <div className="text-[11px] text-slate-500 font-sans leading-none">внедрение без саботажа</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <Calendar className="h-5 w-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">-40%</div>
                  <div className="text-[11px] text-slate-500 font-sans leading-none">затрат времени команды</div>
                </div>
              </div>
            </div>

            {/* Interactive Call to Action */}
            <div className="mt-10 max-w-md">
              <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  id="hero-email-input"
                  type="email"
                  placeholder="Ваш рабочий E-mail"
                  required
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-950 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  id="hero-submit-btn"
                  type="submit"
                  className="flex items-center justify-center gap-1 shrink-0 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  <span>Начать тест</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  Доступно демо на 14 дней
                </span>
                <button 
                  type="button" 
                  onClick={onScrollToCalculator}
                  className="text-indigo-700 hover:underline font-semibold"
                >
                  Рассчитайте окупаемость ИИ →
                </button>
              </div>
            </div>
          </div>

          {/* Graphical Dashboard Display (Right 5 Columns) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400"></span>
                  <span className="h-3 w-3 rounded-full bg-amber-400"></span>
                  <span className="h-3 w-3 rounded-full bg-indigo-400"></span>
                </div>
                <div className="text-xs font-mono font-medium text-slate-500">Рабочий стол собственника</div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="mt-4 space-y-4 font-sans text-left">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">Выручка (Текущий месяц)</div>
                    <div className="mt-1 font-mono text-base font-bold text-slate-900">4 820 000 ₽</div>
                    <div className="text-[10px] text-indigo-600 font-semibold">▲ +12.4% vs прошлый мес.</div>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">Задачи в дедлайне</div>
                    <div className="mt-1 font-mono text-base font-bold text-slate-900">0 / 84</div>
                    <div className="text-[10px] text-slate-500">Все регламенты соблюдены</div>
                  </div>
                </div>

                {/* Main active item with Approval and "Double control" blocker alert */}
                <div className="rounded-xl border border-yellow-250 bg-yellow-50/50 p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                      Автоматический Двойной Контроль
                    </div>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">БЛОК КАССЫ</span>
                  </div>
                  <p className="mt-1.5 text-xs text-amber-800 leading-normal">
                    Сотрудник ОП пытается согласовать скидку 15% на сделку ООО «Вектор». Формально доступ есть, но требуется одобрение РОПа.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button 
                      type="button" 
                      onClick={onOpenConsultation}
                      className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold text-white hover:bg-slate-800"
                    >
                      Одобрить в 1 клик
                    </button>
                    <button 
                      type="button"
                      onClick={onOpenConsultation}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Отклонить
                    </button>
                  </div>
                </div>

                {/* Real-time CRM Lead stream indicator */}
                <div className="rounded-style border border-slate-200 p-3 rounded-xl">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>Живая лента процессов</span>
                    <span>14:32</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-7 w-7 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] flex items-center justify-center font-bold">ИИ</div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs font-semibold text-slate-900 truncate">Протокол совещания обработан</div>
                      <div className="text-[10px] text-slate-500 truncate">Сформировано 4 задачи для отдела продаж</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Glowing Accent */}
            <div className="absolute -top-12 right-20 -z-20 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
