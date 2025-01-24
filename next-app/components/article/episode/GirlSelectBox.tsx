import { forwardRef, useId } from "react";
import { FilterRules } from "./useFilter";

import { NAME_TO_PROFILE_CONVERT } from "@/lib/girlsProfile";

interface Props {
  filter: FilterRules;
}

export default forwardRef<HTMLSelectElement, Props>(function GirlSelectBox(
  { filter },
  ref
) {
  const selectId = useId();
  const optionList: { profileId: string; name: string }[] = [];
  const keys = Object.keys(NAME_TO_PROFILE_CONVERT);

  keys.forEach((name) => {
    const { profileId, type, grade, school } = NAME_TO_PROFILE_CONVERT[name];
    const otherSchools = ["嵯峨椿高校", "鳳歌院高校", "昇星高校", "玉宮高校"];
    let schoolCondition = "Seio";
    if (otherSchools.includes(school)) schoolCondition = "Others";

    if (
      (filter.girlType === "All" || filter.girlType === type) &&
      (filter.girlGrade === "All" || filter.girlGrade === grade) &&
      (filter.girlSchool === "All" || filter.girlSchool === schoolCondition)
    ) {
      optionList.push({ profileId, name });
    }
  });
  if (optionList.length === 0) {
    optionList.push({ profileId: "", name: "該当ガールなし" });
  }

  return (
    <select
      id={selectId}
      className="select select-bordered w-full max-w-xs"
      ref={ref}
    >
      {optionList.map(({ profileId, name }) => (
        <option value={profileId} key={profileId}>
          {name}
        </option>
      ))}
    </select>
  );
});
