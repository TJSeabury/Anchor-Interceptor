import Utils from '../src/Utils';

// mock data
const a = [1, 2, 3];
const b = [3, 4, 5];

test(
    'intersect',
    () => {
        expect(Utils.intersect(a, b))
            .toStrictEqual([3]);

    }
);

test(
    'difference',
    () => {
        expect(Utils.difference(a, b))
            .toStrictEqual([1, 2]);
        expect(Utils.difference(b, a))
            .toStrictEqual([4, 5]);

    }
);

test(
    'symetricDifference',
    () => {
        expect(Utils.symetricDifference(a, b))
            .toStrictEqual([1, 2, 4, 5]);

    }
);

test(
    'union',
    () => {
        expect(Utils.union(a, b))
            .toStrictEqual([1, 2, 3, 4, 5]);
    }
);