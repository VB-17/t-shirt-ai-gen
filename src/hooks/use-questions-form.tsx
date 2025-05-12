import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



export const questions: Question[] = [
  {
    id: "motif",
    text: "Tシャツにプリントしたい主なモチーフやテーマは何ですか？",
    type: "text",
  },
  {
    id: "motifAction",
    text: "そのモチーフは何をしていますか？",
    type: "text",
  },
  {
    id: "scene",
    text: "そのシーンはどこで起きていますか？",
    type: "text",
  },
  {
    id: "additionalElements",
    text: "画像に一緒に描かれていてほしいものはありますか？",
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
    text: "構図のイメージはありますか？",
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
    text: "その画像に漂っていてほしい「空気感」や「感情」を言葉で表してください。",
    type: "text",
  },
  {
    id: "placement",
    text: "Tシャツのどこにプリントされている想定ですか？",
    type: "radio",
    options: [
      "胸の中央",
      "ポケットの位置",
      "全面印刷（Tシャツ全体に広がる）",
    ],
  },
  {
    id: "shape",
    text: "希望する画像の形はありますか？",
    type: "radio",
    options: [
      "正方形",
      "縦長（ポートレート）",
      "横長（ランドスケープ）",
      "特に指定なし",
    ],
  },
  {
    id: "decorations",
    text: "装飾や枠線、特殊なエフェクトは必要ですか？",
    type: "textarea",
  },
  {
    id: "targetAudience",
    text: "このTシャツは誰に着てほしいですか？",
    type: "text",
  },
] as const;


type QuestionID =
  | "motif"
  | "motifAction"
  | "scene"
  | "additionalElements"
  | "artStyle"
  | "composition"
  | "colorPalette"
  | "vibe"
  | "mood"
  | "placement"
  | "shape"
  | "decorations"
  | "targetAudience";

export interface Question {
  id: QuestionID;
  text: string;
  type: "text" | "radio" | "textarea";
  options?: string[];
}



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
  placement: z.string().min(1, "配置オプションを選択してください。"),
  shape: z.string().min(1, "形状オプションを選択してください。"),
  decorations: z.string().min(1, "装飾や効果について説明してください。"),
  targetAudience: z.string().min(1, "対象となる視聴者を指定してください。"),
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
      placement: "",
      shape: "",
      decorations: "",
      targetAudience: "",
    },
    mode: "onChange",
  });

  return {
    questions,
    form,
  };
};