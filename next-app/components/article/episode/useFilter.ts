import { useState } from "react";

export type GirlType = "All" | "SWEET" | "COOL" | "POP" | "---";
export type GirlGrade = "All" | "1年" | "2年" | "3年" | "---";
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
    if (e.target.name === "girlType") {
      setFilter({
        ...filter,
        girlType: e.target.value as GirlType,
      });
    } else if (e.target.name === "girlGrade") {
      setFilter({
        ...filter,
        girlGrade: e.target.value as GirlGrade,
      });
    } else if (e.target.name === "girlSchool") {
      setFilter({
        ...filter,
        girlSchool: e.target.value as GirlSchool,
      });
    }
  };

  return { filter, handleChangeFilter };
}
