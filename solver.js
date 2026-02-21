const fs = require("fs");

/* ---------- READ INPUT ---------- */
const data = JSON.parse(fs.readFileSync("input.json", "utf8"));
const k = data.keys.k;

/* ---------- BASE → BIGINT ---------- */
function baseToBigInt(value, base) {
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = 0n;
    const b = BigInt(base);

    for (const ch of value.toLowerCase()) {
        result = result * b + BigInt(digits.indexOf(ch));
    }
    return result;
}

/* ---------- EXTRACT POINTS ---------- */
let points = [];

for (const key in data) {
    if (key === "keys") continue;

    const x = BigInt(key);
    const base = parseInt(data[key].base);
    const y = baseToBigInt(data[key].value, base);

    points.push({ x, y });
}

/* ---------- SORT + TAKE k ---------- */
points.sort((a, b) => (a.x > b.x ? 1 : -1));
points = points.slice(0, k);

/* ---------- LAGRANGE f(0) ---------- */
function lagrangeAtZero(points) {
    let result = 0n;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let num = 1n;
        let den = 1n;

        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;

            let xj = points[j].x;
            num *= -xj;
            den *= (xi - xj);
        }

        result += (yi * num) / den;
    }

    return result;
}

const secret = lagrangeAtZero(points);

console.log("Secret:", secret.toString());
