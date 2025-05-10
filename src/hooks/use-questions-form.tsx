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

export const defaultFormValues: FormSchema = {
  motif: "夜の街",
  motifAction: "ネオンが光っている",
  scene: "サイバーパンクな都市",
  additionalElements: "未来的な車",
  artStyle: "写実的",
  composition: "中央に配置",
  colorPalette: "寒色系",
  vibe: "クール",
  mood: "孤独感",
  placement: "胸の中央",
  shape: "縦長（ポートレート）",
  decorations: "なし",
  targetAudience: "誰でも",
};



export const formSchema = z.object({
  motif: z.string().min(1, "Please enter a motif or theme."),
  motifAction: z.string().min(1, "Please describe what the motif is doing."),
  scene: z.string().min(1, "Please specify where the scene is happening."),
  additionalElements: z.string().min(1, "Please describe any additional elements."),
  artStyle: z.string().min(1, "Please select or specify an art style."),
  composition: z.string().min(1, "Please describe the composition."),
  colorPalette: z.string().min(1, "Please select or specify a color palette."),
  vibe: z.string().min(1, "Please select a vibe."),
  mood: z.string().min(1, "Please describe the mood or emotion."),
  placement: z.string().min(1, "Please select a placement option."),
  shape: z.string().min(1, "Please select a shape option."),
  decorations: z.string().min(1, "Please describe any decorations or effects."),
  targetAudience: z.string().min(1, "Please specify the target audience."),
});

export type FormSchema = z.infer<typeof formSchema>;

export const useQuestionsForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  return {
    questions,
    form,
  };
};