import { Router } from 'express';

import FormularioRoutes from '@modules/formularios/api/formulario';

const v1Router = Router();
const versao = 'v1';

v1Router.use(`/${versao}/formularios`, FormularioRoutes);

export default v1Router;
