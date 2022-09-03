const connection = new signalR.HubConnectionBuilder()
    .withUrl("/learningHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", (message) => {
    $('#signalr-message-panel').prepend($('<div />').text(message));
});

$('#btn-broadcast').click(function () {
    var message = $('#broadcast').val();
    connection.invoke("BroadcastMessage", message).catch(err => console.error(err.toString()));
});
$('#btn-others-message').click(function () {
    let message = $('#others-message').val();
    connection.invoke("SendToOthers", message).catch(err => console.error(err.toString()));
});
$('#btn-self-message').click(function () {
    let message = $('#self-message').val();
    connection.invoke("SendToSelf", message).catch(err => console.error(err.toString()));
});
$('#btn-individual-message').click(function () {
    let message = $('#individual-message').val();
    let connectionId = $('#connection-for-message').val();
    connection.invoke("SendToIndividual", connectionId, message).catch(err => console.error(err.toString()));
});

async function start() {
    try {
        await connection.start();
        console.log('connected');
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};

connection.onclose(async () => {
    await start();
});

start();