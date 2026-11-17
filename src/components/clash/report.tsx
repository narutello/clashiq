import { useEffect, useState } from "react";
import type { Comparison, Winner } from "@/lib/coc/compare";
import type { MessageKey } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";
import type { Account, Unit } from "@/lib/coc/types";
import type { CategoryId } from "@/lib/coc/score";

const UNIT_ORDER = [
  "hero",
  "troop",
  "spell",
  "siege",
  "pet",
  "equipment",
  "super",
  "defense",
  "wall",
  "trap",
  "guardian",
  "resource",
  "army",
] as const;

function formatNum(value: number | null, digits = 0): string {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
}

function formatWhen(value: string | null, locale: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function WinnerMark({ winner, side }: { winner: Winner; side: "a" | "b" }) {
  const { t } = useI18n();
  if (winner == null) return <span className="text-xs text-muted">{t("noWinner")}</span>;
  if (winner === "even") return <span className="text-xs text-muted">{t("even")}</span>;
  if (winner !== side) return null;
  return <span className="text-xs font-medium text-accent">{t("ahead")}</span>;
}

function noteText(code: string | null, t: (key: MessageKey) => string): string | null {
  if (!code) return null;
  const key = `note_${code}` as MessageKey;
  const value = t(key);
  return value || null;
}

function sourceLabel(account: Account, t: (key: MessageKey) => string): string {
  if (account.source === "sample") return t("sourceSample");
  if (account.exportAt || account.present.buildings || account.present.walls) {
    return account.source === "api" ? `${t("sourceApi")} + ${t("sourceExport")}` : t("sourceExport");
  }
  return account.source === "export" ? t("sourceExport") : t("sourceApi");
}

function Profile({ account, side, label }: { account: Account; side: "a" | "b"; label: string }) {
  const { t, locale } = useI18n();
  const roleKey = account.role ? (`role_${account.role}` as MessageKey) : null;
  const prefKey = account.warPreference ? (`pref_${account.warPreference}` as MessageKey) : null;
  const fetched = formatWhen(account.fetchedAt, locale === "fa" ? "fa" : "en");
  const exported = formatWhen(account.exportAt, locale === "fa" ? "fa" : "en");
  return (
    <article className={`min-w-0 bg-surface p-4 sm:p-5 ${side === "a" ? "border-t-2 border-accent" : "border-t-2 border-fg"}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
        <span className={`px-2 py-1 text-xs font-medium ${side === "a" ? "bg-accent text-accent-fg" : "border border-fg"}`}>
          {side.toUpperCase()}
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl leading-none">{account.name ?? account.tag}</h3>
      <p className="mt-2 text-sm text-muted" dir="ltr">
        {account.tag}
      </p>
      <p className="mt-5 font-display text-6xl leading-none tabular-nums">{account.townHallLevel ?? "—"}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted">{t("stat_townHall")}</p>
      <dl className="mt-5 space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">{t("clan")}</dt>
          <dd className="text-end">{account.clan ? account.clan.name : t("noClan")}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">{t("league")}</dt>
          <dd className="text-end">{account.league ?? t("missing")}</dd>
        </div>
      </dl>
      {roleKey || prefKey ? (
        <p className="mt-3 text-sm text-muted">
          {[roleKey ? t(roleKey) : null, prefKey ? t(prefKey) : null].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <p className="mt-4 text-xs uppercase tracking-widest text-muted">{sourceLabel(account, t)}</p>
      {fetched ? (
        <p className="mt-1 text-xs text-muted">
          {t("fetched")}: <span dir="ltr">{fetched}</span>
        </p>
      ) : null}
      {exported ? (
        <p className="mt-1 text-xs text-muted">
          {t("exported")}: <span dir="ltr">{exported}</span>
        </p>
      ) : null}
      <ul className="mt-3 space-y-1 text-sm text-muted">
        {account.notes.map((note) => {
          const text = noteText(note, t);
          return text ? <li key={note}>{text}</li> : null;
        })}
      </ul>
    </article>
  );
}

function ScoreBlock({ analysis, label }: { analysis: Comparison["analysisA"]; label: string }) {
  const { t } = useI18n();
  const value = analysis.overall.value;
  return (
    <div className="bg-surface p-4 sm:p-5">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-3 font-display text-5xl leading-none tabular-nums">
        {value == null ? t("insufficient") : formatNum(value, 1)}
      </p>
      <p className="mt-2 text-sm text-muted">{t("overall")}</p>
      <p className="mt-4 text-sm">
        <span className="text-muted">{t("confidence")}</span>{" "}
        {t(`conf_${analysis.overall.confidence}` as MessageKey)}
      </p>
      <p className="text-sm">
        <span className="text-muted">{t("coverage")}</span>{" "}
        {formatNum(analysis.overall.coverage * 100, 0)}%
      </p>
    </div>
  );
}

function CategoryRadar({ rows }: { rows: { name: string; a: number; b: number }[] }) {
  const { t } = useI18n();
  const [lib, setLib] = useState<typeof import("recharts") | null>(null);
  useEffect(() => {
    void import("recharts").then(setLib);
  }, []);
  if (!lib || rows.length < 3) return null;
  const { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } = lib;
  return (
    <div className="bg-surface p-4">
      <h3 className="text-xs uppercase tracking-widest text-muted">{t("radarTitle")}</h3>
      <div className="mt-2 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={rows} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
            <Radar name={t("playerA")} dataKey="a" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.35} />
            <Radar name={t("playerB")} dataKey="b" stroke="var(--color-fg)" fill="var(--color-fg)" fillOpacity={0.12} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function levelText(unit: Unit | null, t: (key: MessageKey) => string): string {
  if (!unit) return t("missing");
  if (unit.category === "super") return t("active");
  const level = Number.isInteger(unit.level) ? String(unit.level) : unit.level.toFixed(1);
  const count = unit.count > 1 ? ` ×${unit.count}` : "";
  return `${level}${count}`;
}

export function Report({ comparison }: { comparison: Comparison }) {
  const { t } = useI18n();
  const { a, b, analysisA, analysisB } = comparison;
  const higher =
    (a.townHallLevel ?? -1) === (b.townHallLevel ?? -1)
      ? null
      : (a.townHallLevel ?? -1) > (b.townHallLevel ?? -1)
        ? "a"
        : "b";
  const upset = higher && comparison.overallWinner && comparison.overallWinner !== higher && comparison.overallWinner !== "even";

  const radar = comparison.categories
    .filter((row) => row.a.basis === "town-hall" && row.a.value != null && row.b.value != null && row.a.confidence !== "insufficient" && row.b.confidence !== "insufficient")
    .map((row) => ({ name: t(`cat_${row.id}` as MessageKey), a: row.a.value as number, b: row.b.value as number }));

  const weightTotal = analysisA.overall.parts.reduce((sum, part) => sum + part.weight, 0);

  return (
    <section id="report" className="mt-10 scroll-mt-6" aria-live="polite">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-display text-3xl leading-none">{t("reportTitle")}</h2>
      </div>
      {a.source === "sample" ? (
        <p className="mb-4 border border-accent bg-surface px-4 py-3 text-sm">{t("sampleBanner")}</p>
      ) : null}
      <p className="mb-4 border-s-2 border-accent bg-surface px-4 py-3 text-sm">
        {comparison.overallWinner === "a"
          ? t("verdictA")
          : comparison.overallWinner === "b"
            ? t("verdictB")
            : comparison.overallWinner === "even"
              ? t("verdictEven")
              : t("verdictNone")}
      </p>
      {upset ? <p className="mb-4 text-sm text-muted">{t("thesis")}</p> : null}

      <div className="grid gap-px bg-border md:grid-cols-2">
        <Profile account={a} side="a" label={t("playerA")} />
        <Profile account={b} side="b" label={t("playerB")} />
      </div>

      <h3 className="mt-10 font-display text-2xl">{t("profile")}</h3>
      <div className="mt-3 border-y border-border">
        {comparison.stats.map((row) => (
          <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-baseline gap-3 border-b border-border py-3 last:border-b-0">
            <p className="text-end text-lg tabular-nums" dir="ltr">
              {row.a == null ? <span className="text-sm text-muted">{t("missing")}</span> : formatNum(row.a)}
              <span className="ms-2 inline-block align-middle">
                <WinnerMark winner={row.winner} side="a" />
              </span>
            </p>
            <p className="text-center text-xs uppercase tracking-widest text-muted">{t(`stat_${row.id}` as MessageKey)}</p>
            <p className="text-start text-lg tabular-nums" dir="ltr">
              <span className="me-2 inline-block align-middle">
                <WinnerMark winner={row.winner} side="b" />
              </span>
              {row.b == null ? <span className="text-sm text-muted">{t("missing")}</span> : formatNum(row.b)}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 font-display text-2xl">{t("strength")}</h3>
      <div className="mt-3 grid gap-px bg-border md:grid-cols-2">
        <ScoreBlock analysis={analysisA} label={t("playerA")} />
        <ScoreBlock analysis={analysisB} label={t("playerB")} />
      </div>
      <div className="mt-px grid gap-px bg-border md:grid-cols-2">
        <Callout title={t("strengths")} ids={analysisA.strengths} empty={t("noneNoted")} />
        <Callout title={t("weaknesses")} ids={analysisA.weaknesses} empty={t("noneNoted")} />
      </div>
      <div className="mt-px grid gap-px bg-border md:grid-cols-2">
        <Callout title={`${t("playerB")} · ${t("strengths")}`} ids={analysisB.strengths} empty={t("noneNoted")} />
        <Callout title={`${t("playerB")} · ${t("weaknesses")}`} ids={analysisB.weaknesses} empty={t("noneNoted")} />
      </div>

      <h3 className="mt-10 font-display text-2xl">{t("readings")}</h3>
      <p className="mt-2 max-w-3xl text-sm text-muted">{t("compositeNote")}</p>
      <div className="mt-3 border-y border-border">
        {comparison.composites.map((row) => (
          <div key={row.id} className="grid gap-3 border-b border-border px-1 py-4 last:border-b-0 md:grid-cols-[11rem_1fr_auto]">
            <div>
              <p className="text-sm font-medium">{t(row.id)}</p>
              <p className="text-xs text-muted">
                {row.winner === "a"
                  ? `${t("playerA")} ${t("ahead")}`
                  : row.winner === "b"
                    ? `${t("playerB")} ${t("ahead")}`
                    : row.winner === "even"
                      ? t("even")
                      : t("noWinner")}
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-end text-sm tabular-nums" dir="ltr">
                  {row.a.value == null ? "—" : formatNum(row.a.value, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <Meter value={row.a.value} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-end text-sm tabular-nums" dir="ltr">
                  {row.b.value == null ? "—" : formatNum(row.b.value, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <Meter value={row.b.value} muted />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted md:max-w-40 md:text-end">
              {t(`conf_${row.a.confidence}` as MessageKey)} / {t(`conf_${row.b.confidence}` as MessageKey)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-px bg-surface">
        {comparison.categories.map((row) => (
          <div key={row.id} className="grid gap-3 border-b border-border px-4 py-4 md:grid-cols-[10rem_1fr_auto]">
            <div>
              <p className="text-sm font-medium">{t(`cat_${row.id}` as MessageKey)}</p>
              <p className="text-xs text-muted">
                {row.winner === "a"
                  ? `${t("playerA")} ${t("ahead")}`
                  : row.winner === "b"
                    ? `${t("playerB")} ${t("ahead")}`
                    : row.winner === "even"
                      ? t("even")
                      : t("noWinner")}
              </p>
            </div>
            <div className="grid gap-2">
              <Meter value={row.a.value} label="A" />
              <Meter value={row.b.value} label="B" muted />
            </div>
            <p className="text-xs text-muted md:max-w-56 md:text-end">
              {noteText(row.a.note, t) ?? noteText(row.b.note, t) ?? t(`conf_${row.a.confidence}` as MessageKey)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-px">
        <CategoryRadar rows={radar} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <WeightList title={`${t("playerA")} · ${t("included")}`} parts={analysisA.overall.parts} total={weightTotal} omitted={analysisA.overall.omitted} />
        <WeightList
          title={`${t("playerB")} · ${t("included")}`}
          parts={analysisB.overall.parts}
          total={analysisB.overall.parts.reduce((sum, part) => sum + part.weight, 0)}
          omitted={analysisB.overall.omitted}
        />
      </div>

      <div className="mt-8">
        <h3 className="font-display text-2xl">{t("gameMax")}</h3>
        <div className="mt-3 border-y border-border">
          {analysisA.gameMax.map((row, index) => {
            const other = analysisB.gameMax[index];
            return (
              <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-b-0">
                <p className="text-end tabular-nums" dir="ltr">
                  {row.value == null ? t("missing") : `${formatNum(row.value, 1)}%`}
                </p>
                <p className="text-center text-xs uppercase tracking-widest text-muted">{t(`cat_${row.id}` as MessageKey)}</p>
                <p className="text-start tabular-nums" dir="ltr">
                  {other?.value == null ? t("missing") : `${formatNum(other.value, 1)}%`}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-muted">{t("note_equipment-basis")}</p>
      </div>

      <div className="mt-10 space-y-3">
        {UNIT_ORDER.map((category) => {
          const rows = comparison.units.filter((unit) => unit.category === category);
          if (rows.length === 0) return null;
          const open = category === "hero" || category === "troop" || category === "defense";
          return (
            <details key={category} open={open} className="border border-border bg-surface">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                {t(`cat_${category}` as MessageKey)} · {rows.length}
              </summary>
              <div className="max-h-96 overflow-auto border-t border-border">
                {rows.map((row) => (
                  <div key={`${row.category}:${row.key}`} className="grid grid-cols-[minmax(0,4.5rem)_minmax(0,1fr)_minmax(0,4.5rem)] items-center gap-x-3 gap-y-1 border-b border-border px-4 py-2 text-sm last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,8rem)_minmax(0,1.2fr)_minmax(0,8rem)_minmax(0,1fr)]">
                    <p className="text-end tabular-nums" dir="ltr">
                      {levelText(row.a, t)}
                    </p>
                    <p className="truncate text-center text-muted sm:col-start-2">{row.name}</p>
                    <div className="col-span-3 sm:col-span-1 sm:col-start-3">
                      <Meter value={row.aPct} thin />
                      <div className="mt-1">
                        <Meter value={row.bPct} thin muted />
                      </div>
                    </div>
                    <p className="col-start-3 text-end tabular-nums sm:col-start-5" dir="ltr">
                      {levelText(row.b, t)}
                    </p>
                    <p className="col-span-3 text-center text-xs text-muted sm:col-span-1 sm:col-start-4">
                      {row.winner === "a" ? `A ${t("ahead")}` : row.winner === "b" ? `B ${t("ahead")}` : row.winner === "even" ? t("even") : row.a && row.b ? t("noWinner") : ""}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {comparison.achievements.length > 0 ? (
        <div className="mt-10">
          <h3 className="font-display text-2xl">{t("achievements")}</h3>
          <div className="mt-3 border-y border-border">
            {comparison.achievements.map((row) => (
              <div key={row.name} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-b-0">
                <p className="text-end tabular-nums">{row.a ? `${row.a.stars ?? "—"}★` : t("missing")}</p>
                <p className="text-center text-muted">{row.name}</p>
                <p className="text-start tabular-nums">{row.b ? `${row.b.stars ?? "—"}★` : t("missing")}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {a.unrecognized.length + b.unrecognized.length > 0 ? (
        <details className="mt-6 border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-sm">
            {t("unrecognized")} · {a.unrecognized.length + b.unrecognized.length}
          </summary>
          <p className="px-4 pb-4 text-sm text-muted">
            {a.unrecognized.length} / {b.unrecognized.length}
          </p>
        </details>
      ) : null}

      <div id="method" className="mt-12 border-t border-border pt-6">
        <h3 className="font-display text-2xl">{t("methodTitle")}</h3>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t("methodBody")}</p>
        <p className="mt-2 max-w-3xl text-sm text-muted">{t("capNote")}</p>
      </div>
    </section>
  );
}

function Callout({ title, ids, empty }: { title: string; ids: CategoryId[]; empty: string }) {
  const { t } = useI18n();
  return (
    <div className="bg-surface p-4">
      <p className="text-xs uppercase tracking-widest text-muted">{title}</p>
      {ids.length === 0 ? (
        <p className="mt-2 text-sm">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {ids.map((id) => (
            <li key={id}>{t(`cat_${id}` as MessageKey)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Meter({ value, muted = false, thin = false }: { value: number | null; label?: string; muted?: boolean; thin?: boolean }) {
  const width = value == null ? 0 : Math.max(0, Math.min(100, value));
  return (
    <div className={`${thin ? "h-1" : "h-2"} bg-surface-2`} aria-hidden={value == null}>
      <div className={`h-full ${muted ? "bg-fg" : "bg-accent"}`} style={{ width: `${width}%` }} />
    </div>
  );
}

function WeightList({
  title,
  parts,
  total,
  omitted,
}: {
  title: string;
  parts: Comparison["analysisA"]["overall"]["parts"];
  total: number;
  omitted: Comparison["analysisA"]["overall"]["omitted"];
}) {
  const { t } = useI18n();
  return (
    <div className="border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-widest text-muted">{title}</p>
      <ul className="mt-3 space-y-1 text-sm">
        {parts.map((part) => (
          <li key={part.id} className="flex justify-between gap-3">
            <span>{t(`cat_${part.id}` as MessageKey)}</span>
            <span className="tabular-nums" dir="ltr">
              {total > 0 ? Math.round((part.weight / total) * 100) : 0}% · {formatNum(part.value, 1)}
            </span>
          </li>
        ))}
      </ul>
      {omitted.length > 0 ? (
        <>
          <p className="mt-4 text-xs uppercase tracking-widest text-muted">{t("leftOut")}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {omitted.map((item) => (
              <li key={item.id}>
                {t(`cat_${item.id}` as MessageKey)} — {noteText(item.reason, t) ?? item.reason}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
