var Attributes = new Array()
var selectButton = new Array()

function deleteTask(element) {
    let deleteConfirm = confirm('Are you sure?')
    if (deleteConfirm==true) {
        $(element).closest('[class="task"]').remove();
    }
}

function addTask(element) {
    var newTask = $(element).before($('.exampleTask').html());
}

function showAttributes(element) {
    $(element).parent().siblings('.dynamicAttributes').removeClass('hiddenClass');
    $(element).siblings('.hideButton').removeClass('hiddenClass');
    $(element).addClass('hiddenClass');
}

function hideAttributes(element) {
    $(element).parent().siblings('.dynamicAttributes').addClass('hiddenClass');
    $(element).siblings('.showButton').removeClass('hiddenClass');
    $(element).addClass('hiddenClass');
}

function attributePicker(element) {
    selectButton.push(element);
    var str = '<div class="attributeOption temporary"><input type="radio" name="attributeOption" value="'
    Attributes.sort();
    Attributes.reverse();
    for (i = 0; i < Attributes.length; i++) {
        let htmlcode = str + Attributes[i] + '">' + Attributes[i] + '</div>'
        $('.attributeManager').prepend(htmlcode)
    }
    $('#ex1').modal();
}

function submitAttributeName(element) {
    var selectedAttribute = $('input[name="attributeOption"]:checked','.attributeManager').val();
    if (selectedAttribute == 'newAttribute') {
        var selectedAttribute = $('input[name=newAttributeName]').val();
        Attributes.push(selectedAttribute)
        }
    var attributeHTML = '<div class="attribute">' + $(selectButton[0]).parent().html() + '</div>';
    $(selectButton[0]).siblings().removeClass('hiddenClass');
    $(selectButton[0]).parent().prepend(selectedAttribute);
    console.log(attributeHTML);
    $(selectButton[0]).parent().parent().append().append(attributeHTML);
    selectButton[0].remove();
    selectButton = []
    $.modal.close()
    $('.temporary').remove();
    $('[name="newAttributeName"]').val('')
}

function deleteAttribute(element) {
    $(element).parent().remove();
}