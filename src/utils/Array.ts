export function deleteItem<T>(arr: T[], item: T): T[] {
  if (!arr || arr.length === 0) {
    return arr;
  }

  const targetIdx = arr.indexOf(item);

  if (targetIdx < 0) {
    return arr;
  }

  if (arr.length === 1) {
    return arr.splice(0, targetIdx);
  }

  let head: T[] = [];
  let tail: T[] = [];

  if (targetIdx === 0) {
    return arr.splice(1, arr.length);
  }

  if (targetIdx === 1) {
    head = [arr[0]];
  } else {
    head = arr.slice(0, targetIdx);
  }

  if (targetIdx !== arr.length - 1) {
    tail = arr.splice(targetIdx + 1, arr.length - 1);
  }

  return head.concat(tail);
}

export function filterByItem<T>(repos: T[], value: string): T[] {
  if (value === '') {
    return repos;
  }
  return repos.filter((repo: T) =>
    (repo as any).name.toLowerCase().includes(value.toLowerCase()),
  );
}
