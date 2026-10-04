import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Page, TopBar } from "@/components/ui/Minimal";
import { allImages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Photo Credits & Licences | Nomadic Travel",
  description: "Credits and licence details for photographs used on Nomadic Travel, sourced from Wikimedia Commons under Creative Commons and public-domain licences.",
  path: "/credits",
});

export default function CreditsPage() {
  const images = allImages().sort((a, b) => a.file.localeCompare(b.file));
  return (
    <>
    <TopBar title="Photo credits" />
    <Page>
      <Breadcrumbs items={[{ name: "Photo credits", href: "/credits" }]} />
      <h1 className="px-1 text-3xl text-forest-950">Photo credits</h1>
      <p className="px-1 text-sm leading-6 text-slate-700">
        Photographs of our own vehicles are © Nomadic Travel. All other photographs are sourced from Wikimedia Commons and used under the licences listed below. Images may have been resized and
        converted to WebP. Thank you to every photographer who shares their work freely. If you are a rights holder and believe an image is credited
        incorrectly, please email us.
      </p>
      <ul className="panel divide-y divide-slate-100 p-0">
        {images.map((m) => (
          <li key={m.file} className="px-4 py-3 text-xs leading-5">
            <p className="font-medium text-slate-800">{m.alt}</p>
            {m.sourceUrl ? (
              <p className="text-slate-600">
                © {m.author} · {m.licenseUrl ? <a href={m.licenseUrl} target="_blank" rel="noopener noreferrer nofollow" className="link">{m.license}</a> : m.license} ·{" "}
                <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="link">Wikimedia Commons</a>
              </p>
            ) : (
              <p className="text-slate-600">{m.license}</p>
            )}
          </li>
        ))}
      </ul>
    </Page>
    </>
  );
}
