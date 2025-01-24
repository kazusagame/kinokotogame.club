"use client";

import { useState, useId } from "react";

interface Props {
  title: string;
  jsonFileName: string;
}

const TILE_COLOR = {
  "0": "#FFFFFF",
  S: "#FFFFFF",
  "↑1": "#FFFE91",
  "↑2": "#FFDD91",
  "↓1": "#D7F5FF",
  "↓2": "#B7D6FF",
  C: "#FFE6F6",
  I: "#D2FCB0",
  "!": "#F7C5BE",
  "?": "#E0E0E0",
  G: "#FFFFFF",
  R1: "#C2F0DC ",
  R2: "#AAF0D1",
} as const;
type tile = keyof typeof TILE_COLOR;

export default function BoardMap({ title, jsonFileName }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [mapData, setMapData] = useState<tile[][]>([[]]);
  const [tileData, setTileData] = useState<{ [K: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const checkboxId = useId();

  const handleCollapseChange = async () => {
    if (!isLoaded) {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetch(jsonFileName).then((res) => res.json());
        setMapData(result.map);
        setTileData(result.tile_list);
        setIsLoaded(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期せぬエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-300 my-2">
      <input type="checkbox" id={checkboxId} onChange={handleCollapseChange} />
      <div className="collapse-title text-xl">{title}</div>
      <div className="collapse-content overflow-x-auto">
        {isLoading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {!isLoading && error && <span className="">{error}</span>}
        {isLoaded && (
          <>
            <div className="flex flex-col gap-0">
              {mapData.map((row, index) => (
                <div key={index} className="flex flex-nowrap gap-0">
                  {row.map((cell, index) => {
                    if (cell !== "0")
                      return (
                        <div
                          key={index}
                          className="flex justify-center items-center min-w-8 min-h-8 rounded-md border border-primary-content text-primary-content"
                          style={{
                            backgroundColor: TILE_COLOR[cell],
                          }}
                        >
                          {cell}
                        </div>
                      );
                    else
                      return (
                        <div key={index} className="min-w-8 min-h-8"></div>
                      );
                  })}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 text-sm mt-4">
              {Object.entries(tileData).map(([key, value]) => {
                return (
                  <span key={key}>
                    {key}： {value}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
