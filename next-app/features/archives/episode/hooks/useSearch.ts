import { useState, RefObject } from "react";
import { searchEpisode } from "@/lib/firebase/searchEpisode";

export const EPISODE_NAME = {
  "seio-story": "聖櫻ストーリー",
  "raid-episode": "たすけて！マイヒーロー",
  "story-episode": "聖櫻学園物語",
  romance: "2人だけのストーリー",
  theater: "聖櫻学園劇場",
  "episode-etc": "その他 エピソード",
} as const;

export const COLLECTION_LIST = [
  "seio-story",
  "raid-episode",
  "story-episode",
  "romance",
  "theater",
  "episode-etc",
] as const;
export type Collection = (typeof COLLECTION_LIST)[number];

const ALL_UNDEFINED = {
  "seio-story": undefined,
  "raid-episode": undefined,
  "story-episode": undefined,
  romance: undefined,
  theater: undefined,
  "episode-etc": undefined,
} as const;

export default function useSearch(
  selectRef: RefObject<HTMLSelectElement | null>,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    [K in Collection]:
      | { [K: string]: string | number | number[] }[]
      | undefined;
  }>(ALL_UNDEFINED);
  const [error, setError] =
    useState<{ [K in Collection]: string | undefined }>(ALL_UNDEFINED);

  const handleClickSearchButton = async () => {
    const selectValue = selectRef.current?.value;
    if (selectValue) {
      setIsLoading(true);
      setResult(ALL_UNDEFINED);
      setError(ALL_UNDEFINED);

      const allResult = await searchEpisode({
        COLLECTION_LIST: [...COLLECTION_LIST],
        profileId: Number(selectValue),
      });

      const tempResult: {
        [K in Collection]:
          | { [K: string]: string | number | number[] }[]
          | undefined;
      } = structuredClone(ALL_UNDEFINED);
      const tempError: { [K in Collection]: string | undefined } =
        structuredClone(ALL_UNDEFINED);
      allResult.forEach((result, index) => {
        if (result["status"] === "success") {
          tempResult[COLLECTION_LIST[index]] = result["data"];
        } else {
          tempError[COLLECTION_LIST[index]] = result["reason"];
        }
      });

      setResult(tempResult);
      setError(tempError);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    result,
    error,
    handleClickSearchButton,
  };
}
