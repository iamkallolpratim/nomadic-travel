import Link from "next/link";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export function Socials({ className = "" }: { className?: string }) {
  const items = [
    { href: site.sameAs[2], label: "YouTube", I: YoutubeIcon },
    { href: site.sameAs[1], label: "Instagram", I: InstagramIcon },
    { href: site.sameAs[0], label: "Facebook", I: FacebookIcon },
  ];
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {items.map(({ href, label, I }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full p-2.5 text-forest-800 transition hover:bg-white hover:shadow-sm">
          <I className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

/** Minimal footer with consistent NAP for local SEO. */
export function SiteFooter() {
  const a = site.address;
  return (
    <footer className="col pb-24 pt-6 text-center text-xs text-slate-600">
      <Socials />
      <a
        href={site.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-forest-900 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex text-amber-500" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
        </span>
        Rate us on Google
      </a>
      <nav aria-label="Footer" className="mt-2 flex flex-wrap justify-center gap-x-1 font-medium text-forest-800">
        <Link href="/tours" className="inline-block px-2 py-1.5 hover:underline">Tours</Link>
        <Link href="/activities" className="inline-block px-2 py-1.5 hover:underline">Activities</Link>
        <Link href="/travel-guide" className="inline-block px-2 py-1.5 hover:underline">Travel guide</Link>
        <Link href="/about" className="inline-block px-2 py-1.5 hover:underline">About</Link>
        <Link href="/contact" className="inline-block px-2 py-1.5 hover:underline">Contact</Link>
        <Link href="/credits" className="inline-block px-2 py-1.5 hover:underline">Photo credits</Link>
      </nav>
      <address className="mt-4 not-italic leading-5">
        {site.name} · {a.street}, {a.locality}, {a.region} {a.postalCode}
        <br />
        <a href={`tel:${site.phoneE164}`} className="inline-block px-2 py-1.5 hover:underline">{site.phone}</a> · <a href={`mailto:${site.email}`} className="inline-block px-2 py-1.5 hover:underline">{site.email}</a>
      </address>
      <p className="mt-3">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
