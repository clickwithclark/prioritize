# PR1ORITI23
A task organizer to manage your daily todo lists.

A pet project that was created to be used by me and my family.

By sharing a single account we are able to keep grocery lists synchronized
between our devices as well as any todo's chores or errands we wanted each
other to see. My sister would also use it to assign chores to each of her kids if
she is working late.

![Screenshot of PR1ORITI23 .](/images/clarkfamily.png "Screenshot of PR1ORITI23")

<h2>Instructions</h2>
 
* To enter a basic task just give it a name and press enter.

* To enter a task and assign it a category put the category inside parentheses (    )
e.g. (Math) calculus or (Math) fractions.

* Entering a task one at a time can become tedious, so you can enter multiple tasks at a time by seperating each task by a comma  ,
e.g. Walk the dog  , pick up milk  , call Jane.

* You can also include categories with the multiple task entry
e.g.(Rufus) Walk the dog , (Supermarket)pick up milk , (Visiting this summer)call Jane.

* But what if you wanted to make a list all your task belonging to one category?
you don't have to write...
(Grocerylist) eggs , (Grocerylist) cheese , (Grocerylist) bread . . .

* you can use a colon : after the brackets to set all following task to that group.
e.g. (Grocerylist) : eggs , cheese , bread



<h2> Brief </h2>

* This application was written in javascript and uses firebase to authenticate
the user accounts and store the user data.

* The app was created as a progressive web app (PWA) and so a service worker was implemented to allow the web app to be saved onto a handset and function as a 
native web app with a mobile icon.

* A 'Stale-While-Revalidate' pattern is also
implemented to respond to the request as quickly as possible with a cached response if available, falling back to the network request if it's not cached. This allows the app to still run even when there is no internet access and will automatically synchronize
when internet becomes available.

* You can sort by date entered first or last (calendar icon) Or alphabetically based on Category name (tag icon)
* You can also mark tasks as completed by pressing on them to cross them out but leave them in the que if its a recurring task
* You can delete all groups of completed tasks at once or delete them one by one
* If you want to copy your task list to carry over to another account, you can
click on the floating head to export your task list and it will be copied to your clipboard.
* Every entry or update is saved automatically after a few seconds.
* Manual re-odering is not implemented on mobile-view but is available on a desktop.

<h2>Technologies Used</h2>

* HTML5
* CSS3
* JavaScript
* Git
* GitHub
* Google Fonts
* Firebase
* Sass
* Photoshop
* Webpack
* Eslint
* Bootstrap




### License

Copyright K. Stephen Clark - All Rights Reserved

Unauthorized copying of this project, via any medium is strictly prohibited
Proprietary and confidential.

Written by K. Stephen Clark [clickwithclark.com](https://clickwithclark.com/) , 2021