import Link from "next/link";
import Image from "next-export-optimize-images/image";

export interface MenuCardProps {
  id: number;
  title: string[];
  path: string;
  img: string;
  width: number;
  height: number;
  imgAlt: string;
  isNewTab?: boolean;
  isNoReferrer?: boolean;
}

export default function MenuCard({
  title,
  path,
  img,
  imgAlt,
  width,
  height,
  isNewTab,
  isNoReferrer,
}: MenuCardProps) {
  const newTab = isNewTab ? "_blank" : "_self";
  const noReferrer = isNoReferrer ? "noreferrer" : "";

  return (
    <Link href={path} target={newTab} rel={noReferrer}>
      <div className="relative border-2 border-base-content rounded-2xl">
        <div className="absolute w-full h-full z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,oklch(var(--b1))_1px,oklch(var(--b1))_4px)] rounded-2xl"></div>
        <Image
          src={img}
          width={width}
          height={height}
          alt={imgAlt}
          className="opacity-30 rounded-2xl"
        />
        <p className="absolute top-0 flex flex-col items-center justify-center w-full h-full z-20 text-xl/relaxed sm:text-3xl/relaxed md:text-2xl/relaxed lg:text-4xl/relaxed font-black">
          {title.map((text, index) => {
            return (
              <span key={index} className="inline-block">
                {text}
              </span>
            );
          })}
        </p>
      </div>
    </Link>
  );
}
