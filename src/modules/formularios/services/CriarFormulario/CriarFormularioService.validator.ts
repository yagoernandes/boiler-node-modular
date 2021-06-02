import ValidatorError from '@shared/errors/ValidatorError';
import Validator from 'validatorjs';
import { CriarFormularioRequest } from './CriarFormularioService';

class CriarFormularioServiceValidator {
  private nome = '';

  private descricao = '';

  private validacao = {
    nome: 'required|max:100',
    descricao: 'required|max:200',
  };

  constructor({ nome, descricao }: CriarFormularioRequest) {
    this.nome = nome;
    this.descricao = descricao;
  }

  validar(): void | Error {
    const validation = new Validator({
      nome: this.nome,
      descricao: this.descricao,
    }, this.validacao);

    if (!validation.passes()) {
      throw new ValidatorError(validation.errors.all());
    }
  }
}

export default CriarFormularioServiceValidator;
