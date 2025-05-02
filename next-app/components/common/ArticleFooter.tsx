import Link from "next/link";

interface FooterProps {
  isAbsoluteBottom?: boolean;
}

export default function ArticleFooter({ isAbsoluteBottom }: FooterProps) {
  const position = isAbsoluteBottom ? "absolute bottom-0" : "static";

  return (
    <footer
      className={`footer footer-horizontal footer-center bg-base-300 text-base-content p-4 gap-y-2 ${position}`}
    >
      <nav className="grid grid-flow-col gap-4">
        <Link href="/privacy-policy/" className="link">
          プライバシーポリシー
        </Link>
      </nav>
      <aside>
        <Link href="/">
          <small>&copy; {new Date().getFullYear()} きのことゲーム部</small>
        </Link>
      </aside>
    </footer>
  );
}
