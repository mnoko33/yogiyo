const models = require('../models');

const categories = [
    "전체보기",      // 0
    "1인분주문",    // 1
    "프랜차이즈",    // 2
    "치킨",         // 3
    "피자양식",     // 4
    "중국집",       // 5
    "한식",         // 6
    "일식돈까스",   // 7
    "족발보쌈",     // 8
    "야식",        // 9
    "분식",        // 10
    "카페디저트",  // 11
    "편의점",      // 12
    "요기요플러스"  // 13
];

module.exports = async function createCategories(startIdx, endIdx) {
    let promiseCategories = [];
    for (let i = startIdx; i < endIdx + 1; i++) {
        const promiseCategory = new Promise(async (resolve, reject) => {
            resolve(models.Category.create({
                name: categories[j],
                imgUrl: 'path'
            })
                .then((instance) => {
                    console.log(instance.name);
                })
                .catch((err) => {
                    console.log(err);
                }))
        });
        promiseCategories.push(promiseCategory)
    }
    return await Promise.all(promiseCategories)
};