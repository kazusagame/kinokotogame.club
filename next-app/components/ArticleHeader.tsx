import Link from "next/link";
import ThemeController from "@/components/ThemeController";
import ThemeControllerMini from "@/components/ThemeControllerMini";

interface HeaderProps {
  isAbsoluteTop?: boolean;
}

export default function ArticleHeader({ isAbsoluteTop }: HeaderProps) {
  const position = isAbsoluteTop ? "absolute top-0" : "static";

  return (
    <header className={`flex items-center ${position}`}>
      <div className="ml-auto">
        <nav>
          <ul className="menu menu-horizontal">
            <li>
              <Link href="/decksim/" className="link">
                センバツシミュレーター
              </Link>
            </li>
            <li>
              <Link href="/archives/" className="link">
                アーカイブス
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mr-2 md:hidden">
        <ThemeControllerMini />
      </div>
      <div className="ml-4 mr-6 max-md:hidden">
        <ThemeController />
      </div>
    </header>
  );
}
