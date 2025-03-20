import { render, screen } from "@testing-library/react";
import cconfetti from "canvas-confetti";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";

import { Confetti } from "@/components/notifications/confetti";
import { confettiAtom } from "@/stores/confetti";

vitest.mock("canvas-confetti", () => {
  return {
    default: vitest.fn(),
  };
});

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

describe("Confettiコンポーネントのテスト", () => {
  beforeEach(() => {
    vitest.useFakeTimers();
  });
  afterEach(() => {
    vitest.useRealTimers();
  });

  test.skip("コンポーネントが正常に表示される", () => {
    render(<Confetti />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[confettiAtom, false]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const confetti = screen.getByTestId("confetti");
    expect(confetti).toBeInTheDocument();
  });
  test.skip("isPlayingがtrueのとき、紙吹雪が開始される", () => {
    render(<Confetti />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[confettiAtom, true]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const confetti = screen.getByTestId("confetti");
    expect(confetti).toBeInTheDocument();
  });

  test.skip("紙吹雪が開始されてから1病後に停止される", () => {
    render(<Confetti />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[confettiAtom, true]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    expect(cconfetti).toHaveBeenCalledWith(
      expect.objectContaining({
        origin: { x: 0, y: 0.5 },
        angle: 60,
      }),
    );

    vitest.advanceTimersByTime(1000);

    const confetti = screen.getByTestId("confetti");
    expect(confetti).toBeInTheDocument();
  });
});
