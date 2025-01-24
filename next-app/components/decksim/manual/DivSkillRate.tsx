"use client";

import { useState, useId } from "react";

import {
  SKILL_RATE_DATA,
  MAX_SKILL_LEVEL,
  SkillStrength,
} from "@/components/decksim/data/skillData";
import TdDataCell from "@/components/decksim/manual/TdDataCell";

export default function DivSkillRate() {
  const [skillLevel, setSkillLevel] = useState<number>(MAX_SKILL_LEVEL);
  const selectId = useId();

  return (
    <div className="my-4 md:pl-4">
      <div className="mt-2 mb-4">
        <span className="mr-4">声援Lv</span>
        <select
          id={selectId}
          className="select select-bordered"
          value={skillLevel}
          onChange={(e) => {
            setSkillLevel(Number(e.target.value));
          }}
        >
          <option value={18}>18</option>
          <option value={17}>17</option>
          <option value={16}>16</option>
          <option value={15}>15</option>
          <option value={14}>14</option>
          <option value={13}>13</option>
          <option value={12}>12</option>
          <option value={11}>11</option>
          <option value={10}>10</option>
        </select>
      </div>
      <SkillRateTable
        title="単タイプ・主+副・副人数 1"
        skillLevel={skillLevel}
        skillType="単タイプ"
        skillCategory="主＋副"
        skillSubRange="副人数1"
      />
      <SkillRateTable
        title="単タイプ・主+副・副人数 2以上"
        skillLevel={skillLevel}
        skillType="単タイプ"
        skillCategory="主＋副"
        skillSubRange="副人数2"
      />
      <SkillRateTable
        title="単タイプ・主のみ・副人数 0"
        skillLevel={skillLevel}
        skillType="単タイプ"
        skillCategory="主のみ"
        skillSubRange="副人数0"
      />
      <SkillRateTable
        title="単タイプ・副のみ・副人数 2以上"
        skillLevel={skillLevel}
        skillType="単タイプ"
        skillCategory="副のみ"
        skillSubRange="副人数2"
      />
      <SkillRateTable
        title="全タイプ・主+副・副人数 1"
        skillLevel={skillLevel}
        skillType="全タイプ"
        skillCategory="主＋副"
        skillSubRange="副人数1"
      />
      <SkillRateTable
        title="全タイプ・主のみ・副人数 0"
        skillLevel={skillLevel}
        skillType="全タイプ"
        skillCategory="主のみ"
        skillSubRange="副人数0"
      />
      <SkillRateTable
        title="全タイプ・副のみ・副人数 2以上"
        skillLevel={skillLevel}
        skillType="全タイプ"
        skillCategory="副のみ"
        skillSubRange="副人数2"
      />
      <p className="mt-6">
        <span className="bg-temp px-2 py-1 mr-2">黄色</span>は暫定値
      </p>
    </div>
  );
}

function SkillRateTable({
  title,
  skillLevel,
  skillType,
  skillCategory,
  skillSubRange,
}: {
  title: string;
  skillLevel: number;
  skillType: "単タイプ" | "全タイプ";
  skillCategory: "主＋副" | "主のみ" | "副のみ";
  skillSubRange: "副人数0" | "副人数1" | "副人数2";
}) {
  const skillRateMap =
    SKILL_RATE_DATA?.[skillType]?.[skillCategory]?.[skillSubRange];
  if (!skillRateMap) return null;

  const skillStrengthList: [SkillStrength, string][] = [
    ["中", "中"],
    ["中+", "中+"],
    ["中++", "中++"],
    ["大", "大"],
    ["特大", "特大"],
    ["特大+", "特大+"],
    ["特大++", "特大++"],
    ["スーパー特大", "ｽｰﾊﾟｰ特大"],
    ["スーパー特大+", "ｽｰﾊﾟｰ特大+"],
    ["スーパー特大++", "ｽｰﾊﾟｰ特大++"],
    ["超スーパー特大", "超ｽｰﾊﾟｰ特大"],
  ];
  const skillEffectList: ("攻" | "守" | "攻守")[] = ["攻", "守", "攻守"];

  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mb-2">
        {title}
      </h2>
      <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap mb-4">
        <thead>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th></th>
            {skillStrengthList.map((v, i) => (
              <th key={i} className="text-center">
                {v[1]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skillEffectList.map((vTr, iTr) => (
            <tr key={iTr} className="odd:bg-base-300 even:bg-base-200">
              <td>{vTr}</td>
              {skillStrengthList.map((vTd, iTd) =>
                skillRateMap?.[vTr]?.[vTd[0]] ? (
                  <TdDataCell
                    key={iTd}
                    value={skillRateMap[vTr][vTd[0]]!.value + skillLevel - 1}
                    isTemp={skillRateMap[vTr][vTd[0]]!.isTemp}
                  />
                ) : (
                  <TdDataCell key={iTd} value={0} />
                )
              )}
            </tr>
          ))}
          <tr className="odd:bg-base-300 even:bg-base-200"></tr>
        </tbody>
      </table>
    </>
  );
}
