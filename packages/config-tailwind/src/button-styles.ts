import plugin from "tailwindcss/plugin";
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");

const buttonStyles = plugin(({ addComponents, matchComponents, theme }) => {
  const colorPrimary = "rgb(var(--color-primary))";
  const colorPrimaryLight = "rgb(var(--color-primary-light))";
  const colorWhite = "rgb(var(--color-white))";
  const colorCard = "rgb(var(--color-card))";
  const colorCardHover = "rgba(var(--color-black), 0.1)";

  const commonBtnStyle = {
    display: "inline-flex",
    gap: "2px",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "&:disabled": {
      filter: "grayscale(0.8)",
      pointerEvents: "none",
    },
  };
  matchComponents(
    {
      "btn-outline": (value: any) => {
        const parsedValue = () => {
          if (value.includes(", <alpha-value>")) {
            return value.replace(", <alpha-value>", "");
          }
        };

        return {
          color: parsedValue(),
          fontSize: "1rem",
          fontWeight: "700",
          lineHeight: "1.6rem",
          border: `1px solid ${parsedValue()}`,
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          "&:hover, &:active": {
            backgroundColor: parsedValue(),
            color: colorWhite,
          },
          ...commonBtnStyle,
        };
      },
    },
    { values: flattenColorPalette(theme("colors")) },
  );

  addComponents({
    ".btn-gradient-primary": {
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.6rem",
      padding: "1rem 1.5rem",
      color: colorWhite,
      borderRadius: "8px",
      background: `linear-gradient(${colorPrimary}, ${colorPrimaryLight})`,
      "&:hover, &:active": {
        background: `linear-gradient(${colorPrimary} 70%, ${colorPrimaryLight})`,
      },
      ...commonBtnStyle,
    },
    ".btn-gradient-primary-lg": {
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.6rem",
      padding: "1rem 1.5rem",
      color: colorWhite,
      borderRadius: "16px",
      background: `linear-gradient(${colorPrimary}, ${colorPrimaryLight})`,
      "&:hover, &:active": {
        background: `linear-gradient(${colorPrimary} 70%, ${colorPrimaryLight})`,
      },
      ...commonBtnStyle,
    },
    ".btn-solid-white": {
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.6rem",
      padding: "1rem 1.5rem",
      color: colorPrimary,
      borderRadius: "16px",
      background: colorWhite,
      "&:hover, &:active": {
        // background: `linear-gradient(${theme("colors.primary.DEFAULT")} 70%, ${theme("colors.primary.light")})`,
      },
      ...commonBtnStyle,
    },
    ".btn-solid-primary": {
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.6rem",
      padding: "1rem 1.5rem",
      color: colorWhite,
      borderRadius: "16px",
      background: colorPrimary,
      "&:hover, &:active": {
        // background: `linear-gradient(${theme("colors.primary.DEFAULT")} 70%, ${theme("colors.primary.light")})`,
      },
      ...commonBtnStyle,
    },
    ".btn-shadowed-white": {
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.6rem",
      padding: "0.625rem",
      borderRadius: "0.5rem",
      background: colorCard,
      boxShadow: theme("boxShadow.soft"),
      "&:hover, &:active": {
        background: colorCardHover,
      },
      ...commonBtnStyle,
    },
  });
});

export default buttonStyles;
