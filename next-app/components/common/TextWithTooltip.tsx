import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { OverridableStringUnion } from "@mui/types";
import { SvgIconPropsSizeOverrides } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export default function TextWithTooltip({
  displayText,
  tipText,
  iconSize,
}: {
  displayText: string;
  tipText: string;
  iconSize?: OverridableStringUnion<
    "large" | "medium" | "small" | "inherit",
    SvgIconPropsSizeOverrides
  >;
}) {
  const iconSizeCss = iconSize || "small";

  return (
    <>
      <Tooltip
        title={tipText}
        arrow
        enterTouchDelay={250}
        leaveTouchDelay={5000}
      >
        <span className="flex flex-row items-center w-fit">
          <span className="mr-1">{displayText}</span>
          <HelpOutlineIcon fontSize={iconSizeCss} />
        </span>
      </Tooltip>
    </>
  );
}
