let SerpWow = require("google-search-results-serpwow")

// create the serpwow object, passing in our API key
let serpwow = new SerpWow("2E0ED348B7E44BFAB65D258090880948")

module.exports.sendSerpWowReq = (req, res, next) => {
    const { searchtext } = req.params

    console.log(searchtext)

    const params = {
        q: searchtext,
        search_type: "shopping",
        gl: "ru",
        hl: "ru",
        location: "Russia",
        google_domain: "google.ru",
        sort_by: "review_score",
    }

    // retrieve the search results as JSON

    serpwow
        .json(params)
        .then((result) => {
            const data = JSON.stringify(result, 0, 2)
            res.send(result)
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
            next(error)
        })
}
