import { useState } from "react";

export type GirlType = "All" | "SWEET" | "COOL" | "POP" | "---";
export type GirlGrade = "All" | "1年生" | "2年生" | "3年生" | "---";
export type GirlSchool = "All" | "Seio" | "Others";
export interface FilterRules {
  girlType: GirlType;
  girlGrade: GirlGrade;
  girlSchool: GirlSchool;
}

export default function useFilter() {
  const [filter, setFilter] = useState<FilterRules>({
    girlType: "All",
    girlGrade: "All",
    girlSchool: "All",
  });

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name === "girlType") {
      setFilter({
        ...filter,
        girlType: e.currentTarget.value as GirlType,
      });
    } else if (e.currentTarget.name === "girlGrade") {
      setFilter({
        ...filter,
        girlGrade: e.currentTarget.value as GirlGrade,
      });
    } else if (e.currentTarget.name === "girlSchool") {
      setFilter({
        ...filter,
        girlSchool: e.currentTarget.value as GirlSchool,
      });
    }
  };

  return { filter, handleChangeFilter };
}
