export const accentColors = [
  { class: "bg-slate-500", name: "Slate", value: "100, 116, 139" },
  { class: "bg-gray-500", name: "Gray", value: "107, 114, 128" },
  { class: "bg-zinc-500", name: "Zinc", value: "113, 113, 122" },
  { class: "bg-neutral-500", name: "Neutral", value: "115, 115, 115" },
  { class: "bg-stone-500", name: "Stone", value: "120, 113, 108" },
  { class: "bg-red-500", name: "Red", value: "239, 68, 68" },
  { class: "bg-orange-500", name: "Orange", value: "232, 119, 35" },
  { class: "bg-amber-500", name: "Amber", value: "245, 158, 11" },
  { class: "bg-yellow-500", name: "Yellow", value: "234, 179, 8" },
  { class: "bg-lime-500", name: "Lime", value: "132, 204, 22" },
  { class: "bg-green-500", name: "Green", value: "34, 197, 94" },
  { class: "bg-emerald-500", name: "Emerald", value: "16, 185, 129" },
  { class: "bg-teal-500", name: "Teal", value: "20, 184, 166" },
  { class: "bg-cyan-500", name: "Cyan", value: "6, 182, 212" },
  { class: "bg-sky-500", name: "Sky", value: "14, 165, 233" },
  { class: "bg-blue-500", name: "Blue", value: "59, 130, 246" },
  { class: "bg-indigo-500", name: "Indigo", value: "99, 102, 241" },
  { class: "bg-violet-500", name: "Violet", value: "139, 92, 246" },
  { class: "bg-purple-500", name: "Purple", value: "168, 85, 247" },
  { class: "bg-fuchsia-500", name: "Fuchsia", value: "217, 70, 239" },
  { class: "bg-pink-500", name: "Pink", value: "236, 72, 153" },
  { class: "bg-rose-500", name: "Rose", value: "244, 63, 94" },
];

export const accentColorMap = accentColors.reduce<
  Record<string, { class: string; name: string; value: string } | undefined>
>((acc, current) => {
  acc[current.name] = current;
  return acc;
}, {});
