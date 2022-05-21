function deleteTask(element) {
    let deleteConfirm = confirm("Are you sure?")
    if (deleteConfirm==true) {
        $(element).closest("[class='task']").remove();
    }
}

function addTask(element) {
    var newTask = $(element).before($('.exampleTask').html());
}