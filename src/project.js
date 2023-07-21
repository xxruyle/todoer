import { TODOItem } from "./todo_item";

const Project = (title, descriptionName) => {
    let titleName = title; 
    let description = descriptionName;
    let isCompleted = false; 

    let toDos = []; 



    
    const changeTitle = (newTitle) => {
        titleName = newTitle; 
    }

    const changeTodos = (newTodoArray) => {
        toDos = newTodoArray;
    }

    const changeDescription = (newDescription) => {
        description = newDescription; 
    }

    const deleteTodo = (todoName) => {
        for (let i = 0; i < toDos.length; i++)
        {
            if (toDos[i].title === todoName)
            {
                toDos.splice(i, 1); 
            }
        }
    }

    const changeTodoTitle = (title, newTitle) => {
        for (let i = 0; i < toDos.length; i++)
        {



            if (toDos[i].title === title)
            {

                toDos[i].title = newTitle; 
                toDos[i].changeTitle(newTitle); 
            }
        }
    }

    const updateDates = (newDate) => {
        for (let i = 0; i < toDos.length; i++)
        {
            toDos[i].dueDate = newDate; 
            toDos[i].changeDate(newDate);
        }
    }


    const checkTitleCopies = (title) => {
        let count = 0; 

        toDos.forEach((todo) => {
            if (todo.title.includes(title))
            {
                count += 1; 
            }
        })

        if (count > 0) 
        {
            title = `${title} (${count})`
        }

        return title; 
    }

    const addTODO = (title, description, dueDate, priority) => {
        title = checkTitleCopies(title);

        let todo = TODOItem(title, description, dueDate, priority); 
        
        toDos.push(todo); 
    }

    const showSidebarDOM = (isCurrent, index) => {
        const projectNode = document.createElement('div'); 
        projectNode.classList.add('project');
        projectNode.setAttribute('data-id', index); 

        const projectTitleNode = document.createElement('div');
        projectTitleNode.classList.add('project-title'); 

        if (isCurrent)
        {
            projectTitleNode.classList.add('activated'); 
        }

        projectTitleNode.textContent = titleName; 


            
        const deleteNode = document.createElement('span'); 
        deleteNode.classList.add('material-symbols-outlined'); 
        deleteNode.classList.add('remove-project');
        deleteNode.id = titleName; 
        deleteNode.textContent = 'close';
        projectTitleNode.appendChild(deleteNode);


        const todoContainer = document.createElement('ul');
        todoContainer.classList.add('todo-sidebar-container');

        
        for (let i = 0; i < toDos.length; i++)
        {
            const todoNode = document.createElement('li'); 
            todoNode.classList.add('todo');
            todoNode.textContent = toDos[i].title; 
            todoContainer.appendChild(todoNode); 
        }

        projectNode.appendChild(projectTitleNode);
        projectNode.appendChild(todoContainer);

        return projectNode; 
    }

    const showMainTODO = () => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');
        for (let i = 0; i < toDos.length; i++) 
        {
            const todoNode = document.createElement('div');
            todoNode.classList.add('todo-check');

            const checkInput = document.createElement('input');
            checkInput.type = 'checkbox';
            checkInput.id = `${toDos[i].title}`; 

            if (toDos[i].isCompleted)
            {
                checkInput.checked = "true"; 
            }

            const checkLabel = document.createElement('label');
            checkLabel.contentEditable = "true";
            checkLabel.htmlFor = `${toDos[i].title}`; 
            checkLabel.textContent = toDos[i].title; 

            
            const dateNode = document.createElement('input'); 
            dateNode.type = "date"; 
            dateNode.value = toDos[i].dueDate; 

            const deleteNode = document.createElement('span'); 
            deleteNode.classList.add('material-symbols-outlined'); 
            deleteNode.classList.add('todo-delete'); 
            deleteNode.id = `${toDos[i].title}`; 
            deleteNode.textContent = 'remove';


            todoNode.appendChild(checkInput);
            todoNode.appendChild(checkLabel);
            todoNode.appendChild(dateNode);
            todoNode.appendChild(deleteNode);

            todoContainer.appendChild(todoNode);
        }

        return todoContainer;
    }
 
    const showMainDOM = () => {
        const projectDisplay = document.createElement('div');
        projectDisplay.classList.add('display-project');


        const headerContainer = document.createElement('div'); 
        headerContainer.classList.add('header-container');

        const titleNode = document.createElement('div');
        titleNode.classList.add('title');
        titleNode.contentEditable = 'true';
        titleNode.textContent = titleName; 

        const descriptionNode = document.createElement('div');
        descriptionNode.classList.add('description');
        descriptionNode.contentEditable = 'true';
        descriptionNode.textContent = description; 

        headerContainer.appendChild(titleNode);
        headerContainer.appendChild(descriptionNode);

        projectDisplay.appendChild(headerContainer);


        return projectDisplay;

    }

    const displayDOM = () => {
        showMainDOM(); 
        showSidebarDOM(); 
    }


    return {displayDOM, showMainDOM, showMainTODO, showSidebarDOM, addTODO, isCompleted, toDos, titleName, changeTitle, changeDescription, deleteTodo, changeTodoTitle, description, updateDates, changeTodos} ;
}

export {
    Project 
}; 