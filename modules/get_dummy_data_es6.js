module.exports.time_promise_gen = (range, delay) => {

    return new Promise((resolve, reject) => {

        var num = Math.floor(Math.random() * range);

        console.log(`Promise generated for ${num}, awaiting fulfillment.`);

        setTimeout(() => {
            if (num > range * 0.5) {
                resolve(`The number ${num} was greater than ${range * 0.5}. (resolved)}`);
            } else {
                reject(`The number ${num} was less than ${range * 0.5}. (rejected)`);
            }
        }, delay);

    });
};