import './style.css'
import { ProjectManager } from './project_manager'
import { PageManager } from './page_manager'
import { StorageManager } from './storage';


function component() {

    ProjectManager.addProject("Home", "This is a placeholder tab");

    StorageManager.storageInit(ProjectManager);








    ProjectManager.showDOM(0); // shows all of current projects dom 
    PageManager.detectCurrentProject(ProjectManager); 
    PageManager.detectADDEvent(ProjectManager);

    
    PageManager.detectSaveChanges(ProjectManager); 
    PageManager.detectDeleteTodo(ProjectManager);
    PageManager.detectDeleteProject(ProjectManager);
    PageManager.detectRefresh(ProjectManager);



}



component(); 

