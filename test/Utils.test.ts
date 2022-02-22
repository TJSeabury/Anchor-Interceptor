import Utils from '../src/Utils';

test('Utils', () => {
    expect(Utils.intersect(
        [1, 2, 3],
        [3, 4, 5]
    )).toStrictEqual([3]);
});