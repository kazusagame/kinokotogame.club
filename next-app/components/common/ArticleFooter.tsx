import Link from "next/link";

interface FooterProps {
  isAbsoluteBottom?: boolean;
}

export default function ArticleFooter({ isAbsoluteBottom }: FooterProps) {
  const position = isAbsoluteBottom ? "absolute bottom-0" : "static";

  return (
    <footer
      className={`footer footer-center bg-base-300 text-base-content p-4 ${position}`}
    >
      <aside>
        <Link href="/">
          <small>&copy; {new Date().getFullYear()} きのことゲーム部</small>
        </Link>
      </aside>
    </footer>
  );
}
