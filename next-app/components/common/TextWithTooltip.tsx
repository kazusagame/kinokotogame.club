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
        enterTouchDelay={0}
        leaveTouchDelay={10000}
      >
        <span className="p-1">
          <span className="mr-1">{displayText}</span>
          <HelpOutlineIcon fontSize={iconSizeCss} className="align-sub" />
        </span>
      </Tooltip>
    </>
  );
}
