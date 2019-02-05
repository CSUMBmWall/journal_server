import {Request, Response} from "express";
import {error} from "util";

const express = require('express');
const router = express.Router();
const request = require('request');
/*export default new YouTubeInfo().express*/


const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const trelloPostFix = 'key=' + trelloKey + '&token=' + trelloToken;
const getBoardsURL = 'https://api.trello.com/1/members/me/boards?key=' + trelloKey + '&token=' + trelloToken;
var getCardsURL = 'https://api.trello.com/1/boards/';


// fix any types -- add class for expected data and find out what type request.body is
router.post('/getBoards', (req: any, res: Response, next: any) => {
    request.get(getBoardsURL, (err: Error, response: Response, body: any) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                } else {
                    var board_list = [];
                    for (const board of JSON.parse(body)) {
                        board_list.push({
                            name: board.name,
                            id: board.id
                        });
                    }
                    res.status(200).send(board_list);
                }
            });

});

// router.post('/getCards', (req: Request, res: Response, next: any) => {
//     console.log('id ' + JSON.stringify(req.body));
//     getCardsURL += req.body.id + '/cards/?' + trelloPostFix;
//     console.log(this.getCardsURL);
//     request.get(getCardsURL, (err: Error, response: Response, body: any) => {
//         if (err) {
//             res.status(500).json({
//                 error: err
//             })
//         } else {
//             // var card_list = [];
//             // for (const card of JSON.parse(body)) {
//             //     card_list.push({
//             //         name: card.name,
//             //         id: card.id
//             //     });
//             // }
//             var cards = [];
//             for (const item of JSON.parse(body)) {
//                 // console.log(item);
//                 console.log('name', item.name);
//                 console.log('labels', item.labels);
//             }
//             res.status(200).send(body);
//         }
//     });
//     // res.status(200).json({msg: 'all_good'});
// });

router.post('/getCards', (req: Request, res: Response, next: any) => {
    var request = require("request");

    var options = { method: 'GET',
        url: 'https://api.trello.com/1/boards/'+ req.body.id + '/lists',
        qs:
            { cards: 'all',
                card_fields: 'all',
                filter: 'open',
                fields: 'all',
                key: trelloKey,
                token: trelloToken } };

    request(options, function (err: Error, response: Response, body: any) {
        if (err) console.log(err);

        console.log(body);
        res.status(200).send(body);
    });

    // console.log('id ' + JSON.stringify(req.body));
    // getCardsURL += req.body.id + '/cards/?' + trelloPostFix;
    // console.log(this.getCardsURL);
    // request.get(getCardsURL, (err: Error, response: Response, body: any) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: err
    //         })
    //     } else {
    //         // var card_list = [];
    //         // for (const card of JSON.parse(body)) {
    //         //     card_list.push({
    //         //         name: card.name,
    //         //         id: card.id
    //         //     });
    //         // }
    //         var cards = [];
    //         for (const item of JSON.parse(body)) {
    //             // console.log(item);
    //             console.log('name', item.name);
    //             console.log('labels', item.labels);
    //         }
    //         res.status(200).send(body);
    //     }
    // });
    // // res.status(200).json({msg: 'all_good'});
});
module.exports = router;


