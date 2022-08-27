
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/learningHub")// this is relative path we can use full path too.
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("RecieveMessage", (message) => {
    $('#signalr-message-panel').prepend($('<div />').text(message));
});

$('#btn-broadcast').click(function (){
    var message = $('#broadcast').val();
    connection.invoke("BroadcastMessage", message).catch(err => console.error(err.toString()));
});

async function start() { 
    try{
        await connection.start();
        console.Log('connected');
    } catch (err){
        console.error(err);
        setTimeout(() => start(), 5000);
    }
}

connection.onclose(async () => {
    await start();
});

start();