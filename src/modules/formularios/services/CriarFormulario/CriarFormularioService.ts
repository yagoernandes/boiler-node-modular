import { injectable, inject } from 'tsyringe';

import LoggerProvider from '@shared/adapters/models/LoggerProvider';
import Formulario from '@modules/formularios/schemas/Formulario';
import CriarFormularioServiceValidator from '@modules/formularios/services/CriarFormulario/CriarFormularioService.validator';

export interface CriarFormularioRequest {
  nome: string,
  descricao: string,
  publicado: boolean,
}

@injectable()
class CriarFormularioService {
  constructor(
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) { }

  public async executar(request : CriarFormularioRequest): Promise<string> {
    new CriarFormularioServiceValidator(request).validar();

    const formulario = await Formulario.create({
      nome: request.nome,
      descricao: request.descricao,
      publicado: request.publicado,
    });

    this.loggerProvider.log(
      'warn',
      '[Formulario Criado]',
    );

    return formulario._id;
  }
}

export default CriarFormularioService;
