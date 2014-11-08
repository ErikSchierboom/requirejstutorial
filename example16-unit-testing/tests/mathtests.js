define(['QUnit', 'scripts/math'], function(QUnit, math) {
    test('add should add positive numbers.', function() {
        equal(math.add(3, 4), 7, 'The return should be 7.');
        equal(math.add(5, 3), 8, 'The return should be 8.');
    });

    test('add should add negative numbers.', function() {
        equal(math.add(-1, -2), -3, 'The return should be -3.');
        equal(math.add(-2, -3), -5, 'The return should be -8.');
    });
});