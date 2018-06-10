/**
 * 전달받은 selector로 HTMLElement를 반환한다.
 * @param selector string
 */
export const $ = (selector: string): HTMLElement => {
  return document.querySelector(selector) as HTMLElement;
};
