import { describe, it, expect } from "vitest";
import { fromJS } from "immutable";
import { readFileSync } from "fs";
import { resolve } from "path";
import Cards from "./Cards";

function loadSave(filename: string) {
  const raw = readFileSync(resolve(__dirname, "../saves", filename), "utf-8");
  return JSON.parse(raw);
}

// Simulate what the app does on save: null out lastState, then serialize.
function simulateSave(data: any) {
  return JSON.parse(JSON.stringify(fromJS(data).update("lastState", () => null)));
}

const allCardIds = Cards.cards().keySeq().toArray().sort();
const validPresences = new Set(["deck", "inhand", "ophand", "discarded", "removed", "infrontofus"]);

describe.each(["foobar.save", "old.save"])("save file compatibility: %s", (filename) => {
  const saved = loadSave(filename);

  it("round-trips through immutable without data loss", () => {
    const resaved = simulateSave(saved);

    for (const [id, state] of Object.entries(saved.cardStates)) {
      expect(resaved.cardStates[id]).toEqual(state);
    }

    expect(Object.keys(resaved.cardStates).sort()).toEqual(Object.keys(saved.cardStates).sort());
  });

  it("preserves all top-level settings", () => {
    const resaved = simulateSave(saved);

    expect(resaved.phase).toBe(saved.phase);
    expect(resaved.filterBy).toBe(saved.filterBy);
    expect(resaved.sortBy).toBe(saved.sortBy);
    expect(resaved.viewBy).toBe(saved.viewBy);
    expect(resaved.showDiscards).toBe(saved.showDiscards);
    expect(resaved.shortCardNames).toBe(saved.shortCardNames);
    expect(resaved.ussrSelected).toBe(saved.ussrSelected);
    expect(resaved.language).toBe(saved.language);
    expect(resaved.lastState).toBeNull();
  });

  it("save file contains all cards from the game", () => {
    const saveCardIds = Object.keys(saved.cardStates).sort();
    expect(saveCardIds).toEqual(allCardIds);
  });

  it("every card has a valid presence value", () => {
    for (const [id, state] of Object.entries(saved.cardStates)) {
      expect(validPresences, `card ${id} has invalid presence: ${(state as any).presence}`).toContain(
        (state as any).presence
      );
    }
  });
});
