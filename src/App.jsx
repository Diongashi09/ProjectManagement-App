import { useContext } from "react";
import SelectedProject from "./components/SelectedProject.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import {ProjectContext} from "./store/project-context.jsx";

export default function App() {
  const { selectedProjectId, projects } = useContext(ProjectContext);
  console.log(selectedProjectId);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  console.log(selectedProjectId);
  // || !selectedProject
  // let content;
  // if (selectedProjectId === null) {
  //   content = <NewProject />;
  // } else if (selectedProjectId === undefined || !selectedProject) {
  //   content = <NoProjectSelected />;
  // } else {
  //   content = <SelectedProject project={selectedProject} />;
  // }

  let content = <SelectedProject project={selectedProject}/>;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined ) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

// export default function AppWithProvider() {
//   return (
//     <ProjectContextProvider>
//       <App />
//     </ProjectContextProvider>
//   );
// }
