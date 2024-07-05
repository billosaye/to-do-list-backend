const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Example in-memory data (replace with your own data handling)
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2' }
];

// Routes for CRUD operations on tasks
// GET all tasks
app.get('/tasks', (req, res) => {                      
    res.json(tasks);                                     // Respond with the tasks array in JSON format
  });
  
  // POST a new task
  app.post('/tasks', (req, res) => {                     // Define a POST route to create a new task
    const { title, description } = req.body;             // Destructure title and description from the request body
    const newTask = { id: tasks.length + 1, title, description }; // Create a new task object with a unique ID
    tasks.push(newTask);                                 // Add the new task to the tasks array
    res.status(201).json(newTask);                       // Respond with the new task and set the status to 201 (Created)
  });
  
  // GET a specific task by id
  app.get('/tasks/:id', (req, res) => {                  // Define a GET route to retrieve a specific task by ID
    const taskId = parseInt(req.params.id);              // Parse the task ID from the request parameters
    const task = tasks.find(task => task.id === taskId); // Find the task with the matching ID in the tasks array
    if (!task) {                                         // If the task is not found
      return res.status(404).json({ message: 'Task not found' }); // Respond with a 404 status and error message
    }
    res.json(task);                                      // Respond with the found task in JSON format
  });
  
  // PUT update a task by id
  app.put('/tasks/:id', (req, res) => {                  // Define a PUT route to update a task by ID
    const taskId = parseInt(req.params.id);              // Parse the task ID from the request parameters
    const { title, description } = req.body;             // Destructure title and description from the request body
    let taskUpdated = false;                             // Initialize a flag to track if the task was updated
    tasks = tasks.map(task => {                          // Map over the tasks array
      if (task.id === taskId) {                          // If the task ID matches
        task.title = title;                              // Update the task's title
        task.description = description;                  // Update the task's description
        taskUpdated = true;                              // Set the flag to true
      }
      return task;                                       // Return the (possibly updated) task
    });
    if (!taskUpdated) {                                  // If no task was updated
      return res.status(404).json({ message: 'Task not found' }); // Respond with a 404 status and error message
    }
    res.json({ message: 'Task updated successfully' });  // Respond with a success message
  });
  
  // DELETE a task by id
  app.delete('/tasks/:id', (req, res) => {               // Define a DELETE route to delete a task by ID
    const taskId = parseInt(req.params.id);              // Parse the task ID from the request parameters
    const initialLength = tasks.length;                  // Store the initial length of the tasks array
    tasks = tasks.filter(task => task.id !== taskId);    // Filter the tasks array to remove the task with the matching ID
    if (tasks.length === initialLength) {                // If the length of the tasks array has not changed
      return res.status(404).json({ message: 'Task not found' }); // Respond with a 404 status and error message
    }
    res.json({ message: 'Task deleted successfully' });  // Respond with a success message
  });
  
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  