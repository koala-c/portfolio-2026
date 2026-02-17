"use client";

import { useEffect, useRef, useState } from "react";
import { PersonStanding, RotateCcw, Volume2, Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type AccessibilityPreferences = {
  fontSize: "100" | "112" | "125";
  highContrast: boolean;
  readableFont: boolean;
  dyslexiaMode: boolean;
  underlineLinks: boolean;
  lineSpacing: boolean;
  reducedMotion: boolean;
  focusHighlight: boolean;
};

const STORAGE_KEY = "portfolio-a11y-preferences";

const defaultPreferences: AccessibilityPreferences = {
  fontSize: "100",
  highContrast: false,
  readableFont: false,
  dyslexiaMode: false,
  underlineLinks: false,
  lineSpacing: false,
  reducedMotion: false,
  focusHighlight: false,
};

export function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<"idle" | "speaking" | "paused">("idle");
  const panelRef = useRef<HTMLElement | null>(null);
  const activeSpeechIdRef = useRef(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AccessibilityPreferences>;
        setPrefs({
          ...defaultPreferences,
          ...parsed,
        });
      }
    } catch {
      setPrefs(defaultPreferences);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const root = document.documentElement;
    root.style.setProperty("--a11y-font-size", `${prefs.fontSize}%`);
    root.classList.toggle("a11y-high-contrast", prefs.highContrast);
    root.classList.toggle("a11y-readable-font", prefs.readableFont);
    root.classList.toggle("a11y-dyslexia", prefs.dyslexiaMode);
    root.classList.toggle("a11y-underline-links", prefs.underlineLinks);
    root.classList.toggle("a11y-line-spacing", prefs.lineSpacing);
    root.classList.toggle("a11y-reduced-motion", prefs.reducedMotion);
    root.classList.toggle("a11y-focus-highlight", prefs.focusHighlight);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs, loaded]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (!panelRef.current || !open) return;
      const target = event.target as Node;
      if (!panelRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const toggle = (key: keyof Omit<AccessibilityPreferences, "fontSize">) => {
    setPrefs((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const updateFontSize = (fontSize: AccessibilityPreferences["fontSize"]) => {
    setPrefs((previous) => ({
      ...previous,
      fontSize,
    }));
  };

  const stopSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    activeSpeechIdRef.current += 1;
    window.speechSynthesis.cancel();
    setSpeechStatus("idle");
  };

  const speakText = (text: string) => {
    if (!text.trim() || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    activeSpeechIdRef.current += 1;
    const speechId = activeSpeechIdRef.current;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.documentElement.lang || "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
      if (activeSpeechIdRef.current !== speechId) return;
      setSpeechStatus("idle");
    };
    utterance.onerror = () => {
      if (activeSpeechIdRef.current !== speechId) return;
      setSpeechStatus("idle");
    };
    utterance.onpause = () => {
      if (activeSpeechIdRef.current !== speechId) return;
      setSpeechStatus("paused");
    };
    utterance.onresume = () => {
      if (activeSpeechIdRef.current !== speechId) return;
      setSpeechStatus("speaking");
    };
    utterance.onstart = () => {
      if (activeSpeechIdRef.current !== speechId) return;
      setSpeechStatus("speaking");
    };
    window.speechSynthesis.speak(utterance);
    setSpeechStatus("speaking");
  };

  const readPage = () => {
    if (typeof window === "undefined") return;
    const contentRoot = document.querySelector("main") ?? document.body;
    const nodes = Array.from(contentRoot.querySelectorAll("h1, h2, h3, p, li, figcaption"));
    const seen = new Set<string>();

    const chunks = nodes
      .filter((node) => {
        const element = node as HTMLElement;
        if (element.closest("header, nav, footer")) return false;
        if (element.closest("#accessibility-panel")) return false;
        return element.offsetParent !== null;
      })
      .map((node) => node.textContent?.replace(/\s+/g, " ").trim() ?? "")
      .filter((text) => {
        if (!text || seen.has(text)) return false;
        seen.add(text);
        return true;
      });

    speakText(chunks.join(". "));
  };

  const readSelection = () => {
    if (typeof window === "undefined") return;
    const selectedText = window.getSelection()?.toString().trim() ?? "";
    if (selectedText.length > 0) {
      speakText(selectedText);
      return;
    }
    readPage();
  };

  const togglePauseSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speechStatus === "speaking") {
      window.speechSynthesis.pause();
      setSpeechStatus("paused");
      return;
    }

    if (speechStatus === "paused") {
      window.speechSynthesis.resume();
      setSpeechStatus("speaking");
    }
  };

  const resetPreferences = () => {
    setPrefs(defaultPreferences);
    stopSpeech();
  };

  useEffect(() => {
    return () => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      activeSpeechIdRef.current += 1;
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        type="button"
        size="icon"
        className="h-10 w-10 rounded-none p-0 shadow-lg [&_svg]:h-6 [&_svg]:w-6"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-label="Opciones de accesibilidad"
      >
        <PersonStanding />
      </Button>

      {open && (
        <section
          ref={panelRef}
          id="accessibility-panel"
          className="mt-3 w-[min(92vw,340px)] rounded-none border border-border bg-card p-4 text-card-foreground shadow-2xl"
          aria-label="Panel de accesibilidad"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-sm font-bold uppercase tracking-wide">Accesibilidad</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetPreferences}
              className="h-8 px-2 text-xs"
              aria-label="Restablecer accesibilidad"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-xs uppercase text-muted-foreground">Tamano de texto</p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={prefs.fontSize === "100" ? "default" : "outline"}
                onClick={() => updateFontSize("100")}
              >
                Normal
              </Button>
              <Button
                type="button"
                size="sm"
                variant={prefs.fontSize === "112" ? "default" : "outline"}
                onClick={() => updateFontSize("112")}
              >
                Grande
              </Button>
              <Button
                type="button"
                size="sm"
                variant={prefs.fontSize === "125" ? "default" : "outline"}
                onClick={() => updateFontSize("125")}
              >
                XL
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <OptionRow
              id="a11y-high-contrast"
              label="Alto contraste"
              checked={prefs.highContrast}
              onCheckedChange={() => toggle("highContrast")}
            />
            <OptionRow
              id="a11y-readable-font"
              label="Fuente legible"
              checked={prefs.readableFont}
              onCheckedChange={() => toggle("readableFont")}
            />
            <OptionRow
              id="a11y-dyslexia"
              label="Modo dislexia (global)"
              checked={prefs.dyslexiaMode}
              onCheckedChange={() => toggle("dyslexiaMode")}
            />
            <OptionRow
              id="a11y-underline-links"
              label="Subrayar enlaces"
              checked={prefs.underlineLinks}
              onCheckedChange={() => toggle("underlineLinks")}
            />
            <OptionRow
              id="a11y-line-spacing"
              label="Mayor espaciado"
              checked={prefs.lineSpacing}
              onCheckedChange={() => toggle("lineSpacing")}
            />
            <OptionRow
              id="a11y-reduced-motion"
              label="Reducir movimiento"
              checked={prefs.reducedMotion}
              onCheckedChange={() => toggle("reducedMotion")}
            />
            <OptionRow
              id="a11y-focus-highlight"
              label="Resaltar foco teclado"
              checked={prefs.focusHighlight}
              onCheckedChange={() => toggle("focusHighlight")}
            />
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-xs uppercase text-muted-foreground">Lectura en voz alta</p>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" size="sm" onClick={readSelection}>
                <Volume2 className="h-4 w-4" />
                Seleccion
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={readPage}>
                <Play className="h-4 w-4" />
                Pagina
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={togglePauseSpeech}
                disabled={speechStatus === "idle"}
              >
                <Pause className="h-4 w-4" />
                {speechStatus === "paused" ? "Reanudar" : "Pausar"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={stopSpeech}
                disabled={speechStatus === "idle"}
              >
                <Square className="h-4 w-4" />
                Detener
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

type OptionRowProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
};

function OptionRow({ id, label, checked, onCheckedChange }: OptionRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
