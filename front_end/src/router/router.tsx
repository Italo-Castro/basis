import { createBrowserRouter } from "react-router-dom";
import NovaPessoaPage from "../Components/Pages/NovaPessoaPage";
import InicioPage from "../Components/Pages/InicioPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InicioPage />,
  },
  {
    path: "novaPessoa",
    element: <NovaPessoaPage />,
  },
]);

export default router;
