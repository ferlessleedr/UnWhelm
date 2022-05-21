function deleteTask(event) {
    $(event.target).closest("[ID^='task_']").remove();
}