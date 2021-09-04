//create empty array to populate with time blocks
var plannerDays = [];

//create time blocks
for (var i = 0; i < 9; i++) {
    plannerDays[i] = {
        id: i,
        hour: i + 9,
        time: "",
        ampm: "",
        eventText: ""
    };
}

//add additional data to time blocks
plannerDays.forEach(function(addData) {
    if (addData.id <= 2) {
        addData.ampm = "am";
    } else {
        addData.ampm = "pm";
    }
    if (addData.id <= 3) {
        addData.time = addData.hour;
    } else {
        addData.time = addData.hour - 12;
    }
})

//save to localStorage
function saveEvents() {
    localStorage.setItem("plannerDays", JSON.stringify(plannerDays));
}

//setting time block text
function showEvents() {
    plannerDays.forEach(function(showHour) {
        $(`#${showHour.id}`).val(showHour.eventText);
    })
}

//adding the divs/textareas/ids/buttons to html
plannerDays.forEach(function(currentHour) {
    var row = $("<form>").attr({ "class" : "row" });
    $(".container").append(row);

    var field = $("<div>").text(`${currentHour.time}${currentHour.ampm}`).attr({ "class" : "col-md-2 hour" });

    var plan = $("<div>").attr({ "class" : "col-md-9 description p-0" });
    var data = $("<textarea>");

    plan.append(data);
    data.attr("id", currentHour.id);

//logic to set colors based on time of day    
    if (currentHour.hour < moment().format("HH")) {
        data.attr({ "class" : "past" });    
    } else if (currentHour.hour == moment().format("HH")) {
        data.attr({ "class" : "present" });
    } else {
        data.attr({ "class" : "future" });
    }

//button to save text using fontawesome api to make an icon 
    var saveBtn = $("<i class='far fa-save fa-lg'></i>");
    var savePlan = $("<button>").attr({ "class" : "col-md-1 saveBtn" });
    savePlan.append(saveBtn);
    row.append(field, plan, savePlan);
})

//jquery click event 
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var thisTime = $(this).siblings(".description").find("textarea").attr("id");
    plannerDays[thisTime].eventText = $(this).siblings(".description").find("textarea").val();
    saveEvents();
})

//initialize function using moment api to display the current cardinal day, month and day of the week
function init() {
    var today = moment();
    $("#currentDay").text(today.format("dddd, MMMM Do"));

    var days = JSON.parse(localStorage.getItem("plannerDays"));

    if (days) {
        plannerDays = days; 
        saveEvents();
        showEvents();
    } else {
        return;
    }
}

init();