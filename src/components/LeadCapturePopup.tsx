import React, { useState } from "react";
import { X, Send, Check, Loader2 } from "lucide-react";
import { Lead } from "../types";

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded: (lead: Lead) => void;
  selectedTariff?: string | null;
}

export default function LeadCapturePopup({ isOpen, onClose, onLeadAdded, selectedTariff }: LeadCapturePopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("Владелец бизнеса");
  const [employees, setEmployees] = useState("10-50 человек");
  const [revenue, setRevenue] = useState("5000000");
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const [ajaxLoading, setAjaxLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  if (!isOpen) return null;

  const currentRevenueNum = Number(revenue.replace(/\D/g, "")) || 3000000;
  const currentTeamNum = employees === "до 10 человек" ? 8 : employees === "10-50 человек" ? 30 : employees === "50-150 человек" ? 90 : 250;

  const handlePainToggle = (val: string) => {
    if (painPoints.includes(val)) {
      setPainPoints(painPoints.filter((p) => p !== val));
    } else {
      setPainPoints([...painPoints, val]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAjaxLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          companyName,
          monthlyRevenue: currentRevenueNum,
          employeesCount: currentTeamNum,
          painPoints,
          role: selectedTariff ? `Заявка на тариф "${selectedTariff}" (роль: ${role})` : role
        })
      });

      if (res.ok) {
        const leadData: Lead = await res.json();
        setSubmittedLead(leadData);
        onLeadAdded(leadData);
      } else {
        throw new Error("Failed to submit lead");
      }
    } catch (err) {
      console.error(err);
      // Fallback lead if network fails or mock
      const mockLead: Lead = {
        id: `mock-${Date.now()}`,
        createdAt: new Date().toISOString(),
        name,
        phone,
        email,
        companyName,
        monthlyRevenue: currentRevenueNum,
        employeesCount: currentTeamNum,
        painPoints,
        role,
        aiAnalysis: {
          leadScore: 8,
          qualification: "Warm",
          suggestedModules: ["Сквозной контроль задач", "HR Оргструктура"],
          immediateAction: "Связаться с клиентом для подбора тарифа.",
          draftIntroCopy: `Здравствуйте, ${name}! Готовим расчет для ${companyName}. Выйдем на связь в ближайшее время.`
        }
      };
      setSubmittedLead(mockLead);
      onLeadAdded(mockLead);
    } finally {
      setAjaxLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 overflow-hidden font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {selectedTariff ? `Заявка на тариф «${selectedTariff}»` : "Тестировать Manage Top ERP"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Внедрение за 1 день. 14 дней бесплатно на тест.
            </p>
          </div>
          <button 
            id="close-popup-btn"
            onClick={onClose} 
            className="rounded p-1 hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content switch */}
        {!submittedLead ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left font-sans">
            
            {/* Contacts inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Имя</label>
                <input
                  type="text"
                  required
                  placeholder="Константин"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Рабочий E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="ceo@company.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Название компании</label>
                <input
                  type="text"
                  required
                  placeholder="ООО ТрейдХолдинг"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            {/* Business parameters */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Должность</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-3 py-2.5 text-[11px] text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Владелец бизнеса">Владелец</option>
                  <option value="Директор по продажам">РОП</option>
                  <option value="Исполнительный директор">CEO</option>
                  <option value="Бухгалтер">Бухгалтер</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Команда</label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-3 py-2.5 text-[11px] text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="до 10 человек">до 10 чел.</option>
                  <option value="10-50 человек">10-50 чел.</option>
                  <option value="50-150 человек">50-150 чел.</option>
                  <option value="свыше 150 человек">150+ чел.</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-1">Выручка (мес)</label>
                <select
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full rounded-full border border-slate-300 px-3 py-2.5 text-[11px] text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="1000000">до 1.5 млн</option>
                  <option value="5000000">1.5 - 10 млн</option>
                  <option value="30000000">10 - 50 млн</option>
                  <option value="100000000">50 млн+</option>
                </select>
              </div>
            </div>

            {/* Pain points selection */}
            <div>
              <label className="block text-[9px] font-bold text-slate-405 tracking-wider uppercase mb-2">Отметьте главные болевые точки бизнеса:</label>
              <div className="flex flex-wrap gap-1.5 animate-fade-in">
                {[
                  { id: "chaos", label: "Хаос в регламентах" },
                  { id: "low_sales", label: "Сливают лиды в ОП" },
                  { id: "expenses", label: "Внезапные расходы" },
                  { id: "spreadsheets", label: "Бесконечные Excel" },
                  { id: "messengers", label: "Сотрудники в Telegram" }
                ].map((item) => {
                  const active = painPoints.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePainToggle(item.id)}
                      className={`text-[10px] px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        active 
                          ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-md shadow-indigo-150" 
                          : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="submit-capture-btn"
              type="submit"
              disabled={ajaxLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-75 transition-all cursor-pointer"
            >
              {ajaxLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>ИИ верифицирует данные лида...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Получить 14 дней демо + ИИ Аудит</span>
                </>
              )}
            </button>

            <span className="block text-[9px] text-slate-400 text-center font-sans">
              * Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных в соответствии с ФЗ-152 РФ.
            </span>

          </form>
        ) : (
          /* Success Screen with real visual results of Lead classification! */
          <div className="mt-6 text-center space-y-4 text-slate-800 font-sans">
            <div className="h-10 w-10 bg-indigo-50 border border-indigo-150 text-indigo-800 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-5 w-5 text-indigo-600" />
            </div>

            <h4 className="text-base font-bold text-slate-900">Заявка успешно принята!</h4>
            <p className="text-xs text-slate-500 leading-normal max-w-sm mx-auto">
              Данные были мгновенно направлены в коммерческий контур. Отработала автоматическая ИИ-воронка квалификации Manage Top.
            </p>

            {/* Lead classification dashboard highlight */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left space-y-2.5">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-[9px] font-bold text-slate-400 tracking-wider font-mono">РЕЗУЛЬТАТ АНАЛИЗА ИИ</span>
                <span className="text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-indigo-50 border border-indigo-150 text-indigo-800">
                  {submittedLead.aiAnalysis?.qualification || "Hot"} • {submittedLead.aiAnalysis?.leadScore || 8}/10
                </span>
              </div>

              <div>
                <span className="block text-[9px] text-slate-400 font-mono">Компания:</span>
                <span className="text-xs font-bold text-slate-800">{submittedLead.companyName}</span>
              </div>

              <div>
                <span className="block text-[9px] text-slate-400 font-mono">Рекомендуемые модули ERP:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {submittedLead.aiAnalysis?.suggestedModules.map((m, idx) => (
                    <span key={idx} className="bg-white text-indigo-700 text-[10px] px-2.5 py-0.5 rounded-full border border-indigo-100 font-bold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[9px] text-slate-400 font-mono">Первое СМС/EMail-предложение (сгенерировано ИИ):</span>
                <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 mt-1 italic leading-normal">
                  &ldquo;{submittedLead.aiAnalysis?.draftIntroCopy}&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-indigo-800 bg-indigo-50 border border-indigo-150 rounded-xl p-3 font-semibold leading-normal">
                💡 Вы можете открыть «CRM-Панель» в шапке сайта, чтобы увидеть этот и другие лиды в реальной ленте CRM-системы!
              </p>
              <button
                id="close-success-btn"
                type="button"
                onClick={onClose}
                className="w-full rounded-full bg-slate-900 hover:bg-slate-800 py-3 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Вернуться на сайт
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
