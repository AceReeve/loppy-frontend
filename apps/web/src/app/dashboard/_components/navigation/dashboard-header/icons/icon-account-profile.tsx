function IconAccountProfile({ className }: { className?: string }) {
  return (
    <svg
      className={`h-6 w-6 ${className ?? ""}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 17C16 14.7909 13.3137 13 10 13C6.68629 13 4 14.7909 4 17M10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6C14 8.20914 12.2091 10 10 10Z"
        className="stroke-current"
        stroke="#535353"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconAccountProfile;
