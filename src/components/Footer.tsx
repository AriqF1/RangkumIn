import Link from "next/link";
import { Globe, GitGraphIcon, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        {/* Bagian Kiri: Brand & Deskripsi */}
        <div className="space-y-4 md:w-1/2">
          <h3 className="text-xl font-bold tracking-tight">RangkumIn</h3>

          <p className="max-w-sm leading-relaxed text-muted-foreground text-sm">
            Client-side OCR application for transforming receipt images into
            structured JSON data. Fast, secure, and privacy-first.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="font-semibold tracking-tight text-sm uppercase text-muted-foreground">
              Project
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
                Documentation
              </Link>
              <Link
                href="https://github.com/ariqf1/RangkumIn"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitGraphIcon className="h-4 w-4" />
                Source Code
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold tracking-tight text-sm uppercase text-muted-foreground">
              Developer
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="https://farhanariq.my.id"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 className="h-4 w-4" />
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Kredit */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RangkumIn.
          </p>

          {/* Indie Touch 2: Sentuhan Personal */}
          <p className="text-sm text-muted-foreground">
            Crafted with Next.js in Semarang
          </p>
        </div>
      </div>
    </footer>
  );
}
