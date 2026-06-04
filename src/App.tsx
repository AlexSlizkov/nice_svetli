import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Modules from "./components/Modules";
import RoiCalculator from "./components/RoiCalculator";
import Tariffs from "./components/Tariffs";
import LeadCapturePopup from "./components/LeadCapturePopup";
import AdminPanel from "./components/AdminPanel";
import { Lead } from "./types";
import { 
  ShieldCheck, 
  Smartphone, 
  Database, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight, 
  Building, 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Mail,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  // States for accordion FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  const handleLeadAdded = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenConsultation = (tariff: string | null = null) => {
    setSelectedTariff(tariff);
    setCaptureOpen(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Сколько времени занимает реальное внедрение системы?",
      a: "Базовый запуск занимает всего 1 рабочий день. Оцифровка оргструктуры, добавление первых 50 сотрудников, настройка иерархии должностей и прав доступа происходят автоматически по нашим шаблонам. Наш куратор сопровождает вас на протяжении всего пилотного периода."
    },
    {
      q: "Как работает комплиментарный аутсорсинг (юрист, бухгалтер, финдиректор)?",
      a: "Начиная с тарифа «Оптимальный» в вашу подписку БЕСПЛАТНО включены часы работы профильных экспертов на аутсоринге. Оформление заявок происходит прямо в интерфейсе ERP. Например, юрист подготовит кастомный договор, финдиректор составит финансовую модель под новый филиал, а специалист 1С настроит выгрузку из вашей старой бухгалтерии."
    },
    {
      q: "Безопасны ли наши коммерческие данные от саботажа и увольнений?",
      a: "Абсолютно. В Manage Top встроена жесткая система разграничения прав доступа. Увольняемый сотрудник блокируется руководством в 1 клик. Все файлы, базы контрагентов и переписки хранятся на защищенных облачных серверах Tier-3 в РФ. Выгрузка базы данных контактов без одобрения ИИ и СЕО технически заблокирована."
    },
    {
      q: "Продукт подходит для компаний с какими оборотами и численностью?",
      a: "Manage Top оптимизирован под малый и средний бизнес (SMB) с численностью штата от 10 до 300 сотрудников и годовым оборотом от 20 млн до 2 млрд рублей. Система легко адаптируется под торговые сети, логистические компании, сферу услуг, производства и онлайн-ритейл."
    },
  ];

  const testimonials = [
    {
      name: "Алексей Ракитин",
      role: "Владелец, ПК «ТехноДеталь» (Москва)",
      quote: "Мы внедрили Manage Top 3 месяца назад. До этого 60 сотрудников работали в куче чатов Telegram и разрозненных таблицах Excel. Полный хаос! Благодаря модулю 'Двойного Контроля' мы смогли сразу сократить необоснованные закупки отдела снабжения на 320 000 рублей в первый же месяц. К концу 3-го месяца чистая выручка выросла на 18% за счет авто-контроля дедлайнов в отделе продаж.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      name: "Татьяна Прохорова",
      role: "РОП / Коммерческий директор, ООО «ТК Экспресс»",
      quote: "Раньше менеджеры по продажам регулярно затягивали дедлайны по коммерческим предложениям, а я тратила по 3 часа в день на пинки. После интеграции тарифа Оптимальный в Manage Top умные авто-напоминания контролируют дедлайны сами. Если менеджер просрочил сдачу — система сама выдает штраф в карточке задачи. Наша конверсия из лида в оплату выросла с 11% до 19.5%!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Target Navigation bar */}
      <Header 
        onScrollTo={handleScrollTo} 
        onOpenConsultation={() => handleOpenConsultation(null)}
        onToggleAdmin={() => setAdminOpen(!adminOpen)}
        adminOpen={adminOpen}
        leadsCount={leads.length}
      />

      {/* Embedded Live CRM Sandbox view dynamically injected */}
      {adminOpen && (
        <AdminPanel 
          leads={leads} 
          onClose={() => setAdminOpen(false)} 
          isOpen={adminOpen}
        />
      )}

      {/* Main Landing Page layout */}
      <main>
        
        {/* Interactive Hero banner */}
        <Hero 
          onScrollToCalculator={() => handleScrollTo("calculator")} 
          onOpenConsultation={() => handleOpenConsultation(null)}
        />

        {/* Dynamic Features Modules Explorer */}
        <Modules onOpenConsultation={() => handleOpenConsultation(null)} />

        {/* AI interactive ROI automation calculator */}
        <RoiCalculator />

        {/* Subscription pricing tables */}
        <Tariffs onSelectTariff={(tariff) => handleOpenConsultation(tariff)} />

        {/* Block: Russian Legal check / Import Substitution */}
        <section id="benefits" className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="text-left font-sans">
                <h2 className="text-sm font-mono tracking-widest text-indigo-600 uppercase font-bold">БЕЗОПАСНОСТЬ И ЗАКОН РФ</h2>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Импортозамещение и защита данных в контуре РФ
                </p>
                <p className="mt-4 text-base text-slate-500">
                  Manage Top полностью адаптирован под жесткие юридические и технологические стандарты Российской Федерации. Забудьте о блокировках зарубежного ПО.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs">
                      <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Реестр Минцифры РФ</h4>
                      <p className="text-xs text-slate-500 mt-1">Официально зарегистрированное ПО (Решение №30676 от 14.11.2025). Возможность внедрения в госструктурах и аккредитованных компаниях.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs">
                      <Database className="h-5 w-5 text-slate-900" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Размещение локально (ФЗ-152)</h4>
                      <p className="text-xs text-slate-500 mt-1">Базы данных хранятся в защищенных физических Tier-3 дата-центрах в Москве. Полное соответствие закону о персональных данных.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs">
                      <Smartphone className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Официальные мобильные приложения</h4>
                      <p className="text-xs text-slate-500 mt-1">Доступны приложения для всех устройств в App Store, Google Play, и отечественном RuStore без рисков удаления.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic badges */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-center text-left">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <Building className="h-5 w-5 text-slate-800" />
                  <span className="font-sans font-extrabold text-sm text-slate-900">Государственные лицензии</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono">НАЗВАНИЕ СИСТЕМЫ В РЕЕСТРЕ</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">Программный комплекс автоматизации Manage Top</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Владелец: ООО «МЕНЕДЖ ТОП РУС» (ОГРН 1257700445588)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-100 p-4 leading-normal">
                      <div className="text-[9px] text-slate-400 font-mono">РЕШЕНИЕ МИНЦИФРЫ</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">№ 30676</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">от 14 ноября 2025 г.</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4 leading-normal bg-white">
                      <div className="text-[9px] text-slate-400 font-mono">СТАНДАРТ БЕЗОПАСНОСТИ</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">Tier-3 (ФЗ-152)</div>
                      <div className="text-[10px] text-indigo-600 mt-0.5">Москва, РФ</div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => handleOpenConsultation(null)}
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold text-indigo-705 hover:underline"
                    >
                      Скачать юридическую карту и свидетельства РОСПАТЕНТ →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section: Testimonials & Cases */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-mono tracking-widest text-indigo-600 uppercase font-bold">РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ</h2>
            <p className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Собственники делятся реальным опытом за 3 месяца
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-12 text-left">
              {testimonials.map((test, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 sm:p-8 flex flex-col justify-between">
                  <p className="text-sm text-slate-600 italic leading-relaxed font-sans">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-3.5 mt-6 border-t border-slate-150 pt-4">
                    <img 
                      src={test.image} 
                      alt={test.name}
                      onError={(e) => {
                        // fallback if error unspash
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${test.name}`;
                      }}
                      className="h-10 w-10 rounded-full bg-slate-200 border border-slate-300"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 font-sans">{test.name}</div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">{test.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accordion FAQ */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            
            <h2 className="text-sm font-mono tracking-widest text-indigo-605 uppercase font-bold">ВОПРОСЫ И ОТВЕТЫ</h2>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl mb-12">
              Часто задаваемые вопросы перед внедрением ERP
            </p>

            <div className="space-y-4 text-left">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                    <button
                      id={`faq-toggle-${idx}`}
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-sm font-bold text-slate-900 focus:outline-none hover:bg-slate-50 transition-colors cursor-pointer text-left"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-10 rounded-xl bg-indigo-50 border border-indigo-100 p-5 mt-10 shadow-xs">
              <p className="text-xs font-semibold text-indigo-800">
                Задайте свой вопрос нашему внедренцу в реальном времени. Внедрение ПО полностью закроет хаос в процессах.
              </p>
              <button
                type="button"
                onClick={() => handleOpenConsultation(null)}
                className="mt-3 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
              >
                Задать кастомный вопрос
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Footer view */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-950 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            
            {/* Logotype */}
            <div className="space-y-4">
              <span className="font-extrabold text-white text-lg tracking-tight font-sans">Manage<span className="text-indigo-500 font-extrabold">Top</span> ERP</span>
              <p className="text-xs text-slate-400 leading-normal">
                Единая цифровая экосистема автоматизации малого и среднего бизнеса. Создана в соответствии с ГОСТ и лицензиями РФ.
              </p>
              <div className="text-[10px] text-slate-505">
                © {new Date().getFullYear()} ООО «МЕНЕДЖ ТОП РУС». Все права защищены. Решение Минцифры No 30676.
              </div>
            </div>

            {/* Contacts & coordinates */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider">Контакты в Москве</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>г. Москва, Пресненская Наб., д. 12, Башня Федерация Восток</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>+7 (495) 120-44-55</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>info@manage-top.ru</span>
                </li>
              </ul>
            </div>

            {/* Modules lists */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider">Блоки системы</h4>
              <ul className="space-y-1.5 text-xs">
                <li>Управление кадрами (HR)</li>
                <li>Дедлайны и контроль задач</li>
                <li>BPM и Двойной контроль</li>
                <li>Автопротоколы совещаний</li>
                <li>DDS / P&L Финансовый учет</li>
              </ul>
            </div>

            {/* Links block */}
            <div className="space-y-3 col-span-1">
              <h4 className="text-xs font-extrabold text-white uppercase font-mono tracking-wider">Юридическая информация</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Политика конфиденциальности (ФЗ-152)</li>
                <li className="hover:text-white transition-colors cursor-pointer">Лицензионный договор-оферта</li>
                <li className="hover:text-white transition-colors cursor-pointer">Реестр Минцифры РФ №30676</li>
                <li className="hover:text-white transition-colors cursor-pointer">Спецификация Tier-3 ЦОД</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-6 text-center text-[10px] text-slate-500">
            Сайт носит исключительно информационный характер и не является публичной офертой, определяемой положениями Ст. 437 ГК РФ. Внедрение подписки ERP координируется аккредитованными интеграторами.
          </div>
        </div>
      </footer>

      {/* Structured dynamic Lead funnel Capture Popup modal */}
      <LeadCapturePopup
        isOpen={captureOpen}
        onClose={() => setCaptureOpen(false)}
        onLeadAdded={handleLeadAdded}
        selectedTariff={selectedTariff}
      />

    </div>
  );
}
