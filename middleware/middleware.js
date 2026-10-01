const cache = {};
const TTL = 60 * 1000;
function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;


    const cached = cache[key];
    if (!cached) {

        res.set(
            'X-Cache',
            'MISS'
        );

        return next();
    }
    const age =
        Date.now() - cached.createdAt;
    if (age > TTL) {

        delete cache[key];
        res.set(
            'X-Cache',
            'MISS'
        );

        return next();
    }
    res.set(
        'X-Cache',
        'HIT'
    );
    return res.json(
        cached.data
    );
}
function setCache(key, value) {

    cache[key] = {
        data: value,
        createdAt: Date.now()
    };
}
function clearCache() {

    for (const key in cache) {

        delete cache[key];

    }
}
module.exports = {
    cacheMiddleware,
    setCache,
    clearCache
};