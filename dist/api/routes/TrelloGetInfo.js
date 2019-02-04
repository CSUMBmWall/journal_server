"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const request = require('request');
/*export default new YouTubeInfo().express*/
const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const trelloPostFix = 'key=' + trelloKey + '&token=' + trelloToken;
const getBoardsURL = 'https://api.trello.com/1/members/me/boards?key=' + trelloKey + '&token=' + trelloToken;
const getCardsURL = 'https://api.trello.com/1/cards';
// fix any types -- add class for expected data and find out what type request.body is
router.post('/getBoards', (req, res, next) => {
    request.get(getBoardsURL, (err, response, body) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
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
router.post('/getCards', (req, res, next) => {
    console.log('id ' + JSON.stringify(req.body));
    console.log('id ' + 'k');
    // this.getCardsURL += req.body.id + trelloPostFix;
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
    //         res.status(200).send(body);
    //     }
    // });
    res.status(200).json({ msg: 'all_good' });
});
module.exports = router;
//# sourceMappingURL=TrelloGetInfo.js.map