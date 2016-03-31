
if (!socket) {
    console.log("Socket not defined");
}

socket.on('socket id', function(id) {
    myPerson.id = id;
});

socket.on('server update', function(updatePeople) {
    allPeople = updatePeople;
});


