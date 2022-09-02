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

    while(true)
    {
        string? message = string.Empty;

        Console.WriteLine("Please specify action: \n0 - broadcast to all \nexit - Exit the program");

        string? action = Console.ReadLine();

        Console.WriteLine("Please specify the message");
        message = Console.ReadLine();

        if (action == "exit")
        {
            break;
        }
        await hubConnection.SendAsync("BroadCastMessage", message);
    }
}
catch (System.Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine("Press any key to exit...");
    Console.ReadKey();
    return;
}