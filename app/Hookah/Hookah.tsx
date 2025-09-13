"use client";

import Image from "next/image";
import { useState } from "react";
import { UnionAsset, HookahAsset } from "@/shared/images";
import { Title } from "@/shared/ui";
import { EditToolbar } from "@/widgets/menu-positions/ui/edit-toolbar";
import type { IHookahData } from "@/shared/types";

type Props = {
  data?: IHookahData;
  isEditMode?: boolean;
  onSaved?: () => void;
};

export default function Hookah({ data, isEditMode = false, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [local, setLocal] = useState<IHookahData>({
    title: data?.title,
    sizes: data?.sizes,
    electronic: data?.electronic,
    noteLines: data?.noteLines,
  });

  const onEditClick = () => {
    setEditing(true);
    setLocal({
      title: data?.title,
      sizes: data?.sizes,
      electronic: data?.electronic,
      noteLines: data?.noteLines,
    });
  };

  const onCancel = () => {
    setEditing(false);
    setLocal({
      title: data?.title,
      sizes: data?.sizes,
      electronic: data?.electronic,
      noteLines: data?.noteLines,
    });
  };

  const onApply = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hookah: local }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) return;
      setEditing(false);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full px-8 relative">
      {isEditMode && (
        <EditToolbar
          className="absolute -top-10 right-8"
          editing={editing}
          saving={saving}
          onEditClick={onEditClick}
          onCancel={onCancel}
          onApply={onApply}
        />
      )}

      <Title
        title={(editing ? local.title : data?.title) ?? "Кальяны"}
        isEdit={editing}
        onChangeTitle={(v) => setLocal({ ...local, title: v })}
      />

      <div className="flex flex-col">
        {(editing ? local.sizes ?? [] : data?.sizes ?? local.sizes ?? []).map(
          (s: { persons?: string; price?: string }, idx: number) => (
            <div
              key={idx}
              className="inline-flex items-center justify-between h-14"
            >
              <div className="inline-flex gap-2 w-1/3">
                {Array.from({ length: idx === 0 ? 3 : idx === 1 ? 5 : 3 }).map(
                  (_, i) => (
                    <Image key={i} src={UnionAsset} alt="human" />
                  )
                )}
              </div>
              {editing ? (
                <input
                  type="text"
                  className="text-center text-xl font-semibold w-1/3 leading-tight border px-2 h-10 text-black"
                  value={s.persons ?? ""}
                  onChange={(e) => {
                    const next = [...(local.sizes ?? [])];
                    next[idx] = { ...next[idx], persons: e.target.value };
                    setLocal({ ...local, sizes: next });
                  }}
                />
              ) : (
                <p className="text-center text-xl font-semibold w-1/3 leading-tight">
                  {s.persons}
                  <br />
                  чел.
                </p>
              )}
              <div className="w-1/3 inline-flex gap-2">
                {Array.from({ length: idx === 0 ? 1 : 2 }).map((_, i) => (
                  <Image key={i} src={HookahAsset} alt="hookan" />
                ))}
              </div>
              {editing ? (
                <input
                  type="text"
                  className="h-10 text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 px-1 text-black"
                  value={s.price ?? ""}
                  onChange={(e) => {
                    const next = [...(local.sizes ?? [])];
                    next[idx] = { ...next[idx], price: e.target.value };
                    setLocal({ ...local, sizes: next });
                  }}
                />
              ) : (
                <p className="h-full text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 py-3">
                  {s.price}
                </p>
              )}
            </div>
          )
        )}

        <div className="inline-flex items-center justify-between h-14">
          {editing ? (
            <input
              type="text"
              className="text-left text-lg font-semibold w-full flex flex-col leading-tight border px-2 h-10 text-black"
              value={local.electronic?.title ?? ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  electronic: { ...local.electronic, title: e.target.value },
                })
              }
            />
          ) : (
            <p className="text-left text-lg font-semibold w-full flex flex-col leading-tight">
              {data?.electronic?.title ?? local.electronic?.title}
            </p>
          )}

          {editing ? (
            <input
              type="text"
              className="h-10 text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 px-1 text-black"
              value={local.electronic?.price ?? ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  electronic: { ...local.electronic, price: e.target.value },
                })
              }
            />
          ) : (
            <p className="h-full text-center text-xl font-semibold tracking-wider border-l-2 border-primary w-20 max-w-20 py-3">
              {data?.electronic?.price ?? local.electronic?.price}
            </p>
          )}
        </div>
      </div>

      <div className="text-center text-sm italic tracking-wider mt-12">
        {(editing
          ? local.noteLines ?? []
          : data?.noteLines ?? local.noteLines ?? []
        ).map((line: string, i: number) => (
          <div key={i} className="mb-1">
            {editing ? (
              <input
                type="text"
                className="w-full border px-2 h-9 text-black"
                value={line ?? ""}
                onChange={(e) => {
                  const next = [...(local.noteLines ?? [])];
                  next[i] = e.target.value;
                  setLocal({ ...local, noteLines: next });
                }}
              />
            ) : (
              <p>{line}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
