export type GirlType = "SWEET" | "COOL" | "POP" | "---";
export type GirlGrade = "1年" | "2年" | "3年" | "---";
export type GirlSchool =
  | "Seio"
  | "Others"
  | "Collabo"
  | "Childhood"
  | "Family"
  | "Mascot";
export type Config = "Randomize" | "FullBodyImage";

export interface GameMode {
  girlType: { [K in GirlType]: boolean };
  girlGrade: { [K in GirlGrade]: boolean };
  girlSchool: { [K in GirlSchool]: boolean };
  config: { [K in Config]: boolean };
}

interface Props {
  onChangeGameMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gameMode: GameMode;
}

export default function GameModeSelector({
  onChangeGameMode,
  gameMode,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlType"
            className="checkbox"
            value="SWEET"
            onChange={onChangeGameMode}
            checked={gameMode.girlType.SWEET}
          />
          <span className="label-text ml-2">SWEET</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlType"
            className="checkbox"
            value="COOL"
            onChange={onChangeGameMode}
            checked={gameMode.girlType.COOL}
          />
          <span className="label-text ml-2">COOL</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlType"
            className="checkbox"
            value="POP"
            onChange={onChangeGameMode}
            checked={gameMode.girlType.POP}
          />
          <span className="label-text ml-2">POP</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlType"
            className="checkbox"
            value="---"
            onChange={onChangeGameMode}
            checked={gameMode.girlType["---"]}
          />
          <span className="label-text ml-2">その他</span>
        </label>
      </div>
      <hr className="h-px bg-neutral border-0" />
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlGrade"
            className="checkbox"
            value="1年"
            onChange={onChangeGameMode}
            checked={gameMode.girlGrade["1年"]}
          />
          <span className="label-text ml-2">1年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlGrade"
            className="checkbox"
            value="2年"
            onChange={onChangeGameMode}
            checked={gameMode.girlGrade["2年"]}
          />
          <span className="label-text ml-2">2年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlGrade"
            className="checkbox"
            value="3年"
            onChange={onChangeGameMode}
            checked={gameMode.girlGrade["3年"]}
          />
          <span className="label-text ml-2">3年生</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlGrade"
            className="checkbox"
            value="---"
            onChange={onChangeGameMode}
            checked={gameMode.girlGrade["---"]}
          />
          <span className="label-text ml-2">その他</span>
        </label>
      </div>
      <hr className="h-px bg-neutral border-0" />
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Seio"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Seio}
          />
          <span className="label-text ml-2">聖櫻学園</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Others"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Others}
          />
          <span className="label-text ml-2">他校</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Collabo"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Collabo}
          />
          <span className="label-text ml-2">コラボ</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Childhood"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Childhood}
          />
          <span className="label-text ml-2">幼少期</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Family"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Family}
          />
          <span className="label-text ml-2">家族</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="girlSchool"
            className="checkbox"
            value="Mascot"
            onChange={onChangeGameMode}
            checked={gameMode.girlSchool.Mascot}
          />
          <span className="label-text ml-2">マスコット</span>
        </label>
      </div>
      <hr className="h-px bg-neutral border-0" />
      <div className="flex flex-wrap gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="config"
            className="checkbox"
            value="Randomize"
            onChange={onChangeGameMode}
            checked={gameMode.config.Randomize}
          />
          <span className="label-text ml-2">対戦順をランダム化</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="config"
            className="checkbox"
            value="FullBodyImage"
            onChange={onChangeGameMode}
            checked={gameMode.config.FullBodyImage}
          />
          <span className="label-text ml-2">
            全身立ち絵に変更（もしあれば）
          </span>
        </label>
      </div>
    </div>
  );
}
