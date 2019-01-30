"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
router.get('/', (req, res, next) => {
    const response = client.search({
        index: 'journal',
        type: 'journal_entry',
        body: {
            "query": {
                "bool": {
                    "must": {
                        "exists": {
                            "field": "img"
                        }
                    }
                }
            }
        }
    });
    for (const journal_entry of response.hits.hits) {
        console.log('journal_entry:', journal_entry);
    }
    res.send(response.hits.hits);
});
module.exports = router;
//# sourceMappingURL=imageSearch.js.map