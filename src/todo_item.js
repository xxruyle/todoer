const TODOItem = (title, description, dueDate, priority) => {

    let isCompleted = false; 

    const makeComplete = () => {
        isCompleted = true; 
    }

    const changeCompleted = (bool) => {
        isCompleted = bool; 
    }

    const changeTitle = (newTitle) => {
        title = newTitle; 
    }

    const changeDate = (newDate) => {
        dueDate = newDate; 
    }

    return {isCompleted, title, description, dueDate, priority, makeComplete, changeTitle, changeDate, changeCompleted};

}

export {
    TODOItem
}; 