export function deleteItem<T>(arr: T[], item: T): T[] {
  // TODO
  // 1. arr 있는지 && length 확인
  if (!arr || arr.length === 0) {
    return arr;
  }

  const targetIdx = arr.indexOf(item);

  if (targetIdx < 0) {
    return arr;
  }

  const head = arr.splice(0, targetIdx);
  const tail = arr.splice(targetIdx - 1, arr.length);

  return head.concat(tail);
}
