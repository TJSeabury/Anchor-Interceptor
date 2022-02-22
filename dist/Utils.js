export default class Utils {
    static intersect(a, b) {
        return a.filter(x => b.includes(x));
    }
    static difference(a, b) {
        return a.filter(x => !b.includes(x));
    }
    static symetricDifference(a, b) {
        return Utils.difference(a, b).concat(Utils.difference(b, a));
    }
    static union(a, b) {
        return [...new Set([...a, ...b])];
    }
}
//# sourceMappingURL=Utils.js.map