export default function TdDataCell({
  value,
  isLeftBorder,
  isBgOff,
  isTemp,
}: {
  value: number;
  isLeftBorder?: boolean;
  isBgOff?: boolean;
  isTemp?: boolean;
}) {
  let borderCss = "";
  if (isLeftBorder) {
    borderCss = "border-l border-base-content";
  }
  let bgCss = "";
  if (isTemp) {
    bgCss = "bg-temp";
  } else if (!isBgOff && value <= 0) {
    bgCss = "bg-invalid";
  }

  return <td className={`text-right ${borderCss} ${bgCss}`}>{`${value} %`}</td>;
}
