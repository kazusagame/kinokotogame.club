interface boardSettingInf {
  board3x3: {
    catUrl: string;
    dogUrl: string;
    originImageList: string[];
    squareNum: number;
  };
  board4x4: {
    catUrl: string;
    dogUrl: string;
    originImageList: string[];
    squareNum: number;
  };
  board5x5: {
    catUrl: string;
    dogUrl: string;
    originImageList: string[];
    squareNum: number;
  };
}

const boardSetting: boardSettingInf = {
  board3x3: {
    catUrl: "https://api.thecatapi.com/v1/images/search?limit=10",
    dogUrl: "https://api.thedogapi.com/v1/images/search?limit=10",
    originImageList: [
      "/image/petitMatching/01_GoldKey.png",
      "/image/petitMatching/02_BronzeKey.png",
      "/image/petitMatching/03_Candy.png",
      "/image/petitMatching/04_Gage.png",
    ],
    squareNum: 9,
  },
  board4x4: {
    catUrl: "https://api.thecatapi.com/v1/images/search?limit=10",
    dogUrl: "https://api.thedogapi.com/v1/images/search?limit=10",
    originImageList: [
      "/image/petitMatching/01_GoldKey.png",
      "/image/petitMatching/02_BronzeKey.png",
      "/image/petitMatching/03_Candy.png",
      "/image/petitMatching/04_Gage.png",
      "/image/petitMatching/11_Strawberry.png",
      "/image/petitMatching/12_Soda.png",
      "/image/petitMatching/13_Cake.png",
      "/image/petitMatching/14_Pudding.png",
    ],
    squareNum: 16,
  },
  board5x5: {
    catUrl: "https://api.thecatapi.com/v1/images/search?limit=10",
    dogUrl: "https://api.thedogapi.com/v1/images/search?limit=10",
    originImageList: [
      "/image/petitMatching/01_GoldKey.png",
      "/image/petitMatching/02_BronzeKey.png",
      "/image/petitMatching/03_Candy.png",
      "/image/petitMatching/04_Gage.png",
      "/image/petitMatching/11_Strawberry.png",
      "/image/petitMatching/12_Soda.png",
      "/image/petitMatching/13_Cake.png",
      "/image/petitMatching/14_Pudding.png",
      "/image/petitMatching/21_Creampuff.png",
      "/image/petitMatching/22_Macaron.png",
      "/image/petitMatching/23_crepe.png",
      "/image/petitMatching/24_cookie.png",
    ],
    squareNum: 25,
  },
};

export const imageMapping = async (
  gameMode: string,
  imageMode: string,
  boardMode: "3x3" | "4x4" | "5x5"
): Promise<string[]> => {
  let imageUrls: string[] = Array(25).fill("/image/petitMatching/05_Ng.png");

  if (imageMode === "origin") {
    imageUrls = imageUrls.map((value, index) => {
      const rest =
        index % boardSetting[`board${boardMode}`]["originImageList"].length;
      if (boardMode === "3x3" && index >= 8) {
        return value;
      } else if (boardMode === "4x4" && index >= 16) {
        return value;
      } else if (boardMode === "5x5" && index >= 24) {
        return value;
      } else {
        return boardSetting[`board${boardMode}`]["originImageList"][rest];
      }
    });
  } else if (imageMode === "cat") {
    const res = await fetch(boardSetting[`board${boardMode}`]["catUrl"]);
    const images = await res.json();
    if (boardMode === "5x5") {
      const res_2 = await fetch(boardSetting[`board${boardMode}`]["catUrl"]);
      const images_2 = await res_2.json();
      images.push(images_2[0], images_2[1]);
    }
    imageUrls = imageUrls.map((value, index) => {
      const rest =
        index % boardSetting[`board${boardMode}`]["originImageList"].length;
      if (boardMode === "3x3" && index >= 8) {
        return value;
      } else if (boardMode === "4x4" && index >= 16) {
        return value;
      } else if (boardMode === "5x5" && index >= 24) {
        return value;
      } else {
        return images[rest]["url"];
      }
    });
  } else if (imageMode === "dog") {
    const res = await fetch(boardSetting[`board${boardMode}`]["dogUrl"]);
    const images = await res.json();
    if (boardMode === "5x5") {
      const res_2 = await fetch(boardSetting[`board${boardMode}`]["catUrl"]);
      const images_2 = await res_2.json();
      images.push(images_2[0], images_2[1]);
    }
    imageUrls = imageUrls.map((value, index) => {
      const rest =
        index % boardSetting[`board${boardMode}`]["originImageList"].length;
      if (boardMode === "3x3" && index >= 8) {
        return value;
      } else if (boardMode === "4x4" && index >= 16) {
        return value;
      } else if (boardMode === "5x5" && index >= 24) {
        return value;
      } else {
        return images[rest]["url"];
      }
    });
  }

  /* 順番シャッフル */
  const squareNum: number = boardSetting[`board${boardMode}`]["squareNum"];
  for (let i = squareNum - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
  }

  return imageUrls;
};
