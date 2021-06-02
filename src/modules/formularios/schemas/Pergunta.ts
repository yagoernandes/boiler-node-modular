import mongoose, { Document, Schema } from 'mongoose';

interface Pergunta extends Document {
  id_formulario: string,
  descricao: string,
  ordem: number,
  peso: number,
  tipo: string,
}

const PerguntaSchema = new Schema(
  {
    id_formulario: { type: Schema.Types.ObjectId },
    descricao: {
      type: String,
      required: true,
      trim: true,
    },
    ordem: {
      type: Number,
      required: true,
    },
    peso: {
      type: Number,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      trim: true,
    },
    Opcoes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OpcaoResposta',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Pergunta>('Perguntas', PerguntaSchema);
