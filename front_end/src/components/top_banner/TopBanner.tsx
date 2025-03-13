import * as React from "react";
import Image from "next/image";

export function TopBanner() {

  return (
    <div className="flex justify-center">
      <div
        className="relative overflow-hidden lg:h-[570px]"
      >
        <Image
          src="/img/BG.png"
          alt="banner"
          className="object-cover"
          width={1440}
          height={600}
        />
      </div>
    </div>
  );
}
