import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeftRight, Upload, X } from "lucide-react";
import { Shell } from "@/components/clash/shell";
import { Report } from "@/components/clash/report";
import { Button } from "@/components/ui/button";
import { compareAccounts, type Comparison } from "@/lib/coc/compare";
import { parseExport } from "@/lib/coc/export-parse";
import { mergeAccounts } from "@/lib/coc/normalize";
import { fetchPlayer, apiStatus } from "@/lib/coc/player.functions";
import { workedExample } from "@/lib/coc/sample";
import { normalizeTag } from "@/lib/coc/tags";
import type { Account } from "@/lib/coc/types";
import { useI18n, type MessageKey } from "@/lib/i18n";

type Search = { a: string; b: string; example: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    a: typeof search.a === "string" ? search.a : "",
    b: typeof search.b === "string" ? search.b : "",
    example: search.example === "1" || search.example === 1 || search.example === true ? "1" : "",
  }),
  loader: () => apiStatus(),
  component: Home,
});

type Draft = {
  tag: string;
  fileName: string | null;
  raw: string | null;
  message: string | null;
};

type Phase =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; comparison: Comparison }
  | { status: "error"; messages: string[] };

const emptyDraft = (tag = ""): Draft => ({ tag, fileName: null, raw: null, message: null });

function Home() {
  const search = Route.useSearch();
  const configured = Route.useLoaderData().configured;
  const navigate = useNavigate({ from: "/" });
  const { t } = useI18n();
  const [a, setA] = useState<Draft>(() => emptyDraft(search.a));
  const [b, setB] = useState<Draft>(() => emptyDraft(search.b));
  const drafts = useRef({ a, b });
  drafts.current = { a, b };
  const [phase, setPhase] = useState<Phase>({ status: "idle" });
  const runId = useRef(0);

  const failText = useCallback(
    (code: string) => {
      const key = `err_${code}` as MessageKey;
      return t(key) || code;
    },
    [t],
  );

  const resolveSide = useCallback(
    async (draft: Draft): Promise<{ account: Account | null; error: string | null }> => {
      const tag = normalizeTag(draft.tag);
      if (!tag) return { account: null, error: failText("invalid_tag") };
      let extra: Account | null = null;
      if (draft.raw) {
        const parsed = parseExport(draft.raw, tag);
        if (!parsed.ok) {
          const code =
            parsed.error === "too_large" ? "export_large" : parsed.error === "empty" ? "export_empty" : parsed.error === "mismatch" ? "" : "export_invalid";
          return { account: null, error: parsed.error === "mismatch" ? parsed.message : failText(code || "export_invalid") };
        }
        extra = { ...parsed.account, tag };
        if (parsed.warning) extra = { ...extra, notes: [...extra.notes, "export-unverified"] };
      }
      if (!configured) {
        if (extra) return { account: extra, error: null };
        return { account: null, error: failText("not_configured") };
      }
      const result = await fetchPlayer({ data: { tag } });
      if (!result.ok) {
        if (extra) {
          return {
            account: { ...extra, notes: [...extra.notes, "api-failed"] },
            error: null,
          };
        }
        return { account: null, error: failText(result.error) };
      }
      return { account: mergeAccounts(result.account, extra), error: null };
    },
    [configured, failText],
  );

  const run = useCallback(
    async (mode: { example: boolean; a: string; b: string }) => {
      const id = ++runId.current;
      if (mode.example) {
        const sample = workedExample();
        if (id !== runId.current) return;
        setPhase({ status: "ready", comparison: compareAccounts(sample.a, sample.b) });
        return;
      }
      const left = { ...drafts.current.a, tag: mode.a };
      const right = { ...drafts.current.b, tag: mode.b };
      const tagA = normalizeTag(left.tag);
      const tagB = normalizeTag(right.tag);
      if (!tagA || !tagB) {
        setPhase({ status: "error", messages: [failText("invalid_tag")] });
        return;
      }
      if (tagA === tagB) {
        setPhase({ status: "error", messages: [t("compareSame")] });
        return;
      }
      setPhase({ status: "loading" });
      const [sideA, sideB] = await Promise.all([resolveSide(left), resolveSide(right)]);
      if (id !== runId.current) return;
      if (!sideA.account || !sideB.account) {
        setPhase({ status: "error", messages: [sideA.error, sideB.error].filter((item): item is string => Boolean(item)) });
        return;
      }
      setPhase({ status: "ready", comparison: compareAccounts(sideA.account, sideB.account) });
    },
    [failText, resolveSide, t],
  );

  useEffect(() => {
    if (search.example === "1") void run({ example: true, a: "", b: "" });
    else if (search.a && search.b) void run({ example: false, a: search.a, b: search.b });
  }, [search.a, search.b, search.example, run]);

  function go(next: Search) {
    const same = search.a === next.a && search.b === next.b && search.example === next.example;
    void navigate({ search: next });
    if (same) {
      void run(next.example === "1" ? { example: true, a: "", b: "" } : { example: false, a: next.a, b: next.b });
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!a.tag.trim() || !b.tag.trim()) {
      setPhase({ status: "error", messages: [t("needTags")] });
      return;
    }
    go({ a: a.tag.trim(), b: b.tag.trim(), example: "" });
  }

  async function onFile(side: "a" | "b", file: File | null) {
    const set = side === "a" ? setA : setB;
    const tag = side === "a" ? a.tag : b.tag;
    if (!file) {
      set((draft) => ({ ...draft, fileName: null, raw: null, message: null }));
      return;
    }
    const raw = await file.text();
    const parsed = parseExport(raw, normalizeTag(tag));
    if (!parsed.ok) {
      const code =
        parsed.error === "too_large" ? "export_large" : parsed.error === "empty" ? "export_empty" : parsed.error === "mismatch" ? "" : "export_invalid";
      set((draft) => ({
        ...draft,
        fileName: null,
        raw: null,
        message: parsed.error === "mismatch" ? parsed.message : failText(code || "export_invalid"),
      }));
      return;
    }
    set((draft) => ({
      ...draft,
      fileName: file.name,
      raw,
      message: parsed.warning ? t("note_export-unverified") : t("fileReady"),
    }));
  }

  return (
    <Shell configured={configured}>
      <p className="text-xs uppercase tracking-widest text-accent">{t("eyebrow")}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">{t("headline")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{t("lede")}</p>

      <form id="compare" onSubmit={onSubmit} className="mt-8 border border-border bg-surface">
        <div className="grid md:grid-cols-2 md:divide-x md:divide-border">
          <PlayerFields draft={a} onChange={setA} onFile={(file) => void onFile("a", file)} label={t("playerA")} stamp="A" filled />
          <PlayerFields draft={b} onChange={setB} onFile={(file) => void onFile("b", file)} label={t("playerB")} stamp="B" filled={false} />
        </div>
        <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center">
          <Button type="submit" disabled={phase.status === "loading"}>
            {phase.status === "loading" ? t("loading") : t("compare")}
          </Button>
          <Button
            type="button"
            variant="line"
            onClick={() => {
              const nextA = { ...drafts.current.b };
              const nextB = { ...drafts.current.a };
              drafts.current = { a: nextA, b: nextB };
              setA(nextA);
              setB(nextB);
              if (nextA.tag.trim() && nextB.tag.trim() && search.example !== "1") {
                go({ a: nextA.tag.trim(), b: nextB.tag.trim(), example: "" });
              }
            }}
          >
            <ArrowLeftRight className="size-4" aria-hidden="true" />
            {t("swap")}
          </Button>
          <Button type="button" variant="quiet" onClick={() => go({ a: "", b: "", example: "1" })}>
            {t("example")}
          </Button>
          <Button
            type="button"
            variant="quiet"
            onClick={() => {
              setA(emptyDraft());
              setB(emptyDraft());
              setPhase({ status: "idle" });
              void navigate({ search: { a: "", b: "", example: "" } });
            }}
          >
            {t("clear")}
          </Button>
        </div>
      </form>

      {phase.status === "error" ? (
        <div role="alert" className="mt-4 border border-danger bg-surface px-4 py-3 text-sm text-danger">
          {phase.messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}
      {phase.status === "loading" ? (
        <div className="mt-6 border border-border bg-surface p-4" aria-live="polite">
          <p className="text-sm">{t("loading")}</p>
          <p className="mt-1 text-sm text-muted">{t("loadingDetail")}</p>
          <div className="mt-4 grid gap-3">
            {[70, 46, 88].map((width) => (
              <div key={width} className="h-2 bg-surface-2">
                <div className="h-full animate-pulse bg-accent" style={{ width: `${width}%` }} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {phase.status === "idle" ? <Preview onOpen={() => go({ a: "", b: "", example: "1" })} /> : null}
      {phase.status === "ready" ? <Report comparison={phase.comparison} /> : null}

      <section className="mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        {[t("how1"), t("how2"), t("how3")].map((step, index) => (
          <div key={step}>
            <p className="font-display text-3xl text-accent">{index + 1}</p>
            <p className="mt-2 text-sm">{step}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}

function PlayerFields({
  draft,
  onChange,
  onFile,
  label,
  stamp,
  filled,
}: {
  draft: Draft;
  onChange: (next: Draft) => void;
  onFile: (file: File | null) => void;
  label: string;
  stamp: string;
  filled: boolean;
}) {
  const { t } = useI18n();
  return (
    <fieldset className="min-w-0 p-4 sm:p-5">
      <legend className="flex items-center gap-2 px-0 text-xs uppercase tracking-widest text-muted">
        <span className={`px-2 py-1 text-xs font-medium ${filled ? "bg-accent text-accent-fg" : "border border-fg"}`}>{stamp}</span>
        {label}
      </legend>
      <label className="mt-4 block text-sm" htmlFor={`tag-${stamp}`}>
        {t("tagLabel")}
        <input
          id={`tag-${stamp}`}
          value={draft.tag}
          onChange={(event) => onChange({ ...draft, tag: event.target.value })}
          placeholder={t("tagPlaceholder")}
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          dir="ltr"
          className="mt-2 h-11 w-full border border-border bg-bg px-3 text-base text-fg outline-none"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border px-3 text-sm">
          <Upload className="size-4" aria-hidden="true" />
          <span>{draft.fileName ?? t("uploadLabel")}</span>
          <span className="text-muted">{t("uploadHint")}</span>
          <input
            type="file"
            accept="application/json,.json,text/plain"
            className="sr-only"
            onChange={(event) => onFile(event.target.files?.[0] ?? null)}
          />
        </label>
        {draft.raw ? (
          <Button type="button" variant="quiet" onClick={() => onFile(null)}>
            <X className="size-4" aria-hidden="true" />
            {t("removeFile")}
          </Button>
        ) : null}
      </div>
      {draft.message ? <p className={`mt-2 text-sm ${draft.raw ? "text-muted" : "text-danger"}`}>{draft.message}</p> : null}
    </fieldset>
  );
}

function Preview({ onOpen }: { onOpen: () => void }) {
  const { t } = useI18n();
  const comparison = useMemo(() => {
    const sample = workedExample();
    return compareAccounts(sample.a, sample.b);
  }, []);
  const rows = [
    { label: t("overall"), a: comparison.analysisA.overall.value, b: comparison.analysisB.overall.value },
    ...comparison.composites.map((row) => ({ label: t(row.id), a: row.a.value, b: row.b.value })),
  ];
  return (
    <figure className="mt-8 border border-border bg-surface p-4 sm:p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-xs uppercase tracking-widest text-muted">{t("previewKicker")}</span>
        <button type="button" className="text-sm text-accent underline-offset-4 hover:underline" onClick={onOpen}>
          {t("openExample")}
        </button>
      </figcaption>
      <p className="mt-3 max-w-2xl text-sm">{t("previewBody")}</p>
      <div className="mt-5 grid gap-4">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="text-xs uppercase tracking-widest text-muted">{row.label}</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-xs text-muted">A</p>
                <Bar value={row.a} />
              </div>
              <div>
                <p className="mb-1 text-xs text-muted">B</p>
                <Bar value={row.b} ink />
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function Bar({ value, ink = false }: { value: number | null; ink?: boolean }) {
  const width = value == null ? 0 : Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 bg-surface-2" aria-hidden="true">
      <div className={`h-full ${ink ? "bg-fg" : "bg-accent"}`} style={{ width: `${width}%` }} />
    </div>
  );
}
