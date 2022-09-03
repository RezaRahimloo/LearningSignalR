using Microsoft.AspNetCore.SignalR.Client;

Console.WriteLine("Insert the URL of the SignalR hub");

string? url = Console.ReadLine();

var hubConnection = new HubConnectionBuilder()
                        .WithUrl(url)
                        .Build();

hubConnection.On<string>("ReceiveMessage", message => Console.WriteLine($"SignalR Hub message: {message}"));

try
{
    await hubConnection.StartAsync();
    bool running = true;
    while(running)
    {
        string? message = string.Empty;

        Console.WriteLine( "Please specify the action:" );
        Console.WriteLine( "0 - broadcast to all" );
        Console.WriteLine( "1 - send to others" );
        Console.WriteLine( "2 - send to self" );
        Console.WriteLine( "exit - Exit the program" );

        string? action = Console.ReadLine();

        Console.WriteLine("Please specify the message");
        message = Console.ReadLine();

        switch (action)
        {
            case "0":
                await hubConnection.SendAsync("BroadcastMessage", message);
                break;
            case "1":
                await hubConnection.SendAsync("SendToOthers", message);
                break;
            case "2":
                await hubConnection.SendAsync("SendToSelf", message);
                break;
            case "exit":
                running = false;
                break;
            default:
                Console.WriteLine("Undefined command!");
                break;
        }
        //await hubConnection.SendAsync("BroadCastMessage", message);
    }
}
catch (System.Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine("Press any key to exit...");
    Console.ReadKey();
    return;
}