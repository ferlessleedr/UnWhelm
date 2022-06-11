var Attributes = new Array()
var TaskList = new Array()
var selectButton

/*
const xhttp = new XMLHttpRequest();
xhttp.open('GET','./exampleTask.txt');
const taskExampleHTML = xhttp.send();
*/

function readFile() {
    var reader = new FileReader();
    reader.addEventListener('load', function() {
        var output = JSON.parse(this.result);
        console.log(output)
        var overwriteYes
        if (TaskList.length == 0) {
            overwriteYes = true
        } else {
            overwriteYes = confirm('Do you want to delete all existing tasks?  If you select No, then your imported tasks will be added to existing tasks.  If you select yes, existing tasks will be overwritten.')
        }
        if (overwriteYes = true) {
            if (TaskList.length > 0) {
                TaskList.forEach(document.getElementById(JSON.stringify(this.index)).remove())
            }
            TaskList = output[0]
            Attributes = output[1]
        } else {
            output[0].forEach(TaskList.push(this))
            output[1].forEach(Attributes.push(this))
        }
        RecreateTasks()
    });
    reader.readAsText(document.getElementById('files').files[0]);
};

function RecreateTasks() {
    for (let i = 0; i < TaskList.length; i++) {
        if ($('#' + i).length == 0) {
            var arrayElement = TaskList[i];
            var taskElement = jQuery($('.exampleTask').html());
            taskElement.attr('id',i);
            $('.exampleTask').before(taskElement);
            Object.keys(arrayElement).forEach(key => {
                var keyVariable = key
                if (key != 'taskAttributes') {
                    if ($(taskElement).find('#' + keyVariable).is(':checkbox') == true) {
                        if (typeof arrayElement[keyVariable] !== 'undefined' && arrayElement[keyVariable].length > 0) {
                            $(taskElement).find('#' + keyVariable).prop('checked',true);
                            if (keyVariable == 'completed') {
                                taskElement.addClass('completed');
                            }
                        }
                    }
                    $(taskElement).find('#' + keyVariable).attr('value',arrayElement[keyVariable])
                } else {
                    for (j = 0; j<arrayElement[keyVariable].length; j++) {
                        selectButton = taskElement.find('.attributeList')
                        submitAttributeName(arrayElement[keyVariable][j][0],arrayElement[keyVariable][j][1])
                    }
                }
            });
            //when done uncomment the below line and remove the identical line above
            //$('.exampleTask').before(taskElement);
        }
    }
}

function deleteFunction(element) {
    let index = $(element).closest('.task').attr('id')
    TaskList.splice(index,1);
    var ident = $(element).closest('.task').attr('id')
    $(element).closest('.task').remove();
    $('.task').each(function() {
        var item = $(this);
        if (item.attr('id') > ident) {
            item.attr('id',item.attr('id') - 1);
        }
    })
}

function deleteTask(element) {
    let deleteConfirm = confirm('Are you sure?');
    if (deleteConfirm==true) {
        deleteFunction(element);    
    }
}

function addTask(taskID) {
    var newTask = jQuery($('.exampleTask').html());
    newTask.attr('id',TaskList.length);
    if (taskID != undefined) {
        TaskList.push({taskAttributes:[]});
    }
    $('.exampleTask').before(newTask);
    return newTask
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
    selectButton = $(element).siblings('.attributeList');
    var str = '<div class="attributeOption temporary"><input type="radio" name="attributeOption" value="'
    Attributes.sort();
    Attributes.reverse();
    //This is building from scratch the list of attributes
    //every time the modal is opened
    for (i = 0; i < Attributes.length; i++) {
        let htmlcode = str + Attributes[i] + '">' + Attributes[i] + '</div>'
        $('.attributeManager').prepend(htmlcode)
    }
    $('#AttributeSelector').modal();
}

function submitAttributeName(name,value) {
    var selectedAttribute
    if (name === undefined) {
        selectedAttribute = $('input[name="attributeOption"]:checked','.attributeManager').val();
        if (selectedAttribute == 'newAttribute') {
            var selectedAttribute = $('input[name=newAttributeName]').val();
            Attributes.push(selectedAttribute)
        }
    } else {
        selectedAttribute = name
    }
    var attributeHTML = jQuery($('.exampleAttribute').html());
    $(attributeHTML).children('.dynamicAttributeTitle').html(selectedAttribute);
    $(attributeHTML).attr('id','attr_' + $(selectButton).children().length++)
    $(selectButton).append(attributeHTML);
    let arrayIndex = $(selectButton).closest('.task').attr('id');
    if (value === undefined) {
        TaskList[arrayIndex]['taskAttributes'].push([selectedAttribute,]);
    } else {
        $(attributeHTML).children('input[type="text"]').val(value);
    }
    //This removes the list of attributes from the modal
    //the reasoning for this is that if I put in an Attribute Manager
    //Changes made there will be reflected here
    //so long as I'm updating the array
    if (name === undefined) {
        $.modal.close()
        $('.temporary').remove();
    $('[name="newAttributeName"]').val('')
    }
}

function deleteAttribute(element) {
    var taskIdent = $(element).closest('.task').attr('id');
    var attrIdent = $(element).parent().attr('id').split("_")[1];
    $(element).parent().siblings().each(function() {
        var item = $(this);
        if (item.attr('name') > attrIdent) {
            item.attr('name',item.attr('name') - 1);
        }
    })
    $(element).parent().remove();
    TaskList[taskIdent]['taskAttributes'].splice(attrIdent,1)
}

function updateTaskList(element,position) {
    var taskIdent = $(element).closest('.task').attr('id');
    TaskList[taskIdent][position] = element.value
}

function updateTaskAttributes(element) {
    var taskIdent = $(element).closest('.task').attr('id');
    var attrIdent = $(element).parent().attr('id').split('_')[1];
    TaskList[taskIdent]['taskAttributes'][attrIdent][1] = element.value
}

function apology() {
    $('#Apology').modal();
}

function dataExport() {
    var file = dataCreate();
    $('#downloadlink').attr('href',file);
    $('#Export').modal();
}

function dataCreate() {
    var totalArray = [TaskList,Attributes]
    var dataraw = [JSON.stringify(totalArray)];
    var data = new Blob(dataraw, {type: 'text/plain;charset=utf-8'});
    var textFile = null;
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
}

function completeButton(element) {
    var task = $(element).closest('.task');
    var ident = task.attr('id');
    if ($(element).is(':checked') == true) {
        task.addClass('completed');
        if (task.find('.deleteComplete').is(':checked') == true) {
            deleteFunction(element);
        } else {
            TaskList[ident][element.id] = new Date();
        }
    } else {
        task.removeClass('completed');
        var ident = $(element).closest('.task').attr('id');
        delete TaskList[ident][element.id]
    }
}

function deleteOnComplete(element) {
    var ident = $(element).closest('.task').attr('id');
    if ($(element).is(':checked') == true) {
        TaskList[ident][element.id] = new Date();
    } else {
        delete TaskList[ident][element.id]
    }
}