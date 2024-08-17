import { createContext, useReducer } from "react";

export const ProjectContext = createContext({
  // selectedProjectId: null,
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
});

function projectReducer(state, action) {
  switch (action.type) {
    case "START_ADD_PROJECT":
      console.log("Start add project action... ");
      return {
        ...state,
        selectedProjectId: null,
      };
    case "CANCEL_ADD_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
      };

    case "ADD_PROJECT": {
      const projectId = Math.random();
      const newProject = {
        ...action.payload,
        id: projectId,
      };
      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject],
      };
    }

    case "DELETE_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
      };

    case "ADD_TASK": {
      const taskId = Math.random();
      const newTask = {
        text: action.payload,
        projectId: state.selectedProjectId,
        id: taskId,
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => action.payload !== task.id),
      };

    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload,
      };

    default:
      return state;
  }
}

export default function ProjectContextProvider({ children }) {
  const [projectState, projectDispatch] = useReducer(projectReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // function startAddProject() {
  //   console.log("Starting Add Project");
  //   projectDispatch({
  //     type: "START_ADD_PROJECT",
  //   });
  //   // console.log(projectState.selectedProjectId);
  // }

  // function cancelAddProject() {
  //   projectDispatch({
  //     type: "CANCEL_ADD_PROJECT",
  //   });
  // }

  // function addProject(projectData) {
  //   projectDispatch({
  //     type: "ADD_PROJECT",
  //     payload: projectData,
  //   });
  // }

  // function deleteProject() {
  //   projectDispatch({
  //     type: "DELETE_PROJECT",
  //   });
  // }

  // function addTask(text) {
  //   projectDispatch({
  //     type: "ADD_TASK",
  //     payload: text,
  //   });
  // }

  // function deleteTask(id) {
  //   projectDispatch({
  //     type: "DELETE_TASK",
  //     payload: id,
  //   });
  // }

  // function selectProject(id) {
  //   projectDispatch({
  //     type: "SELECT_PROJECT",
  //     payload: id,
  //   });
  // }

  // const selectedProject = projectState.projects.find((project) => project.id === selectedProjectId);

  // const ctxValue = {
  //   selectedProjectId: projectState.selectedProjectId,
  //   projects: [projectState.projects],
  //   tasks: [projectState.tasks],
  //   startAddProject: startAddProject,
  //   cancelAddProject: cancelAddProject,
  //   addProject: addProject,
  //   deleteProject: deleteProject,
  //   addTask: addTask,
  //   deleteTask: deleteTask,
  //   selectProject: selectProject,
  // };

  const ctxValue = {
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    tasks: projectState.tasks,
    startAddProject: () => projectDispatch({ type: "START_ADD_PROJECT" }),
    cancelAddProject: () => projectDispatch({ type: "CANCEL_ADD_PROJECT" }),
    addProject: (projectData) => projectDispatch({ type: "ADD_PROJECT", payload: projectData }),
    deleteProject: () => projectDispatch({ type: "DELETE_PROJECT" }),
    addTask: (text) => projectDispatch({ type: "ADD_TASK", payload: text }),
    deleteTask: (id) => projectDispatch({ type: "DELETE_TASK", payload: id }),
    selectProject: (id) => projectDispatch({ type: "SELECT_PROJECT", payload: id }),
  };

  console.log(ctxValue.selectedProjectId);
  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
