"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
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
router.get('/getBoards', (req, res, next) => {
    console.log('req body' + req.body);
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
            // res.status(200).send(body);
        }
    });
});
router.post('/getLabels', (req, res, next) => {
    var options = { method: 'GET',
        url: 'https://api.trello.com/1/boards/' + req.body.id + '/labels',
        qs: { fields: 'all',
            limit: '50',
            key: trelloKey,
            token: trelloToken } };
    request(options, function (err, response, body) {
        // if (err) throw new Error(err);
        res.status(200).send(body);
    });
});
router.post('/getCards', (req, res, next) => {
    var options = { method: 'GET',
        url: 'https://api.trello.com/1/boards/' + req.body.id + '/lists',
        qs: { cards: 'all',
            card_fields: 'all',
            filter: 'open',
            fields: 'all',
            key: trelloKey,
            token: trelloToken } };
    request(options, function (err, response, body) {
        if (err)
            console.log(err);
        var board_to_columns = extractColumns(body);
        // var board_info = '';
        // const columns = ['Group', 'Name', 'Location', 'Role'];
        // board_info += columns.join(', ') + '\n';
        // //will receive board object
        // for (const board of JSON.parse(body)) {
        //     //skip legend list
        //     if (board.name == 'Legend') continue;
        //     for(const card of board.cards) {
        //         board_info += board.name + ', ';
        //
        //         //split person's name and location/job in two
        //         const person_info = card.name.split(/\s/);
        //         board_info += person_info.slice(0,2).join(' ') + ', ';
        //         board_info += person_info.slice(2).join(' ') + ', ';
        //
        //         for (const label of card.labels) {
        //             board_info += label.name;
        //         }
        //         board_info +=  '\n';
        //     }
        // }
        // console.log(board_info);
        // writefile.js
        const fs = require('fs');
        // write to a new file named 2pac.txt
        fs.writeFile("C:\\cep\\training\\trello_training.csv", board_to_columns, (err) => {
            // fs.writeFile('D:\\cep\\training\\trello_training.csv', board_to_columns, (err: Error) => {
            // throws an error, you could also catch it here
            if (err)
                throw err;
            // success case, the file was saved
            console.log('file written');
            res.status(200).send(board_to_columns);
        });
        //console.log(body);
        // res.status(200).send({msg: 'success'});
    });
});
function extractColumns(board_data) {
    var board_to_columns = '';
    const columns = ['Group', 'Name', 'Location', 'Role'];
    board_to_columns += columns.join(', ') + '\n';
    //will receive board object
    for (const board of JSON.parse(board_data)) {
        //skip legend list
        if (board.name == 'Legend')
            continue;
        for (const card of board.cards) {
            board_to_columns += board.name + ', ';
            //split person's name and location/job in two
            const person_info = card.name.split(/\s/);
            board_to_columns += person_info.slice(0, 2).join(' ') + ', ';
            board_to_columns += person_info.slice(2).join(' ') + ', ';
            for (const label of card.labels) {
                board_to_columns += label.name;
            }
            board_to_columns += '\n';
        }
    }
    return board_to_columns;
}
module.exports = router;
//# sourceMappingURL=TrelloInfo.js.map