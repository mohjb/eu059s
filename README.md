"# eu059s" 


TODO: radio buttons , disabled by default
TODO: class-switch and gray
TODO: intp-text / text-area value instead of no
TODO: <BR/> for right column radio-buttons

TODO: table for project-lists
TODO: table for buildings
TODO: table for floors
TODO: table for sheets
TODO: cancel right menu, and reposition buttons
TODO: user-management , 
	create user
	list users table, columns: 
		user-name, 
		email, 
		tel, 
		reset-password
		upload pic
		user-level ,drop-down-menu for setting (super, edit/supervisor, read-only, disabled)
	check user-level for features 
		super
			the users-screen, list-users-table, create-user, edit user
			delete project/building/floor/sheet
			query/report
			view log
			config - definitions
		edit
			create/edit project/building/floor/sheet
		read-only
			list projects/buildings/floors/sheets
			view sheet
			search
			change password
	pipe-dream: user-groups
////////////////////////////////////////////////
2016.07.14 - TODO-list

dbt.sheets.jsonRef is wrong when creating a new sheet

in the sheet screen, add the next/prev/new/delete buttons

on smart-devices the top bar doesnt show the buttons

html edit (project/building/floor) gray color for the title on the TD level and not only the H1 tag

Deleting, the server will not delete Proj/Bld , unless there are no dependencies
when deleting , the client/browser should ask for confirmation

when deleting a floor, the server will delete all the dependent sheets

set session timeout 4hours

ajax keep alive for textarea/input-text , so that the session-timeout is reset

client-side invalidate the history , and invalidate the login-screen

project title has to be unique

building titles within the project have to be unique

floor title within a building have to be unique

for creating new entities, show aa edit dialog, instead of inserting default values

shorten the tables into columns for upper entites. bread-crumbes

titles change to non capitalized style

the radio-button-group working/dorment
	is conditional under all the inputs of Cracking-Pattern

for floor , upload file, if its a pdf then use iframe-htmlTag, if an img then use img-htmlTag
				
only show list of sheets when selecting a floor, change the html of the sheet list, htmlfloat left,

for desktop devices , use html canvas vidoe stream from the camera

