import Image from "next-export-optimize-images/image";
import ImageRemote from "next/image";
import { useRef, CSSProperties } from "react";

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function Card({
  cardState,
  cardPair,
  imageUrl,
  loading,
  cardZoom,
  onClick,
}: {
  cardState: boolean;
  cardPair: boolean;
  imageUrl: string;
  loading: boolean;
  cardZoom: boolean;
  onClick: (event: React.MouseEvent) => void;
}) {
  const nodeRef = useRef(null);

  let frontCardStyle: CSSProperties;
  if (cardPair === true) {
    frontCardStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      transform: "rotateY(180deg)",
      border: "2px solid",
      borderRadius: "0.5rem",
      borderColor: "rgba(185, 28, 28, 1)",
      backgroundColor: "rgba(253, 242, 248, 1)",
    };
  } else {
    frontCardStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      transform: "rotateY(180deg)",
      border: "2px solid",
      borderRadius: "0.5rem",
      borderColor: "rgba(0, 0, 0, 1)",
      backgroundColor: "rgba(255, 255, 255, 1)",
    };
  }

  return (
    <div>
      <div
        style={cardStyle}
        onClick={onClick}
        ref={nodeRef}
        className={cardState ? "animate-flipOpen" : "animate-flipClose"}
      >
        {/* 表側カード */}
        <div style={frontCardStyle}>
          <FrontImage
            imageUrl={imageUrl}
            loading={loading}
            cardZoom={cardZoom}
          />
        </div>

        {/* 裏側カード */}
        <div
          style={backCardStyle}
          className="border-2 border-black hover:border-[#B91C1C]"
        >
          <BackImage />
        </div>
      </div>
    </div>
  );
}

const cardStyle: CSSProperties = {
  width: "100%",
  height: "auto",
  aspectRatio: "3 / 4",
  position: "relative",
  transformStyle: "preserve-3d",
  borderRadius: "0.5rem",
  boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  userSelect: "none",
  cursor: "pointer",
};

const backCardStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  padding: "0.5rem",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  backgroundColor: "white",
  borderRadius: "0.5rem",
};

const FrontImage = ({
  imageUrl,
  loading,
  cardZoom,
}: {
  imageUrl: string;
  loading: boolean;
  cardZoom: boolean;
}) => {
  let isLocal: boolean = false;
  if (/^\/image/.test(imageUrl)) {
    isLocal = true;
  }

  return (
    <div className="w-full h-full flex justify-center items-center select-none overflow-hidden relative">
      {loading ? (
        <Image
          className="object-contain p-2 rounded-lg"
          src="/image/petitMatching/06_NowLoading.png"
          alt={imageUrl}
          fill
          sizes="33vw"
          priority
        />
      ) : isLocal ? (
        <Image
          className="object-contain p-2 rounded-lg"
          src={imageUrl}
          alt={imageUrl}
          fill
          sizes="33vw"
          priority
        />
      ) : cardZoom ? (
        <ImageRemote
          className="object-cover rounded-md"
          src={imageUrl}
          alt={imageUrl}
          fill
          sizes="33vw"
          priority
          loader={imageLoader}
        />
      ) : (
        <ImageRemote
          className="object-contain rounded-md"
          src={imageUrl}
          alt={imageUrl}
          fill
          sizes="33vw"
          priority
          loader={imageLoader}
        />
      )}
    </div>
  );
};

const BackImage = () => {
  return <div style={backImage} className="w-full h-full"></div>;
};

const backImage: CSSProperties = {
  border: "1px black solid",
  borderRadius: "0.25rem",
  backgroundColor: "#ffebee",
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255, 128, 255, 0.5) 0px 6px, transparent 6px 12px), repeating-linear-gradient(90deg, rgba(255, 128, 255, 0.5) 0px 6px, transparent 6px 12px)",
};
