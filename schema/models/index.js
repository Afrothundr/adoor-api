const db = require('./');

module.exports = [
    'Buyer',
    'Seller'
].reduce(
    ({ queries, mutations }, model) => ({
        queries: {
            ...require(`./${model}/queries`)(db),
            ...queries
        },
        mutations: {
            ...require(`./${model}/mutations`)(db),
            ...mutations
        }
    })
)
