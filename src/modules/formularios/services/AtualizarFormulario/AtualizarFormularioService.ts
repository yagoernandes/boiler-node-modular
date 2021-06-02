import Formulario from '@modules/formularios/schemas/Formulario';

export interface AtualizarFormularioRequest {
  id: string,
  nome: string,
  descricao: string,
  publicado: boolean,
}

class AtualizarFormularioService {
  public async executar(request : AtualizarFormularioRequest): Promise<void> {
    const form = await Formulario.findOne({ _id: request.id });

    if (!form) { throw Error('Form not found'); }

    await form.update({
      nome: request.nome,
      descricao: request.descricao,
      publicado: request.publicado,
    });
  }
}

export default AtualizarFormularioService;
