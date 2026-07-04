import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 items-center">
          <div className="flex flex-col items-start lg:col-span-5">
            <div className="mb-6 flex items-center gap-3"></div>

            <h1 className="mb-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-5xl/tight">
              Turn receipts into structured data.
            </h1>

            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Extract printed text from receipts directly in your browser.
              Client-side OCR securely converts raw images into structured JSON
              formats for expense tracking and AI processing.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-none bg-foreground text-background hover:bg-foreground/90 px-6 h-11">
                Start Processing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>100% Local Processing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Visualization */}
          <div className="lg:col-span-7">
            <div className="relative rounded border border-border bg-card shadow-sm">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    extraction_pipeline.ts
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-border" />
                  <div className="h-2 w-2 rounded-full bg-border" />
                  <div className="h-2 w-2 rounded-full bg-border" />
                </div>
              </div>

              {/* Window Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Visualizer Pane */}
                <div className="relative flex min-h-[340px] items-center justify-center bg-muted/10 p-6 overflow-hidden">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />

                  {/* Receipt Element */}
                  <div className="relative z-10 w-48 border border-border bg-background p-5 font-mono text-[10px] text-muted-foreground shadow-sm">
                    <div className="mb-3 border-b border-border/50 pb-2 text-center text-xs font-semibold text-foreground">
                      CAFE BOREALIS
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span>Latte</span>
                        <span>$4.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pastry</span>
                        <span>$3.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>$0.60</span>
                      </div>
                    </div>
                    <div className="mt-3 border-t border-border/50 pt-2">
                      <div className="flex justify-between font-semibold text-foreground">
                        <span>TOTAL</span>
                        <span>$8.10</span>
                      </div>
                    </div>

                    {/* OCR Targeting Box Overlay */}
                    <div className="absolute top-[55%] left-3 right-3 h-6 border border-primary/40 bg-primary/10">
                      <div className="absolute -top-1 -left-1 h-2 w-2 border-l border-t border-primary" />
                      <div className="absolute -top-1 -right-1 h-2 w-2 border-r border-t border-primary" />
                      <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-primary" />
                      <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-primary" />
                      <div className="absolute -right-1 -top-4 font-mono text-[8px] text-primary">
                        TARGET_FOUND
                      </div>
                    </div>
                  </div>
                </div>

                {/* Output Pane */}
                <div className="bg-background p-6 overflow-x-auto">
                  <pre className="font-mono text-[11px] leading-relaxed tracking-tight">
                    <span className="text-muted-foreground">{`{`}</span>
                    <br />
                    <span className="text-muted-foreground"> "id": </span>
                    <span className="text-foreground">"rcpt_8f92a1"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "merchant": </span>
                    <span className="text-foreground">"Cafe Borealis"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "date": </span>
                    <span className="text-foreground">"2026-07-04"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "currency": </span>
                    <span className="text-foreground">"USD"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "total": </span>
                    <span className="text-foreground">8.10</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground">
                      {" "}
                      "confidence_score":{" "}
                    </span>
                    <span className="text-foreground">0.98</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground">
                      {" "}
                      "line_items": [
                    </span>
                    <br />
                    <span className="text-muted-foreground"> {`{`}</span>
                    <br />
                    <span className="text-muted-foreground"> "desc": </span>
                    <span className="text-foreground">"Latte"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "amount": </span>
                    <span className="text-foreground">4.50</span>
                    <br />
                    <span className="text-muted-foreground"> {`}`},</span>
                    <br />
                    <span className="text-muted-foreground"> {`{`}</span>
                    <br />
                    <span className="text-muted-foreground"> "desc": </span>
                    <span className="text-foreground">"Pastry"</span>
                    <span className="text-muted-foreground">,</span>
                    <br />
                    <span className="text-muted-foreground"> "amount": </span>
                    <span className="text-foreground">3.00</span>
                    <br />
                    <span className="text-muted-foreground"> {`}`}</span>
                    <br />
                    <span className="text-muted-foreground"> ]</span>
                    <br />
                    <span className="text-muted-foreground">{`}`}</span>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
