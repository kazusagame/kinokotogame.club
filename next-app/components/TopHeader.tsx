import ThemeController from "@/components/ThemeController";
import ThemeControllerMini from "@/components/ThemeControllerMini";

interface HeaderProps {
  isAbsoluteTop?: boolean;
}

export default function TopHeader({ isAbsoluteTop }: HeaderProps) {
  const position = isAbsoluteTop ? "absolute top-0" : "static";

  return (
    <header className={`flex items-center h-[52px] ${position}`}>
      <div className="ml-auto mr-2 md:hidden">
        <ThemeControllerMini />
      </div>
      <div className="ml-auto mr-6 max-md:hidden">
        <ThemeController />
      </div>
    </header>
  );
}
