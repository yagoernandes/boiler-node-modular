import mongoose, { Document, Schema } from 'mongoose';

interface OpcaoResposta extends Document {
  id_pergunta: string,
  valor: string,
  opcaoCorreta: boolean,
}

const OpcaoRespostaSchema = new Schema(
  {
    id_pergunta: { type: Schema.Types.ObjectId },
    valor: {
      type: String,
      required: true,
      trim: true,
    },
    opcaoCorreta: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<OpcaoResposta>('OpcoesResposta', OpcaoRespostaSchema);
