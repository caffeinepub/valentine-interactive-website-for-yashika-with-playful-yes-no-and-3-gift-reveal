export function getRandomPosition(
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number
): { top: number; left: number } {
  const maxLeft = containerWidth - elementWidth;
  const maxTop = containerHeight - elementHeight;

  const left = Math.max(0, Math.random() * maxLeft);
  const top = Math.max(0, Math.random() * maxTop);

  return { top, left };
}
