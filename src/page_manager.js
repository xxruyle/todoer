import { ProjectManager } from './project_manager';
import { StorageManager } from './storage';


const PageManager = ( () => {
    const projectsContainer = document.querySelector('.projects-container'); 


    // let {showDOM, addProject} = ProjectManager;  

    let current = 0; 

    const detectCurrentProject = (projManager) => {
        projectsContainer.addEventListener('click', (event) => {
    
            if (Array.from(event.target.classList).includes("project-title"))
            {   
                save(projManager); // auto save if switching projects
                current = Number(event.target.parentNode.dataset['id']); 
                projManager.showDOM(current);
            }
        })
    }

    const detectADDEvent = (projManager) => {
        const addNode = document.querySelector('.add-container');

        addNode.addEventListener('click', (event) => {
            save(projManager); // auto save if adding a project
            projManager.addProject("New Project", "Project description"); 
            projManager.showDOM(current); 
        })

        const todoNode = document.querySelector('#add-todo'); 

        const todoTitleNode = document.querySelector('#todo-title');


        todoNode.addEventListener('click', (event) => {
            save(projManager);
            projManager.projects[current].addTODO(todoTitleNode.value, "", "", ""); 
            projManager.showDOM(current);
        })
    }

    const detectProjectChange = (projManager) => {
        const titleNode = document.querySelector('.title');

        titleNode.addEventListener('input', (event) => {
            projManager.projects[current].changeTitle(titleNode.textContent);

        })
    }



    const detectSaveChanges = (projManager) => {
        const saveChanges = document.querySelector('.save-changes'); 

        saveChanges.addEventListener('click', () => {
            save(projManager); 
        })
    }

    const save = (projManager) => {
        StorageManager.populate(projManager);


        const titleNode = document.querySelector('.title');
        const description = document.querySelector('.description');

        projManager.projects[current].titleName = titleNode.textContent;
        projManager.projects[current].changeTitle(titleNode.textContent);

        projManager.projects[current].description = description.textContent;
        projManager.projects[current].changeDescription(description.textContent); 
        
        
        projManager.updateTodos(current); 
        projManager.updateDates(current);


        projManager.showDOM(current);
    }

    const detectDeleteTodo = (projManager) => {
        const todoContainer = document.querySelector('.display-container');

        todoContainer.addEventListener('click', (event) => {

            if (event.target.nodeName === "SPAN")
            {
                save(projManager);

                projManager.projects[current].deleteTodo(event.target.id);
                projManager.showDOM(current); 
            }
        })
    }

    const detectDeleteProject = (projManager) => {
        const projectsContainer = document.querySelector('.projects-container');

        projectsContainer.addEventListener('click', (event) => {
            if (event.target.nodeName === "SPAN") 
            {
                save(projManager);
                let isLast = projManager.deleteProject(event.target.parentNode.parentNode.dataset.id);
                if (current > 0) 
                {
                    current -= 1; 
                } 

                projManager.showDOM(current);
            }
        })
    }

    const detectRefresh = (projManager) => {
        window.onbeforeunload = () => {
            // i have no idea why i need to call save two times for this to work :/
            save(projManager);
            save(projManager);
        }
    }


    return {detectCurrentProject, detectADDEvent, detectProjectChange, detectSaveChanges, detectDeleteTodo, detectDeleteProject, detectRefresh, current}; 

})(); 

export {
    PageManager
}