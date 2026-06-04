import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, CheckSquare, ShieldAlert, CalendarClock, CreditCard, MessagesSquare, CheckCircle2 } from "lucide-react";

interface ModulesProps {
  onOpenConsultation: () => void;
}

const MODULES_DATA = [
  {
    id: "hr",
    title: "А. Управление кадрами (HR)",
    subtitle: "Оргструктура без хаоса и автоматический табель",
    icon: Users,
    color: "indigo",
    bullets: [
      {
        title: "Прозрачная иерархия",
        desc: "Понятная оргструктура с разграничением доступов. Каждый сотрудник видит, кому подчиняется и за что отвечает."
      },
      {
        title: "Контроль найма",
        desc: "Полная база кандидатов, этапы интервью и архивы решений прямо внутри ERP системы."
      },
      {
        title: "Учет персонала и табелирование",
        desc: "Автоматический учет рабочего времени. Никаких споров по графику работы и дисциплине."
      },
      {
        title: "Управленческая зарплата",
        desc: "Автоматический расчет выплат на основе реальной загрузки, эффективности и выполненного плана задач."
      }
    ],
    mockInterface: {
      header: "HR Портал • СК Логистик",
      primaryLabel: "Оргструктура и Кадры",
      items: [
        { name: "Штатное расписание", status: "Утверждено", active: true },
        { name: "Табель учета времени", status: "82% сотрудников оцифровано", active: true },
        { name: "Автоматические КПЭ", status: "Интеграция с задачами", active: true }
      ],
      aiTip: "Система зафиксировала превышение выработки у 2 менеджеров. Рекомендуется начислить премию по регламенту автоматически."
    }
  },
  {
    id: "tasks",
    title: "Б. Контроль и постановка задач",
    subtitle: "Управление дедлайнами и авто-напоминания",
    icon: CheckSquare,
    color: "indigo",
    bullets: [
      {
        title: "Быстрая постановка",
        desc: "Создание задач коллегам в 2 клика. Шаблоны для типовых регламентов и поручений."
      },
      {
        title: "Автоматические напоминания",
        desc: "Система сама напоминает о дедлайне сотруднику. Руководитель не тратит нервы и время на регулярный контроль."
      },
      {
        title: "Встроенный трекинг времени",
        desc: "Реальное время выполнения задач фиксируется, помогая точно оценить себестоимость труда."
      },
      {
        title: "Гибкая мотивация в карточке",
        desc: "Предупреждения за срывы сроков или автоматическое начисление премий за продуктивность прямо в табель."
      }
    ],
    mockInterface: {
      header: "Панель Задач • Manage Top",
      primaryLabel: "Инструменты автоматического контроля",
      items: [
        { name: "Напоминалка в мессенджер", status: "Автоматически за 1 час", active: true },
        { name: "Штрафы/Премии", status: "Встроено в карточку", active: true },
        { name: "Постановка регламентом", status: "По шаблону каждую ср", active: true }
      ],
      aiTip: "Показатель срыва дедлайнов у команды снизился до 2.4% после включения авто-уведомлений Manage Top."
    }
  },
  {
    id: "bpm",
    title: "В. BPM-процессы и 'Двойной контроль'",
    subtitle: "Защита бизнеса от ошибок и нецелевых трат",
    icon: ShieldAlert,
    color: "indigo",
    bullets: [
      {
        title: "Цепочки процессов любой сложности",
        desc: "Создание шаблонов согласований отпусков, счетов, контрактов с участием неограниченного числа руководителей."
      },
      {
        title: "Логика двойного контроля",
        desc: "Защита от несанкционированных действий сотрудников. Автоматическое блокирование сомнительных решений."
      },
      {
        title: "Защита от превышения полномочий",
        desc: "Даже имея технический доступ, сотрудник не может сделать ключевое действие (добавить позицию в штат, изменить реквизиты) без визы руководства."
      }
    ],
    mockInterface: {
      header: "Конструктор процессов • Manage Top",
      primaryLabel: "Защищенный BPM-контур",
      items: [
        { name: "Маршрут согласования реестра", status: "Исполнитель - Бухгалтер, Контроль - РОП", active: true },
        { name: "Защита от саботажа", status: "Включена", active: true },
        { name: "Фин-лимит транзакций", status: "Более 50k руб требуют подпись CEO", active: true }
      ],
      aiTip: "Двойной контроль уберег компанию от несанкционированного изменения условий договора с ОАО Поставщик."
    }
  },
  {
    id: "meetings",
    title: "Г. Совещания с результатом",
    subtitle: "Протоколы встреч становятся задачами за секунду",
    icon: CalendarClock,
    color: "indigo",
    bullets: [
      {
        title: "Совещания, а не пустая трата времени",
        desc: "Формирование повестки до встречи. Все участники получают напоминания и приходят подготовленными."
      },
      {
        title: "Автоматическое протоколирование",
        desc: "Система автоматически формирует аккуратные структурированные протоколы встречи."
      },
      {
        title: "Мгновенные поручения",
        desc: "Озвученные на совещании решения прямо во время звонка преобразуются в полноценные задачи с ответственными и датами."
      }
    ],
    mockInterface: {
      header: "Модуль Совещаний • Manage Top",
      primaryLabel: "Аудио/Видео Протокол ИИ",
      items: [
        { name: "План еженедельного созвона", status: "Утвержден всеми", active: true },
        { name: "Протокол за 03.06.2026", status: "Сформирован ИИ", active: true },
        { name: "Новые задачи из встречи", status: "5 штук роздано", active: true }
      ],
      aiTip: "ИИ зафиксировал договоренности: запустить таргет до пятницы (ответственный: Никита)."
    }
  },
  {
    id: "finance",
    title: "Д. Полный управленческий учет",
    subtitle: "DDS, P&L, контроль задолженностей и согласования",
    icon: CreditCard,
    color: "indigo",
    bullets: [
      {
        title: "Жесткое согласование платежей",
        desc: "Ни один рубль не выйдет из кассы компании бесконтрольно. Автоматические лимиты бюджетов по отделам."
      },
      {
        title: "Отчет DDS (Движение денежных средств)",
        desc: "Предотвращение кассовых разрывов за счет планирования платежей в едином календаре."
      },
      {
        title: "Отчет P&L (Прибыли и Убытки)",
        desc: "Вся финансовая аналитика в реальном времени. Четкое понимание чистой прибыли бизнеса, а не просто оборота."
      },
      {
        title: "Мониторинг задолженностей",
        desc: "Контроль дебиторской и кредиторской задолженности в разрезе конкретных договоров и клиентов."
      }
    ],
    mockInterface: {
      header: "Финансы • Manage Top Live",
      primaryLabel: "Управленческая аналитика",
      items: [
        { name: "Чистая прибыль (P&L)", status: "+1,240,000 ₽", active: true },
        { name: "Дебиторский долг", status: "Снижен на 15%", active: true },
        { name: "Прогноз кассового разрыва", status: "0% риска на 30 дней", active: true }
      ],
      aiTip: "Планируемый платеж во вторник согласован по лимиту бюджета 'Маркетинг'."
    }
  },
  {
    id: "crm",
    title: "Е. Защищенный мессенджер и CRM",
    subtitle: "Обсуждение задач на месте и отзывы о контрагентах",
    icon: MessagesSquare,
    color: "indigo",
    bullets: [
      {
        title: "Встроенные умные чаты",
        desc: "Каждая задача и финансовый процесс имеют встроенный чат. Обсуждения не размываются в Telegram или WhatsApp."
      },
      {
        title: "Corporate Feed",
        desc: "Информируйте всю компанию о новостях, приказах и событиях на одной красивой витрине."
      },
      {
        title: "CRM база контрагентов",
        desc: "Хранение всех контактов, переписок, договоров. История взаимодействий доступна за пару кликов."
      },
      {
        title: "Внутренняя репутация партнеров",
        desc: "Система отзывов и оценки надежности подрядчиков и партнеров для безопасности сделок."
      }
    ],
    mockInterface: {
      header: "Мессенджер и CRM • Manage Top",
      primaryLabel: "Корпоративный контур",
      items: [
        { name: "Информационная лента новостей", status: "Общая рассылка", active: true },
        { name: "Рейтинг контрагента ООО Сигма", status: "Репутация: 9.8 / 10", active: true },
        { name: "Чат по сделке №411", status: "Оцифрован", active: true }
      ],
      aiTip: "Все файлы и соглашения хранятся на российских защищенных серверах."
    }
  }
];

export default function Modules({ onOpenConsultation }: ModulesProps) {
  const [activeTab, setActiveTab] = useState("hr");
  const activeModule = MODULES_DATA.find((m) => m.id === activeTab) || MODULES_DATA[0];
  const IconComponent = activeModule.icon;

  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center font-sans">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono tracking-widest text-indigo-600 uppercase font-bold">ФУНКЦИОНАЛЬНЫЕ МОДУЛИ</h2>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            6 блоков, которые закроют хаос и заменят десятки разрозненных сервисов
          </p>
          <p className="mt-4 text-base text-slate-500">
            Оцифруйте операционный контур SMB за 1 день. Продукт официально зарегистрирован на территории РФ.
          </p>
        </div>

        {/* Tab Selection Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Tabs Menu (Left 4 Columns) */}
          <div className="lg:col-span-4 space-y-2">
            {MODULES_DATA.map((item) => {
              const TabIcon = item.icon;
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-50 border-slate-350 shadow-sm"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-600"
                  }`}>
                    <TabIcon className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className={`font-sans font-bold text-sm truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans truncate">{item.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Full Description and Interface Demo (Right 8 Columns) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Text Description */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-805">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">ОПЕРАЦИОННЫЙ БЛОК</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 font-sans leading-tight">{activeModule.title}</h3>
                  <p className="mt-1 text-xs text-indigo-600 font-semibold font-sans">{activeModule.subtitle}</p>

                  <div className="mt-6 space-y-4">
                    {activeModule.bullets.map((b, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 font-sans inline-block">{b.title}</div>
                          <div className="text-[11px] text-slate-500 leading-normal mt-0.5 font-sans">{b.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenConsultation}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-150 hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    Заказать экспресс-презентацию
                  </button>
                </div>

                {/* Simulated UI Interface Preview */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden self-start">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="text-[11px] font-bold text-slate-800">{activeModule.mockInterface.header}</span>
                    <span className="rounded-full bg-indigo-50 text-indigo-800 px-1.5 py-0.5 text-[9px] font-mono leading-none font-bold">ОНЛАЙН</span>
                  </div>

                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider mb-2">
                    {activeModule.mockInterface.primaryLabel}
                  </div>

                  <div className="space-y-1.5">
                    {activeModule.mockInterface.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                        <span className="text-[11px] text-slate-700 font-medium font-sans">{it.name}</span>
                        <span className="text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold">{it.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Smart automated recommendation snippet */}
                  <div className="mt-4 rounded-lg bg-indigo-50/50 p-2.5 border border-indigo-100 text-left">
                    <div className="text-[9px] font-bold text-indigo-805 tracking-wider uppercase font-mono">РЕКОМЕНДАЦИЯ АВТОМАТИЗАЦИИ</div>
                    <p className="text-[11px] text-slate-650 leading-normal mt-1 italic">
                      &ldquo;{activeModule.mockInterface.aiTip}&rdquo;
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
