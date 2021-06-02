import { Router } from 'express';
import { container } from 'tsyringe';

import CriarFormularioService from '@modules/formularios/services/CriarFormulario/CriarFormularioService';
import Formulario from '@modules/formularios/schemas/Formulario';

// import garantirAutenticacao from './middlewares/garantirAutenticacao';

const FormularioRoutes = Router();

// FormularioRoutes.use(garantirAutenticacao);

FormularioRoutes.get('/', async (request, response) => {
  try {
    const list = await Formulario.find({});
    return response.json(list);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const form = await Formulario.findOne({ _id: id });

    if (!form) { throw Error('Form not found'); }

    return response.json(form);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.post('/', async (request, response) => {
  const { nome, descricao, publicado } = request.body;

  const createForm = container.resolve(CriarFormularioService);

  const id = await createForm.executar({
    nome,
    descricao,
    publicado,
  });

  return response.json({
    id,
    nome,
    descricao,
    publicado,
  });
});

export default FormularioRoutes;
