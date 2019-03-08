"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const express = require('express');
const router = express.Router();
const request = require('request');
const XLSX = require('xlsx');
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
// router.post('/getCards', (req: Request, res: Response, next: any) => {
//     var options = { method: 'GET',
//         url: 'https://api.trello.com/1/boards/'+ req.body.id + '/lists',
//         qs:
//             { cards: 'all',
//                 card_fields: 'all',
//                 filter: 'open',
//                 fields: 'all',
//                 key: trelloKey,
//                 token: trelloToken } };
//
//     request(options, function (err: Error, response: Response, body: any) {
//         if (err) console.log(err);
//
//         var board_to_columns = extractColumns(body);
//
//         const fs = require('fs');
//         const dir = "C:\\Users\\Matt\\Desktop\\cep\\"
//
//         fs.writeFile("C:\\cep\\training\\trello_training.csv", board_to_columns, (err: Error) => {
//             if (err) throw err;
//
//             // success case, the file was saved
//             console.log('file written');
//             res.status(200).send(board_to_columns);
//         });
//         //console.log(body);
//
//         // res.status(200).send({msg: 'success'});
//     });
// });
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
        const fs = require('fs');
        const file_loc = "C:\\Users\\Matt\\Desktop\\cep\\";
        fs.writeFile(file_loc + req.body.name + '.csv', board_to_columns, (err) => {
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
function getCards(board) {
    var csvData = null;
    var options = { method: 'GET',
        url: 'https://api.trello.com/1/boards/' + board + '/lists',
        qs: { cards: 'all',
            card_fields: 'all',
            filter: 'open',
            fields: 'all',
            key: trelloKey,
            token: trelloToken }
    };
    var reqType = request(options, (err, response, body) => {
        if (err)
            console.log(err);
        // console.log('this.csvData ' + this.csvData);
        return extractColumns(body);
    });
    console.log(reqType);
    return csvData;
    //console.log(self.csvData);
    // return this.csvData;
}
router.post('/writeToFile', (req, res, next) => {
    const board_name = req.body.name;
    const board_id = req.body.id;
    var options = { method: 'GET',
        url: 'https://api.trello.com/1/boards/' + board_id + '/lists',
        qs: { cards: 'all',
            card_fields: 'all',
            filter: 'open',
            fields: 'all',
            key: trelloKey,
            token: trelloToken }
    };
    request(options, (err, response, body) => {
        if (err)
            console.log(err);
        // console.log('this.csvData ' + this.csvData);
        const board_info = extractColumnsSheetJS(body);
        //console.log('board_info ' + board_info);
        var wb = XLSX.utils.book_new();
        // fs.writeFile("D:\\cep\\training\\trello\\" + board_name + '.xls', board_info, (err: Error) => {
        //     if (err) throw err;
        //
        //     // success case, the file was saved
        //     //console.log('file written');
        //     res.status(200).send({msg: board_name + ' successfully written'});
        // });
    });
});
function extractColumns(board_data) {
    var board_to_columns = '';
    const columns = ['Group', 'First Name', 'Last Name', 'Role', 'City', 'State', 'Location'];
    board_to_columns += columns.join('\t') + '\n';
    //will receive board object
    for (const list of JSON.parse(board_data)) {
        //skip legend list
        if (list.name == 'Legend')
            continue;
        for (const card of list.cards) {
            board_to_columns += list.name + '\t';
            // console.log('card.name ' + card.name);
            //split person's name and location/job in two
            const person_info = card.name.split(/-/).map((item) => { return item.trim(); });
            console.log(person_info);
            board_to_columns += (person_info[0].split(/\s/)).join('\t') + '\t';
            // board_to_columns += person_info[0].split(/\s/) + '\t';
            // board_to_columns += person_info[1];
            board_to_columns += person_info[1] + '\t';
            // board_to_columns += person_info.slice(1).join('\t');
            var cityState = person_info[2].split(/,/).map((item) => { return item.trim(); });
            console.log('cityState ' + cityState.join('\t'));
            console.log('person_info[3]' + person_info[2]);
            board_to_columns += cityState.join('\t') + '\t';
            board_to_columns += person_info.slice(3).join('\t');
            // board_to_columns += person_info.slice(2).join(',') + ', ';
            // console.log('board_to_columns ' + board_to_columns);
            //console.log('person_info ' + person_info[0].split(/\s/).join(' ') + ', ');
            // console.log('person_info name ' + person_info[0].split(/\s/));
            // console.log('person_info role ' + person_info[1]);
            // console.log('person_info city, state ' + person_info[2].split(/,/));
            //board_to_columns += person_info.slice(0,2).join(' ') + ', ';
            //board_to_columns += person_info.slice(2).join(' ') + ', ';
            for (const label of card.labels) {
                board_to_columns += label.name;
            }
            board_to_columns += '\n';
        }
    }
    return board_to_columns;
}
function extractColumnsSheetJS(board_data) {
    var board_to_columns = [];
    // console.log('board_to_columns ' + typeof (board_to_columns));
    const columns = ['Group', 'First Name', 'Last Name', 'Role', 'City', 'State', 'Location'];
    //console.log(columns);
    board_to_columns.push(columns);
    //board_to_columns.push(columns);
    //board_to_columns.push(columns);
    console.log('board_to_columns ' + board_to_columns);
    //will receive board object
    for (const list of JSON.parse(board_data)) {
        var listData = [];
        //skip legend list
        if (list.name == 'Legend')
            continue;
        for (const card of list.cards) {
            var cards = [];
            cards.push(list.name);
            // cards = cards.concat(list.name);
            // console.log('card.name ' + card.name);
            //split person's name and location/job in two
            const person_info = card.name.split(/-/).map((item) => { return item.trim(); });
            listData.push(person_info[0].split(/\s/));
            // console.log('listData ' + listData);
            // board_to_columns += person_info[0].split(/\s/) + '\t';
            // board_to_columns += person_info[1];
            listData.push(person_info[1]);
            // board_to_columns += person_info.slice(1).join('\t');
            var cityState = person_info[2].split(/,/).map((item) => { return item.trim(); });
            // console.log('cityState ' + cityState.join('\t'));
            // console.log('person_info[3]' + person_info[2]);
            listData.push(cityState);
            listData.push(person_info.slice(3));
            // board_to_columns += person_info.slice(2).join(',') + ', ';
            // console.log('board_to_columns ' + board_to_columns);
            //console.log('person_info ' + person_info[0].split(/\s/).join(' ') + ', ');
            // console.log('person_info name ' + person_info[0].split(/\s/));
            // console.log('person_info role ' + person_info[1]);
            // console.log('person_info city, state ' + person_info[2].split(/,/));
            //board_to_columns += person_info.slice(0,2).join(' ') + ', ';
            //board_to_columns += person_info.slice(2).join(' ') + ', ';
            // for (const label of card.labels) {
            //     board_to_columns += label.name;
            // }
            //console.log('listData ' + listData);
            //board_to_columns = board_to_columns.concat(listData);
        }
    }
    return board_to_columns;
}
module.exports = router;
//# sourceMappingURL=TrelloInfo.js.map