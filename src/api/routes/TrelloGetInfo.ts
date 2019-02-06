import {Request, Response} from "express";
import {error} from "util";
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

        // var stream = fs.createWriteStream("my_file.txt");
        // stream.once('open', function(fd: any) {
        //     stream.write("My first row\n");
        //     stream.write("My second row\n");
        //     stream.end();
        // });

        var board_info = '';
        const columns = ['Group', 'Name', 'Location', 'Role'];
        board_info += columns.join(', ') + '\n';
        //will receive board object
        for (const board of JSON.parse(body)) {
            //skip legend list
            if (board.name == 'Legend') continue;
            for(const card of board.cards) {
                board_info += board.name + ', ';

                //split person's name and location/job in two
                const person_info = card.name.split(/\s/);
                board_info += person_info.slice(0,2).join(' ') + ', ';
                board_info += person_info.slice(2).join(' ') + ', ';

                //in case there is no location
                //if (person_info.length <= 2) board_info += ', ';

                // board_info += card.name + ', ';
                for (const label of card.labels) {
                    //console.log('label ' + label.name);
                    board_info += label.name;
                }
                board_info +=  '\n';
            }
            //board_info += '\n';
        }
        console.log(board_info);

        // writefile.js

        const fs = require('fs');

        // write to a new file named 2pac.txt
        fs.writeFile('D:\\cep\\training\\trello_training.csv', board_info, (err: Error) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('Lyric saved!');
        });
        //console.log(body);
        res.status(200).send({msg: 'success'});
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


