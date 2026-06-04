import React, { useState } from "react";
import { Check, ShieldCheck, Briefcase, Star, Building } from "lucide-react";
import { Tariff } from "../types";

interface TariffsProps {
  onSelectTariff: (tariffName: string) => void;
}

const TARIFFS_DATA: Tariff[] = [
  {
    name: "Первый",
    price: 35000,
    pricePeriod: "/мес",
    users: "До 50 пользователей",
    badge: "Старт для SMB",
    color: "slate",
    features: [
      "5 юридических организаций",
      "2 филиала / представительства",
      "10 Гб защищенного SSD облака",
      "Кадровый учет и Оргструктура",
      "Постановка и контроль задач",
      "Базовый чат и новости команды",
      "Техническая поддержка 24/7"
    ],
    outsourcing: [
      "ERP Система «под ключ»"
    ]
  },
  {
    name: "Оптимальный",
    price: 139000,
    pricePeriod: "/мес",
    users: "До 100 пользователей",
    badge: "Популярный выбор",
    color: "emerald",
    features: [
      "10 юридических организаций",
      "5 филиалов / торговых точек",
      "24 Гб защищенного SSD облака",
      "Полный контур BPM процессов",
      "Система «Двойной Контроль»",
      "ИИ-совещания и автопротоколы",
      "Интегрированные финансы (DDS)"
    ],
    outsourcing: [
      "Услуги финдиректора (8 ч/мес)",
      "Ассистент 1С разработчика (8 ч/мес)",
      "Консультации юриста (5 завок/мес)"
    ]
  },
  {
    name: "Премиум",
    price: 541000,
    pricePeriod: "/мес",
    users: "До 300 пользователей",
    badge: "Бизнес под ключ",
    color: "slate-dark",
    features: [
      "20 юридических организаций",
      "10 филиалов / холдингов",
      "50 Гб защищенного SSD облака",
      "Абсолютный доступ ко всем модулям",
      "Разработка регламентов под ключ",
      "Приоритетный выделенный SLA-сервер"
    ],
    outsourcing: [
      "ТФ Финдиректор (25 ч/мес)",
      "Правовой юрист (15 заявок/мес)",
      "Бухгалтерия на аутсорсе (20 ч/мес)",
      "Кадровый специалист (15 заявок/мес)",
      "Менеджер госзакупок/торгов (20 ч)",
      "Специалист 1С (8 ч/мес)"
    ]
  }
];

export default function Tariffs({ onSelectTariff }: TariffsProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (basePrice: number) => {
    if (isAnnual) {
      // 20% discount for annual subscription
      return Math.round((basePrice * 0.8));
    }
    return basePrice;
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-sm font-mono tracking-widest text-indigo-650 uppercase font-bold">ПОДПИСКА И СОПРОВОЖДЕНИЕ</h2>
          <p className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Тарифы, окупающие себя с первого месяца
          </p>
          <p className="mt-4 text-base text-slate-500">
            Уникальное предложение на рынке СНГ: мы объединили передовую ERP-систему и профессиональный аутсорсинг бизнес-услуг. Заменяет ФОТ целого отдела!
          </p>

          {/* Billing selector */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "text-slate-900 font-bold" : "text-slate-400"}`}>Помесячно</span>
            <button
              id="billing-toggle"
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-indigo-500"
              aria-checked={isAnnual}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5 bg-indigo-600" : "translate-x-0"
                }`}
              ></span>
            </button>
            <span className={`text-sm flex items-center gap-1.5 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-155 ${isAnnual ? "text-slate-900 font-bold" : "text-slate-400"}`}>
              <span>Годовой контракт</span>
              <span className="text-[10px] text-indigo-700 font-extrabold">-20%</span>
            </span>
          </div>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {TARIFFS_DATA.map((t, idx) => {
            const isEmerald = t.color === "emerald";
            const currentPrice = calculatePrice(t.price);

            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all ${
                  isEmerald
                    ? "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10 shadow-lg shadow-indigo-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                {/* Badge if available */}
                {t.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                    isEmerald ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"
                  }`}>
                    {t.badge}
                  </span>
                )}

                {/* Header */}
                <div className="border-b border-slate-100 pb-5">
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">Тариф «{t.name}»</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="font-mono text-3xl font-extrabold tracking-tight text-slate-900">
                      {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(currentPrice)} ₽
                    </span>
                    <span className="text-sm font-semibold text-slate-400 ml-1.5">{t.pricePeriod}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 font-sans">{t.users}</p>
                </div>

                {/* Features list */}
                <div className="mt-6 flex-1 space-y-4">
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">ФУНКЦИОНАЛ ERP</div>
                  <ul className="space-y-2.5">
                    {t.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outsourcing special section */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="text-[10px] font-bold text-indigo-800 tracking-wider uppercase font-mono flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-indigo-500 text-indigo-500 animate-pulse" />
                      <span>АУТСОРСИНГ УСЛУГ В СТОИМОСТИ</span>
                    </div>
                    <ul className="space-y-2">
                      {t.outsourcing.map((out) => (
                        <li key={out} className="flex items-start gap-2 text-xs font-semibold text-indigo-900 bg-indigo-50/40 p-2 rounded-lg font-sans border border-indigo-100">
                          <Briefcase className="h-3.5 w-3.5 text-indigo-700 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  id={`tariff-btn-${t.name}`}
                  type="button"
                  onClick={() => onSelectTariff(t.name)}
                  className={`mt-8 w-full rounded-full py-3 text-xs font-bold text-center transition-all cursor-pointer ${
                    isEmerald
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 font-extrabold"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Выбрать тариф «{t.name}»
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom offer tariff */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 items-start text-left">
            <div className="bg-slate-900 text-white p-3 rounded-xl shrink-0">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">Тариф «Индивидуальный»</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Для холдинговых структур, распределенных филиальных сетей и корпораций с особыми требованиями к безопасности контура, SLA-интеграции и кастомным модулям.
              </p>
            </div>
          </div>
          <button
            id="tariff-btn-individual"
            onClick={() => onSelectTariff("Индивидуальный")}
            className="shrink-0 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold px-6 py-3 rounded-full shadow-sm transition-all cursor-pointer"
          >
            Связаться с архитектором
          </button>
        </div>

      </div>
    </section>
  );
}
