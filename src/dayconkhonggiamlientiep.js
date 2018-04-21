function test(arr) {
	for (let i = 0; i < n - 1; i++) {
		if (arr[i] < arr[i + 1]) {

		}
	}
}

function test1(arr) {
	let L = [];
	let X = [];
	const n = arr.length;
	let len = 1, lenmax = 1;
	let Lmax;
	L[0] = 1;
	X[0] = 1;
	for (let i = 1; i <= n; i++) {
		Lmax = 0;
		for (let j = i - 1; j >= 1; j--) {
			if ((X[j] <= X[i]) && (L[j] > Lmax)) {
				Lmax = L[j];
			}
			L[i] = Lmax + 1;
		}
	}
	Lmax = 0;
	let r = 0;
	for (let i = 0; i <= n; i++) {
		if (Lmax < L[i]) {
			Lmax = L[i];
			r = i;
		}
	}
		return L;
}

console.log(test1([12, 5, 16, 9, 6, 4, 7, 11, 5]));