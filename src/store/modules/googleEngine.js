

export const gEngine = {
    state: {
    },
    mutations: {
        helloModule (state) {
            console.log('message from gModule');
        },

        // import SerpWow from 'google-search-results-serpwow'

        /* this code is for Node.js
        makeRealReq(state, text) {
            //var SerpWow = require('google-search-results-serpwow')
            // create the serpwow object, passing in our API key
            let serpwow = new SerpWow('2E0ED348B7E44BFAB65D258090880948')

            // set up the search parameters
            var params = {
            q: text,
            search_type: 'shopping',
            gl: 'ru',
            hl: 'ru',
            location: 'Russia',
            google_domain: 'google.ru',
            shopping_buy_on_google: 'false'
            }

            // retrieve the search results as JSON
            serpwow.json(params)
            .then(result => {
                // pretty-print the JSON result
                console.log(JSON.stringify(result, 0, 2));
            })
            .catch(error => {
                console.log(error);
            });
        }
        */
        
    },
    actions: {
    },
  }