import { Queue } from './2.队列';
/**
 * DONE
 * @description 击鼓传花
 * @author tutu
 * @time 2024-02-23 16:34:39
 * @param {T[]} list 参赛者列表
 * @param {number} num 击鼓传花的次数
 * @returns {}
 */
const hotPotato = <T>(list: T[], num: number) => {
	const queue = new Queue();
	const eliminatedList = [];
	// 将参赛者放入队列
	list.forEach((e) => queue.enqueue(e));
	console.log('🚀 ~ 游戏开始:', list);

	while (queue.size() > 1) {
		for (let i = 0; i < num; i++) {
			// console.log('🚀 ~ hotPotato ~ i:', i, queue.peek());
			queue.enqueue(queue.dequeue());
		}
		console.log('🚀 ~ 击鼓到,淘汰一位:', queue.peek());

		eliminatedList.push(queue.dequeue());
		console.log('🚀 ~ 击鼓队列:', [queue.toString()]);
	}

	return {
		eliminated: eliminatedList,
		winner: queue.dequeue()
	};
};

const names = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
const result = hotPotato(names, 7);
console.log(`胜利者：${result.winner}`);
