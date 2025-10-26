const metrics = [
  {
    label: "Monthly Revenue",
    value: "$128.4K",
    delta: "+12.4%",
    tone: "positive",
    sublabel: "vs. last period",
  },
  {
    label: "Active Customers",
    value: "5,209",
    delta: "+4.8%",
    tone: "positive",
    sublabel: "90 day rolling",
  },
  {
    label: "Support Tickets",
    value: "42",
    delta: "-18.6%",
    tone: "positive",
    sublabel: "resolved this week",
  },
  {
    label: "Avg. Response Time",
    value: "1h 12m",
    delta: "-23m",
    tone: "positive",
    sublabel: "SLA 2 hours",
  },
];

const trendPoints = [32, 36, 44, 38, 41, 47, 52, 49, 55, 61, 68, 74];

const topClients = [
  { company: "Acme Robotics", spend: "$24,900", growth: "+18%" },
  { company: "Lumen Analytics", spend: "$19,430", growth: "+11%" },
  { company: "Northwind Labs", spend: "$17,280", growth: "+9%" },
  { company: "Sierra Ventures", spend: "$14,120", growth: "+7%" },
];

const tasks = [
  {
    title: "Finalize Q3 forecast model",
    owner: "Finance",
    due: "Today",
    status: "In Review",
  },
  {
    title: "Roll out customer health scoring",
    owner: "Success",
    due: "Tomorrow",
    status: "Blocked",
  },
  {
    title: "Refresh marketing automation journeys",
    owner: "Growth",
    due: "Friday",
    status: "In Progress",
  },
  {
    title: "Security posture audit",
    owner: "Engineering",
    due: "Monday",
    status: "Scheduled",
  },
];

const timeline = [
  { time: "09:10", title: "Lead-to-order sync completed", type: "success" },
  {
    time: "10:25",
    title: "SLA breach risk detected (West Coast)",
    type: "warning",
  },
  { time: "11:40", title: "42 new product trials activated", type: "info" },
  { time: "12:05", title: "Billing reconciliation cleared", type: "success" },
];

function TrendSparkline({ points }: { points: number[] }) {
  const width = 320;
  const height = 140;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / Math.max(points.length - 1, 1);
  const scaled = points.map((point, index) => {
    const x = index * step;
    const y = height - ((point - min) / range) * height;
    return { x, y };
  });

  const path = scaled
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  const area = [
    `M 0 ${height}`,
    path.replace(/^M/, "L"),
    `L ${width} ${height}`,
    "Z",
  ].join(" ");

  return (
    <svg
      role="img"
      aria-label="Revenue trend line chart"
      viewBox={`0 0 ${width} ${height}`}
      className="w-full text-sky-500"
    >
      <defs>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={area}
        fill="url(#trend-fill)"
        className="transition-all duration-500"
      />
      <path
        d={path}
        stroke="currentColor"
        strokeWidth={3}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {scaled.map(({ x, y }, index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={4}
          className="fill-white stroke-current stroke-2"
        />
      ))}
    </svg>
  );
}

const statusTone: Record<string, string> = {
  "In Review": "bg-blue-100 text-blue-700",
  Blocked: "bg-rose-100 text-rose-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Scheduled: "bg-emerald-100 text-emerald-700",
};

const timelineTone: Record<string, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-sky-500",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-medium text-slate-500">Operational hub</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Growth & Retention Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 shadow-sm">
              Last synced · 3 minutes ago
            </div>
            <button className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-700">
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pt-8 md:grid-cols-12">
        <section className="md:col-span-12">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <header className="flex items-start justify-between text-sm font-medium text-slate-500">
                  <span>{metric.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      metric.tone === "positive"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {metric.delta}
                  </span>
                </header>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{metric.sublabel}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="md:col-span-7">
          <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Net revenue progression
                </p>
                <h2 className="text-xl font-semibold text-slate-900">
                  ARR trend · last 12 months
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  ARR
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
                  +27.3% YoY
                </span>
              </div>
            </header>
            <div className="mt-6 flex flex-1 flex-col justify-between gap-6">
              <TrendSparkline points={trendPoints} />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-slate-500">Peak revenue</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    $312K
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-slate-500">Average retention</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    91.2%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-slate-500">Expansion revenue</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    +$68.7K
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="md:col-span-5">
          <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Strategic accounts
                </p>
                <h2 className="text-xl font-semibold text-slate-900">
                  Top clients by ARR
                </h2>
              </div>
              <button className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-300">
                View all
              </button>
            </header>
            <ul className="mt-6 flex flex-1 flex-col gap-4">
              {topClients.map((client) => (
                <li
                  key={client.company}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {client.company}
                    </p>
                    <p className="text-sm text-slate-500">Enterprise tier</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {client.spend}
                    </p>
                    <p className="text-xs font-medium text-emerald-600">
                      {client.growth}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="md:col-span-7">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Delivery</p>
                <h2 className="text-xl font-semibold text-slate-900">
                  Team priorities
                </h2>
              </div>
              <button className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-300">
                Prioritize
              </button>
            </header>
            <div className="mt-6 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-slate-300"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {task.owner} · Due {task.due}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="md:col-span-5">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <header>
              <p className="text-sm font-medium text-slate-500">
                System highlights
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Sync timeline
              </h2>
            </header>
            <ol className="mt-6 space-y-4">
              {timeline.map((item) => (
                <li key={item.time} className="flex gap-4">
                  <div className="flex h-full flex-col items-center">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${
                        timelineTone[item.type]
                      }`}
                    />
                    <div className="flex-1 bg-slate-200" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      {item.time}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </section>
      </main>
    </div>
  );
}
