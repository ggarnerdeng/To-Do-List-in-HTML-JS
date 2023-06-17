# To-Do-List Overview
This program is a task management application written in JavaScript. It allows users to add tasks, view and filter tasks, delete tasks, edit task details, and sort tasks based on different criteria. It also incorporates HTML, CSS, and AWS Amplify hosting. The repository can be cloned locally for personal use. A basic user authentication is enforced for its online access:

Access link: https://main.d2yoboshxycv6f.amplifyapp.com/

Ask owner(ggarnerdeng) for credentials to access. 

# Features:

- Add Task: Users can enter a task and add it to the task list.
- Render Tasks: Displays the tasks in a list format, including task details such as the task name, date created, and priority value.
- Edit Task: Allows users to modify the task name and priority value of an existing task.
- Download Tasks: Enables users to download the task list as a text file.
- Import Tasks: Allows users to import tasks from a text file.
- Save Tasks: Persists the tasks in local storage to maintain data between page reloads.
- Retrieve Tasks: Retrieves the tasks from local storage on page load.
- Sort Tasks: Provides sorting options for tasks by name, date created, and priority value.

===============================================================================
# Changelog:
6/17/2023: Added header. New entries now appear on top row. Added confirmation
  dialogue for deletion of items. Added case insensitive, highlighted match
  search functionality. Fixed deletion bug where after using search, task items
  had different indexes, leading to deletion of incorrect items. Added mobile-
  friendly CSS version. Priority value now numeric and adjustable. Edit button now autopopulates original values of task name and priority value.

===============================================================================
# List of possible improvements:

1. User Authentication: Implement a user authentication system where users can sign up, log in, and have their own personalized to-do lists. This would involve using technologies like user registration, login/logout functionality, and secure storage of user data.
  * Amazon Amplify has a built in user authentication. 

~~2. Task Categories or Labels: Allow users to categorize their tasks by adding labels or categories. This feature would enable better organization and filtering of tasks based on specific categories.~~
  * Added a search task feature that fulfills this function.

3. Task Reminders and Notifications: Implement reminders and notifications for tasks. Users could set reminders for specific tasks, and the application would notify them at the specified time or through other channels like email or mobile notifications.

4. Task Sharing and Collaboration: Enable task sharing and collaboration among users. This feature would allow users to share tasks with others, assign tasks to specific individuals, and track progress on shared tasks.

~~5. Task Prioritization and Sorting Options: Extend the sorting functionality by providing more advanced sorting options such as sorting by multiple criteria (e.g., date and priority), custom sorting orders, and dynamic sorting based on user preferences.~~

6. Task Scheduling and Calendar Integration: Integrate task scheduling and calendar functionality into the application. Users could schedule tasks on specific dates and have them automatically synced with their preferred calendar application.

7. Data Visualization and Analytics: Provide visual representations of task data using charts, graphs, or other data visualization techniques. This feature would allow users to gain insights into their task management patterns, productivity levels, and task completion trends.

~~8. Mobile App or Responsive Design: Develop a mobile application or ensure that the web application has a responsive design that adapts to different screen sizes and devices. This would enhance accessibility and usability for users on mobile devices.~~

9. Undo/Redo Functionality: Implement undo and redo functionality to allow users to revert changes made to tasks. This feature would provide an extra layer of control and flexibility when managing tasks.

10. Task History and Activity Logs: Keep track of task history and activity logs, including changes made to tasks, completion status, and timestamps. This feature would enable users to review and track their task management activities.

11. Modularization: Break down the code into reusable functions to improve code readability and maintainability. Separate the code into functions based on their specific responsibilities, such as adding a task, rendering tasks, toggling completion, deleting a task, editing a task, and so on.

~~12. User Experience Enhancements: Add additional features to enhance the user experience. For example, include confirmation dialogs before deleting a task, provide sorting options for tasks, add filtering or searching functionality, implement task prioritization with visual indicators, and so on.~~