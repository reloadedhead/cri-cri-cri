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
      </div>
    </nav>
  );
}
