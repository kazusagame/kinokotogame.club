export function roundRect({
  ctx,
  x,
  y,
  xDiff,
  yDiff,
  rad,
  strokeColor,
  fillColor,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  xDiff: number;
  yDiff: number;
  rad: number;
  strokeColor: string;
  fillColor: string;
}) {
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.setLineDash([]);
  ctx.moveTo(x, y + rad);
  ctx.arcTo(x, y + yDiff, x + rad, y + yDiff, rad);
  ctx.arcTo(x + xDiff, y + yDiff, x + xDiff, y + yDiff - rad, rad);
  ctx.arcTo(x + xDiff, y, x + xDiff - rad, y, rad);
  ctx.arcTo(x, y, x, y + rad, rad);
  ctx.stroke();
  ctx.fill();
}

export function ngRect({
  ctx,
  x,
  y,
  xDiff,
  yDiff,
  strokeColor,
  fillColor,
}: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  xDiff: number;
  yDiff: number;
  strokeColor: string;
  fillColor: string;
}) {
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.setLineDash([]);
  ctx.rect(x, y, xDiff, yDiff);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.setLineDash([]);
  ctx.moveTo(x, y);
  ctx.lineTo(x + xDiff, y + yDiff);
  ctx.moveTo(x + xDiff, y);
  ctx.lineTo(x, y + yDiff);
  ctx.stroke();
}
