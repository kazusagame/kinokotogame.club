import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function SortableItem({
  id,
  children,
  classStrings,
  itemCount,
}: {
  id: string;
  children: React.ReactNode;
  classStrings: string;
  itemCount: number;
}) {
  const {
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${classStrings} ${
        Number(id) === itemCount && "rounded-b-xl"
      }`}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={`flex justify-start items-center gap-1 touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <DragIndicatorIcon className="opacity-60" />
        <div className="w-4 text-center">{id}</div>
      </div>
      {children}
    </div>
  );
}
