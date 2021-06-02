import Pergunta from '@modules/formularios/schemas/Pergunta';
import OpcoesResposta from '@modules/formularios/schemas/OpcaoResposta';
import Formulario from '@modules/formularios/schemas/Formulario';
import MongoMock from '@shared/tests/MongoMock';
import AtualizarFormularioService from '@modules/formularios/services/AtualizarFormulario/AtualizarFormularioService';

describe('Formulario', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Formulario.deleteMany({});
    await Pergunta.deleteMany({});
    await OpcoesResposta.deleteMany({});
  });

  test('deve retornar erro ao não encontrar um formulario com id válido', async () => {
    const atualizarFormularioService = new AtualizarFormularioService();
    const nome = 'Novo';
    const descricao = 'Novo';
    const publicado = false;
    try {
      await atualizarFormularioService.executar({
        id: '60b133d09edacc4268e9f40d', nome, descricao, publicado,
      });
    } catch (e) {
      expect(e.message).toEqual('Form not found');
    }
  });

  test('deve retornar erro ao não encontrar um formulario com id invalido', async () => {
    const atualizarFormularioService = new AtualizarFormularioService();

    const nome = 'Novo';
    const descricao = 'Novo';
    const publicado = false;
    try {
      await atualizarFormularioService.executar({
        id: 'fdjjsdfasdfds', nome, descricao, publicado,
      });
    } catch (e) {
      expect(e.message).toEqual('Cast to ObjectId failed for value "fdjjsdfasdfds" (type string) at path "_id" for model "Formulario"');
    }
  });

  test('deve ser capaz de atualizar um formulario', async () => {
    const atualizarFormularioService = new AtualizarFormularioService();

    let nome = 'Novo';
    let descricao = 'Novo';
    let publicado = false;

    const formCriado = await Formulario.create({
      nome,
      descricao,
      publicado,
    });

    const id = formCriado._id;
    nome = 'editado';
    descricao = 'editado';
    publicado = true;

    await atualizarFormularioService.executar({
      id, nome, descricao, publicado,
    });

    const formularioInserido = await Formulario.findById(id);

    expect(formularioInserido).toEqual(
      expect.objectContaining({
        nome: 'editado',
        descricao: 'editado',
        publicado: true,
      }),
    );
  });
});
