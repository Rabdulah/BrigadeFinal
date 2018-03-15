import { helper } from '@ember/component/helper';

export function isEqual([q1, q2]) {
  console.log("x");
  return q1 === q2;
}
export default helper(isEqual);
