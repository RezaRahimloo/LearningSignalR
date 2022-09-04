const connection = new signalR.HubConnectionBuilder()
    .withUrl("/learningHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", (message) => {
    $('#signalr-message-panel').prepend($('<div />').text(message));
});

$('#btn-broadcast').click(function () {
    var message = $('#broadcast').val();

    if (message.includes(';')) {
        let messages = message.split(';');
        let subject = new signalR.Subject();

        connection.send("BroadcastStream", subject).catch(err => console.error(err.toString()));
        for(let i=0; i < messages.length; i++){
            subject.next(messages[i]);
        }

        subject.complete();
    } else {
        connection.invoke("BroadcastMessage", message).catch(err => console.error(err.toString()));
    }
    

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
$('#btn-group-message').click( function (){
    let message = $('#group-message').val();
    let group = $('group-for-message').val();
    connection.invoke("SendToGroup", group, message).catch(err => console.error(err.toString()));
});
$('#btn-group-add').click( function (){
    let group = $('#group-to-add').val();
    connection.invoke("AddUserToGroup", group).catch(err => console.error(err.toString()));
});
$('#btn-group-remove').click( function (){
    let group = $('#group-to-remove').val();
    connection.invoke("RemoveUserFromGroup", group).catch(err => console.error(err.toString()));
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