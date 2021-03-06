const {
    Client
} = require('pg');

exports.logPush = (roomNameSpace, msg) => {
    if (roomNameSpace[0] != '/') {
        throw "room_nameに/がついていません";
    }
    let roomName = roomNameSpace.slice(1);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("select * from room where room_name ='" + roomName + "';", (err, res) => {
        if (err) throw err;
        if (res.rows.length != 1) throw "room名" + roomName + "が重複しています:" + res.rows.length;
        let id = res.rows[0]["room_id"];
        client.query("insert into msg (room_id,msg_data) values ($1,$2);", [Number(id), msg], (err, res) => {
            if (err) throw err;
            client.end();
        });
    });
}

exports.logRead = (roomNameSpace, func) => {
    if (roomNameSpace[0] != '/') {
        throw "room_nameに/がついていません";
    }
    let roomName = roomNameSpace.slice(1);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query("select * from room where room_name ='" + roomName + "';", (err, res) => {
        if (err) throw err;
        if (res.rows.length != 1) throw "room名" + roomName + "が重複しています:" + res.rows.length;
        let id = res.rows[0]["room_id"];
        client.query("select msg_data from msg where room_id=$1;", [Number(id)], (err, res) => {
            if (err) throw err;
            func(res.rows.map(row => row["msg_data"]));
            client.end();
        });
    });
}
