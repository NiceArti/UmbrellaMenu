export type ValidationResult = { ok: true } | { ok: false; message: string };

function isStringArray(arr: unknown): arr is string[] {
  return Array.isArray(arr) && arr.every((v) => typeof v === "string");
}

export function validateCollections(data: unknown): ValidationResult {
  if (!data || typeof data !== "object") {
    return { ok: false, message: "Файл должен содержать JSON-объект" };
  }
  const obj = data as any;

  // navigation
  if (!Array.isArray(obj.navigation)) {
    return { ok: false, message: "Поле 'navigation' должно быть массивом" };
  }
  for (const n of obj.navigation) {
    if (!n || typeof n !== "object") {
      return {
        ok: false,
        message: "Элементы 'navigation' должны быть объектами",
      };
    }
    if (typeof n.tag !== "string" || typeof n.text !== "string") {
      return {
        ok: false,
        message:
          "Каждый элемент 'navigation' должен иметь строки 'tag' и 'text'",
      };
    }
  }

  // positions
  if (!Array.isArray(obj.positions)) {
    return { ok: false, message: "Поле 'positions' должно быть массивом" };
  }
  for (const p of obj.positions) {
    if (!p || typeof p !== "object") {
      return {
        ok: false,
        message: "Элементы 'positions' должны быть объектами",
      };
    }
    if (typeof p.id !== "number") {
      return {
        ok: false,
        message: "Каждый элемент 'positions' должен иметь числовое 'id'",
      };
    }
    if (p.names && !isStringArray(p.names)) {
      return { ok: false, message: "Поле 'names' должно быть массивом строк" };
    }
    if (p.prices && !isStringArray(p.prices)) {
      return { ok: false, message: "Поле 'prices' должно быть массивом строк" };
    }
    if (p.tag && typeof p.tag !== "string") {
      return { ok: false, message: "Поле 'tag' должно быть строкой" };
    }
    if (p.title && typeof p.title !== "string") {
      return { ok: false, message: "Поле 'title' должно быть строкой" };
    }
    if (p.isHidden !== undefined && typeof p.isHidden !== "boolean") {
      return { ok: false, message: "Поле 'isHidden' должно быть булевым" };
    }
    if (p.tableView !== undefined && typeof p.tableView !== "boolean") {
      return { ok: false, message: "Поле 'tableView' должно быть булевым" };
    }
  }

  // hookah (optional)
  if (obj.hookah !== undefined) {
    if (!obj.hookah || typeof obj.hookah !== "object") {
      return { ok: false, message: "Поле 'hookah' должно быть объектом" };
    }
    const h = obj.hookah as any;
    if (h.title !== undefined && typeof h.title !== "string") {
      return { ok: false, message: "Поле 'hookah.title' должно быть строкой" };
    }
    if (h.sizes !== undefined) {
      if (!Array.isArray(h.sizes)) {
        return {
          ok: false,
          message: "Поле 'hookah.sizes' должно быть массивом",
        };
      }
      for (const s of h.sizes) {
        if (!s || typeof s !== "object") {
          return {
            ok: false,
            message: "Элементы 'hookah.sizes' должны быть объектами",
          };
        }
        if (s.persons !== undefined && typeof s.persons !== "string") {
          return {
            ok: false,
            message: "Поле 'hookah.sizes[].persons' должно быть строкой",
          };
        }
        if (s.price !== undefined && typeof s.price !== "string") {
          return {
            ok: false,
            message: "Поле 'hookah.sizes[].price' должно быть строкой",
          };
        }
      }
    }
    if (h.electronic !== undefined) {
      if (!h.electronic || typeof h.electronic !== "object") {
        return {
          ok: false,
          message: "Поле 'hookah.electronic' должно быть объектом",
        };
      }
      if (
        h.electronic.title !== undefined &&
        typeof h.electronic.title !== "string"
      ) {
        return {
          ok: false,
          message: "Поле 'hookah.electronic.title' должно быть строкой",
        };
      }
      if (
        h.electronic.price !== undefined &&
        typeof h.electronic.price !== "string"
      ) {
        return {
          ok: false,
          message: "Поле 'hookah.electronic.price' должно быть строкой",
        };
      }
    }
    if (h.noteLines !== undefined && !isStringArray(h.noteLines)) {
      return {
        ok: false,
        message: "Поле 'hookah.noteLines' должно быть массивом строк",
      };
    }
  }

  return { ok: true };
}
