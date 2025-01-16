/**
 * Provide 3 unique implementations of the following function in JavaScript.
 *
 * **Input**: `n` - any integer
 *
 * *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
 *
 * **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

/**
 * Implementation 1
 * Use a for loop to iterate from 1 to n and add the current number to the sum.
 */

var sum_to_n_a = function (n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
};

/**
 * Implementation 2
 * Use the formula for the sum of an arithmetic series to calculate the sum.
 */

var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2;
}

/**
 * Implementation 3
 * Use recursion to calculate the sum.
 */

var sum_to_n_c = function (n) {
    if (n === 1) {
        return 1;
    }

    return n + sum_to_n_c(n - 1);
}
