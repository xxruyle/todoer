import { ProjectManager } from './project_manager'
import { Project } from './project';
import { TODOItem } from './todo_item';

const StorageManager = (() => {
    const storageAvailable = (type) => {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === "QuotaExceededError" ||
              // Firefox
              e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }

    const localisAvailable = () => {
        return storageAvailable("localStorage");
    }

    const isPopulated = () => {
        return (localStorage.getItem('projects'));
    }

    const printStorage = () => {
        console.log(localStorage.getItem('projects'));
    }

    const populate = (projManager) => {



        localStorage.setItem("projects", JSON.stringify(projManager.projects));
        // console.log(JSON.parse(localStorage.getItem("projects"))); 
    }

    const loadInData = (projManager) => {
        let storedProjects = JSON.parse(localStorage.getItem("projects")); 
        storedProjects.forEach(element => {
            if (element.titleName != "Home")
            {
                
                let todoArray = element.toDos; 
                let newTodos = [];
                todoArray.forEach(todo => {
                    let newTodo = TODOItem(todo.title, '', todo.dueDate, ''); 
                    newTodo.isCompleted = todo.isCompleted; 
                    newTodo.changeCompleted(todo.isCompleted);

                    newTodo.dueDate = todo.dueDate;
                    newTodo.changeDate(todo.dueDate);

                    newTodos.push(newTodo);
                })
                let newProject = Project(element.titleName, element.description);
                newProject.toDos = newTodos;
                newProject.changeTodos(newTodos);

                projManager.projects.push(newProject);


            }

        });

        // console.log(projManager.projects);


    }

    const storageInit = (projManager) => {
        if (!isPopulated()) 
        {
            populate(projManager); 
        } else { 
            loadInData(projManager);
        }
    }





    return {storageInit, populate, storageAvailable, localisAvailable, printStorage}; 
})();



export {
    StorageManager
};