const CE = require('./index');
const read = require('readline-sync');
const colors = require('colors');
const moment = require('moment');


let api_key = read.question('Enter your API key: ');

CE.setAuthenticationToken(api_key);

let command = "";


async function run() {
    while (command[0] !== 'exit') {
        command = read.question('> ').split(" ");
        if (command[0] === 'logtrace') {
            console.log("Tracing...", command[1]);
            let logs;
            try {
                logs = await CE.Graph.query(`
                query ($request_id: String){
                    request_logs(identifier: $request_id) {
                        _id
                        endpoint
                        ip
                        type
                        created_at
                        payload
                    }
                }
            `, {request_id: command[1]})
            } catch (e) {
                console.log(JSON.stringify(e));
            }
            logs.request_logs.forEach(log => {
                let print_str = "";
                if(log.type === 'request') {
                    print_str += "[Request ]".bgMagenta.white + " "
                } else {
                    print_str += "[Response]".bgYellow.white + " "
                }
                print_str += moment(log.created_at).format("l LTS") + " | ";
                print_str += log.endpoint.green + " | ";
                print_str += log.ip ? log.ip.bold + " | " : "" ;
                print_str += ("plsize " + log.payload.length).red.bold;
                console.log(print_str)
            })
        } else if (command[0] === 'help') {
            console.log("logtrace <identifier>".bold, "Trace a request.");
        }
    }
}

run();
