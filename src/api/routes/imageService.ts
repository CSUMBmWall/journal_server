import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.get('/', ( req: any, res: Response, next: any) => {
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
    }).then((searchResponse: any) => {
        var images: any = [];
        for (const hit of searchResponse.hits.hits) {
            for (const pic of hit._source.img) {
                images.push(pic);
            }

            // console.log('hit ' + JSON.stringify(hit));
        }
        res.send(images);
        //res.send(searchResponse.hits.hits);
    });

    // console.log('hits' + JSON.parse(response));

    //res.status(200).send(response.hits.hits)
    // res.status(200).json({hits: response.hits.hits})

    /*try {
        res.status(200).json({hits: response.hits.hits})
        // res.send(response.hits.hits);
    } catch(er) {
        res.status(404).json({error: er});
    }*/




});

module.exports = router;

