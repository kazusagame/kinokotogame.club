import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MenuGrid({ children }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-4 px-0 md:px-4">
      {children}
    </div>
  );
}
