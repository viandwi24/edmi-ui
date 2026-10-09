// Tiny d3-style curve factories (the docs app does not depend on d3-shape directly).
// LayerChart's `Spline` accepts any d3 `CurveFactory`.
type Ctx = {
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	bezierCurveTo(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x: number,
		y: number,
	): void;
	closePath(): void;
};

// d3.curveStep (t = 0.5): steps at the midpoint between two points.
export function curveStep(context: Ctx) {
	let x = 0;
	let y = 0;
	let line = 0;
	let point = 0;
	return {
		areaStart() {
			line = 0;
		},
		areaEnd() {
			line = Number.NaN;
		},
		lineStart() {
			x = y = Number.NaN;
			point = 0;
		},
		lineEnd() {
			if (point === 2) context.lineTo(x, y);
			if (line || (line !== 0 && point === 1)) context.closePath();
			if (line >= 0) line = 1 - line;
		},
		point(px: number, py: number) {
			px = +px;
			py = +py;
			if (point === 0) {
				point = 1;
				if (line) context.lineTo(px, py);
				else context.moveTo(px, py);
			} else {
				point = 2;
				const mid = (x + px) / 2;
				context.lineTo(mid, y);
				context.lineTo(mid, py);
			}
			x = px;
			y = py;
		},
	};
}

function controlPoints(x: number[]) {
	const n = x.length - 1;
	const a = new Array<number>(n);
	const b = new Array<number>(n);
	const r = new Array<number>(n);
	a[0] = 0;
	b[0] = 2;
	r[0] = x[0] + 2 * x[1];
	for (let i = 1; i < n - 1; ++i) {
		a[i] = 1;
		b[i] = 4;
		r[i] = 4 * x[i] + 2 * x[i + 1];
	}
	a[n - 1] = 2;
	b[n - 1] = 7;
	r[n - 1] = 8 * x[n - 1] + x[n];
	for (let i = 1; i < n; ++i) {
		const m = a[i] / b[i - 1];
		b[i] -= m;
		r[i] -= m * r[i - 1];
	}
	a[n - 1] = r[n - 1] / b[n - 1];
	for (let i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	b[n - 1] = (x[n] + a[n - 1]) / 2;
	for (let i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	return [a, b];
}

// d3.curveNatural: natural cubic spline.
export function curveNatural(context: Ctx) {
	let xs: number[] = [];
	let ys: number[] = [];
	let line = 0;
	const flush = () => {
		const n = xs.length;
		if (n) {
			context[line ? "lineTo" : "moveTo"](xs[0], ys[0]);
			if (n === 2) context.lineTo(xs[1], ys[1]);
			else if (n > 2) {
				const [ax, bx] = controlPoints(xs);
				const [ay, by] = controlPoints(ys);
				for (let i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
					context.bezierCurveTo(ax[i0], ay[i0], bx[i0], by[i0], xs[i1], ys[i1]);
				}
			}
		}
	};
	return {
		areaStart() {
			line = 0;
		},
		areaEnd() {
			line = Number.NaN;
		},
		lineStart() {
			xs = [];
			ys = [];
		},
		lineEnd() {
			flush();
			if (line || (line !== 0 && xs.length === 1)) context.closePath();
			line = 1 - line;
		},
		point(x: number, y: number) {
			xs.push(+x);
			ys.push(+y);
		},
	};
}
