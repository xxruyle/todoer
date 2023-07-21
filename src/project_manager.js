import { Project } from './project'

const ProjectManager = ( () => {
    const sidebarProjects = document.querySelector('.projects-container'); 

    const mainProjects = document.querySelector('.display-container');


    const projects = []; 
    let currentProject = 0; 

    const checkTitleCopies = (title) => {
        let count = 0; 

        projects.forEach((project) => {
            if (project.titleName.includes(title))
            {
                count += 1; 
            }
        })

        if (count > 0) 
        {
            title = `${title} (${count})`;
        }

        return title; 
    }

    const addProject = (title, description) => {
        title = checkTitleCopies(title); 

        let project = Project(title, description)
        project.changeDescription(description);

        projects.push(project); 
    }
    
    const deleteProject = (titleId) => {
        if (Number(titleId) === 0)
        {
            alert("cannot delete home page!")
            return false; 
        }

        if (projects.length > 1)
        {

            projects.splice(Number(titleId), 1);


        } else {
            alert("cannot delete home page!");
        }

    }

    const updateTodos = (current) => { 
        const todoContainer = mainProjects.querySelector('.todo-container');

        const todoChecks = todoContainer.querySelectorAll('input[type="checkbox"]');

        const todoLabels = todoContainer.querySelectorAll('label'); 


        for (let i = 0; i < todoChecks.length; i++) 
        {
            todoChecks[i].checked ? projects[current].toDos[i].isCompleted = true : projects[current].toDos[i].isCompleted = false; 
        }

        for (let i = 0; i < todoLabels.length; i++) 
        {
            projects[current].changeTodoTitle(todoChecks[i].id, todoLabels[i].textContent); 
        }

    }

    const updateDates = (current) => {
        const dateNodes = document.querySelectorAll('input[type="date"]');

        for (let i = 0; i < dateNodes.length; i++)
        {
            projects[current].toDos[i].dueDate = dateNodes[i].value; 
            projects[current].toDos[i].changeDate(dateNodes[i].value); 
        }
    }



    const showDOM = (current) => { 
        sidebarProjects.innerHTML = ""; 
        mainProjects.innerHTML = ""; 

        for (let i = 0; i < projects.length; i++) 
        {
            if (i === current)  
            {


                sidebarProjects.appendChild(projects[i].showSidebarDOM(true, i));

                mainProjects.appendChild(projects[i].showMainDOM()); 
                mainProjects.appendChild(projects[i].showMainTODO()); 

            } else {
                sidebarProjects.appendChild(projects[i].showSidebarDOM(false, i));
            }

        }
    }



    return {projects, addProject, showDOM, currentProject, updateTodos, deleteProject, updateDates}; 
})(); 

export {
    ProjectManager
}