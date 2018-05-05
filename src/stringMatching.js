function bruteForce(pattern, text) {
	const n = text.length;
	const m = pattern.length;
  let count = 0;
	for (let i = 0; i <= n - m; i++) {
		let j = 0;
		while (j < m && text.charAt(i + j) === pattern.charAt(j)) {
			j++;
		}
		if (j === m) count ++;
	}
	return count;
}

const pattern = "ABCDABD";
const text = "ABC ABCDAB ABDDABCDABDE ABCDABD";

let index = bruteForce(pattern, text);
console.log(index);