import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type QuestionID =
  | "motif"
  | "motifAction"
  | "scene"
  | "additionalElements"
  | "artStyle"
  | "composition"
  | "colorPalette"
  | "vibe"
  | "mood"
  | "otherDetails";

export interface Question {
  id: QuestionID;
  text: string;
  type: "text" | "radio" | "textarea";
  options?: string[];
}

export const questions: Question[] = [
  {
    id: "motif",
    text: "Tシャツにプリントしたい主なモチーフやテーマは何ですか？（例：ネコ、サムライ、ロボット、街の風景、抽象画 など）",
    type: "text",
  },
  {
    id: "motifAction",
    text: "そのモチーフは何をしていますか？（例：歩いている、寝ている、空を飛んでいる、光っている など）",
    type: "text",
  },
  {
    id: "scene",
    text: "そのシーンはどこで起きていますか？（例：宇宙、砂漠、教室、サイバーパンク都市 など）",
    type: "text",
  },
  {
    id: "additionalElements",
    text: "画像に一緒に描かれていてほしいものはありますか？（例：人、看板、車、動物、建物 など）",
    type: "textarea",
  },
  {
    id: "artStyle",
    text: "アートスタイルを選んでください：",
    type: "radio",
    options: [
      "写実的",
      "水彩画風",
      "ポップアート",
      "ミニマル・線画",
      "アニメ風",
      "ピクセルアート",
      "抽象画",
      "その他",
    ],
  },
  {
    id: "composition",
    text: "構図のイメージはありますか？（例：中央に配置、遠景、上下に分かれる構成、俯瞰視点など）",
    type: "text",
  },
  {
    id: "colorPalette",
    text: "希望する色合いやカラーパレットはありますか？",
    type: "radio",
    options: [
      "暖色系",
      "寒色系",
      "モノクロ",
      "カラフル",
      "パステルカラー",
      "その他",
    ],
  },
  {
    id: "vibe",
    text: "全体の雰囲気を一つ選んでください：",
    type: "radio",
    options: [
      "クール",
      "かわいい",
      "幻想的",
      "ダーク・怖い",
      "おもしろ系",
      "神秘的",
      "シンプルで洗練された",
    ],
  },
  {
    id: "mood",
    text: "その画像に漂っていてほしい「空気感」や「感情」を言葉で表してください。（例：ノスタルジック、圧倒的、癒し系、緊張感、孤独感 など）",
    type: "text",
  },
  {
    id: "otherDetails",
    text: "その他、デザインに関して伝えたいことがあれば自由にご記入ください",
    type: "textarea",
  },
] as const;

export const formSchema = z.object({
  motif: z.string().min(1, "モチーフやテーマを入力してください。"),
  motifAction: z.string().min(1, "モチーフが何をしているかを説明してください。"),
  scene: z.string().min(1, "シーンがどこで行われているかを指定してください。"),
  additionalElements: z.string().min(1, "追加の要素について説明してください。"),
  artStyle: z.string().min(1, "アートスタイルを選択または指定してください。"),
  composition: z.string().min(1, "構図について説明してください。"),
  colorPalette: z.string().min(1, "カラーパレットを選択または指定してください。"),
  vibe: z.string().min(1, "雰囲気を選択してください。"),
  mood: z.string().min(1, "気分や感情を説明してください。"),
  otherDetails: z.string().min(1, "その他のデザイン詳細を入力してください。"),
});

export type FormSchema = z.infer<typeof formSchema>;

export const useQuestionsForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motif: "",
      motifAction: "",
      scene: "",
      additionalElements: "",
      artStyle: "",
      composition: "",
      colorPalette: "",
      vibe: "",
      mood: "",
      otherDetails: "",
    },
    mode: "onChange",
  });

  return {
    questions,
    form,
  };
};