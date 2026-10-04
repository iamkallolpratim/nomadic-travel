import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Icon } from "./Icon";
import { Img } from "./Img";

/** Sticky top bar for inner pages: back arrow + page name + home logo. */
export function TopBar({ title, back = "/" }: { title: string; back?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="col flex h-14 items-center gap-3">
        <Link href={back} aria-label="Back" className="-ml-1 rounded-full p-1.5 text-forest-900 hover:bg-forest-50">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <p className="truncate font-display text-[15px] font-semibold text-forest-900">{title}</p>
        <Link href="/" className="ml-auto flex-none" aria-label="Nomadic Travel home">
          <Image src="/logo-header.png" alt="Nomadic Travel" width={72} height={32} className="h-7 w-auto" />
        </Link>
      </div>
    </header>
  );
}

/** Narrow page body used on every inner page. */
export function Page({ children }: { children: ReactNode }) {
  return <div className="col space-y-4 pb-16 pt-5">{children}</div>;
}

export function Panel({ title, children, id, className = "" }: { title?: string; children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} aria-label={title} className={`panel reveal scroll-mt-20 ${className}`}>
      {title && <h2 className="panel-title">{title}</h2>}
      {children}
    </section>
  );
}

const pill = "group flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-forest-200";

/** The linktree-style button. Pass an icon key or a thumbnail image file. */
export function LinkButton({ href, label, sub, icon, image, accent, external }: { href: string; label: string; sub?: string; icon?: string; image?: string; accent?: string; external?: boolean }) {
  const inner = (
    <>
      <span className={`relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-xl ${image ? "" : "bg-forest-50 text-forest-700"}`}>
        {image ? <Img file={image} sizes="40px" className="object-cover" alt="" /> : icon ? <Icon name={icon} className="h-5 w-5" /> : null}
        {accent && <span className={`absolute bottom-0 left-0 h-1 w-full ${accent}`} aria-hidden />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-forest-900">{label}</span>
        {sub && <span className="block truncate text-xs text-slate-600">{sub}</span>}
      </span>
      <ChevronRight className="h-4 w-4 flex-none text-slate-400 transition group-hover:translate-x-0.5" aria-hidden />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pill}>{inner}</a>
  ) : (
    <Link href={href} className={pill}>{inner}</Link>
  );
}

/** Compact list row (thumbnail + title + meta) for places, activities, guides and tours. */
export function LinkRow({ href, title, meta, image, badge }: { href: string; title: string; meta?: string; image?: string; badge?: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-forest-50/70">
        <span className="relative h-14 w-14 flex-none overflow-hidden rounded-xl bg-forest-100">
          <Img file={image} sizes="56px" className="object-cover" alt="" />
        </span>
        <span className="min-w-0 flex-1">
          {badge && <span className="block text-[11px] font-semibold uppercase tracking-wider text-tea-700">{badge}</span>}
          <span className="block truncate text-sm font-semibold text-forest-900 group-hover:text-forest-700">{title}</span>
          {meta && <span className="block truncate text-xs text-slate-600">{meta}</span>}
        </span>
        <ChevronRight className="h-4 w-4 flex-none text-slate-400" aria-hidden />
      </Link>
    </li>
  );
}

export function LinkList({ children }: { children: ReactNode }) {
  return <ul className="-mx-2 divide-y divide-slate-100">{children}</ul>;
}

/** Small icon + label + value tiles (best season, duration, permit…). */
export function FactGrid({ items }: { items: { icon: string; label: string; value?: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2">
      {items.filter((i) => i.value).map((i) => (
        <div key={i.label} className="rounded-2xl bg-forest-50/70 p-3">
          <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-forest-800">
            <Icon name={i.icon} className="h-3.5 w-3.5" />{i.label}
          </dt>
          <dd className="mt-1 text-xs leading-5 text-slate-700">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
