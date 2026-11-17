import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { a as classifyName, c as nameFromId, d as tagsEqual, i as capAt, l as normName, o as dedupeUnits, r as blankAccount, s as mergeAccounts, t as CAPS, u as normalizeTag } from "./tags-WvXno7Mm.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ArrowLeftRight, n as Upload, t as X } from "../_libs/lucide-react.mjs";
import { i as useI18n, n as Route, r as fetchPlayer } from "./router-DbD6MaVU.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BChFBUJ5.js
var routes_BChFBUJ5_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50", {
	variants: { variant: {
		solid: "notch bg-accent text-accent-fg",
		line: "border border-border bg-surface text-fg",
		quiet: "bg-transparent px-2 text-fg underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "solid" }
});
function Button({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
function Mark({ className = "size-8" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				className: "fill-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "16,4 28,16 16,28",
				className: "fill-bg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "16,4 4,16 16,28",
				className: "fill-accent"
			})
		]
	});
}
function Shell({ children, configured }) {
	const { t, locale, setLocale } = useI18n();
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	function toggleTheme() {
		const next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("clashiq-theme", next ? "dark" : "light");
		setDark(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#compare",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg",
				children: t("compare")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full flex-1 bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full flex-1 bg-fg" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl leading-none tracking-tight",
							children: t("brand")
						}) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "quiet",
							"aria-label": t("language"),
							onClick: () => setLocale(locale === "en" ? "fa" : "en"),
							children: locale === "en" ? "فارسی" : "English"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "quiet",
							onClick: toggleTheme,
							"aria-pressed": dark,
							children: dark ? t("themeLight") : t("themeDark")
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 py-8 sm:py-12",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: configured ? t("liveOn") : t("liveOff") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("footerNote") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("notAffiliated") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("capNote") })
					]
				})
			})
		]
	});
}
var UNIT_ORDER = [
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
	"army"
];
function formatNum(value, digits = 0) {
	if (value == null || Number.isNaN(value)) return "—";
	return new Intl.NumberFormat(void 0, {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	}).format(value);
}
function formatWhen(value, locale) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(date);
}
function WinnerMark({ winner, side }) {
	const { t } = useI18n();
	if (winner == null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-muted",
		children: t("noWinner")
	});
	if (winner === "even") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-muted",
		children: t("even")
	});
	if (winner !== side) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-medium text-accent",
		children: t("ahead")
	});
}
function noteText(code, t) {
	if (!code) return null;
	return t(`note_${code}`) || null;
}
function sourceLabel(account, t) {
	if (account.source === "sample") return t("sourceSample");
	if (account.exportAt || account.present.buildings || account.present.walls) return account.source === "api" ? `${t("sourceApi")} + ${t("sourceExport")}` : t("sourceExport");
	return account.source === "export" ? t("sourceExport") : t("sourceApi");
}
function Profile({ account, side, label }) {
	const { t, locale } = useI18n();
	const roleKey = account.role ? `role_${account.role}` : null;
	const prefKey = account.warPreference ? `pref_${account.warPreference}` : null;
	const fetched = formatWhen(account.fetchedAt, locale === "fa" ? "fa" : "en");
	const exported = formatWhen(account.exportAt, locale === "fa" ? "fa" : "en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `min-w-0 bg-surface p-4 sm:p-5 ${side === "a" ? "border-t-2 border-accent" : "border-t-2 border-fg"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `px-2 py-1 text-xs font-medium ${side === "a" ? "bg-accent text-accent-fg" : "border border-fg"}`,
					children: side.toUpperCase()
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-3xl leading-none",
				children: account.name ?? account.tag
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				dir: "ltr",
				children: account.tag
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-6xl leading-none tabular-nums",
				children: account.townHallLevel ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs uppercase tracking-widest text-muted",
				children: t("stat_townHall")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 space-y-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: t("clan")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-end",
						children: account.clan ? account.clan.name : t("noClan")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: t("league")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-end",
						children: account.league ?? t("missing")
					})]
				})]
			}),
			roleKey || prefKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: [roleKey ? t(roleKey) : null, prefKey ? t(prefKey) : null].filter(Boolean).join(" · ")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-widest text-muted",
				children: sourceLabel(account, t)
			}),
			fetched ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					t("fetched"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						dir: "ltr",
						children: fetched
					})
				]
			}) : null,
			exported ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					t("exported"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						dir: "ltr",
						children: exported
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm text-muted",
				children: account.notes.map((note) => {
					const text = noteText(note, t);
					return text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: text }, note) : null;
				})
			})
		]
	});
}
function ScoreBlock({ analysis, label }) {
	const { t } = useI18n();
	const value = analysis.overall.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-5xl leading-none tabular-nums",
				children: value == null ? t("insufficient") : formatNum(value, 1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t("overall")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: t("confidence")
					}),
					" ",
					t(`conf_${analysis.overall.confidence}`)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: t("coverage")
					}),
					" ",
					formatNum(analysis.overall.coverage * 100, 0),
					"%"
				]
			})
		]
	});
}
function CategoryRadar({ rows }) {
	const { t } = useI18n();
	const [lib, setLib] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		import("../_libs/recharts+[...].mjs").then((n) => n.t).then(setLib);
	}, []);
	if (!lib || rows.length < 3) return null;
	const { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } = lib;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: t("radarTitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 h-72 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
					data: rows,
					cx: "50%",
					cy: "50%",
					outerRadius: "70%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--color-border)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
							dataKey: "name",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
							name: t("playerA"),
							dataKey: "a",
							stroke: "var(--color-accent)",
							fill: "var(--color-accent)",
							fillOpacity: .35
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
							name: t("playerB"),
							dataKey: "b",
							stroke: "var(--color-fg)",
							fill: "var(--color-fg)",
							fillOpacity: .12
						})
					]
				})
			})
		})]
	});
}
function levelText(unit, t) {
	if (!unit) return t("missing");
	if (unit.category === "super") return t("active");
	return `${Number.isInteger(unit.level) ? String(unit.level) : unit.level.toFixed(1)}${unit.count > 1 ? ` ×${unit.count}` : ""}`;
}
function Report({ comparison }) {
	const { t } = useI18n();
	const { a, b, analysisA, analysisB } = comparison;
	const higher = (a.townHallLevel ?? -1) === (b.townHallLevel ?? -1) ? null : (a.townHallLevel ?? -1) > (b.townHallLevel ?? -1) ? "a" : "b";
	const upset = higher && comparison.overallWinner && comparison.overallWinner !== higher && comparison.overallWinner !== "even";
	const radar = comparison.categories.filter((row) => row.a.basis === "town-hall" && row.a.value != null && row.b.value != null && row.a.confidence !== "insufficient" && row.b.confidence !== "insufficient").map((row) => ({
		name: t(`cat_${row.id}`),
		a: row.a.value,
		b: row.b.value
	}));
	const weightTotal = analysisA.overall.parts.reduce((sum, part) => sum + part.weight, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "report",
		className: "mt-10 scroll-mt-6",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl leading-none",
					children: t("reportTitle")
				})
			}),
			a.source === "sample" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border border-accent bg-surface px-4 py-3 text-sm",
				children: t("sampleBanner")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 border-s-2 border-accent bg-surface px-4 py-3 text-sm",
				children: comparison.overallWinner === "a" ? t("verdictA") : comparison.overallWinner === "b" ? t("verdictB") : comparison.overallWinner === "even" ? t("verdictEven") : t("verdictNone")
			}),
			upset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: t("thesis")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-px bg-border md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {
					account: a,
					side: "a",
					label: t("playerA")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {
					account: b,
					side: "b",
					label: t("playerB")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-10 font-display text-2xl",
				children: t("profile")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 border-y border-border",
				children: comparison.stats.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-baseline gap-3 border-b border-border py-3 last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-end text-lg tabular-nums",
							dir: "ltr",
							children: [row.a == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: t("missing")
							}) : formatNum(row.a), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ms-2 inline-block align-middle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinnerMark, {
									winner: row.winner,
									side: "a"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs uppercase tracking-widest text-muted",
							children: t(`stat_${row.id}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-start text-lg tabular-nums",
							dir: "ltr",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "me-2 inline-block align-middle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinnerMark, {
									winner: row.winner,
									side: "b"
								})
							}), row.b == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: t("missing")
							}) : formatNum(row.b)]
						})
					]
				}, row.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-10 font-display text-2xl",
				children: t("strength")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-px bg-border md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBlock, {
					analysis: analysisA,
					label: t("playerA")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBlock, {
					analysis: analysisB,
					label: t("playerB")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-px grid gap-px bg-border md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					title: t("strengths"),
					ids: analysisA.strengths,
					empty: t("noneNoted")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					title: t("weaknesses"),
					ids: analysisA.weaknesses,
					empty: t("noneNoted")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-px grid gap-px bg-border md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					title: `${t("playerB")} · ${t("strengths")}`,
					ids: analysisB.strengths,
					empty: t("noneNoted")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					title: `${t("playerB")} · ${t("weaknesses")}`,
					ids: analysisB.weaknesses,
					empty: t("noneNoted")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-10 font-display text-2xl",
				children: t("readings")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-3xl text-sm text-muted",
				children: t("compositeNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 border-y border-border",
				children: comparison.composites.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 border-b border-border px-1 py-4 last:border-b-0 md:grid-cols-[11rem_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: t(row.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: row.winner === "a" ? `${t("playerA")} ${t("ahead")}` : row.winner === "b" ? `${t("playerB")} ${t("ahead")}` : row.winner === "even" ? t("even") : t("noWinner")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-14 shrink-0 text-end text-sm tabular-nums",
									dir: "ltr",
									children: row.a.value == null ? "—" : formatNum(row.a.value, 1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: row.a.value })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-14 shrink-0 text-end text-sm tabular-nums",
									dir: "ltr",
									children: row.b.value == null ? "—" : formatNum(row.b.value, 1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
										value: row.b.value,
										muted: true
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted md:max-w-40 md:text-end",
							children: [
								t(`conf_${row.a.confidence}`),
								" / ",
								t(`conf_${row.b.confidence}`)
							]
						})
					]
				}, row.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-px bg-surface",
				children: comparison.categories.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 border-b border-border px-4 py-4 md:grid-cols-[10rem_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: t(`cat_${row.id}`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: row.winner === "a" ? `${t("playerA")} ${t("ahead")}` : row.winner === "b" ? `${t("playerB")} ${t("ahead")}` : row.winner === "even" ? t("even") : t("noWinner")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								value: row.a.value,
								label: "A"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								value: row.b.value,
								label: "B",
								muted: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted md:max-w-56 md:text-end",
							children: noteText(row.a.note, t) ?? noteText(row.b.note, t) ?? t(`conf_${row.a.confidence}`)
						})
					]
				}, row.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-px",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryRadar, { rows: radar })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightList, {
					title: `${t("playerA")} · ${t("included")}`,
					parts: analysisA.overall.parts,
					total: weightTotal,
					omitted: analysisA.overall.omitted
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightList, {
					title: `${t("playerB")} · ${t("included")}`,
					parts: analysisB.overall.parts,
					total: analysisB.overall.parts.reduce((sum, part) => sum + part.weight, 0),
					omitted: analysisB.overall.omitted
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: t("gameMax")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 border-y border-border",
						children: analysisA.gameMax.map((row, index) => {
							const other = analysisB.gameMax[index];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-b-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-end tabular-nums",
										dir: "ltr",
										children: row.value == null ? t("missing") : `${formatNum(row.value, 1)}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs uppercase tracking-widest text-muted",
										children: t(`cat_${row.id}`)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-start tabular-nums",
										dir: "ltr",
										children: other?.value == null ? t("missing") : `${formatNum(other.value, 1)}%`
									})
								]
							}, row.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t("note_equipment-basis")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-3",
				children: UNIT_ORDER.map((category) => {
					const rows = comparison.units.filter((unit) => unit.category === category);
					if (rows.length === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						open: category === "hero" || category === "troop" || category === "defense",
						className: "border border-border bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "cursor-pointer px-4 py-3 text-sm font-medium",
							children: [
								t(`cat_${category}`),
								" · ",
								rows.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-96 overflow-auto border-t border-border",
							children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,4.5rem)_minmax(0,1fr)_minmax(0,4.5rem)] items-center gap-x-3 gap-y-1 border-b border-border px-4 py-2 text-sm last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,8rem)_minmax(0,1.2fr)_minmax(0,8rem)_minmax(0,1fr)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-end tabular-nums",
										dir: "ltr",
										children: levelText(row.a, t)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-center text-muted sm:col-start-2",
										children: row.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-3 sm:col-span-1 sm:col-start-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
											value: row.aPct,
											thin: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
												value: row.bPct,
												thin: true,
												muted: true
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "col-start-3 text-end tabular-nums sm:col-start-5",
										dir: "ltr",
										children: levelText(row.b, t)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "col-span-3 text-center text-xs text-muted sm:col-span-1 sm:col-start-4",
										children: row.winner === "a" ? `A ${t("ahead")}` : row.winner === "b" ? `B ${t("ahead")}` : row.winner === "even" ? t("even") : row.a && row.b ? t("noWinner") : ""
									})
								]
							}, `${row.category}:${row.key}`))
						})]
					}, category);
				})
			}),
			comparison.achievements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: t("achievements")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 border-y border-border",
					children: comparison.achievements.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-end tabular-nums",
								children: row.a ? `${row.a.stars ?? "—"}★` : t("missing")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-muted",
								children: row.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-start tabular-nums",
								children: row.b ? `${row.b.stars ?? "—"}★` : t("missing")
							})
						]
					}, row.name))
				})]
			}) : null,
			a.unrecognized.length + b.unrecognized.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-6 border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "cursor-pointer px-4 py-3 text-sm",
					children: [
						t("unrecognized"),
						" · ",
						a.unrecognized.length + b.unrecognized.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 pb-4 text-sm text-muted",
					children: [
						a.unrecognized.length,
						" / ",
						b.unrecognized.length
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "method",
				className: "mt-12 border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: t("methodTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl text-sm text-muted",
						children: t("methodBody")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-3xl text-sm text-muted",
						children: t("capNote")
					})
				]
			})
		]
	});
}
function Callout({ title, ids, empty }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted",
			children: title
		}), ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1 text-sm",
			children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t(`cat_${id}`) }, id))
		})]
	});
}
function Meter({ value, muted = false, thin = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${thin ? "h-1" : "h-2"} bg-surface-2`,
		"aria-hidden": value == null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full ${muted ? "bg-fg" : "bg-accent"}`,
			style: { width: `${value == null ? 0 : Math.max(0, Math.min(100, value))}%` }
		})
	});
}
function WeightList({ title, parts, total, omitted }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm",
				children: parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(`cat_${part.id}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						dir: "ltr",
						children: [
							total > 0 ? Math.round(part.weight / total * 100) : 0,
							"% · ",
							formatNum(part.value, 1)
						]
					})]
				}, part.id))
			}),
			omitted.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-widest text-muted",
				children: t("leftOut")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-sm text-muted",
				children: omitted.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					t(`cat_${item.id}`),
					" — ",
					noteText(item.reason, t) ?? item.reason
				] }, item.id))
			})] }) : null
		]
	});
}
/** Display-only rollups. They are not added on top of the overall score. */
var COMPOSITE_WEIGHTS = {
	offense: [
		{
			id: "hero",
			weight: .34
		},
		{
			id: "troop",
			weight: .28
		},
		{
			id: "spell",
			weight: .14
		},
		{
			id: "siege",
			weight: .08
		},
		{
			id: "pet",
			weight: .16
		}
	],
	defensePower: [
		{
			id: "defense",
			weight: .62
		},
		{
			id: "wall",
			weight: .26
		},
		{
			id: "trap",
			weight: .12
		}
	],
	building: [
		{
			id: "defense",
			weight: .45
		},
		{
			id: "wall",
			weight: .25
		},
		{
			id: "trap",
			weight: .1
		},
		{
			id: "structure",
			weight: .2
		}
	]
};
var LAB_GROUPS = {
	hero: "hero",
	troop: "troop",
	spell: "spell",
	siege: "siege",
	pet: "pet"
};
/** Full-model weights. Missing categories are dropped and the rest renormalized. */
var OVERALL_WEIGHTS = [
	{
		id: "hero",
		weight: .22
	},
	{
		id: "troop",
		weight: .18
	},
	{
		id: "spell",
		weight: .08
	},
	{
		id: "siege",
		weight: .05
	},
	{
		id: "pet",
		weight: .07
	},
	{
		id: "defense",
		weight: .18
	},
	{
		id: "wall",
		weight: .1
	},
	{
		id: "trap",
		weight: .04
	},
	{
		id: "structure",
		weight: .08
	}
];
var PRESENT_KEY = {
	hero: "heroes",
	troop: "troops",
	spell: "spells",
	siege: "troops",
	pet: "troops",
	defense: "buildings",
	wall: "walls",
	trap: "traps",
	structure: "buildings",
	equipment: "equipment"
};
function round1(value) {
	return Math.round(value * 10) / 10;
}
function confidenceFrom(coverage, evaluated) {
	if (evaluated < 1) return "insufficient";
	if (coverage >= .85 && evaluated >= 3) return "high";
	if (coverage >= .6) return "medium";
	if (coverage >= .35) return "low";
	return "insufficient";
}
function scoreExpected(account, id, groups, present) {
	const th = account.townHallLevel;
	if (th == null) return empty(id, "insufficient", "missing-th");
	if (th > 18) return empty(id, "insufficient", "above-known-th");
	const expected = Object.values(CAPS).filter((row) => groups.includes(row.group) && typeof row.levels[th] === "number");
	if (expected.length === 0) return {
		...empty(id, "na", null),
		note: "not-at-hall"
	};
	if (!present) return empty(id, "insufficient", "not-in-data");
	const owned = /* @__PURE__ */ new Map();
	for (const unit of account.units) {
		if (!groups.includes(unit.category)) continue;
		owned.set(unit.key, unit);
	}
	let sum = 0;
	let evaluated = 0;
	let stale = 0;
	for (const row of expected) {
		const cap = row.levels[th];
		if (cap == null) continue;
		const key = Object.entries(CAPS).find(([, value]) => value === row)?.[0];
		if (!key) continue;
		const level = owned.get(key)?.level ?? 0;
		if (level > cap) {
			stale += 1;
			continue;
		}
		sum += level / cap;
		evaluated += 1;
	}
	if (evaluated === 0) return empty(id, "insufficient", "above-cap");
	const coverage = evaluated / expected.length;
	const note = stale > 0 ? "stale" : null;
	return {
		id,
		value: round1(sum / evaluated * 100),
		coverage,
		expected: expected.length,
		evaluated,
		confidence: confidenceFrom(coverage, evaluated),
		basis: "town-hall",
		note
	};
}
function empty(id, confidence, note) {
	return {
		id,
		value: null,
		coverage: 0,
		expected: 0,
		evaluated: 0,
		confidence,
		basis: "none",
		note
	};
}
function scoreWalls(account) {
	const th = account.townHallLevel;
	if (th == null) return empty("wall", "insufficient", "missing-th");
	if (th > 18) return empty("wall", "insufficient", "above-known-th");
	const cap = capAt("wall", th);
	if (cap == null) return {
		...empty("wall", "na", null),
		note: "not-at-hall"
	};
	if (!account.present.walls) return empty("wall", "insufficient", "walls-missing");
	const pieces = account.units.filter((unit) => unit.category === "wall");
	const total = pieces.reduce((sum, unit) => sum + unit.count, 0);
	if (total === 0) return {
		id: "wall",
		value: 0,
		coverage: 1,
		expected: 1,
		evaluated: 1,
		confidence: "medium",
		basis: "town-hall",
		note: "walls-empty"
	};
	const average = pieces.reduce((sum, unit) => sum + unit.level * unit.count, 0) / total;
	if (average > cap + .01) return empty("wall", "insufficient", "walls-above");
	return {
		id: "wall",
		value: round1(average / cap * 100),
		coverage: 1,
		expected: 1,
		evaluated: 1,
		confidence: "high",
		basis: "town-hall",
		note: null
	};
}
function scoreEquipment(account) {
	if (!account.present.equipment) return empty("equipment", "insufficient", "equipment-missing");
	const gear = account.units.filter((unit) => unit.category === "equipment" && unit.maxLevel != null && unit.maxLevel > 0);
	if (gear.length === 0) return empty("equipment", "insufficient", "equipment-no-max");
	const mean = gear.reduce((sum, unit) => sum + unit.level / unit.maxLevel, 0) / gear.length;
	return {
		id: "equipment",
		value: round1(Math.min(1, mean) * 100),
		coverage: 1,
		expected: gear.length,
		evaluated: gear.length,
		confidence: gear.length >= 4 ? "medium" : "low",
		basis: "game-max",
		note: "equipment-basis"
	};
}
function gameMaxFor(account, category) {
	const rows = account.units.filter((unit) => unit.category === category && unit.maxLevel != null && unit.maxLevel > 0);
	if (rows.length === 0) return null;
	return round1(rows.reduce((sum, unit) => sum + Math.min(1, unit.level / unit.maxLevel), 0) / rows.length * 100);
}
function rollup(id, byId) {
	const slots = COMPOSITE_WEIGHTS[id];
	const parts = [];
	let weightUsed = 0;
	let weightPossible = 0;
	for (const slot of slots) {
		const score = byId.get(slot.id);
		if (!score || score.confidence === "na") continue;
		weightPossible += slot.weight;
		if (score.value == null || score.confidence === "insufficient") continue;
		weightUsed += slot.weight;
		parts.push({
			id: slot.id,
			weight: slot.weight,
			value: score.value
		});
	}
	const coverage = weightPossible === 0 ? 0 : weightUsed / weightPossible;
	if (weightUsed === 0 || coverage < .45) return {
		id,
		value: null,
		confidence: "insufficient",
		coverage,
		parts
	};
	const total = parts.reduce((sum, part) => sum + part.weight, 0);
	const value = round1(parts.reduce((sum, part) => sum + part.weight / total * part.value, 0));
	let confidence = coverage >= .85 ? "high" : coverage >= .65 ? "medium" : "low";
	if (parts.some((part) => byId.get(part.id)?.confidence === "low")) confidence = confidence === "high" ? "medium" : "low";
	return {
		id,
		value,
		confidence,
		coverage,
		parts
	};
}
function presentFor(account, id, groups) {
	const key = PRESENT_KEY[id];
	if (!key) return false;
	if (!account.present[key]) return false;
	if (id === "siege" || id === "pet") return account.present.troops;
	if ((id === "defense" || id === "structure") && groups.length) return account.present.buildings;
	return true;
}
function analyzeAccount(account) {
	const categories = [
		scoreExpected(account, "hero", ["hero"], presentFor(account, "hero", ["hero"])),
		scoreExpected(account, "troop", ["troop"], presentFor(account, "troop", ["troop"])),
		scoreExpected(account, "spell", ["spell"], presentFor(account, "spell", ["spell"])),
		scoreExpected(account, "siege", ["siege"], presentFor(account, "siege", ["siege"])),
		scoreExpected(account, "pet", ["pet"], presentFor(account, "pet", ["pet"])),
		scoreExpected(account, "defense", ["defense"], presentFor(account, "defense", ["defense"])),
		scoreWalls(account),
		scoreExpected(account, "trap", ["trap"], account.present.traps),
		scoreExpected(account, "structure", ["resource", "army"], account.present.buildings),
		scoreEquipment(account)
	];
	const byId = new Map(categories.map((row) => [row.id, row]));
	const parts = [];
	const omitted = [];
	let weightUsed = 0;
	let weightPossible = 0;
	for (const slot of OVERALL_WEIGHTS) {
		const score = byId.get(slot.id);
		if (!score || score.confidence === "na") {
			omitted.push({
				id: slot.id,
				reason: score?.note ?? "not-at-hall"
			});
			continue;
		}
		weightPossible += slot.weight;
		if (score.value == null || score.confidence === "insufficient") {
			omitted.push({
				id: slot.id,
				reason: score.note ?? "not-in-data"
			});
			continue;
		}
		weightUsed += slot.weight;
		parts.push({
			id: slot.id,
			weight: slot.weight,
			value: score.value
		});
	}
	const coverage = weightPossible === 0 ? 0 : weightUsed / weightPossible;
	let overallValue = null;
	let overallConfidence = "insufficient";
	if (weightUsed > 0 && coverage >= .45) {
		const total = parts.reduce((sum, part) => sum + part.weight, 0);
		overallValue = round1(parts.reduce((sum, part) => sum + part.weight / total * part.value, 0));
		if (coverage >= .85) overallConfidence = "high";
		else if (coverage >= .65) overallConfidence = "medium";
		else overallConfidence = "low";
		if (parts.some((part) => byId.get(part.id)?.confidence === "low")) overallConfidence = overallConfidence === "high" ? "medium" : overallConfidence === "medium" ? "low" : "low";
	}
	const strengths = categories.filter((row) => row.basis === "town-hall" && row.value != null && row.value >= 80 && row.confidence !== "insufficient" && row.confidence !== "na").map((row) => row.id);
	const weaknesses = categories.filter((row) => row.basis === "town-hall" && row.value != null && row.value < 55 && row.expected >= 3 && row.confidence !== "insufficient" && row.confidence !== "na").map((row) => row.id);
	const notes = [...account.notes];
	if (!account.present.buildings) notes.push("buildings-missing");
	return {
		categories,
		overall: {
			value: overallValue,
			confidence: overallConfidence,
			coverage,
			parts,
			omitted
		},
		gameMax: [
			"hero",
			"troop",
			"spell",
			"siege",
			"pet",
			"equipment"
		].map((id) => ({
			id,
			value: gameMaxFor(account, id === "equipment" ? "equipment" : LAB_GROUPS[id])
		})),
		strengths,
		weaknesses,
		notes,
		composites: [
			"offense",
			"defensePower",
			"building"
		].map((id) => rollup(id, byId))
	};
}
function judge(a, b, gap = 0) {
	if (a == null || b == null) return null;
	const diff = a - b;
	if (Math.abs(diff) <= gap) return "even";
	return diff > 0 ? "a" : "b";
}
function stat(id, a, b) {
	return {
		id,
		a,
		b,
		winner: judge(a, b, 0)
	};
}
function pctFor(unit, townHall) {
	if (!unit || townHall == null) return null;
	const cap = capAt(unit.key, townHall);
	if (cap == null || cap <= 0) return null;
	if (unit.level > cap) return null;
	return unit.level / cap * 100;
}
function compareAccounts(a, b) {
	const analysisA = analyzeAccount(a);
	const analysisB = analyzeAccount(b);
	const sameHall = a.townHallLevel != null && a.townHallLevel === b.townHallLevel;
	const categories = analysisA.categories.map((row) => {
		const other = analysisB.categories.find((item) => item.id === row.id);
		let winner = null;
		if (!(row.confidence === "insufficient" || row.confidence === "na" || other.confidence === "insufficient" || other.confidence === "na") && row.basis === other.basis) {
			if (row.id === "equipment" && !sameHall) winner = null;
			else winner = judge(row.value, other.value, .5);
		}
		return {
			id: row.id,
			a: row,
			b: other,
			winner
		};
	});
	const composites = analysisA.composites.map((row) => {
		const other = analysisB.composites.find((item) => item.id === row.id);
		const blocked = row.confidence === "insufficient" || other.confidence === "insufficient" || row.value == null || other.value == null;
		return {
			id: row.id,
			a: row,
			b: other,
			winner: blocked ? null : judge(row.value, other.value, .5)
		};
	});
	const overallWinner = analysisA.overall.confidence === "insufficient" || analysisB.overall.confidence === "insufficient" ? null : judge(analysisA.overall.value, analysisB.overall.value, .5);
	const index = /* @__PURE__ */ new Map();
	const add = (unit, side, townHall) => {
		if (!unit || unit.category === "other") return;
		const id = `${unit.category}:${unit.key}`;
		let row = index.get(id);
		if (!row) {
			row = {
				category: unit.category,
				key: unit.key,
				name: unit.name,
				a: null,
				b: null,
				aPct: null,
				bPct: null,
				winner: null
			};
			index.set(id, row);
		}
		if (side === "a") {
			row.a = unit;
			row.aPct = pctFor(unit, townHall);
			row.name = unit.name;
		} else {
			row.b = unit;
			row.bPct = pctFor(unit, townHall);
		}
	};
	for (const unit of a.units) add(unit, "a", a.townHallLevel);
	for (const unit of b.units) add(unit, "b", b.townHallLevel);
	const units = [...index.values()].map((row) => {
		const winner = row.a && row.b ? row.aPct != null && row.bPct != null ? judge(row.aPct, row.bPct, .5) : sameHall ? judge(row.a.level, row.b.level, 0) : null : null;
		return {
			...row,
			winner
		};
	});
	units.sort((left, right) => left.name.localeCompare(right.name));
	const achA = new Map(a.achievements.map((item) => [normName(item.name), item]));
	const achB = new Map(b.achievements.map((item) => [normName(item.name), item]));
	const names = /* @__PURE__ */ new Set([...achA.keys(), ...achB.keys()]);
	const achievements = [];
	if (a.present.achievements && b.present.achievements) {
		for (const key of names) {
			const left = achA.get(key) ?? null;
			const right = achB.get(key) ?? null;
			const leftScore = left?.stars ?? left?.value ?? null;
			const rightScore = right?.stars ?? right?.value ?? null;
			achievements.push({
				name: left?.name ?? right?.name ?? key,
				a: left,
				b: right,
				winner: left && right ? judge(leftScore, rightScore, 0) : null
			});
		}
		achievements.sort((left, right) => {
			const gap = (row) => Math.abs((row.a?.stars ?? 0) - (row.b?.stars ?? 0));
			return gap(right) - gap(left);
		});
	}
	return {
		a,
		b,
		analysisA,
		analysisB,
		overallWinner,
		stats: [
			stat("townHall", a.townHallLevel, b.townHallLevel),
			stat("weapon", a.townHallWeaponLevel, b.townHallWeaponLevel),
			stat("exp", a.expLevel, b.expLevel),
			stat("trophies", a.trophies, b.trophies),
			stat("bestTrophies", a.bestTrophies, b.bestTrophies),
			stat("warStars", a.warStars, b.warStars),
			stat("attackWins", a.attackWins, b.attackWins),
			stat("defenseWins", a.defenseWins, b.defenseWins),
			stat("donations", a.donations, b.donations)
		],
		categories,
		composites,
		units,
		achievements: achievements.slice(0, 16)
	};
}
var MAX_CHARS = 15e5;
var IGNORED_KEYS = /* @__PURE__ */ new Set([
	"buildings2",
	"traps2",
	"heroes2",
	"obstacles",
	"decos",
	"decorations",
	"skins",
	"scenery",
	"boosts",
	"helpers",
	"bb",
	"starlab",
	"capital"
]);
function isRow(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function levelOf(row) {
	const raw = row.lvl ?? row.level;
	const level = typeof raw === "number" ? raw : Number(row.lvl ?? row.level);
	if (!Number.isFinite(level) || level < 0) return null;
	return level;
}
function countOf(row) {
	const raw = row.cnt ?? row.count;
	const count = typeof raw === "number" ? raw : Number(raw);
	if (!Number.isFinite(count) || count <= 0) return 1;
	return Math.min(400, Math.round(count));
}
/**
* Accepts the in-game Settings → Data Export JSON, a named progress file
* ({ name, level, count }), or a saved official player payload.
* Builder Base keys are ignored. Processing stays in the browser.
*/
function parseExport(text, expectedTag) {
	if (text.length > MAX_CHARS) return {
		ok: false,
		error: "too_large",
		message: "That file is larger than 1.5 MB."
	};
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		return {
			ok: false,
			error: "invalid",
			message: "This file is not JSON. ClashIQ reads the in-game village export or a named progress file."
		};
	}
	if (!isRow(parsed)) return {
		ok: false,
		error: "invalid",
		message: "The JSON root has to be an object."
	};
	const tag = typeof parsed.tag === "string" ? normalizeTag(parsed.tag) : null;
	const expected = expectedTag ? normalizeTag(expectedTag) : null;
	if (expected && tag && !tagsEqual(tag, expected)) return {
		ok: false,
		error: "mismatch",
		message: `This export belongs to ${tag}, not ${expected}.`
	};
	if (looksLikeApiSnapshot(parsed)) return finishSnapshot(parsed, tag, expected);
	return finishVillageExport(parsed, tag, expected);
}
function looksLikeApiSnapshot(row) {
	const troops = row.troops;
	if (!Array.isArray(troops) || troops.length === 0) return false;
	const first = troops[0];
	return isRow(first) && typeof first.name === "string" && ("maxLevel" in first || "village" in first);
}
function finishSnapshot(row, tag, expected) {
	const units = [];
	const take = (value, force) => {
		if (!Array.isArray(value)) return;
		for (const item of value) {
			if (!isRow(item) || typeof item.name !== "string") continue;
			const village = typeof item.village === "string" ? item.village : null;
			const classified = classifyName(item.name, village);
			if (classified.drop) continue;
			const level = levelOf(item);
			if (level == null) continue;
			units.push({
				key: classified.key,
				name: classified.name,
				level,
				maxLevel: typeof item.maxLevel === "number" ? item.maxLevel : null,
				count: 1,
				category: force ?? classified.group,
				source: "export",
				unlisted: force ? false : classified.unlisted
			});
		}
	};
	take(row.troops);
	take(row.spells, "spell");
	take(row.heroes, "hero");
	take(row.heroEquipment, "equipment");
	take(row.pets, "pet");
	if (units.length === 0) return {
		ok: false,
		error: "empty",
		message: "The player file had no Home Village units."
	};
	return {
		ok: true,
		account: blankAccount({
			source: "export",
			tag: tag ?? expected ?? "#EXPORT",
			name: typeof row.name === "string" ? row.name : null,
			townHallLevel: typeof row.townHallLevel === "number" ? row.townHallLevel : null,
			expLevel: typeof row.expLevel === "number" ? row.expLevel : null,
			trophies: typeof row.trophies === "number" ? row.trophies : null,
			bestTrophies: typeof row.bestTrophies === "number" ? row.bestTrophies : null,
			warStars: typeof row.warStars === "number" ? row.warStars : null,
			attackWins: typeof row.attackWins === "number" ? row.attackWins : null,
			defenseWins: typeof row.defenseWins === "number" ? row.defenseWins : null,
			units: dedupeUnits(units),
			present: {
				troops: Array.isArray(row.troops),
				spells: Array.isArray(row.spells),
				heroes: Array.isArray(row.heroes),
				equipment: Array.isArray(row.heroEquipment),
				achievements: false,
				buildings: false,
				traps: false,
				walls: false,
				guardians: false
			},
			notes: ["api-snapshot"]
		}),
		warning: tag ? null : "This file has no player tag, so ClashIQ could not confirm it matches the tag you typed."
	};
}
var ARRAY_CATEGORY = {
	buildings: "auto",
	traps: "trap",
	walls: "wall",
	heroes: "hero",
	pets: "pet",
	units: "auto",
	troops: "auto",
	spells: "spell",
	siege: "siege",
	siegemachines: "siege",
	equipment: "equipment",
	heroequipment: "equipment",
	guardians: "guardian"
};
function finishVillageExport(row, tag, expected) {
	const units = [];
	const unrecognized = [];
	const townHallPieces = [];
	const present = {
		troops: false,
		spells: false,
		heroes: false,
		equipment: false,
		achievements: false,
		buildings: false,
		traps: false,
		walls: false,
		guardians: false
	};
	for (const [rawKey, value] of Object.entries(row)) {
		const key = rawKey.toLowerCase();
		if (IGNORED_KEYS.has(key) || key.endsWith("2")) continue;
		const slot = ARRAY_CATEGORY[key.replace(/[_-]/g, "")];
		if (!slot || !Array.isArray(value)) continue;
		if (key === "buildings") present.buildings = true;
		if (key === "traps") present.traps = true;
		if (key === "walls") present.walls = true;
		if (key === "guardians") present.guardians = true;
		if (key === "heroes") present.heroes = true;
		if (key === "spells") present.spells = true;
		if (key === "units" || key === "troops") present.troops = true;
		if (key === "equipment" || key === "heroequipment") present.equipment = true;
		for (const item of value) {
			if (!isRow(item)) continue;
			const level = levelOf(item);
			if (level == null) continue;
			const named = typeof item.name === "string" ? item.name : null;
			const id = typeof item.data === "number" ? item.data : Number(item.data);
			let label = named;
			if (!label && Number.isFinite(id)) {
				const mapped = nameFromId(id);
				if (mapped?.drop) continue;
				label = mapped?.name ?? null;
			}
			if (!label) {
				if (Number.isFinite(id)) unrecognized.push({
					key: `id:${id}`,
					name: `Unknown #${id}`,
					level,
					maxLevel: null,
					count: countOf(item),
					category: "other",
					source: "export",
					unlisted: true
				});
				continue;
			}
			const classified = classifyName(label, null);
			if (classified.drop) continue;
			if (classified.key === "town hall") {
				townHallPieces.push(level);
				continue;
			}
			const category = slot === "auto" ? classified.group : slot;
			const unit = {
				key: classified.key,
				name: classified.name,
				level,
				maxLevel: null,
				count: countOf(item),
				category,
				source: "export",
				unlisted: classified.unlisted
			};
			if (unit.category === "wall") unit.key = "wall";
			if (unit.unlisted || unit.category === "other") unrecognized.push(unit);
			else units.push(unit);
		}
	}
	if (units.length === 0 && unrecognized.length === 0) return {
		ok: false,
		error: "invalid",
		message: "Unrecognized export. Use the in-game JSON export (Settings → More settings → Data Export) or a file with named buildings."
	};
	let townHall = null;
	if (townHallPieces.length > 0) townHall = Math.max(...townHallPieces);
	else if (typeof row.townHallLevel === "number") townHall = row.townHallLevel;
	return {
		ok: true,
		account: blankAccount({
			source: "export",
			tag: tag ?? expected ?? "#EXPORT",
			name: typeof row.name === "string" ? row.name : null,
			townHallLevel: townHall,
			exportAt: timestampOf(row.timestamp),
			units: dedupeUnits(units),
			unrecognized: dedupeUnits(unrecognized),
			present,
			notes: []
		}),
		warning: tag ? null : "This file has no player tag, so ClashIQ could not confirm it matches the tag you typed."
	};
}
function timestampOf(value) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n) || n <= 0) return null;
	const ms = n > 0xe8d4a51000 ? n : n * 1e3;
	const date = new Date(ms);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
function maxLevelOf(levels) {
	let max = 1;
	for (const value of Object.values(levels)) if (typeof value === "number" && value > max) max = value;
	return max;
}
function fill(townHall, ratios) {
	const units = [];
	for (const [key, row] of Object.entries(CAPS)) {
		const cap = row.levels[townHall];
		if (cap == null) continue;
		const ratio = ratios[row.group] ?? 1;
		units.push({
			key,
			name: row.name,
			level: Math.max(1, Math.min(cap, Math.round(cap * ratio))),
			maxLevel: maxLevelOf(row.levels),
			count: row.group === "wall" ? 325 : 1,
			category: row.group,
			source: "sample",
			unlisted: false
		});
	}
	return units;
}
function gear(level, maxLevel, name) {
	return {
		key: name.toLowerCase(),
		name,
		level,
		maxLevel,
		count: 1,
		category: "equipment",
		source: "sample",
		unlisted: false
	};
}
var present = {
	troops: true,
	spells: true,
	heroes: true,
	equipment: true,
	achievements: true,
	buildings: true,
	traps: true,
	walls: true,
	guardians: false
};
/** Fictional dossiers. Every figure is computed from the cap table so the UI can be reviewed without a token. */
function workedExample() {
	const aUnits = [
		...fill(15, {
			hero: 1,
			troop: 1,
			spell: .95,
			siege: 1,
			pet: .9,
			defense: 1,
			trap: 1,
			wall: 1,
			resource: .9,
			army: .95
		}),
		gear(18, 27, "Giant Gauntlet"),
		gear(15, 18, "Eternal Tome")
	];
	const bUnits = [
		...fill(17, {
			hero: .42,
			troop: .58,
			spell: .7,
			siege: .5,
			pet: .4,
			defense: .48,
			trap: .55,
			wall: .45,
			resource: .8,
			army: .6
		}),
		gear(9, 27, "Giant Gauntlet"),
		gear(6, 18, "Eternal Tome")
	];
	const a = blankAccount({
		source: "sample",
		tag: "#P2YQLGRJ",
		name: "Northkeep",
		townHallLevel: 15,
		townHallWeaponLevel: 5,
		expLevel: 210,
		trophies: 2780,
		bestTrophies: 3120,
		warStars: 1480,
		attackWins: 920,
		defenseWins: 140,
		donations: 2400,
		donationsReceived: 1800,
		role: "coLeader",
		warPreference: "in",
		clan: {
			name: "Example Clan",
			tag: "#2Q8YVCL0",
			level: 18
		},
		league: "Master League I",
		units: aUnits,
		present,
		achievements: [{
			name: "War Hero",
			stars: 3,
			value: 1480,
			target: 1e3
		}, {
			name: "Conqueror",
			stars: 3,
			value: 5e3,
			target: 5e3
		}],
		notes: ["sample"]
	});
	a.achievements = a.achievements.filter((item) => item.name !== "Conqueror");
	return {
		a,
		b: blankAccount({
			source: "sample",
			tag: "#C0V28Q9U",
			name: "Ashmarch",
			townHallLevel: 17,
			townHallWeaponLevel: 2,
			expLevel: 248,
			trophies: 3410,
			bestTrophies: 4102,
			warStars: 860,
			attackWins: 1504,
			defenseWins: 96,
			donations: 800,
			donationsReceived: 2200,
			role: "member",
			warPreference: "in",
			clan: {
				name: "Example Clan",
				tag: "#2Q8YVCL0",
				level: 18
			},
			league: "Champion League III",
			units: bUnits,
			present,
			achievements: [{
				name: "War Hero",
				stars: 2,
				value: 860,
				target: 1e3
			}],
			notes: ["sample"]
		})
	};
}
var emptyDraft = (tag = "") => ({
	tag,
	fileName: null,
	raw: null,
	message: null
});
function Home() {
	const search = Route.useSearch();
	const configured = Route.useLoaderData().configured;
	const navigate = useNavigate({ from: "/" });
	const { t } = useI18n();
	const [a, setA] = (0, import_react.useState)(() => emptyDraft(search.a));
	const [b, setB] = (0, import_react.useState)(() => emptyDraft(search.b));
	const drafts = (0, import_react.useRef)({
		a,
		b
	});
	drafts.current = {
		a,
		b
	};
	const [phase, setPhase] = (0, import_react.useState)({ status: "idle" });
	const runId = (0, import_react.useRef)(0);
	const failText = (0, import_react.useCallback)((code) => {
		const key = `err_${code}`;
		return t(key) || code;
	}, [t]);
	const resolveSide = (0, import_react.useCallback)(async (draft) => {
		const tag = normalizeTag(draft.tag);
		if (!tag) return {
			account: null,
			error: failText("invalid_tag")
		};
		let extra = null;
		if (draft.raw) {
			const parsed = parseExport(draft.raw, tag);
			if (!parsed.ok) {
				const code = parsed.error === "too_large" ? "export_large" : parsed.error === "empty" ? "export_empty" : parsed.error === "mismatch" ? "" : "export_invalid";
				return {
					account: null,
					error: parsed.error === "mismatch" ? parsed.message : failText(code || "export_invalid")
				};
			}
			extra = {
				...parsed.account,
				tag
			};
			if (parsed.warning) extra = {
				...extra,
				notes: [...extra.notes, "export-unverified"]
			};
		}
		if (!configured) {
			if (extra) return {
				account: extra,
				error: null
			};
			return {
				account: null,
				error: failText("not_configured")
			};
		}
		const result = await fetchPlayer({ data: { tag } });
		if (!result.ok) {
			if (extra) return {
				account: {
					...extra,
					notes: [...extra.notes, "api-failed"]
				},
				error: null
			};
			return {
				account: null,
				error: failText(result.error)
			};
		}
		return {
			account: mergeAccounts(result.account, extra),
			error: null
		};
	}, [configured, failText]);
	const run = (0, import_react.useCallback)(async (mode) => {
		const id = ++runId.current;
		if (mode.example) {
			const sample = workedExample();
			if (id !== runId.current) return;
			setPhase({
				status: "ready",
				comparison: compareAccounts(sample.a, sample.b)
			});
			return;
		}
		const left = {
			...drafts.current.a,
			tag: mode.a
		};
		const right = {
			...drafts.current.b,
			tag: mode.b
		};
		const tagA = normalizeTag(left.tag);
		const tagB = normalizeTag(right.tag);
		if (!tagA || !tagB) {
			setPhase({
				status: "error",
				messages: [failText("invalid_tag")]
			});
			return;
		}
		if (tagA === tagB) {
			setPhase({
				status: "error",
				messages: [t("compareSame")]
			});
			return;
		}
		setPhase({ status: "loading" });
		const [sideA, sideB] = await Promise.all([resolveSide(left), resolveSide(right)]);
		if (id !== runId.current) return;
		if (!sideA.account || !sideB.account) {
			setPhase({
				status: "error",
				messages: [sideA.error, sideB.error].filter((item) => Boolean(item))
			});
			return;
		}
		setPhase({
			status: "ready",
			comparison: compareAccounts(sideA.account, sideB.account)
		});
	}, [
		failText,
		resolveSide,
		t
	]);
	(0, import_react.useEffect)(() => {
		if (search.example === "1") run({
			example: true,
			a: "",
			b: ""
		});
		else if (search.a && search.b) run({
			example: false,
			a: search.a,
			b: search.b
		});
	}, [
		search.a,
		search.b,
		search.example,
		run
	]);
	function go(next) {
		const same = search.a === next.a && search.b === next.b && search.example === next.example;
		navigate({ search: next });
		if (same) run(next.example === "1" ? {
			example: true,
			a: "",
			b: ""
		} : {
			example: false,
			a: next.a,
			b: next.b
		});
	}
	function onSubmit(event) {
		event.preventDefault();
		if (!a.tag.trim() || !b.tag.trim()) {
			setPhase({
				status: "error",
				messages: [t("needTags")]
			});
			return;
		}
		go({
			a: a.tag.trim(),
			b: b.tag.trim(),
			example: ""
		});
	}
	async function onFile(side, file) {
		const set = side === "a" ? setA : setB;
		const tag = side === "a" ? a.tag : b.tag;
		if (!file) {
			set((draft) => ({
				...draft,
				fileName: null,
				raw: null,
				message: null
			}));
			return;
		}
		const raw = await file.text();
		const parsed = parseExport(raw, normalizeTag(tag));
		if (!parsed.ok) {
			const code = parsed.error === "too_large" ? "export_large" : parsed.error === "empty" ? "export_empty" : parsed.error === "mismatch" ? "" : "export_invalid";
			set((draft) => ({
				...draft,
				fileName: null,
				raw: null,
				message: parsed.error === "mismatch" ? parsed.message : failText(code || "export_invalid")
			}));
			return;
		}
		set((draft) => ({
			...draft,
			fileName: file.name,
			raw,
			message: parsed.warning ? t("note_export-unverified") : t("fileReady")
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		configured,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-accent",
				children: t("eyebrow")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl",
				children: t("headline")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted",
				children: t("lede")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				id: "compare",
				onSubmit,
				className: "mt-8 border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 md:divide-x md:divide-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerFields, {
						draft: a,
						onChange: setA,
						onFile: (file) => void onFile("a", file),
						label: t("playerA"),
						stamp: "A",
						filled: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerFields, {
						draft: b,
						onChange: setB,
						onFile: (file) => void onFile("b", file),
						label: t("playerB"),
						stamp: "B",
						filled: false
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: phase.status === "loading",
							children: phase.status === "loading" ? t("loading") : t("compare")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "line",
							onClick: () => {
								const nextA = { ...drafts.current.b };
								const nextB = { ...drafts.current.a };
								drafts.current = {
									a: nextA,
									b: nextB
								};
								setA(nextA);
								setB(nextB);
								if (nextA.tag.trim() && nextB.tag.trim() && search.example !== "1") go({
									a: nextA.tag.trim(),
									b: nextB.tag.trim(),
									example: ""
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
								className: "size-4",
								"aria-hidden": "true"
							}), t("swap")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "quiet",
							onClick: () => go({
								a: "",
								b: "",
								example: "1"
							}),
							children: t("example")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "quiet",
							onClick: () => {
								setA(emptyDraft());
								setB(emptyDraft());
								setPhase({ status: "idle" });
								navigate({ search: {
									a: "",
									b: "",
									example: ""
								} });
							},
							children: t("clear")
						})
					]
				})]
			}),
			phase.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "alert",
				className: "mt-4 border border-danger bg-surface px-4 py-3 text-sm text-danger",
				children: phase.messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }, message))
			}) : null,
			phase.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border border-border bg-surface p-4",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: t("loading")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t("loadingDetail")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3",
						children: [
							70,
							46,
							88
						].map((width) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full animate-pulse bg-accent",
								style: { width: `${width}%` }
							})
						}, width))
					})
				]
			}) : null,
			phase.status === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preview, { onOpen: () => go({
				a: "",
				b: "",
				example: "1"
			}) }) : null,
			phase.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Report, { comparison: phase.comparison }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-3",
				children: [
					t("how1"),
					t("how2"),
					t("how3")
				].map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl text-accent",
					children: index + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: step
				})] }, step))
			})
		]
	});
}
function PlayerFields({ draft, onChange, onFile, label, stamp, filled }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "min-w-0 p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
				className: "flex items-center gap-2 px-0 text-xs uppercase tracking-widest text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `px-2 py-1 text-xs font-medium ${filled ? "bg-accent text-accent-fg" : "border border-fg"}`,
					children: stamp
				}), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-sm",
				htmlFor: `tag-${stamp}`,
				children: [t("tagLabel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: `tag-${stamp}`,
					value: draft.tag,
					onChange: (event) => onChange({
						...draft,
						tag: event.target.value
					}),
					placeholder: t("tagPlaceholder"),
					autoCapitalize: "characters",
					autoCorrect: "off",
					spellCheck: false,
					dir: "ltr",
					className: "mt-2 h-11 w-full border border-border bg-bg px-3 text-base text-fg outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: draft.fileName ?? t("uploadLabel") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: t("uploadHint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "application/json,.json,text/plain",
							className: "sr-only",
							onChange: (event) => onFile(event.target.files?.[0] ?? null)
						})
					]
				}), draft.raw ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "quiet",
					onClick: () => onFile(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					}), t("removeFile")]
				}) : null]
			}),
			draft.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 text-sm ${draft.raw ? "text-muted" : "text-danger"}`,
				children: draft.message
			}) : null
		]
	});
}
function Preview({ onOpen }) {
	const { t } = useI18n();
	const comparison = (0, import_react.useMemo)(() => {
		const sample = workedExample();
		return compareAccounts(sample.a, sample.b);
	}, []);
	const rows = [{
		label: t("overall"),
		a: comparison.analysisA.overall.value,
		b: comparison.analysisB.overall.value
	}, ...comparison.composites.map((row) => ({
		label: t(row.id),
		a: row.a.value,
		b: row.b.value
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mt-8 border border-border bg-surface p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: t("previewKicker")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-accent underline-offset-4 hover:underline",
					onClick: onOpen,
					children: t("openExample")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm",
				children: t("previewBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs text-muted",
						children: "A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, { value: row.a })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs text-muted",
						children: "B"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						value: row.b,
						ink: true
					})] })]
				})] }, row.label))
			})
		]
	});
}
function Bar({ value, ink = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 bg-surface-2",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full ${ink ? "bg-fg" : "bg-accent"}`,
			style: { width: `${value == null ? 0 : Math.max(0, Math.min(100, value))}%` }
		})
	});
}
//#endregion
export { Home as component, routes_BChFBUJ5_exports as t };
