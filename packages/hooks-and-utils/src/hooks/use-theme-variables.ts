import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function useThemeVariables() {
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
  const { theme } = useTheme();

  useEffect(() => {
    const computedDocStyle = getComputedStyle(document.documentElement);

    if (computedDocStyle) {
      setComputedStyle(computedDocStyle);
    }
  }, [theme]);

  /**
   * returns the actual rgb color defined on globals.css
   * @param colorVariableName variable defined on globals.css (format: --color-primary)
   */
  const getColorVariable = useCallback(
    (colorVariableName: string) => {
      if (!computedStyle) return undefined;
      const color = computedStyle.getPropertyValue(colorVariableName);

      if (!color)
        throw "Invalid color variable. Check if css variable is properly defined.";

      return `rgb(${computedStyle.getPropertyValue(colorVariableName)})`;
    },
    [computedStyle],
  );

  return { getColorVariable };
}
