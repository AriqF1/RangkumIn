"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ScanSearch, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center sm:px-5">
      <motion.nav
        layout
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
        }}
        animate={{
          width: scrolled ? 860 : 1100,
        }}
        className="w-full max-w-6xl"
      >
        <div
          className={`
            flex items-center justify-between

            border border-border/70

            bg-background/70

            backdrop-blur-2xl

            transition-all

            duration-300

            ${
              scrolled
                ? "h-14 rounded-2xl px-5 shadow-xl shadow-black/5"
                : "h-16 rounded-3xl px-6"
            }
          `}
        >
          {/* LEFT */}

          <Link href="/" className="flex items-center gap-3">
            <motion.div
              layout
              className="flex items-center justify-center rounded-xl border bg-muted"
              animate={{
                width: scrolled ? 36 : 42,
                height: scrolled ? 36 : 42,
              }}
            >
              <ScanSearch size={scrolled ? 18 : 20} />
            </motion.div>

            <div>
              <motion.h2 layout className="font-semibold tracking-tight">
                RangkumIn
              </motion.h2>

              {!scrolled && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-muted-foreground"
                >
                  AI Receipt Workspace
                </motion.p>
              )}
            </div>
          </Link>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            {!scrolled && (
              <Button variant="ghost" asChild>
                <Link href="#workspace">Workspace</Link>
              </Button>
            )}

            <Button variant="outline" asChild>
              <Link
                href="https://github.com/AriqF1"
                target="_blank"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <span className="hidden sm:inline">GitHub</span>

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
