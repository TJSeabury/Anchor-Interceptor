export default class Utils {
    static intersect(a: any[], b: any[]): any[] {
        return a.filter(x => b.includes(x));
    }

    static difference(a: any[], b: any[]): any[] {
        return a.filter(x => !b.includes(x));
    }

    static symetricDifference(a: any[], b: any[]): any[] {
        return this.difference(a, b).concat(this.difference(b, a));
    }

    static union(a: any[], b: any[]): any[] {
        return [...new Set([...a, ...b])];
    }
}