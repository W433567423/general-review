const setA = new Set();
setA.add(1);
setA.add(2);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

console.log('🚀 ~ setA:', setA);
console.log('🚀 ~ setB:', setB);
// 并集
console.log('🚀 ~ new Set([...setA, ...setB]):', new Set([...setA, ...setB])); // 🚀 ~ new Set([...setA, ...setB]): [1, 2, 3, 4]
// 交集
console.log(
	'🚀 ~ new Set([...setA].filter((value) => setB.has(value))):',
	new Set([...setA].filter((value) => setB.has(value)))
); // 🚀 ~ new Set([...setA].filter((value) => setB.has(value))): [2]
// 差集
console.log(
	'🚀 ~ new Set([...setA].filter((value) => !setB.has(value))):',
	new Set([...setA].filter((value) => !setB.has(value)))
); // 🚀 ~ new Set([...setA].filter((value) => !setB.has(value))): [1]
