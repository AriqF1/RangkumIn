import Link from "next/link";

import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">RangkumIn</h3>

          <p className="max-w-sm leading-7 text-muted-foreground">
            Client-side OCR application for transforming receipt images into
            structured data using modern web technologies.
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-semibold">Project</p>

          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              Documentation
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RangkumIn
          </p>

          <p className="text-sm text-muted-foreground">
            Built with Next.js & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
