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
        const d = digits.indexOf(ch);
        if (d === -1 || d >= base) {
            throw new Error(`Invalid digit ${ch} for base ${base}`);
        }
        result = result * b + BigInt(d);
    }
    return result;
}

/* ---------- EXTRACT POINTS ---------- */
let points = [];

for (const key in data) {
    if (key === "keys") continue;

    const x = BigInt(key);
    const base = Number(data[key].base);
    const y = baseToBigInt(data[key].value, base);

    points.push({ x, y });
}

/* ---------- SORT + TAKE k ---------- */
points.sort((a, b) => (a.x < b.x ? -1 : 1));
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

            const xj = points[j].x;
            num *= -xj;
            den *= (xi - xj);
        }

        // multiply before divide to keep integer precision
        result += (yi * num) / den;
    }

    return result;
}

const secret = lagrangeAtZero(points);

console.log("Secret:", secret.toString());
