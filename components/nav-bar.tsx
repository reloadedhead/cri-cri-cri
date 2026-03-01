"use client";

import { DicesIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export function Navbar() {
  const params = useParams();
  const pathname = usePathname();

  const isCharacterSheet = pathname?.startsWith("/characters/") && !!params?.id;

  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-secondary-background px-5">
      <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
        <div className="flex items-center xl:gap-10 gap-10">
          <Link
            className="text-[22px] size-8 rounded-base flex bg-main text-main-foreground border-2 border-black items-center justify-center font-heading"
            href="/"
          >
            <DicesIcon />
          </Link>
          <div className="items-center text-base font-base xl:gap-10 lg:flex gap-10 hidden">
            {isCharacterSheet ? (
              <>
                <Link href={`/characters/${params?.id}/sheet`}>Sheet</Link>
                <Link href={`/characters/${params?.id}/log`}>Log</Link>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-4 hidden">
          <button
            data-slot="button"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-base font-base ring-offset-white transition-all gap-2 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-main-foreground border-2 border-border hover:translate-x-boxShadowX hover:translate-y-boxShadowY py-2 relative bg-secondary-background dark:text-white shadow-nav dark:shadow-navDark hover:translate-x-[4px]! hover:translate-y-[4px]! hover:shadow-none dark:hover:shadow-none px-3 pr-3 xl:pr-16 shrink-0 xl:w-[unset] w-9 h-9 text-base"
          >
            <span className="flex text-sm items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-search xl:!size-4 !size-5 shrink-0"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="xl:inline hidden">Search</span>
            </span>
            <span className="absolute xl:flex hidden items-center justify-center text-black border text-xs px-1 border-black rounded-base bg-main h-6 right-2 top-1">
              ⌘ K
            </span>
          </button>
          <div
            data-slot="dialog-header"
            className="flex flex-col gap-2 text-center sm:text-left sr-only"
          >
            <h2
              id="radix-:R2cdbH1:"
              data-slot="dialog-title"
              className="text-lg font-heading leading-none tracking-tight"
            >
              Search documentation
            </h2>
            <p
              id="radix-:R2cdbH2:"
              data-slot="dialog-description"
              className="text-sm font-base text-foreground"
            >
              Search for a command to run...
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
