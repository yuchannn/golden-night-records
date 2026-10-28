"use client";

import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/lib/content";
import { SectionLink } from "@/components/section-link";
import { Wordmark } from "@/components/wordmark";

const linkClass =
  "story-link inline-flex min-h-11 items-baseline gap-2 px-1 text-ink hover:text-burgundy";

export function SiteHeader() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches && menuRef.current?.open) {
        menuRef.current.close();
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function openMenu() {
    const dialog = menuRef.current;
    if (!dialog || dialog.open) return;
    restoreFocus.current = true;
    setMenuOpen(true);
    dialog.showModal();
  }

  function closeMenu(restore = true) {
    restoreFocus.current = restore;
    menuRef.current?.close();
  }

  function onMenuClose() {
    setMenuOpen(false);
    if (!restoreFocus.current) {
      restoreFocus.current = true;
      return;
    }
    const button = menuButtonRef.current;
    queueMicrotask(() => {
      if (button && document.activeElement === document.body) {
        button.focus();
      }
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-cream">
      <div className="h-[3px] bg-ink" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-[76rem] items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-8">
        <Wordmark />
        <nav aria-label="主要" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigation.map((item) => (
            <SectionLink key={item.id} id={item.id} className={linkClass}>
              <span className="font-serif-tc text-[1.02rem]">{item.labelZh}</span>
              <span lang="en" className="font-sans text-[0.65rem] font-medium tracking-[0.14em] uppercase">
                {item.labelEn}
              </span>
            </SectionLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <SectionLink
            id="music"
            className="inline-flex min-h-11 items-center bg-ink px-3 text-sm font-medium text-cream transition hover:bg-burgundy motion-safe:hover:-translate-y-0.5 sm:px-4"
          >
            探索音樂
          </SectionLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink/20 px-3 text-sm font-medium lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={openMenu}
          >
            選單
          </button>
        </div>
      </div>
      <dialog
        ref={menuRef}
        id={menuId}
        className="gnr-menu"
        aria-label="網站選單"
        onClose={onMenuClose}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeMenu(true);
        }}
      >
        <div className="mx-auto flex min-h-full max-w-[76rem] flex-col px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <Wordmark />
            <button
              type="button"
              className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-medium"
              onClick={() => closeMenu(true)}
            >
              關閉
            </button>
          </div>
          <nav aria-label="手機" className="mt-10 flex flex-col">
            {navigation.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                onClick={() => closeMenu(false)}
                className="flex min-h-14 items-baseline gap-3 border-b border-gold/40 py-3"
              >
                <span className="font-serif-tc text-3xl font-semibold">{item.labelZh}</span>
                <span lang="en" className="font-sans text-xs font-medium tracking-[0.16em] uppercase">
                  {item.labelEn}
                </span>
              </SectionLink>
            ))}
          </nav>
          <SectionLink
            id="music"
            onClick={() => closeMenu(false)}
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-ink px-5 text-cream transition-colors hover:bg-burgundy"
          >
            探索音樂
          </SectionLink>
        </div>
      </dialog>
    </header>
  );
}
