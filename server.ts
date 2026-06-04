import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Setup default in-memory storage for Leads (Pre-populated with mock entries for representation)
interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  monthlyRevenue: number;
  employeesCount: number;
  painPoints: string[];
  role: string;
  aiAnalysis?: {
    leadScore: number;
    qualification: string;
    suggestedModules: string[];
    immediateAction: string;
    draftIntroCopy: string;
  };
}

let leadsDatabase: Lead[] = [
  {
    id: "lead-1",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: "Дмитрий Ковалев",
    phone: "+7 (999) 888-11-22",
    email: "kovalev@sklogistics.ru",
    companyName: "СК Логистик",
    monthlyRevenue: 12000000,
    employeesCount: 45,
    role: "Генеральный директор",
    painPoints: ["chaos", "expenses", "spreadsheets"],
    aiAnalysis: {
      leadScore: 9,
      qualification: "Hot",
      suggestedModules: ["Управление кадрами (HR)", "Полный финансовый учет (DDS, P&L)", "Постановка и сквозной контроль задач"],
      immediateAction: "Связаться в течение 15 минут. Презентовать модуль Сквозного контроля задач и Двойного контроля финансов для исключения кассовых разрывов.",
      draftIntroCopy: "Дмитрий, здравствуйте! Видим ваш запрос на аудит процессов в СК Логистик. Manage Top поможет полностью перевести ваши 45 сотрудников с ручных таблиц в единую оргструктуру всего за 1 день. Как насчет короткого 10-минутного созвона сегодня для демонстрации кейсов экономии логистических компаний в Москве?"
    }
  },
  {
    id: "lead-2",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    name: "Ирина Марченко",
    phone: "+7 (903) 777-44-55",
    email: "marchenko.realty@gmail.com",
    companyName: "Марченко Недвижимость",
    monthlyRevenue: 4500000,
    employeesCount: 15,
    role: "Руководитель отдела продаж",
    painPoints: ["low_sales", "messengers"],
    aiAnalysis: {
      leadScore: 7,
      qualification: "Warm",
      suggestedModules: ["Защищенный мессенджер и CRM/База", "Постановка и контроль задач (авто-дедлайны)"],
      immediateAction: "Предложить тариф 'Первый' или 'Оптимальный'. Фокус на автоматических напоминаниях дедлайнов продажникам, чтобы не терять горячие лиды.",
      draftIntroCopy: "Ирина, добрый день! В Марченко Недвижимость работает 15 крутых менеджеров, но ручной контроль чатов отнимает драгоценное время продаж? С Manage Top ваши сделки и обсуждения будут привязаны к конкретным сделкам во встроенном мессенджере. Система сама разошлет авто-напоминания вашим сотрудникам. Давайте обсудим подключение тарифа Первый за 35 000 ₽/мес?"
    }
  }
];

// Endpoint to Capture Leads with AI-Enrichment
app.post("/api/leads", async (req: Request, res: Response) => {
  try {
    const { name, phone, email, companyName, monthlyRevenue, employeesCount, painPoints, role } = req.body;

    if (!name || !phone || !email || !companyName) {
      return res.status(400).json({ error: "Missing required contact details" });
    }

    const parsedRevenue = Number(monthlyRevenue) || 0;
    const parsedEmployees = Number(employeesCount) || 0;
    const arrayPainPoints = Array.isArray(painPoints) ? painPoints : [];

    // Create prompt for Lead Analysis by Gemini
    const systemPrompt = `You are a professional business development analyst.
Analyze registration metrics for the ERP system "Manage Top" and return JSON matching the schema.
The system is targetted at Russian SMB owners.
Use high-converting B2B language in Russian for actionable items and draft intro text.

Lead details:
- Company: ${companyName}
- Contact Person: ${name} (${role || "Owner"})
- Team size: ${parsedEmployees} people
- Monthly Revenue: ${parsedRevenue} RUB
- Pain Points: ${arrayPainPoints.join(", ")}

Map pain points to:
"chaos" -> HR/Oргструктура,
"expenses" -> P&L/Двойной контроль финансов,
"spreadsheets" -> Автоматизация процессов,
"low_sales" -> CRM и задачи,
"messengers" -> Встроенный мессенджер.`;

    let aiAnalysis = {
      leadScore: 8,
      qualification: "Warm",
      suggestedModules: ["Управление процессами", "Задачи"],
      immediateAction: "Связаться с клиентом для детальной консультации.",
      draftIntroCopy: `Здравствуйте, ${name}! Спасибо за проявленный интерес к Manage Top. Будем рады продемонстрировать возможности ERP.`
    };

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: systemPrompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                leadScore: { type: Type.INTEGER, description: "Score from 1 to 10 based on conversion potential" },
                qualification: { type: Type.STRING, description: "Exactly 'Hot', 'Warm', or 'Cold'" },
                suggestedModules: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific Manage Top modules in Russian (2-3 items)" },
                immediateAction: { type: Type.STRING, description: "Immediate physical task for sales person in Russian (1 sentence)" },
                draftIntroCopy: { type: Type.STRING, description: "High-impact, custom, polite outreach text proposing a call, specifically mentioning their company and parameters" }
              },
              required: ["leadScore", "qualification", "suggestedModules", "immediateAction", "draftIntroCopy"]
            }
          }
        });

        if (response.text) {
          aiAnalysis = JSON.parse(response.text.trim());
        }
      } catch (err) {
        console.error("Gemini Lead Analysis Exception:", err);
      }
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      companyName,
      monthlyRevenue: parsedRevenue,
      employeesCount: parsedEmployees,
      painPoints: arrayPainPoints,
      role: role || "Руководитель",
      aiAnalysis
    };

    leadsDatabase.unshift(newLead);
    res.status(201).json(newLead);
  } catch (error: any) {
    console.error("Error in lead registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to Get Lead Funnel Dashboard Data
app.get("/api/leads", (req: Request, res: Response) => {
  res.json(leadsDatabase);
});

// Endpoint for AI ROI Calculator
app.post("/api/roi-evaluate", async (req: Request, res: Response) => {
  try {
    const { monthlyRevenue, managersCount, advertisingSpend, manualTasksHours, averageOrder } = req.body;

    const rev = Number(monthlyRevenue) || 0;
    const managers = Number(managersCount) || 1;
    const adSpend = Number(advertisingSpend) || 0;
    const hours = Number(manualTasksHours) || 0;
    const aov = Number(averageOrder) || 1000;

    const inputDataStr = `
- Ежемесячная выручка: ${rev} руб.
- Количество менеджеров продаж / сотрудников: ${managers} чел.
- Текущие расходы на рекламу/маркетинг: ${adSpend} руб./мес.
- Рутинные задачи у команды: ${hours} ч. в неделю на сотрудника
- Средний чек сделки: ${aov} руб.
    `;

    // Prompt for ROI AI Analysis
    const roiPrompt = `You are an elite B2B ERP consultant.
Based on the client's metrics, model the exact financial and process optimization gains using "Manage Top" ERP system for SMB over the first 3 months.
Be mathematically coherent. Use realistic economic benchmarks:
- Autocutting task delays and double checking reduces HR/administrative wastes by 15-25%.
- Direct double control of budgets cuts financial leakage/unauthorized costs by 5-10% of overall ad/misc budgets.
- Automated meeting protocols & task notifications increase sales conversions by 10-25%.
- Replaces standard tools worth thousands.

Input company details:
${inputDataStr}

Calculate savings over 3 months & detailed rollout plans. Output JSON matching the requested schema. Everything MUST be in Russian language.`;

    // Default Fallback JSON if Gemini fails or Key is absent
    const fallbackRoi = {
      monthlySavings: Math.round(rev * 0.08 + adSpend * 0.15 + (hours * 1200 * managers)),
      revenueIncreaseThreeMonths: Math.round(rev * 0.18 * 3),
      hoursSavedPerWeek: Math.round(hours * 0.65 * managers),
      conversionBoosterPercent: 15,
      savingsBreakdown: {
        hrRoutine: Math.round(hours * 900 * managers * 4),
        taskControl: Math.round(rev * 0.04),
        financeLeaks: Math.round(adSpend * 0.12)
      },
      topThreeLevers: [
        "«Двойной контроль» и цепочки согласования ликвидируют бесконтрольные траты и удерживают до 12% рекламного бюджета.",
        "Автоматическое протоколирование совещаний и перевод согласованных решений в задачи с дедлайнами повышают скорость закрытия задач на 40%.",
        "Интегрированный табель времени и сквозной HR-модуль исключают переработки и необоснованные выплаты."
      ],
      rolloutRoadmap: [
        {
          month: "Месяц 1",
          focus: "Устранение организационного хаоса и аудит структуры",
          actions: [
            "Оцифровка оргструктуры, настройка ролей и иерархии прав доступа.",
            "Перенос всех коммуникаций во встроенный безопасный мессенджер.",
            "Внедрение автоматического учета времени и табелей в HR."
          ],
          expectedOutcome: "Полный порядок в команде, прозрачность ролей, избавление от сторонних чатов."
        },
        {
          month: "Месяц 2",
          focus: "Автоматизация сквозных процессов и внедрение 'Двойного контроля'",
          actions: [
            "Настройка шаблонов автоматических согласований и оплат.",
            "Запуск контроля дебиторской задолженности и составление DDS.",
            "Интеграция KPI за своевременное завершение регламентных задач."
          ],
          expectedOutcome: "Ликвидация кассовых разрывов, сокращение задержек в процессах до 50%."
        },
        {
          month: "Месяц 3",
          focus: "Вывод на пиковую операционную эффективность",
          actions: [
            "Обучение лидов авто-протоколированию совещаний.",
            "Мониторинг управленческого баланса и чистой прибыли через P&L отчеты.",
            "Фокусное масштабирование конверсии отдела продаж на базе прозрачных данных."
          ],
          expectedOutcome: "Рост коммерческой эффективности, стабильное сокращение издержек на 15-20%."
        }
      ],
      executiveSummary: `Внедрение Manage Top ERP позволит компании оптимизировать внутренние процессы, сэкономив значительное количество времени. Благодаря жесткому 'Двойному контролю' бюджетов и автоматизации планирования вы получите дополнительную управляемость и увеличите скорость закрытия сделок уже в первые 90 дней.`
    };

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: roiPrompt,
          config: {
            temperature: 0.1,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                monthlySavings: { type: Type.NUMBER, description: "Calculated monthly savings in rubles" },
                revenueIncreaseThreeMonths: { type: Type.NUMBER, description: "Calculated revenue increase over 3 months in rubles" },
                hoursSavedPerWeek: { type: Type.NUMBER, description: "Calculated team hours saved per week" },
                conversionBoosterPercent: { type: Type.NUMBER, description: "Potential increase in conversion / performance percent" },
                savingsBreakdown: {
                  type: Type.OBJECT,
                  properties: {
                    hrRoutine: { type: Type.NUMBER, description: "Savings in rubles on routine/time optimizations" },
                    taskControl: { type: Type.NUMBER, description: "Savings from task execution and deadline protection in rubles" },
                    financeLeaks: { type: Type.NUMBER, description: "Savings from finance leaks avoidance in rubles" }
                  },
                  required: ["hrRoutine", "taskControl", "financeLeaks"]
                },
                topThreeLevers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 high-converting bullet points mapping to Manage Top's unique value props" },
                rolloutRoadmap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      month: { type: Type.STRING, description: "e.g., 'Месяц 1'" },
                      focus: { type: Type.STRING, description: "Focus area theme" },
                      actions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Action items done using ERP" },
                      expectedOutcome: { type: Type.STRING, description: "Expected result of this month" }
                    },
                    required: ["month", "focus", "actions", "expectedOutcome"]
                  }
                },
                executiveSummary: { type: Type.STRING, description: "Short business evaluation narrative in Russian" }
              },
              required: ["monthlySavings", "revenueIncreaseThreeMonths", "hoursSavedPerWeek", "conversionBoosterPercent", "savingsBreakdown", "topThreeLevers", "rolloutRoadmap", "executiveSummary"]
            }
          }
        });

        if (response.text) {
          const result = JSON.parse(response.text.trim());
          return res.json(result);
        }
      } catch (err) {
        console.error("Gemini ROI Analysis Exception:", err);
      }
    }

    res.json(fallbackRoi);
  } catch (error: any) {
    console.error("Error in ROI calculation:", error);
    res.status(500).json({ error: "Failed to evaluate metrics" });
  }
});

// Serve frontend assets
if (process.env.NODE_ENV !== "production") {
  const viteObj = createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  viteObj.then((vite) => {
    app.use(vite.middlewares);
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Manage Top Server] running on http://localhost:${PORT}`);
});
