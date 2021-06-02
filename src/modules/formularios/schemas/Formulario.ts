import mongoose, { Document, Schema } from 'mongoose';

interface Formulario extends Document {
  email: string,
  descricao: string,
  publicado: boolean,
}

const FormularioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      required: true,
      trim: true,
    },
    publicado: {
      type: Boolean,
    },
    perguntas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pergunta',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Formulario>('Formulario', FormularioSchema);
