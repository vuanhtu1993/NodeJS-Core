function LCS(a, b) {
	const m = a.length;
	const n = b.length;
	let C = [];
	for (let i = 0; i <= m; i++) {
	}
	C.push([0]);
	for (let j = 0; j <= n; j++) C[0].push(0);
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			C[i + 1][j + 1] = a[i] === b[j]
				? C[i][j + 1]
				: Math.max(C[i + 1][j], C[i][j + 1])
		}
	}
	return (function bt(i, j) {
		if (i * j === 0) {
			return '';
		}
		if (a[i - 1] === b[j - 1]) {
			return bt(i - 1, j - 1);
		}
		return (C[i][j - 1] > C[i - 1][j])
		? bt(i, j - 1)
			: bt(i - 1, j)
	}(m, n));
}
LCS([]);