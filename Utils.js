export default class Utils {
    intersect ( a, b ) {
        return a.filter( x => b.includes( x ) );
    }

    difference ( a, b ) {
        return a.filter( x => !b.includes( x ) );
    }

    symetricDifference ( a, b ) {
        return this.difference( a, b ).concat( this.difference( b, a ) );
    }

    union ( a, b ) {
        return [...new Set( [...a, ...b] )];
    }
}