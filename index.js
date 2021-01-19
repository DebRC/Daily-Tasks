$("#sections").tabs();
$("ul").sortable({axis:"x", containment: "#sections"});
$("ol").sortable({axis:"y", containment: "#sections"});
$("#addSection").button().click(function(){
    $('#sectionDialog').dialog({
        resizable:false,
        modal:true,
        buttons:{
            "Add New Section":function(){
                var sectionName=$('#section').val();
                if (sectionName==="")
                {
                    $("<div title='Warning!'>Section name cannot be empty</div>").dialog();
                    $("#section").val("");
                    $(this).dialog("close");
                    return;
                }
                console.log(sectionName);
                $("<li><a href='#"+sectionName.toLowerCase().replace(/ /g, "")+"'>" + sectionName + "</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
                $("<ol id='"+sectionName.toLowerCase().replace(/ /g, "") +"'></ol>").appendTo("#sections").sortable({axis:"y", containment: "#sections"});
                $("#sections").tabs("refresh");
                var tabCount = $("#sections .ui-tabs-nav li").length;
                $("#sections").tabs("option", "active", tabCount-1);
                $("#section").val("");
                $(this).dialog("close");
            },
            "Cancel": function(){
                $("#section").val("");
                $(this).dialog("close");
            }
        }
    });
});

$("#addTask").button().click(function(){
    $('#taskDialog').dialog({
        resizable:false,
        modal:true,
        buttons:{
            "Add New Task":function(){
                var taskName=$('#task').val();
                if (taskName==="")
                {
                    $("<div title='Warning!'>Task name cannot be empty</div>").dialog();
                    $("#task").val("");
                $(this).dialog("close");
                    return;
                }
                console.log(taskName);
                $("#sections").tabs("refresh");
                var activeTab = $('#sections').tabs('option','active');
                console.log(activeTab);
                var title = $("#main > li:nth-child("+ (activeTab+1) +") > a").attr('href');
                console.log(title);
                $("<li><input type='checkbox' class='checkbox'>"+taskName+"</li>").appendTo(title);
                $("#sections").tabs("refresh");
                $("#task").val("");
                $(this).dialog("close");
            },
            "Cancel": function(){
                $("#task").val("");
                $(this).dialog("close");
            }
        }
    });
});

$('#sections').on("click",'input[type=checkbox]', function(){
    $(this).closest('li').slideUp(function(){
        $(this).remove();
    });
});

$('#sections').on("click",'span.ui-icon-close', function(){
    var index = $(this).closest('li').index();
    var id = $('#main li:eq('+index+') a').attr('href');
    $('#main li:eq('+index+')').remove();
    $(id).remove();
    $("#sections").tabs("refresh");
});