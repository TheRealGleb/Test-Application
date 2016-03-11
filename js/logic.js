var users = [];
var filteredUsers = [];
var userNumForUpdate;
var usersOnPage = 6;

function addLocalStorage() {
	if(localStorage["names"]) {
		users = JSON.parse(localStorage["names"]);
		for (var i = 0; i < users.length; i++) {
			updateTbl(users[i], i);
		};
	};
};

addLocalStorage();
var userPage=0;
var workDayPage = 0;

function addUsers() {
	userPage=0;
	var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#workerlist").empty();
		for(var i = start; i <= end; i++) {
			if (!users[i]) {
				break;
			}
			updateTbl(users[i], i);
		}
		$('#page-'+userPage+'').addClass('active');
};
pagesLength();
addUsers();
function updateTbl(user, index) {
	$('#workerlist').append(
		'<tr id="row-'+ index +'"><td>'+(index+1) +'</td><td class="text-center">' + user.FIO + '</td><td class="text-center">' + user.sex + '</td><td class="text-center">' + user.followingDate + '</td><td class="text-center">' + user.mail + '<br>' + user.tel +'</td><td class="text-center"><button title="Открыть профиль" type="button" class="btn btn-info" data-toggle="modal" data-target="#tabelTime"><span class="glyphicon glyphicon-user"></span></button><button title="Редактировать" type="button" class="btn btn-warning" data-toggle="modal" data-target="#rewriteModal"><span class="glyphicon glyphicon-pencil"></span></button><button title="Удалить" type="button" class="btn btn-danger delete"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
};

//Работа с общей таблицей

     //Добавление юзера

function addData () {
	var user = {
		FIO: $("input[id='inputFIO1']").val(),
		sex: $("input[name='optionsRadios']:checked").val(),
		mail: $("input[id='inputEmail2']").val(),
		tel: $("input[id='inputTel3']").val(),
		followingDate: moment(new Date()).locale('ru').format("LL"),
		tabel: []
	};
	users.push(user);
	$("#workerlist").empty();
	userPage = Math.ceil(users.length/usersOnPage)-1;
	var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		for(var i = start; i <= end; i++) {
			if (!users[i]) {
				break;
			}
			updateTbl(users[i], i);
		}   
		$('#allusers li').removeClass('active'); 
		
	$('#myModal').modal('hide');
	$(':input[type=text]','#myform').val('');
	$(':input[type=email]','#myform').val('');
 	$(':input[type=radio]','#myform').prop('checked', false);
 	localStorage["names"] = JSON.stringify(users);
 	filteredUsers = [];
 	pagesLength();
 	$('#page-'+userPage).addClass('active');
 	$('#searchInput').val('');
};

$('#adduser').on('click', addData);

	// Удаление юзера

function removeuser() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}

	else {
		massive = users;
	}

	if(confirm("Вы уверены, что хотите удалить пользователя?")) {
		var rowId = $(this).parent().parent().attr('id');
		rowId = rowId.split('-')[1];

		if (filteredUsers.length !==0) {
			for (var i = 0; i < users.length; i++) {
				if(users[i].FIO == massive[rowId].FIO) {
					users.splice(i, 1);
					break;
				}
			}
		}

		massive.splice(parseInt(rowId), 1);
		$("#workerlist").empty();

		if (massive.length % usersOnPage == 0) {
			pagesLength();
			userPage = Math.ceil(massive.length/usersOnPage)-1;
		}

		$('#allusers li').removeClass('active');

		var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		for(var i = start; i <= end; i++) {
			if (!massive[i]) {
				break;
			}
			updateTbl(massive[i], i);
		}
		if (filteredUsers.length !==0) {
			filteredUsers = massive;
		}
		else {
			users = massive;
		}
	} else return;

	localStorage["names"] = JSON.stringify(users);
	pagesLength();
	$('#page-'+userPage).addClass('active');
};

$('body').on('click', '.delete', removeuser);	

	// Открытие модали редактирования

function rewriteData() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var rowId = $(this).parent().parent().attr('id');
	rowId = parseInt(rowId.split('-')[1]);
	userNumForUpdate = rowId;
	$("input[id='inputFIO1rewrite']").val(massive[rowId].FIO);
	$("input[id='inputEmail2rewrite']").val(massive[rowId].mail);
	$("input[id='inputTel3rewrite']").val(massive[rowId].tel);
	if (massive[rowId].sex == "Мужской") {
		$('#optionsRadios1rewrite').prop('checked', true);
	}
	else {
		$('#optionsRadios2rewrite').prop('checked', true);
	}
};

$('body').on('click', '.btn-warning', rewriteData);

	// Редактирование юзера

function rewriteUser() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	massive[userNumForUpdate].FIO = ($("input[id='inputFIO1rewrite']").val());
	massive[userNumForUpdate].mail = ($("input[id='inputEmail2rewrite']").val());
	massive[userNumForUpdate].tel = ($("input[id='inputTel3rewrite']").val());
	massive[userNumForUpdate].sex = ($("input[name='optionsRadiosrewrite']:checked").val());
	$('#rewriteModal').modal('hide');
	$("#workerlist").empty();
	var page = userPage;
	var start = page * usersOnPage;
	var end = start + usersOnPage - 1;
	for(var i = start; i <= end; i++) {
		if (!massive[i]) {
			break;
		}
		updateTbl(massive[i], i);
	}
	if (filteredUsers.length !==0) {
		filteredUsers = massive;
	}
	else {
		users = massive;
	}

	localStorage["names"] = JSON.stringify(users);
};

$('#rewrite').on('click', rewriteUser);


//Табель

function addUserName() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var rowId = $(this).parent().parent().attr('id');
	rowId = parseInt(rowId.split('-')[1]);
	userNumForUpdate = rowId;
	$("#workersname").empty();
	$('#workersname').append(massive[rowId].FIO);
	workDayPage = Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-1;
	var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[rowId].tabel[i]) {
				break;
			}
			updateWorkDays(massive[rowId].tabel[i]);
		}
	workDayLength();
	$('#tabelpage-'+workDayPage+'').addClass('active');
	$('#tabelnextpage').addClass('disabled');
	var tabelLength = massive[rowId].tabel.length;

	if(tabelLength == 0) {
		$('#beginning').attr('disabled', false);
		$('#ending').attr('disabled', true);
	}
	else {
		if(massive[rowId].tabel[tabelLength - 1].end) {
			$('#beginning').attr('disabled', false);
			$('#ending').attr('disabled', true);
		}
		else {
			$('#beginning').attr('disabled', true);
			$('#ending').attr('disabled', false);
		}
	}
};
	
$('body').on('click', '.btn-info', addUserName);

function addNewDay() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}
	var workDay = {
		day:moment(new Date()).locale('ru').format("L"),
		begin:moment(new Date()).locale('ru').format("LT"),
		end:null
	}
	massive[userNumForUpdate].tabel.push(workDay);
		if (filteredUsers.length !==0) {
		filteredUsers = massive;
	}
	else {
		users = massive;
	}
	localStorage["names"] = JSON.stringify(users);
	workDayPage = Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-1;
	var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[userNumForUpdate].tabel[i]) {
				break;
			}
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	workDayLength();
	$('#tabelpage-'+workDayPage+'').addClass('active');
	$('#tabelnextpage').addClass('disabled');
	$('#beginning').attr('disabled', true);
	$('#ending').attr('disabled', false);
};

$('body').on('click', '#beginning', addNewDay);

function endNewDay() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}
	$('#beginning').attr('disabled', false);
	$('#ending').attr('disabled', true);
	var tabelLength = massive[userNumForUpdate].tabel.length;
	massive[userNumForUpdate].tabel[tabelLength - 1].end = moment(new Date()).locale('ru').format("LT");
	$('#daysList>tr:last>td:last').append(massive[userNumForUpdate].tabel[tabelLength - 1].end);
	if (filteredUsers.length !==0) {
		filteredUsers = massive;
	}
	else {
		users = massive;
	}
	localStorage["names"] = JSON.stringify(users);
};

$('body').on('click', '#ending', endNewDay);


function updateWorkDays(workDay) {
	if (workDay.end == null) {
		$('#daysList').append('<tr><td class="text-center">'+workDay.day+'</td><td class="text-center">'+workDay.begin+'</td><td class="text-center"></td></tr>');
	}
	else {
	$('#daysList').append('<tr><td class="text-center">'+workDay.day+'</td><td class="text-center">'+workDay.begin+'</td><td class="text-center">'+workDay.end+'</td></tr>');
}
};

//Пагинация общей таблицы

function pagesLength(){
	var massive;

	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var pages = Math.ceil(massive.length/usersOnPage);

	$("#allusers").empty();

	if (pages <=6) {
		$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
		$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
		for (var i = 0; i < pages; i++) {
			$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
		};
		$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
		$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		$('#firstpage').addClass('disabled');
		$('#prevpage').addClass('disabled');
		$('#nextpage').addClass('disabled');
		$('#lastpage').addClass('disabled');
		checkPage();
	}
	else {
		if (userPage <= 2) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			for (var i = 0; i < 5; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="next3page"><a href="#">...</a></li>');
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}

		else if (userPage>2 && userPage < Math.ceil(massive.length/usersOnPage)-3) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			$('#allusers').append('<li id="prev3page"><a href="#">...</a></li>');
			for (var i = userPage-2; i <= userPage+2; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="next3page"><a href="#">...</a></li>');
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}

		else if (userPage >= Math.ceil(massive.length/usersOnPage)-3) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			$('#allusers').append('<li id="prev3page"><a href="#">...</a></li>');
			for (var i = Math.ceil(massive.length/usersOnPage)-5; i <= Math.ceil(massive.length/usersOnPage)-1; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}
	}
	checkPage();
};

function addUsersOnPage() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var id = $(this).attr('id');

	if($(this).attr('class') == "disabled") {
		return;
	}
	if (id == 'firstpage') {
		$('#allusers li').removeClass('active');
		userPage = 0;
		pagesLength();
		$('#page-'+userPage+'').addClass('active');
		var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#workerlist").empty();
		for(var i = start; i <= end; i++) {
			updateTbl(massive[i], i);
		}
	}
	else if (id == "prevpage") {
		$('#allusers li').removeClass('active');
		userPage = userPage - 1;
		pagesLength();
		$('#page-'+userPage+'').addClass('active');
		var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#workerlist").empty();
		for(var i = start; i <= end; i++) {
			updateTbl(massive[i], i);
		}
	}
	else if (id == "nextpage") {
		$('#allusers li').removeClass('active');
		userPage = userPage + 1;
		pagesLength();
		$('#page-'+userPage+'').addClass('active');
		var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#workerlist").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[i]) {
				break;
			}
			updateTbl(massive[i], i);
		}
	}
	else if (id == "lastpage") {
		$('#allusers li').removeClass('active');
		userPage = Math.ceil(massive.length/usersOnPage)-1;
		pagesLength();
		$('#page-'+userPage+'').addClass('active');
		var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#workerlist").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[i]) {
				break;
			}
			updateTbl(massive[i], i);
		}
	}
	else {
		$('#allusers li').removeClass('active');
		var page = $(this).attr('id');
			page = parseInt(page.split('-')[1]);
			userPage = page;
			pagesLength();
			$('#page-'+userPage+'').addClass('active');
			var start = page * usersOnPage;
			var end = start + usersOnPage - 1;
			$("#workerlist").empty();
			for(var i = start; i <= end; i++) {
				if (!massive[i]) {
					break;
				}
				updateTbl(massive[i], i);
			}
	}
	checkPage();
};
$('body').on('click', '#allusers li', addUsersOnPage);

function checkPage() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}
	$('#prev3page').addClass('disabled');
	$('#next3page').addClass('disabled');
	
	if (Math.ceil(massive.length/usersOnPage)<=1) {
		$('#firstpage').addClass('disabled');
		$('#prevpage').addClass('disabled');
		$('#nextpage').addClass('disabled');
		$('#lastpage').addClass('disabled');
		return;
	}
	if (userPage == 0 && Math.ceil(massive.length/usersOnPage)>1) {
		$('#firstpage').addClass('disabled');
		$('#prevpage').addClass('disabled');
		$('#nextpage').removeClass('disabled');
		$('#lastpage').removeClass('disabled');
	}
	else if (userPage == Math.ceil(massive.length/usersOnPage)-1) {
		$('#lastpage').addClass('disabled');
		$('#nextpage').addClass('disabled');
		$('#prevpage').removeClass('disabled');
		$('#firstpage').removeClass('disabled');
	}
	else {
		$('#firstpage').removeClass('disabled');
		$('#prevpage').removeClass('disabled');
		$('#nextpage').removeClass('disabled');
		$('#lastpage').removeClass('disabled');
	}
};

// Пагинация табеля

function workDayLength() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}
	var pages = Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage);
	$("#tabelLength").empty();
	if (pages <=6) {
		$('#tabelLength').append('<li id="tabelfirstpage"><a href="#">&laquo;&laquo;</a></li>');
		$('#tabelLength').append('<li id="tabelprevpage"><a href="#">&laquo;</a></li>');
		for (var i = 0; i < pages; i++) {
			$('#tabelLength').append('<li id="tabelpage-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
		};
		$('#tabelLength').append('<li id="tabelnextpage"><a href="#">&raquo;</a></li>');
		$('#tabelLength').append('<li id="tabellastpage"><a href="#">&raquo;&raquo;</a></li>');
	}
	else {
		if (workDayPage <= 2) {
			$('#tabelLength').append('<li id="tabelfirstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#tabelLength').append('<li id="tabelprevpage"><a href="#">&laquo;</a></li>');
			for (var i = 0; i < 5; i++) {
				$('#tabelLength').append('<li id="tabelpage-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#tabelLength').append('<li id="tabelnext3page"><a href="#">...</a></li>');
			$('#tabelLength').append('<li id="tabelnextpage"><a href="#">&raquo;</a></li>');
			$('#tabelLength').append('<li id="tabellastpage"><a href="#">&raquo;&raquo;</a></li>');
		}
		else if (workDayPage > 2 && workDayPage < Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-3) {			
			$('#tabelLength').append('<li id="tabelfirstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#tabelLength').append('<li id="tabelprevpage"><a href="#">&laquo;</a></li>');
			$('#tabelLength').append('<li id="tabelprev3page"><a href="#">...</a></li>');
			for (var i = workDayPage-2; i <= workDayPage+2; i++) {
				$('#tabelLength').append('<li id="tabelpage-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#tabelLength').append('<li id="tabelnext3page"><a href="#">...</a></li>');
			$('#tabelLength').append('<li id="tabelnextpage"><a href="#">&raquo;</a></li>');
			$('#tabelLength').append('<li id="tabellastpage"><a href="#">&raquo;&raquo;</a></li>');
		}
		else if (workDayPage >= Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-3) {
			$('#tabelLength').append('<li id="tabelfirstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#tabelLength').append('<li id="tabelprevpage"><a href="#">&laquo;</a></li>');
			$('#tabelLength').append('<li id="tabelprev3page"><a href="#">...</a></li>');
			for (var i = Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-5; i <= Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-1; i++) {
				$('#tabelLength').append('<li id="tabelpage-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#tabelLength').append('<li id="tabelnextpage"><a href="#">&raquo;</a></li>');
			$('#tabelLength').append('<li id="tabellastpage"><a href="#">&raquo;&raquo;</a></li>');
		}
	}
	tabelCheckPage();
};

function tabelCheckPage() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	$('#tabelprev3page').addClass('disabled');
	$('#tabelnext3page').addClass('disabled');

	if (Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)<=1) {
		$('#tabelfirstpage').addClass('disabled');
		$('#tabelprevpage').addClass('disabled');
		$('#tabelnextpage').addClass('disabled');
		$('#tabellastpage').addClass('disabled');
		return;
	}
	if (workDayPage == 0 && Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)>1) {
		$('#tabelfirstpage').addClass('disabled');
		$('#tabelprevpage').addClass('disabled');
		$('#tabelnextpage').removeClass('disabled');
		$('#tabellastpage').removeClass('disabled');
	}
	else if (workDayPage == Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-1) {
		$('#tabellastpage').addClass('disabled');
		$('#tabelnextpage').addClass('disabled');
		$('#tabelprevpage').removeClass('disabled');
		$('#tabelfirstpage').removeClass('disabled');
	}
	else {
		$('#tabelfirstpage').removeClass('disabled');
		$('#tabelprevpage').removeClass('disabled');
		$('#tabelnextpage').removeClass('disabled');
		$('#tabellastpage').removeClass('disabled');
	}
};

function addTabelOnPage() {
	var massive;
	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var id = $(this).attr('id');

	if($(this).attr('class') == "disabled") {
		return;
	}
	if (id == 'tabelfirstpage') {
		$('#tabelLength li').removeClass('active');
		workDayPage = 0;
		workDayLength();
		$('#tabelpage-'+workDayPage+'').addClass('active');
		var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	}

	else if (id == "tabelprevpage") {
		$('#tabelLength li').removeClass('active');
		workDayPage = workDayPage - 1;
		workDayLength();
		$('#tabelpage-'+workDayPage+'').addClass('active');
		var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[userNumForUpdate].tabel[i]) {
				break;
			}
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	}
	else if (id == "tabelnextpage") {
		$('#tabelLength li').removeClass('active');
		workDayPage = workDayPage + 1;
		workDayLength();
		$('#tabelpage-'+workDayPage+'').addClass('active');
		var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[userNumForUpdate].tabel[i]) {
				break;
			}
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	}
	else if (id == "tabellastpage") {
		$('#tabelLength li').removeClass('active');
		workDayPage = Math.ceil(massive[userNumForUpdate].tabel.length/usersOnPage)-1;
		workDayLength();
		$('#tabelpage-'+workDayPage+'').addClass('active');
		var page = workDayPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[i]) {
				break;
			}
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	}
	else {
		$('#tabelLength li').removeClass('active');
		var page = $(this).attr('id');
		page = parseInt(page.split('-')[1]);
		workDayPage = page;
		workDayLength();
		$('#tabelpage-'+workDayPage+'').addClass('active');
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		$("#daysList").empty();
		for(var i = start; i <= end; i++) {
			if (!massive[userNumForUpdate].tabel[i]) {
				break;
			}
			updateWorkDays(massive[userNumForUpdate].tabel[i]);
		}
	}
	tabelCheckPage();
};

$('body').on('click', '#tabelLength li', addTabelOnPage);

//Поиск

function searchUsers() {
	var searchText = $("input[id='searchInput']").val();
	if(searchText == "") {
		return;
	}
	filteredUsers = users.filter(function(item) {
		if (item.FIO.indexOf(searchText) != -1)
			return true;
		else
			return false;
	});
	$("#workerlist").empty();
	userPage = 0;
	var page = userPage;
		var start = page * usersOnPage;
		var end = start + usersOnPage - 1;
		for(var i = start; i <= end; i++) {
			if (!filteredUsers[i]) {
				break;
			}
			updateTbl(filteredUsers[i], i);
		}   
 	pagesLength();
 	$('#page-'+userPage).addClass('active');
 	$('#prevpage').addClass('disabled');
 	checkPage();
};
$('#searchbutton').on('click', searchUsers);

function resetUsers() {
	filteredUsers = [];
	$('#searchInput').val('');
 	pagesLength();
 	addUsers();
 	checkPage();
}

$('#reset').on('click', resetUsers);


//pagesLength()
/*
	var massive;

	if (filteredUsers.length !==0) {
		massive = filteredUsers;
	}
	else {
		massive = users;
	}

	var pages = Math.ceil(massive.length/usersOnPage);

	$("#allusers").empty();

	if (pages <=6) {
		$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
		$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
		for (var i = 0; i < pages; i++) {
			$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
		};
		$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
		$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		$('#firstpage').addClass('disabled');
		$('#prevpage').addClass('disabled');
		$('#nextpage').addClass('disabled');
		$('#lastpage').addClass('disabled');
		checkPage();
	}
	else {
		if (userPage <= 2) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			for (var i = 0; i < 5; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="next3page"><a href="#">...</a></li>');
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}

		else if (userPage>2 && userPage < Math.ceil(massive.length/usersOnPage)-3) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			$('#allusers').append('<li id="prev3page"><a href="#">...</a></li>');
			for (var i = userPage-2; i <= userPage+2; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="next3page"><a href="#">...</a></li>');
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}

		else if (userPage >= Math.ceil(massive.length/usersOnPage)-3) {
			$('#allusers').append('<li id="firstpage"><a href="#">&laquo;&laquo;</a></li>');
			$('#allusers').append('<li id="prevpage"><a href="#">&laquo;</a></li>');
			$('#allusers').append('<li id="prev3page"><a href="#">...</a></li>');
			for (var i = Math.ceil(massive.length/usersOnPage)-3; i <= Math.ceil(massive.length/usersOnPage)-1; i++) {
				$('#allusers').append('<li id="page-'+ i +'"><a href="#">'+(i+1)+'</a></li>')
			};
			$('#allusers').append('<li id="nextpage"><a href="#">&raquo;</a></li>');
			$('#allusers').append('<li id="lastpage"><a href="#">&raquo;&raquo;</a></li>');
		}
	}
*/