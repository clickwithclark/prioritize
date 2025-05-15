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

- To enter a task and assign it a category put the category inside parentheses ( )
  e.g. (Math) calculus or (Math) fractions.

- Entering a task one at a time can become tedious, so you can enter multiple tasks at a time by separating each task by a comma ,
  e.g. Walk the dog , pick up milk , call Jane.

- You can also include categories with the multiple task entry
  e.g.(Rufus) Walk the dog , (Supermarket)pick up milk , (Visiting this summer)call Jane.

- But what if you wanted to make a list all your task belonging to one category?
  you don't have to write...
  (Grocerylist) eggs , (Grocerylist) cheese , (Grocerylist) bread . . .

- you can use a colon : after the brackets to set all following task to that group.
  e.g. (Grocerylist) : eggs , cheese , bread

<h2> Brief </h2>

- This application was written in javascript and uses firebase to authenticate
  the user accounts and store the user data.

- The app was created as a progressive web app (PWA) and so a service worker was implemented to allow the web app to be saved onto a handset and function as a
  native web app with a mobile icon.

- A 'Stale-While-Revalidate' pattern is also
  implemented to respond to the request as quickly as possible with a cached response if available, falling back to the network request if it's not cached. This allows the app to still run even when there is no internet access and will automatically synchronize
  when internet becomes available.

- You can sort by date entered first or last (calendar icon) Or alphabetically based on Category name (tag icon)
- You can also mark tasks as completed by pressing on them to cross them out but leave them in the que if its a recurring task
- You can delete all groups of completed tasks at once or delete them one by one
- If you want to copy your task list to carry over to another account, you can
  click on the floating head to export your task list and it will be copied to your clipboard.
- Every entry or update is saved automatically after a few seconds.
- Manual re-odering is not implemented on mobile-view but is available on a desktop.

<h2>Technologies Used</h2>

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- Google Fonts
- Firebase
- Sass
- Photoshop
- Webpack
- Eslint
- Bootstrap

---

## Features

### **1. Task Management**

- **Add Todos**: Quickly add single or multiple tasks with a simple input.
- **Categorize Tasks**: Assign categories to tasks using parentheses (e.g., `(Work) Finish report`).
- **Group Tasks**: Group multiple tasks under a single category using a colon (e.g., `(Groceries): Milk, Bread, Eggs`).

### **2. Sorting and Organization**

- **Category Sorting**: Sort tasks alphabetically by category.
- **Date Sorting**: Sort tasks by creation date, with toggleable ascending/descending order.
- **Drag-and-Drop**: Reorder tasks easily with drag-and-drop functionality.

### **3. Task Completion**

- **Mark as Complete**: Toggle tasks as completed or incomplete with a single click.
- **Visual Indicators**: Completed tasks are visually distinct with a checkmark and strikethrough text.

### **4. Bulk Actions**

- **Delete All Tasks**: Clear all tasks with a confirmation dialog.
- **Delete Completed Tasks**: Remove only completed tasks to keep your list clean.

### **5. User-Friendly Interface**

- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dropdown Toggles**: Show or hide input fields and task lists for a cleaner interface.
- **Tutorial**: Built-in tutorial to guide new users through the app's features.

### **6. Data Persistence**

- **Local Storage**: Automatically saves tasks locally, so your data is safe even if you refresh the page.
- **Firebase Integration**: Sync tasks across devices by signing in with your account.

### **7. Feedback and Notifications**

- **Real-Time Feedback**: Get instant feedback for actions like adding, editing, or deleting tasks.
- **Error Handling**: Displays helpful error messages for invalid inputs or actions.

### **8. Export and Backup**

- **Export Tasks**: Export your task list as a formatted string for sharing or backup.
- **Save to Database**: Save tasks to the cloud for secure storage and multi-device access.

### **9. Accessibility**

- **Keyboard Shortcuts**: Add tasks quickly by pressing "Enter" after typing.
- **Focus Management**: Automatically focuses on the input field for faster task entry.

### **10. Customization**

- **Dynamic Categories**: Add custom categories on the fly.
- **Customizable Sorting**: Choose how tasks are displayed based on your preferences.

---

### License

MIT License

Copyright (c) 2021 K. Stephen Clark

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
