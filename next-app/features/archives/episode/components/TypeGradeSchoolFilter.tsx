import { FilterRules } from "@/features/archives/episode/hooks/useFilter";

interface Props {
  filter: FilterRules;
  onChangeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TypeGradeSchoolFilter({
  filter,
  onChangeFilter,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlType"
            className="radio"
            value="All"
            onChange={onChangeFilter}
            checked={filter.girlType === "All"}
          />
          <span className="label-text ml-2">ALL</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlType"
            className="radio"
            value="SWEET"
            onChange={onChangeFilter}
            checked={filter.girlType === "SWEET"}
          />
          <span className="label-text ml-2">SWEET</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlType"
            className="radio"
            value="COOL"
            onChange={onChangeFilter}
            checked={filter.girlType === "COOL"}
          />
          <span className="label-text ml-2">COOL</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlType"
            className="radio"
            value="POP"
            onChange={onChangeFilter}
            checked={filter.girlType === "POP"}
          />
          <span className="label-text ml-2">POP</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlType"
            className="radio"
            value="---"
            onChange={onChangeFilter}
            checked={filter.girlType === "---"}
          />
          <span className="label-text ml-2">その他</span>
        </label>
      </div>
      <hr className="h-px bg-neutral border-0" />
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlGrade"
            className="radio"
            value="All"
            onChange={onChangeFilter}
            checked={filter.girlGrade === "All"}
          />
          <span className="label-text ml-2">ALL</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlGrade"
            className="radio"
            value="1年生"
            onChange={onChangeFilter}
            checked={filter.girlGrade === "1年生"}
          />
          <span className="label-text ml-2">1年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlGrade"
            className="radio"
            value="2年生"
            onChange={onChangeFilter}
            checked={filter.girlGrade === "2年生"}
          />
          <span className="label-text ml-2">2年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlGrade"
            className="radio"
            value="3年生"
            onChange={onChangeFilter}
            checked={filter.girlGrade === "3年生"}
          />
          <span className="label-text ml-2">3年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlGrade"
            className="radio"
            value="---"
            onChange={onChangeFilter}
            checked={filter.girlGrade === "---"}
          />
          <span className="label-text ml-2">その他</span>
        </label>
      </div>
      <hr className="h-px bg-neutral border-0" />
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlSchool"
            className="radio"
            value="All"
            onChange={onChangeFilter}
            checked={filter.girlSchool === "All"}
          />
          <span className="label-text ml-2">ALL</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlSchool"
            className="radio"
            value="Seio"
            onChange={onChangeFilter}
            checked={filter.girlSchool === "Seio"}
          />
          <span className="label-text ml-2">聖櫻学園</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="girlSchool"
            className="radio"
            value="Others"
            onChange={onChangeFilter}
            checked={filter.girlSchool === "Others"}
          />
          <span className="label-text ml-2">他校</span>
        </label>
      </div>
    </div>
  );
}
