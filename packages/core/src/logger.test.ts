import { describe, it, expect, beforeEach, vi } from "vitest";

import {
  configureLogger,
  createActionLogger,
  __resetLoggerForTests,
  type ActionLogEvent,
} from "./logger";

describe("logger", () => {
  beforeEach(() => {
    __resetLoggerForTests();
  });

  it("is disabled by default (no logs)", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const logger = createActionLogger("test");

    logger.log("action_start", "info");

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("logs to console when enabled without custom onLog", () => {
    configureLogger({ enabled: true });
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const logger = createActionLogger("myAction");
    logger.log("action_start", "info");

    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenCalledWith(
      "[zapaction:myAction] action_start",
      expect.objectContaining({
        actionName: "myAction",
        phase: "action_start",
        level: "info",
      }),
    );
    consoleSpy.mockRestore();
  });

  it("filters events below the configured level", () => {
    const events: ActionLogEvent[] = [];
    configureLogger({ enabled: true, level: "warn", onLog: (e) => events.push(e) });

    const logger = createActionLogger("test");
    logger.log("action_start", "debug");
    logger.log("context_resolved", "info");
    logger.log("action_error", "warn");

    expect(events).toHaveLength(1);
    expect(events[0]!.phase).toBe("action_error");
  });

  it("calls custom onLog callback", () => {
    const onLog = vi.fn();
    configureLogger({ enabled: true, onLog });

    const logger = createActionLogger("test");
    logger.log("action_start", "info");

    expect(onLog).toHaveBeenCalledOnce();
    expect(onLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actionName: "test",
        phase: "action_start",
        level: "info",
      }),
    );
  });

  it("logs action phases in pipeline order", () => {
    const phases: string[] = [];
    configureLogger({ enabled: true, onLog: (e) => phases.push(e.phase) });

    const logger = createActionLogger("test");
    logger.log("action_start", "info");
    logger.log("context_resolved", "debug");
    logger.log("before_action", "debug");
    logger.log("handler_complete", "debug");
    logger.log("after_action", "debug");
    logger.log("validation_complete", "debug");
    logger.log("revalidation_complete", "debug");

    expect(phases).toEqual([
      "action_start",
      "context_resolved",
      "before_action",
      "handler_complete",
      "after_action",
      "validation_complete",
      "revalidation_complete",
    ]);
  });

  it("includes duration in events", () => {
    const events: ActionLogEvent[] = [];
    configureLogger({ enabled: true, onLog: (e) => events.push(e) });

    const logger = createActionLogger("test");
    logger.log("action_start", "info");

    expect(events[0]!.duration).toBeDefined();
    expect(typeof events[0]!.duration).toBe("number");
  });

  it("logs error phase on failure", () => {
    const events: ActionLogEvent[] = [];
    configureLogger({ enabled: true, onLog: (e) => events.push(e) });

    const logger = createActionLogger("test");
    const error = new Error("test error");
    logger.log("action_error", "error", { error });

    expect(events[0]!.phase).toBe("action_error");
    expect(events[0]!.level).toBe("error");
    expect(events[0]!.data).toEqual({ error });
  });

  it("__resetLoggerForTests clears configuration", () => {
    const onLog = vi.fn();
    configureLogger({ enabled: true, onLog });

    __resetLoggerForTests();

    const logger = createActionLogger("test");
    logger.log("action_start", "info");

    expect(onLog).not.toHaveBeenCalled();
  });

  it("includes actionName in all events", () => {
    const events: ActionLogEvent[] = [];
    configureLogger({ enabled: true, onLog: (e) => events.push(e) });

    const logger = createActionLogger("createUser");
    logger.log("action_start", "info");
    logger.log("handler_complete", "debug");

    expect(events.every((e) => e.actionName === "createUser")).toBe(true);
  });
});
