'use strict';

function UserCount(connectionServer){
    connectionServer.client.updateUsersOnlineCount = function (count) {
        // Add the message to the page.
        $('#usersCount').text(count + " user");
    };
}