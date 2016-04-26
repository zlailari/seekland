$(document).ready(function() {
    $('#init-build').click(function () {
        requestSpace();
    });

    $(document).on('click', '.update-space', function() {

        var formData = {
            title: $('.title').val(),
            content: $('.content').val(),
            link: $('.link').val(),
            color: $('.color').val(),
        };

        sendSpaceUpdate(formData);
        $('#toolbar').html(buildButtonTemplate);
    });
})

function editSpace(spot) {
    $('#toolbar').html(editSpaceTemplate);
}

var buildButtonTemplate = "<button id='init-build'>Build Stuff</button>";
var editSpaceTemplate = `
        <label for="title">Title</label>
        <input type="text" name="title" class="title"/>
        <br>
        <label for="content">Content</label>
        <input type="text" name="content" class="content"/>
        <br>
        <label for="link">Link</label>
        <input type="text" name="link" class="link"/>
        <br>
        <label for="color">Color</label>
        <input type="text" name="color" class="color"/>
        <br>
        <button class="update-space">Update</button>
`;
